import './index.css';

// Импортируем данные
import { mestoContainer, popupZoom, mestoCards, zoomPic, zoomName,
   popupEdit, popupAdd, profileName, profileDescription, updateName, updateDescription,
   enableValidationConfig, editAvatar, profileAvatar, forms, renderLoadingMainContent } from '../utils/utils.js';
  
  // Импортируем валидацию
  import { FormValidator } from '../components/FormValidator.js';  
  
  //Импортируем создание карточек
  import { Card } from '../components/Сard.js';
  import { Api } from '../components/Api.js'; 
  import { Section } from '../components/Section.js';
  import { PopupWithForm } from '../components/PopupWithForm.js';
  import { PopupWithImage } from '../components/PopupWithImage.js';
  import { UserInfo } from '../components/UserInfo.js';

  let profileID = null;

renderLoadingMainContent(true);

//создаем экземпляра класса Api
//мы поменяли основную ссылку, теперь она одинаковая, но у нас отображается только 30 картинок
const apiConfig = new Api ({
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
      "Content-Type": "application/json",
      "Authorization": "5f5f6516-2c69-4593-ad66-9a5c627fc536"
  }
})

//объявляем экземпляр класса UserInfo
const user = new UserInfo ({
  profileName: profileName, 
  profileDescription: profileDescription, 
  profileAvatar: profileAvatar
})

//функция создания карточки
function cardCreation(data, profileID) {
  const card = new Card(
    {
      cardInfo: data,
      handleCardClick: (link, place) => {
        imagePopup.open(link, place); 
      },
    },
    apiConfig,
    mestoCards,
    profileID
  );
  return card.getCard();
}

  const serverCards = new Section ({
  renderer: (item) => {
    serverCards.addItem(cardCreation(item, profileID));
}},
mestoContainer);

const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};
enableValidation(enableValidationConfig);

  //объект с попапом для редактирования профиля
  const popupEditProfile = new PopupWithForm (
    popupEdit,
    (inputValues) => {
      const userData = {
        name: inputValues.name,
        about: inputValues.description
      };
      apiConfig.editProfileInfo(userData)
        .then((data) => {
          user.setUserInfo(data);
          popupEditProfile.closePopup();
        })
        .catch(err => console.log(`При редактировании профиля что-то пошло не так: ${err}`))
        .finally(() => popupEditProfile.renderLoading(false, 'Сохранить')) 
    }
  );
  popupEditProfile.setEventListeners();

  //объект с попапом добавления нового места
  const popupAddForm = new PopupWithForm (
    popupAdd,
    (inputValues) => {
      const post = {
        name: inputValues.placeName,
        link: inputValues.placeDescription
      }
      apiConfig.addCardToServer(post)
        .then((cardData) => {
          serverCards.addItem(cardCreation(cardData, profileID));
          popupAddForm.closePopup();
        })
        .catch(err => console.log(`С добавлением карточки что-то не так: ${err}`))
        .finally(() => popupAddForm.renderLoading(false, 'Создать'))
  },
);
popupAddForm.setEventListeners();

  // объект с редактированием аватара
  const popupEditAvatar = new PopupWithForm (
    editAvatar,
    (inputValues) => {
      const avatarData = {
         avatar: inputValues.avatarUrl,
      };
      apiConfig.editProfilePic(avatarData)
      .then((data) => {
        user.setUserAvatar(data);
        popupEditAvatar.closePopup();
       })
      .catch(err => console.log(`При редактировании аватара профиля что-то пошло не так: ${err}`))
      .finally(() => popupEditAvatar.renderLoading(false, 'Сохранить')) 
    }
  );
  popupEditAvatar.setEventListeners();

  const imagePopup = new PopupWithImage(popupZoom, zoomPic, zoomName);
  imagePopup.setEventListeners();

  //получаем данные профиля и картинки с сервера
  Promise.all([apiConfig.getProfile(), apiConfig.getAllCards()])
  .then(([profileData, cardsData]) => {
    user.setUserInfo(profileData);
    user.setUserAvatar(profileData);
    profileID = profileData._id;
    serverCards.renderItems(cardsData.reverse());
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))
  .finally(() => renderLoadingMainContent(false))

  //слушатель для открытия попапа редактирования профиля
  document.querySelector('.profile__edit-button').addEventListener('click', () => {
    updateName.value = user.getUserInfo().userName;
    updateDescription.value = user.getUserInfo().userAbout;
    popupEditProfile.openPopup();
    formValidators["profile_edit"].resetValidation();
  });
  
 
  // слушатель для открытия попапа добавления Места
  document.querySelector('.profile__add-button').addEventListener('click', () => {
    popupAddForm.openPopup();
    formValidators["profile_add"].resetValidation();
  })

   //слушатель  для открытия попапа редактирования аватара
   document.querySelector('.profile__avatar-button').addEventListener('click', () => {
    popupEditAvatar.openPopup();
    formValidators["avatar_add"].resetValidation();
  });
