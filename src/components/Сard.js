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
      .then((res) => {
        this._cardLikeCount.textContent = res.likes.length;
        if (isLiked) {
          this._unsetLikeActive()
        } else {
          this._setLikeActive()
        }
      }
      )
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
        this._updateLikeOnClick(true);
      } else {
        this._updateLikeOnClick(false);
      }
    });
  }

  _setDeleteListener() {
    this._deleteButton.addEventListener('click', () => {
      console.log(this._postId);
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

