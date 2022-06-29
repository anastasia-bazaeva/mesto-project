import { popupEdit, profileName, profileDescription, updateName, updateDescription,
     page } from './utils.js';
    
function openPopup (popup) {
    popup.classList.add('popup_opened');
    page.addEventListener ('keydown', escHandler);
  }
   
function closePopup (popup) {
    popup.classList.remove('popup_opened');
    page.removeEventListener ('keydown', escHandler);
  }

function editProfile() {
    profileName.textContent = updateName.value;
    profileDescription.textContent = updateDescription.value;
    closePopup(popupEdit);
  }  

function escHandler(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
      }
  }

export { openPopup, closePopup, editProfile, escHandler };