import { popupEdit, profileName, profileDescription, updateName, updateDescription,
     page, updateAvatarPic, editAvatar, profileAvatar, editForm } from './utils.js';
// import { getProfile, editProfileInfo, editProfilePic } from './api.js';
import { apiConfig, Api } from './api.js'; 
    
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
  apiConfig.editProfileInfo({name: updateName.value, about: updateDescription.value})
    .then(() => {
      apiConfig.getProfile()
        .then((data) => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        closePopup(popupEdit);
  })
    })
    .catch(err => console.log(`При редактировании профиля что-то пошло не так: ${err}`))
    .finally(() => renderLoading(profileUpdateButton, false, 'Сохранить'))
  }  

  function editProfileAvatar() {
    const avatarButton = editAvatar.querySelector('.popup__button_status_save');
    apiConfig.editProfilePic({avatar: updateAvatarPic.value})
      .then(() => {
        apiConfig.getProfile()
          .then((data) => {
            profileAvatar.src = data.avatar;
          })
          .catch(err => console.log(`При получении обновленных данных профиля что-то пошло не так: ${err}`))
        closePopup(editAvatar);
        //переписать очистку поля, почему-то не работает
        // const avatarField = editAvatar.querySelector('.popup__item_form_avatar-add');
        // avatarField.textContent = '';
      })
      .catch(err => console.log(`При редактировании аватара профиля что-то пошло не так: ${err}`))
      .finally(() => renderLoading(avatarButton, false, 'Сохранить'));
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