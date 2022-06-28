import './pages/index.css';


// Импортируем данные
import { initialCardsInRigthOrder,  mestoContainer, popupZoom, zoomPic, 
    zoomName, popupEdit, popupAdd, editForm, profileName, profileDescription, updateName, updateDescription,
    addForm,  addPopup, page, anyPopup, editAvatar, enableValidationConfig } from './data.js';
  
  // Импортируем и запускаем валидацию
  import { removeErrorSpan, pickValidityMessage, showError, hideError, checkInputValidity, toggleButton, setEventListener, enableValidation} from './validation.js';  
    enableValidation(enableValidationConfig);
  
  //Импортируем создание карточек
  import { createCard, addMesto } from './card-creation.js';
  
  //вызов функции создания новой карточки для рендера исходных картинок
  
  initialCardsInRigthOrder.forEach ((data) => {
    createCard(data);
  });
  
  // функции для открытия и закрытия попапов
  
  function openPopup (popup) {
    popup.classList.add('popup_opened');
  }
  
  function closePopup (popup) {
    popup.classList.remove('popup_opened');
  }
  
  
  //код для открытия и закрытия попапа редактирования профиля
  
  
  document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openPopup (popupEdit);
    removeErrorSpan(popupEdit);
    updateName.value = profileName.textContent;
    updateDescription.value = profileDescription.textContent;
    
    page.addEventListener ('keydown', escHandler);
  });
  
  popupEdit.querySelector('.popup__button_status_close').addEventListener('click', () => {
    closePopup (popupEdit);
    page.removeEventListener ('keydown', escHandler);
  });
  
  // код для открытия и закрытия попапа добавления Места
  
  document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopup (popupAdd);
    page.addEventListener ('keydown', escHandler);
  })
  
  popupAdd.querySelector('.popup__button_status_close').addEventListener('click', () => {
    closePopup (popupAdd);
    page.removeEventListener ('keydown', escHandler);
  })
  
  
  // Код для редактирования профиля
  
  function editProfile() {
    profileName.textContent = updateName.value;
    profileDescription.textContent = updateDescription.value;
    closePopup(popupEdit);
    page.removeEventListener ('keydown', escHandler);
  }
  
  editForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    editProfile();
  });
  
  // код для добавления новой картинки с Местом
  addForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addMesto ();
  });
  

    
    // колбек для закрытия попапов по esc
    function escHandler(evt) {
      const openedPopup = document.querySelector('.popup_opened');
      if ((evt.key === 'Escape')&&(openedPopup)) {
        closePopup(openedPopup);
        }
    }
   
  //слушатель для каждого попапа для закрытия по клику на оверлей
  
    anyPopup.forEach(popup => { 
      popup.addEventListener ('click', evt => {
        const openedPopup = document.querySelector('.popup_opened');
        if ((openedPopup)&&(evt.target.classList.contains('popup'))){ 
          closePopup(evt.target.closest('.popup_opened'));
        }
        });
    })
  
  // код для закрытия попапа редактирования аватара
  document.querySelector('.profile_avatar-button').addEventListener('click', () => {
    openPopup (editAvatar);
    page.addEventListener ('keydown', escHandler);
  });
  editAvatar.querySelector('.popup__button_status_close').addEventListener('click', () => {
      closePopup (editAvatar);
      page.removeEventListener ('keydown', escHandler);
    });
  
  
  export { openPopup, closePopup, escHandler };