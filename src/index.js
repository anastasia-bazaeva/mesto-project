import './pages/index.css';

// Импортируем данные
import { mestoContainer, popupZoom, mestoCards, zoomPic, zoomName,
   popupEdit, popupAdd, profileName, profileDescription, updateName, updateDescription,
   enableValidationConfig, editAvatar, profileAvatar, forms, renderLoadingMainContent, removeErrorSpan } from './components/utils.js';
  
  // Импортируем валидацию
  import { FormValidator } from './components/FormValidator.js';  
  
  //Импортируем создание карточек
  import { Card } from './components/Сard.js';
  import { apiConfig } from './components/Api.js'; 
  import { Section } from './components/Section.js';
  import { PopupWithForm } from './components/PopupWithForm.js';
  import { PopupWithImage } from './components/PopupWithImage.js';
  import { UserInfo } from './components/UserInfo.js';

  let profileID = null;

renderLoadingMainContent(true);

//объявить экземпляр класса UserInfo
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
  // enableValidation(enableValidationConfig);
  forms.forEach((form) => {
    const formClass = new FormValidator (enableValidationConfig, form);
    formClass.enableValidation();
  })

  //Функция для создания новой карточки по кноке
// function addMesto() {
//   const addButton = addForm.querySelector('.popup__button_status_create');
//     const data = {
//       link: placeUrl.value,
//       name: placeName.value,
//       };
//     apiConfig.addCardToServer(data)
//     .then((data) => {
//       serverCards.addItem(cardCreation(data, profileID));
//       closePopup (addPopup); 
//     })
//     .catch(err => console.log(`С добавлением карточки что-то не так: ${err}`))
//     .finally(() => renderLoading(addButton, false, 'Создать'))
//     placeUrl.value = '';
//     placeName.value = ''; 
//   }

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
    // profileName.textContent = profileData.name;
    // profileDescription.textContent = profileData.about;
    // profileAvatar.src = profileData.avatar;
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
  
  // слушатель для редактирования профиля
  // editForm.addEventListener('submit', function (evt) {
  //   const profileUpdateButton = editForm.querySelector('.popup__button_status_save');
  //   evt.preventDefault();
  //   renderLoading(profileUpdateButton, true, '');
  //   editProfile();
  // });
  
  // слушатель для добавления новой картинки с Местом
  // addForm.addEventListener('submit', function (evt) {
  //   const addButton = addForm.querySelector('.popup__button_status_create');
  //   evt.preventDefault();
  //   renderLoading(addButton, true, '');
  //   addMesto (); 
  // });

   
  //слушатель для каждого попапа для закрытия по клику на оверлей или на кнопку

  // anyPopup.forEach((popup) => {
  //   popup.addEventListener('mousedown', (evt) => {
  //       if (evt.target.classList.contains('popup_opened')) {
  //           closePopup(popup)
  //       }
  //       if (evt.target.classList.contains('popup__button_status_close')) {
  //         closePopup(popup)
  //       }
  //   })
  // })



  // слушатель для кнопки редактирования аватара
  // editAvatar.querySelector('.popup_avatar_add').addEventListener('submit', evt => {
  //   const avatarButton = editAvatar.querySelector('.popup__button_status_save');
  //   evt.preventDefault();
  //   renderLoading(avatarButton, true, '');
  //   editProfileAvatar();
  // })


  export { profileID }