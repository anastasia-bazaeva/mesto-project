import { initialCardsInRigthOrder,  mestoContainer, popupZoom, zoomPic, 
    zoomName, popupEdit, popupAdd, editForm, profileName, profileDescription, updateName, updateDescription,
    addForm,  addPopup, page, anyPopup, editAvatar, enableValidationConfig } from './data.js';
    
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
    const openedPopup = document.querySelector('.popup_opened');
    if ((evt.key === 'Escape')&&(openedPopup)) {
      closePopup(openedPopup);
      }
  }

export { openPopup, closePopup, editProfile, escHandler };