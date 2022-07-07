import { popupEdit, profileName, profileDescription, updateName, updateDescription,
     page, updateAvatarPic, editAvatar, profileAvatar } from './utils.js';
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
  editProfileInfo({name: updateName.value, about: updateDescription.value})
    .then(() => {
      getProfile()
        .then((data) => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
  })
    })
    closePopup(popupEdit);
  }  

  function editProfileAvatar() {
    editProfilePic({avatar: updateAvatarPic.value})
      .then(() => {
        getProfile()
          .then((data) => {
            profileAvatar.src = data.avatar;
    })
      })
      closePopup(editAvatar);
    }  

function escHandler(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
      }
  }

export { openPopup, closePopup, editProfile, editProfileAvatar, escHandler };