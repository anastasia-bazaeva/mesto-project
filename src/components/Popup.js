export class Popup {
  constructor (popup) {
    this._popup = popup;
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this._setEscHandler = this._setEscHandler.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }
  openPopup () {
    this._popup.classList.add('popup_opened');
    document.addEventListener ('keydown', this._setEscHandler);
  }
   
  closePopup () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener ('keydown', this._setEscHandler);
  }
  _setEscHandler (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
      }
  }
  setEventListeners () {
    this._popup.addEventListener('mousedown', (evt) => {
        if ((evt.target.classList.contains('popup_opened'))||(evt.target.classList.contains('popup__button_status_close'))) {
          this.closePopup()
        }
    })
  }
}