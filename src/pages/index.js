import './index.css';

// Импортируем данные
import { mestoContainer, popupZoom, mestoCards, zoomPic, zoomName,
   popupEdit, popupAdd, profileName, profileDescription, updateName, updateDescription,
   enableValidationConfig, editAvatar, profileAvatar, forms, renderLoadingMainContent, removeErrorSpan } from '../components/utils.js';
  
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
const apiConfig = new Api ({
  url: "https://mesto.nomoreparties.co/plus-cohort-13",
  urlLikes: "https://nomoreparties.co/v1/plus-cohort-13/cards/likes",
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
  
  //запускаем валидацию
  forms.forEach((form) => {
    const formClass = new FormValidator (enableValidationConfig, form);
    formClass.enableValidation();
  })

  //объект с попапом для редактирования профиля
  const popupEditProfile = new PopupWithForm (
    popupEdit,
    (inputValues) => {
      const userData = {
        name: inputValues[0],
        about: inputValues[1],
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

  //объект с попапом добавления нового места
  const popupAddForm = new PopupWithForm (
    popupAdd,
    (inputValues) => {
      const post = {
        name: inputValues[0],
        link: inputValues[1],
      };
      apiConfig.addCardToServer(post)
        .then((cardData) => {
          serverCards.addItem(cardCreation(cardData, profileID));
          popupAddForm.closePopup();
        })
        .catch(err => console.log(`С добавлением карточки что-то не так: ${err}`))
        .finally(() => popupAddForm.renderLoading(false, 'Создать')) 
  },
);

  // объект с редактированием аватара
  const popupEditAvatar = new PopupWithForm (
    editAvatar,
    (inputValues) => {
      const avatarData = {
         avatar: inputValues[0]
      };
      apiConfig.editProfilePic(avatarData)
      .then(() => {
        apiConfig.getProfile()
        .then((data) => user.setUserAvatar(data))
        popupEditAvatar.closePopup() 
      })
      .catch(err => console.log(`При редактировании аватара профиля что-то пошло не так: ${err}`))
      .finally(() => popupEditAvatar.renderLoading(false, 'Сохранить')) 
    }
  );

  const imagePopup = new PopupWithImage(popupZoom, zoomPic, zoomName);

  //получаем данные профиля и картинки с сервера
  Promise.all([apiConfig.getProfile(), apiConfig.getAllCards()])
  .then(([profileData, cardsData]) => {
    user.setUserInfo(profileData);
    user.setUserAvatar(profileData);
    profileID = profileData._id;
    serverCards.renderItems(cardsData);
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))
  .finally(() => renderLoadingMainContent(false))

  //слушатель для открытия попапа редактирования профиля
  document.querySelector('.profile__edit-button').addEventListener('click', () => {
    updateName.value = profileName.textContent;
    updateDescription.value = profileDescription.textContent;
    popupEditProfile.openPopup();
    removeErrorSpan(popupEdit);
  });
  
 
  // слушатель для открытия попапа добавления Места
  document.querySelector('.profile__add-button').addEventListener('click', () => {
    popupAddForm.openPopup();
    removeErrorSpan(popupAdd);
  })

   //слушатель  для открытия попапа редактирования аватара
   document.querySelector('.profile__avatar-button').addEventListener('click', () => {
    popupEditAvatar.openPopup();
    removeErrorSpan(editAvatar);
  });

  export { profileID }