const popup = document.querySelector('.popup');

const openPopup = () => {
  popup.classList.add('popup_opened');
}

const closePopup = () => {
  popup.classList.remove('popup_opened');
}

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  openPopup();
})

popup.querySelector('.popup__button_status_close').addEventListener('click', () => {
  closePopup();
})

