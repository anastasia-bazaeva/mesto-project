import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor (popup, submitCallback) {
        super(popup);
        this._form = popup.querySelector('#form');
        this._onSubmit = submitCallback;
        this._inputList = this._form.querySelectorAll('.popup__item');
        this._popupButton = this._form.querySelector('.popup__button_status_save');
        this._inputValues = [];
    }

    openPopup() {
        super.openPopup();
        this.setEventListeners();
    }

    closePopup() {
        super.closePopup();
    }

    _getInputValues() {
        this._inputList.forEach((inputElement, index) => {
            this._inputValues[index] = inputElement.value
          });
        return this._inputValues;
    }

    setEventListeners() {
        super.setCloseEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this.renderLoading(true, '');
            this._onSubmit(this._getInputValues())
          });
    }

    renderLoading (state, text) {
        if (state) {
        this._popupButton.textContent = "Сохранение..."
        } else {
        this._popupButton.textContent = text;
        }
      }
      
    check() {
       console.log(this._popupButton)
    }
}