import { mestoContainer, popupZoom, zoomPic, zoomName, addPopup, placeName, placeUrl } from './utils.js';

import { openPopup, closePopup } from './modal.js';

function renderCard (container, card) {
  container.prepend(card);
}

function createCard (data) { 
    const mestoCards = document.querySelector('#new-mesto').content;
    const mestoElement = mestoCards.querySelector('.mesto').cloneNode(true);
    const mestoImage = mestoElement.querySelector('.mesto__image');

    mestoElement.querySelector('.mesto__title').textContent = data.name;
    mestoImage.src = data.link;
    mestoImage.alt = data.name;
    renderCard (mestoContainer, mestoElement);

    //включение и закрытие попапа с увеличенной картинкой

    mestoImage.addEventListener('click', () => {
          openPopup(popupZoom);
          zoomPic.src = data.link;
          zoomName.textContent = data.name;
          zoomPic.alt = data.name;
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
    const data = {
      link: placeUrl.value,
      name: placeName.value
      };
      createCard(data);
    placeUrl.value = '';
    placeName.value = ''; 
    closePopup (addPopup);
  }

  export { createCard, addMesto };