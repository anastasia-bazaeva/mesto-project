import { page } from './utils.js';

export class Popup {
  constructor (popup) {
    this._popup = popup;
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.setEscHandler = this.setEscHandler.bind(this);
    this.setCloseEventListeners = this.setCloseEventListeners.bind(this);
  }
  openPopup () {
    this._popup.classList.add('popup_opened');
  }
   
  closePopup () {
    this._popup.classList.remove('popup_opened');
    page.removeEventListener ('keydown', (evt) => this.setEscHandler(evt));
  }
  setEscHandler (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
      }
  }
  setCloseEventListeners () {
    page.addEventListener ('keydown', (evt) => this.setEscHandler(evt));
    this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.closePopup()
        }
        if (evt.target.classList.contains('popup__button_status_close')) {
          this.closePopup()
        }
    })
  }
  check() {
    console.log(this._popup)
  }
}
    
// function openPopup (popup) {
//     popup.classList.add('popup_opened');
//     page.addEventListener ('keydown', escHandler);
//   }
   
// function closePopup (popup) {
//     popup.classList.remove('popup_opened');
//     page.removeEventListener ('keydown', escHandler);
//   }

// function editProfile() {
//   const profileUpdateButton = editForm.querySelector('.popup__button_status_save');
//   apiConfig.editProfileInfo({name: updateName.value, about: updateDescription.value})
//     .then(() => {
//       apiConfig.getProfile()
//         .then((data) => {
//         profileName.textContent = data.name;
//         profileDescription.textContent = data.about;
//         closePopup(popupEdit);
//   })
//     })
//     .catch(err => console.log(`При редактировании профиля что-то пошло не так: ${err}`))
//     .finally(() => renderLoading(profileUpdateButton, false, 'Сохранить'))
//   }  

  // function editProfileAvatar() {
  //   const avatarButton = editAvatar.querySelector('.popup__button_status_save');
  //   apiConfig.editProfilePic({avatar: updateAvatarPic.value})
  //     .then(() => {
  //       apiConfig.getProfile()
  //         .then((data) => {
  //           profileAvatar.src = data.avatar;
  //         })
  //         .catch(err => console.log(`При получении обновленных данных профиля что-то пошло не так: ${err}`))
  //       closePopup(editAvatar);
  //       //переписать очистку поля, почему-то не работает
  //       // const avatarField = editAvatar.querySelector('.popup__item_form_avatar-add');
  //       // avatarField.textContent = '';
  //     })
  //     .catch(err => console.log(`При редактировании аватара профиля что-то пошло не так: ${err}`))
  //     .finally(() => renderLoading(avatarButton, false, 'Сохранить'));
  //   }  

// function escHandler(evt) {
//     if (evt.key === 'Escape') {
//       const openedPopup = document.querySelector('.popup_opened');
//       closePopup(openedPopup);
//       }
//   }
// function renderLoading (button, state, text) {
//   if (state) {
//     button.textContent = "Сохранение..."
//   } else {
//     button.textContent = text;
//   }
// }

// export { openPopup, closePopup, editProfile, editProfileAvatar, escHandler, renderLoading };