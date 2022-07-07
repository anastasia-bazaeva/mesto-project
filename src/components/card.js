import { mestoContainer, popupZoom, zoomPic, zoomName, addPopup, placeName, placeUrl, profileName,
  profileDescription, profileAvatar } from './utils.js';

import { openPopup, closePopup } from './modal.js';

import { addCardToServer, removeCardFromServer, getAllCards, addLike, removeLike } from './api.js';

import { profileID } from '../index.js';

function countLikes (mestoElement, card) {
  const likesCounter = mestoElement.querySelector('.mesto__likes');
  likesCounter.textContent = card.likes.length;
}

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
    countLikes(mestoElement, data);

    //включение и закрытие попапа с увеличенной картинкой
    mestoImage.addEventListener('click', () => {
          openPopup(popupZoom);
          zoomPic.src = data.link;
          zoomName.textContent = data.name;
          zoomPic.alt = data.name;
        })

    //удаление карточки
    mestoDelete(data, mestoElement);

    //установка и снятие лайков
    like (mestoElement, data);
    // mestoElement.querySelector('.mesto__button').addEventListener('click', function (evt) {
    //       evt.target.classList.toggle('mesto__button_active');
    //       });

  return mestoElement;
  };

//функция установки и снятия лайка
function like (mestoElement, data) {
  mestoElement.querySelector('.mesto__button').addEventListener('click', function (evt) {
    console.log(data.likes);
    if (!(data.likes._id.some(profileID))) {
      const likeInfo = {likes: profileID};
      console.log(likeInfo);
      evt.target.classList.add('mesto__button_active');
      addLike(data._id, likeInfo)
      .then(res => countLikes(mestoElement, res))
      .catch(err => console.log(`Не получается поставить лайк: ${err}`))
    } else {
      evt.target.classList.remove('mesto__button_active');
      removeLike(data._id)
      .then(res => countLikes(mestoElement, res))
      .catch(err => console.log(`Не получается снять лайк: ${err}`))
    }
    });
}


//функция удаления карточки
function mestoDelete (data, mestoElement) {
  const deleteButton = mestoElement.querySelector('.mesto__delete')
  if (!(data.owner._id === profileID)) {
    return deleteButton.remove();
  } else {
    mestoElement.querySelector('.mesto__delete').addEventListener('click', () => {
      const removeData = `"_id": "${data._id}"`
      removeCardFromServer (data._id, removeData)
      .then(() => mestoElement.remove())
      .catch(err => console.log(`При удалении карточки что-то пошло не так: ${err}`))
    })
  }
}

//Функция для создания новой карточки по кноке
function addMesto() {
    const data = {
      link: placeUrl.value,
      name: placeName.value,
      };
    addCardToServer(data)
    .then(() => {
        return getAllCards ()
        .then((serverCards) => {
          serverCards.forEach ((data) => {
            renderCard (mestoContainer, createCard(data));
          })
        })
      .catch(err => console.log(`С добавлением карточки что-то не так: ${err}`))
    })
      placeUrl.value = '';
      placeName.value = ''; 
      closePopup (addPopup); 
  }

  export { createCard, addMesto, renderCard, countLikes, mestoDelete };