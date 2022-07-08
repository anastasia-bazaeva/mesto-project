import './pages/index.css';

// Импортируем данные
import { mestoContainer, popupZoom,
   popupEdit, popupAdd, editForm, profileName, profileDescription, updateName, updateDescription,
    addForm, anyPopup, enableValidationConfig, editAvatar, profileAvatar } from './components/utils.js';
  
  // Импортируем валидацию
  import { removeErrorSpan, enableValidation} from './components/validation.js';  
  
  //Импортируем создание карточек
  import { createCard, addMesto, renderCard, } from './components/card.js';

 // функции для открытия и закрытия попапов
  import { openPopup, closePopup, editProfile, editProfileAvatar, renderLoading } from './components/modal.js';

  import { getProfile, getAllCards } from './components/api.js';

  // about: "Sailor, researcher"
  // avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg"
  // cohort: "plus-cohort-13"
  // name: "Jacques Cousteau"
  // _id: "aff48aa652d182768eb1925e"

  let profileID = null;
//получаем данные профиля с сервера
  getProfile()
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.src = data.avatar;
    profileID = data._id;
  })
  .catch(err => console.log(`С данными профиля что-то не так: ${err}`))

//рендерим все карточки на странице
  getAllCards()
  .then((serverCards) => {
    serverCards.forEach ((data) => {
      renderCard (mestoContainer, createCard(data));
    })
  })
  .catch(err => console.log(`При рендере карточек что-то пошло не так: ${err}`))
  
  //запускаем валидацию
  enableValidation(enableValidationConfig);

  
 //Слушатель на открытый зум-попап
  popupZoom.querySelector('.popup__button_status_zoom-close').addEventListener('click', () => {
    closePopup(popupZoom);
  })

  //слушатель для открытия и закрытия попапа редактирования профиля
  
  document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openPopup (popupEdit);
    removeErrorSpan(popupEdit);
    updateName.value = profileName.textContent;
    updateDescription.value = profileDescription.textContent;
  });
  
  popupEdit.querySelector('.popup__button_status_close').addEventListener('click', () => {
    closePopup (popupEdit);
  });
  
  // слушатель для открытия и закрытия попапа добавления Места
  
  document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopup (popupAdd);
  })
  
  popupAdd.querySelector('.popup__button_status_close').addEventListener('click', () => {
    closePopup (popupAdd);
  })
  
  
  // слушатель для редактирования профиля
  
  editForm.addEventListener('submit', function (evt) {
    const profileUpdateButton = editForm.querySelector('.popup__button_status_save');
    evt.preventDefault();
    renderLoading(profileUpdateButton, true, '');
    editProfile();
  });
  
  // слушатель для добавления новой картинки с Местом
  addForm.addEventListener('submit', function (evt) {
    const addButton = addForm.querySelector('.popup__button_status_create');
    evt.preventDefault();
    renderLoading(addButton, true, '');
    addMesto (); 
  });

   
  //слушатель для каждого попапа для закрытия по клику на оверлей
  
    anyPopup.forEach(popup => { 
      popup.addEventListener ('mousedown', evt => {
        const openedPopup = document.querySelector('.popup_opened');
        if ((openedPopup)&&(evt.target.classList.contains('popup'))){ 
          closePopup(evt.target.closest('.popup_opened'));
        }
        });
    })
  
  //слушатель  для закрытия попапа редактирования аватара
  document.querySelector('.profile__avatar-button').addEventListener('click', () => {
    openPopup (editAvatar);
  });
  editAvatar.querySelector('.popup__button_status_close').addEventListener('click', () => {
      closePopup (editAvatar);
    });
  // слушатель для кнопки редактирования аватара
  editAvatar.querySelector('.popup_avatar_add').addEventListener('submit', evt => {
    const avatarButton = editAvatar.querySelector('.popup__button_status_save');
    evt.preventDefault();
    renderLoading(avatarButton, true, '');
    editProfileAvatar();
  })

  export { profileID }