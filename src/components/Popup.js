import { page } from './utils.js';

export class Popup {
  constructor (popup) {
    this._popup = popup;
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.setEscHandler = this._setEscHandler.bind(this);
    this.setCloseEventListeners = this.setCloseEventListeners.bind(this);
  }
  openPopup () {
    this._popup.classList.add('popup_opened');
  }
   
  closePopup () {
    this._popup.classList.remove('popup_opened');
    page.removeEventListener ('keydown', (evt) => this.setEscHandler(evt));
  }
  _setEscHandler (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
      }
  }
  setCloseEventListeners () {
    page.addEventListener ('keydown', (evt) => this._setEscHandler(evt));
    this._popup.addEventListener('mousedown', (evt) => {
        if ((evt.target.classList.contains('popup_opened'))||(evt.target.classList.contains('popup__button_status_close'))) {
          this.closePopup()
        }
    })
  }
  check() {
    console.log(this._popup)
  }
}