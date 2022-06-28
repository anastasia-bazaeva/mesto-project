import { initialCardsInRigthOrder,  mestoContainer, popupZoom, zoomPic, 
    zoomName, popupEdit, popupAdd, editForm, profileName, profileDescription, updateName, updateDescription,
    addForm,  addPopup, page, anyPopup, editAvatar, enableValidationConfig } from './data.js';

import { openPopup, closePopup, escHandler } from './index.js';

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

//Функция для создания новой карточки по кноке

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

  export { createCard, addMesto };