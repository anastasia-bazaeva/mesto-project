const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];
  
  // массив разворачивается для отображения согласно макету

const initialCardsInRigthOrder = initialCards.reverse();

const mestoContainer = document.querySelector('.elements');
const popupZoom = document.querySelector('.popup_zoom-picture');
const zoomPic = document.querySelector('.popup__zoom-pic');
const zoomName = document.querySelector('.popup__zoom-title');
const popupEdit = document.querySelector('.popup_form_edit-profile');
const popupAdd = document.querySelector('.popup_form_new-place');
const editForm = document.querySelector('.popup_profile-edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const updateName = document.querySelector('#name');
const updateDescription = document.querySelector('#description');
const addForm = document.querySelector('.popup_place-add');
const addPopup = document.querySelector('.popup_form_new-place');
const page = document.querySelector('.page');
const anyPopup = Array.from(document.querySelectorAll('.popup'));
const editAvatar = document.querySelector('.popup_edit_avatar');


//функция создания новой карточки

function createCard (data) { 
    const mestoCards = document.querySelector('#new-mesto').content;
    const mestoElement = mestoCards.querySelector('.mesto').cloneNode(true);

    mestoElement.querySelector('.mesto__title').textContent = data.name;
    mestoElement.querySelector('.mesto__image').src = data.link;
    mestoElement.querySelector('.mesto__image').alt = data.name;
    mestoContainer.prepend(mestoElement);
    //включение и закрытие попапа с увеличенной картинкой

    mestoElement.querySelector('.mesto__image').addEventListener('click', () => {
          openPopup(popupZoom);
          zoomPic.src = data.link;
          zoomName.textContent = data.name;
          zoomPic.alt = data.name;
          page.addEventListener ('keydown', escHandler);
        })
    popupZoom.querySelector('.popup__button_status_zoom-close').addEventListener('click', () => {
          closePopup(popupZoom);
          page.removeEventListener ('keydown', escHandler);
        })
    //удаление карточки

    const mestoDelete = () => mestoElement.classList.add('mesto_hidden');
    mestoElement.querySelector('.mesto__delete').addEventListener('click', () => {
              mestoDelete();
            })
    //установка и снятие лайков

    mestoElement.querySelector('.mesto__button').addEventListener('click', function (evt) {
          evt.target.classList.toggle('mesto__button_active');
          });
  };

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


function addMesto() {
    const placeName = document.querySelector('.popup__item_el_place-name');
    const placeUrl = document.querySelector('.popup__item_el_place-url');
    const data = {
      link: placeUrl.value,
      name: placeName.value
      };
      createCard(data);
    placeUrl.value = '';
    placeName.value = ''; 
    closePopup (addPopup);
    page.removeEventListener ('keydown', escHandler);
  }
  
  // колбек для закрытия попапов по esc
  function escHandler(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if ((evt.key === 'Escape')&&(openedPopup)) {
      closePopup(openedPopup);
      }
  }
 
//слушатель для каждого попапа для закрытия по клику на оверлей

  anyPopup.forEach(popup => { //попробовать переделать и все закрытия попапов по кнопке также
    popup.addEventListener ('click', evt => {
      const openedPopup = document.querySelector('.popup_opened');
      if ((openedPopup)&&(evt.target.classList.contains('popup'))){ 
        closePopup(evt.target.closest('.popup_opened'));
      }
      });
  })

//обработчик для страницы по нажатию на ecs !прописан в открытии попапов и удаляется при закрытии
  //page.addEventListener ('keydown', escHandler);

// код для закрытия попапа редактирования аватара
document.querySelector('.profile_avatar-button').addEventListener('click', () => {
  openPopup (editAvatar);
  page.addEventListener ('keydown', escHandler);
});
editAvatar.querySelector('.popup__button_status_close').addEventListener('click', () => {
    closePopup (editAvatar);
    page.removeEventListener ('keydown', escHandler);
  });

  const enableValidationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_state_inactive',
    inputErrorClass: 'popup__item_state_invalid',
    customMessages: {
      urlMismatch: 'Введите адрес сайта',
      missedInput: 'Вы пропустили это поле',
    },
  }; 

const pickValidityMessage = (inputElement, config) => {
  if (((inputElement.type !== 'url')&&(!inputElement.validity.valueMissing))||(inputElement.validity.valid)) {
    return;
  } else if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity(config.customMessages.missedInput);
  } else {
    inputElement.setCustomValidity(config.customMessages.urlMismatch);
  }
}

//сделаем функции добавления и удаления сообщений об ошибках
const showError = (errorElement, inputElement, config) => {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

const hideError = (errorElement, inputElement, config) => {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

//сделаем функцию проверки валидности полей формы
const checkInputValidity = (inputElement, formElement, config) => {
  inputElement.setCustomValidity('');
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  pickValidityMessage (inputElement, config);
  if(!isInputValid) {
    showError(errorElement, inputElement, config);
  } else {
    hideError(errorElement, inputElement, config);
  }
}

const toggleButton = (button, isActive = false, config) => {
  if(isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = '';
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = 'disabled';
  }
}

//сделаем слушатель на каждую форму и вызовем там проверку полей
const setEventListener = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  formElement.addEventListener('submit',(evt)=> {
    evt.preventDefault();
  });
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, formElement, config);
      toggleButton(submitButton, formElement.checkValidity(), config);
    })
  });
}



//Проверка отправки форм
const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(form => {
    setEventListener(form, config);
    })
}


enableValidation(enableValidationConfig);