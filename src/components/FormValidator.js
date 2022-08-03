export class FormValidator {
  constructor (config, formElement){
    this._formElement = formElement;

    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._customMessages = config.customMessages;
    this._errorSpanClass = config.errorSpanClass;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  }
  _pickValidityMessage (inputElement) {
        if (((inputElement.type !== 'url')&&(!inputElement.validity.valueMissing))||(inputElement.validity.valid)) {
          return;
        } else if (inputElement.validity.valueMissing) {
          inputElement.setCustomValidity(this._customMessages.missedInput);
        } else {
          inputElement.setCustomValidity(this._customMessages.urlMismatch);
        }
  }
  _showError (errorElement, inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  _hideError (errorElement, inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  _checkInputValidity (inputElement) {
    inputElement.setCustomValidity('');
    const isInputValid = inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._pickValidityMessage (inputElement);
    if(!isInputValid) {
      this._showError(errorElement, inputElement);
    } else {
      this._hideError(errorElement, inputElement);
    }
  }

  _toggleButton (isActive = false) {
    if(isActive) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = 'disabled';
    }
  }

  _setEventListener () {    
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButton(this._formElement.checkValidity());
      })
    });
    this._formElement.addEventListener('submit',(evt)=> {
        evt.preventDefault();
      });
    this._formElement.addEventListener('reset', () => {
      this._toggleButton(false); 
      this._inputList.forEach((inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        this._hideError(errorElement, inputElement)
        })
    });
  }

 enableValidation() {
    this._setEventListener();
  }

  resetValidation() {
    this._toggleButton(false); 
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      this._hideError(errorElement, inputElement);
    });
    const errorSpan = Array.from(this._formElement.querySelectorAll('.popup__item-error'));
    errorSpan.forEach(span => {
      span.textContent = '';
    });
  }

}