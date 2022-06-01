const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
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

//код создания новой карточки

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
        })
    popupZoom.querySelector('.popup__button_status_zoom-close').addEventListener('click', () => {
          closePopup(popupZoom);
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
//вызов создания новой карточки для рендера исходных картинок

initialCardsInRigthOrder.forEach ((data) => {
  createCard(data);
});

// функции для открытия и закрытия попапов

function openPopup (form) {
  form.classList.add('popup_opened');
}

function closePopup (form) {
  form.classList.remove('popup_opened');
}

//код для открытия и закрытия попапа редактирования профиля

const popupEdit = document.querySelector('.popup_form_edit-profile');

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  openPopup (popupEdit);
});

popupEdit.querySelector('.popup__button_status_close').addEventListener('click', () => {
  closePopup (popupEdit);
});

// код для открытия и закрытия попапа добавления Места

const popupAdd = document.querySelector('.popup_form_new-place');

document.querySelector('.profile__add-button').addEventListener('click', () => {
  openPopup (popupAdd);
})

popupAdd.querySelector('.popup__button_status_close').addEventListener('click', () => {
  closePopup (popupAdd);
})


// Код для редактирования профиля

const editForm = document.querySelector('.popup_profile-edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const updateName = document.querySelector('#name');
const updateDescription = document.querySelector('#description');

function editProfile() {
  profileName.textContent = updateName.value;
  profileDescription.textContent = updateDescription.value;
  closePopup(popupEdit);
}

editForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  editProfile();
});

//код для добавления новой картинки с Местом

const addForm = document.querySelector('.popup_place-add');
const addPopup = document.querySelector('.popup_form_new-place');

addForm.addEventListener('submit', function (evt) {
  evt.preventDefault (); 
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
  }
  
