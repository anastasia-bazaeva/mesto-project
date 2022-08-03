import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popup, image, name) {
      super(popup);
      this._popupImage = image;
      this._popupText = name;
    }
  
    open(link, place) {
      super.openPopup();
      this._popupImage.src = link;
      this._popupText.textContent = place;
    }
}