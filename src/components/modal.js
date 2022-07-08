import { popupEdit, profileName, profileDescription, updateName, updateDescription,
     page, updateAvatarPic, editAvatar, profileAvatar, editForm } from './utils.js';
import { getProfile, editProfileInfo, editProfilePic } from './api.js';
    
function openPopup (popup) {
    popup.classList.add('popup_opened');
    page.addEventListener ('keydown', escHandler);
  }
   
function closePopup (popup) {
    popup.classList.remove('popup_opened');
    page.removeEventListener ('keydown', escHandler);
  }

function editProfile() {
  const profileUpdateButton = editForm.querySelector('.popup__button_status_save');
  editProfileInfo({name: updateName.value, about: updateDescription.value})
    .then(() => {
      getProfile()
        .then((data) => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
  })
    })
    renderLoading(profileUpdateButton, false, 'Сохранить');
    closePopup(popupEdit);
  }  

  function editProfileAvatar() {
    const avatarButton = editAvatar.querySelector('.popup__button_status_save');
    editProfilePic({avatar: updateAvatarPic.value})
      .then(() => {
        getProfile()
          .then((data) => {
            profileAvatar.src = data.avatar;
    })
      })
      renderLoading(avatarButton, false, 'Сохранить');
      closePopup(editAvatar);
    }  

function escHandler(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
      }
  }
function renderLoading (button, state, text) {
  if (state) {
    button.textContent = "Сохранение..."
  } else {
    button.textContent = text;
  }
}

export { openPopup, closePopup, editProfile, editProfileAvatar, escHandler, renderLoading };