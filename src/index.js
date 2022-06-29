import './pages/index.css';

// Импортируем данные
import { initialCardsInRigthOrder, popupZoom,
   popupEdit, popupAdd, editForm, profileName, profileDescription, updateName, updateDescription,
    addForm,  page, anyPopup, enableValidationConfig } from './components/utils.js';
  
  // Импортируем валидацию
  import { removeErrorSpan, enableValidation} from './components/validation.js';  
  
  //Импортируем создание карточек
  import { createCard, addMesto } from './components/card.js';

 // функции для открытия и закрытия попапов
  import { openPopup, closePopup, editProfile, escHandler } from './components/modal.js';
  
  //запускаем валидацию
  enableValidation(enableValidationConfig);

//вызов функции создания новой карточки для рендера исходных картинок
  initialCardsInRigthOrder.forEach ((data) => {
    createCard(data);
  });
  
 //Слушатель на открытый зум-попап
  popupZoom.querySelector('.popup__button_status_zoom-close').addEventListener('click', () => {
    closePopup(popupZoom);
    page.removeEventListener ('keydown', escHandler);
  })

  //слушатель для открытия и закрытия попапа редактирования профиля
  
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
  
  // слушатель для открытия и закрытия попапа добавления Места
  
  document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopup (popupAdd);
    page.addEventListener ('keydown', escHandler);
  })
  
  popupAdd.querySelector('.popup__button_status_close').addEventListener('click', () => {
    closePopup (popupAdd);
    page.removeEventListener ('keydown', escHandler);
  })
  
  
  // слушатель для редактирования профиля
  
  editForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    editProfile();
  });
  
  // слушатель для добавления новой картинки с Местом
  addForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addMesto ();
  });

   
  //слушатель для каждого попапа для закрытия по клику на оверлей
  
    anyPopup.forEach(popup => { 
      popup.addEventListener ('click', evt => {
        const openedPopup = document.querySelector('.popup_opened');
        if ((openedPopup)&&(evt.target.classList.contains('popup'))){ 
          closePopup(evt.target.closest('.popup_opened'));
        }
        });
    })
  
  // слушатель  для закрытия попапа редактирования аватара
  // document.querySelector('.profile__avatar-button').addEventListener('click', () => {
  //   openPopup (editAvatar);
  //   page.addEventListener ('keydown', escHandler);
  // });
  // editAvatar.querySelector('.popup__button_status_close').addEventListener('click', () => {
  //     closePopup (editAvatar);
  //     page.removeEventListener ('keydown', escHandler);
  //   });