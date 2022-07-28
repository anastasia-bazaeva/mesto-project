export class Card {
  constructor({cardInfo, handleCardClick}, api, cardSelector, profileID) {
    this._place = cardInfo.name;
    this._imgLink = cardInfo.link;
    this._likes = cardInfo.likes;
    this._adminId = cardInfo.adminId;
    this._ownerId = cardInfo.owner._id;
    this._postId = cardInfo._id;
    this._openZoomPop = handleCardClick;
    this._api = api;
    this._template = cardSelector;
    this._adminId = profileID;
  }

  getCard() { 
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.mesto__image');
    this._cardImage.src = this._imgLink;
    this._cardImage.alt = this._place;
    this._cardElement.querySelector('.mesto__title').textContent = this._place;
    this._cardLike = this._cardElement.querySelector('.mesto__button');
    this._cardLikeCount = this._cardElement.querySelector('.mesto__likes');
    this._cardLikeCount.textContent = this._likes.length;
    this._deleteButton = this._cardElement.querySelector('.mesto__delete');

    this._setLikeStatus(this._isMyLike());
    this._checkDeletePossibility();
    this._setEventListeners();

    return this._cardElement;
  }

  _getTemplate() {
    return this._template.querySelector('.mesto').cloneNode(true);
  }

  _checkDeletePossibility() {
    if (this._ownerId !== this._adminId) {
      this._deleteButton.remove();
    }
  }

  _setLikeStatus(isMyLike) {
    isMyLike ? this._setLikeActive() : this._unsetLikeActive();
  }

  _isMyLike() {
    return Boolean(
      this._likes.find((likeObj) => likeObj._id === this._adminId)
    );
  }

  _setLikeActive() {
    this._cardLike.classList.add('mesto__button_active');
  }

  _unsetLikeActive() {
    this._cardLike.classList.remove('mesto__button_active');
  }

  _updateLikeOnClick(isLiked) {
    this._api
      .changeLikeButton(this._postId, isLiked)
      .then((res) => (this._cardLikeCount.textContent = res.likes.length))
      .catch((err) => console.log(err));
  }

  _setEventListeners() {
    this._setLikeListener();
    this._setDeleteListener();
    this._setZoomListener();
  }

  _setLikeListener() {
    this._cardLike.addEventListener('click', () => {
      if (this._cardLike.classList.contains('mesto__button_active')) {
        this._unsetLikeActive();
        this._updateLikeOnClick(true);
      } else {
        this._setLikeActive();
        this._updateLikeOnClick(false);
      }
    });
  }

  _setDeleteListener() {
    this._deleteButton.addEventListener('click', () => {
      this._api
        .removeCardFromServer(this._postId)
        .then((res) => {
          console.log(res);
          this._cardElement.remove();
        })
        .catch((err) => console.log(err));
    });
  }

  _setZoomListener() {
    this._cardImage.addEventListener('click', () => {
      this._openZoomPop(this._imgLink, this._place);
    })
  }
}

// function countLikes (mestoElement, likesArray) {
//   const likeButton = mestoElement.querySelector('.mesto__button');
//   const likesCounter = mestoElement.querySelector('.mesto__likes');
//   likesCounter.textContent = likesArray.length;
//   if (isLiked(likesArray)) {
//     likeButton.classList.add('mesto__button_active');
//   } else {
//     likeButton.classList.remove('mesto__button_active');
//   }
// }

// function isLiked(likesArray) {
//   return Boolean(likesArray.find((likeObj) => likeObj._id === profileID))
// }

// function likeStatusHandler (cardId, isLiked, mestoElement) {
//   apiConfig.changeLikeButton(cardId, isLiked)
//   .then((data) => countLikes(mestoElement, data.likes))
//   .catch(err => console.log(`При установке лайка произошла ошибка: ${err}`))
// }


// function renderCard (container, card) {
//   container.prepend(card);
// }

// function createCard (data) { 
//     const mestoElement = mestoCards.querySelector('.mesto').cloneNode(true);
//     const mestoImage = mestoElement.querySelector('.mesto__image');
//     const likeButton = mestoElement.querySelector('.mesto__button');

//     mestoElement.querySelector('.mesto__title').textContent = data.name;
//     mestoImage.src = data.link;
//     mestoImage.alt = data.name;
//     countLikes(mestoElement, data.likes);

//     //включение и закрытие попапа с увеличенной картинкой
//     mestoImage.addEventListener('click', () => {
//           openPopup(popupZoom);
//           zoomPic.src = data.link;
//           zoomName.textContent = data.name;
//           zoomPic.alt = data.name;
//         })

//     //установка и снятие лайков
//     likeButton.addEventListener('click', () => {
//       likeStatusHandler (data._id, likeButton.classList.contains('mesto__button_active'), mestoElement);
//           });
//     //удаление карточки
//     mestoDelete(data, mestoElement);

//   return mestoElement;
//   };


// //функция удаления карточки
// function mestoDelete (data, mestoElement) {
//   const deleteButton = mestoElement.querySelector('.mesto__delete')
//   if (!(data.owner._id === profileID)) {
//     return deleteButton.remove();
//   } else {
//     mestoElement.querySelector('.mesto__delete').addEventListener('click', () => {
//       const removeData = `"_id": "${data._id}"`
//       apiConfig.removeCardFromServer (data._id, removeData)
//       .then(() => mestoElement.remove())
//       .catch(err => console.log(`При удалении карточки что-то пошло не так: ${err}`))
//     })
//   }
// }

//Функция для создания новой карточки по кноке
// function addMesto() {
//   const addButton = addForm.querySelector('.popup__button_status_create');
//     const data = {
//       link: placeUrl.value,
//       name: placeName.value,
//       };
//     apiConfig.addCardToServer(data)
//     .then((data) => {
//       renderCard (mestoContainer, createCard(data));
//       closePopup (addPopup); 
//     })
//     .catch(err => console.log(`С добавлением карточки что-то не так: ${err}`))
//     .finally(() => renderLoading(addButton, false, 'Создать'))
//     placeUrl.value = '';
//     placeName.value = ''; 
//   }