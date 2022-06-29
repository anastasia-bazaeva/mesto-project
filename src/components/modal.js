import { initialCardsInRigthOrder,  mestoContainer, popupZoom, zoomPic, 
    zoomName, popupEdit, popupAdd, editForm, profileName, profileDescription, updateName, updateDescription,
    addForm,  addPopup, page, anyPopup, editAvatar, enableValidationConfig } from './utils.js';
    
function openPopup (popup) {
    popup.classList.add('popup_opened');
  }
   
function closePopup (popup) {
    popup.classList.remove('popup_opened');
  }

function editProfile() {
    profileName.textContent = updateName.value;
    profileDescription.textContent = updateDescription.value;
    closePopup(popupEdit);
    page.removeEventListener ('keydown', escHandler);
  }  

function escHandler(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
      }
  }

export { openPopup, closePopup, editProfile, escHandler };