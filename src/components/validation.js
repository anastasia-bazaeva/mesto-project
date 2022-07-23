// const enableValidationConfig = {
//   formSelector: '.popup__container',
//   inputSelector: '.popup__item',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_state_inactive',
//   inputErrorClass: 'popup__item_state_invalid',
//   errorSpanClass: '.popup__item-error',
//   customMessages: {
//     urlMismatch: 'Введите адрес сайта',
//     missedInput: 'Вы пропустили это поле',
//   },
// }; 


class FormValidator {
  constructor (config, formElement){
    this.formElement = formElement;

    this.formSelector = config.formSelector;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
    this.customMessages = config.customMessages;
    this.errorSpanClass = config.errorSpanClass;

    this.inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    this.submitButton = this.formElement.querySelector(this.submitButtonSelector);
  }
  _pickValidityMessage (inputElement) {
        if (((inputElement.type !== 'url')&&(!inputElement.validity.valueMissing))||(inputElement.validity.valid)) {
          return;
        } else if (inputElement.validity.valueMissing) {
          inputElement.setCustomValidity(this.customMessages.missedInput);
        } else {
          inputElement.setCustomValidity(this.customMessages.urlMismatch);
        }
  }
  _showError (errorElement, inputElement) {
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  _hideError (errorElement, inputElement) {
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  _checkInputValidity (inputElement) {
    inputElement.setCustomValidity('');
    const isInputValid = inputElement.validity.valid;
    const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
    this._pickValidityMessage (inputElement);
    if(!isInputValid) {
      this._showError(errorElement, inputElement);
    } else {
      this._hideError(errorElement, inputElement);
    }
  }

  _toggleButton (button, isActive = false) {
    if(isActive) {
      button.classList.remove(this.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this.inactiveButtonClass);
      button.disabled = 'disabled';
    }
  }

  _setEventListener () {    
    this.inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButton(this.submitButton, this.formElement.checkValidity());
      })
    });
    this.formElement.addEventListener('submit',(evt)=> {
        evt.preventDefault();
        this._toggleButton(this.submitButton, false);
      });
  }
  // _removeErrorSpan() {
  //   const errorSpan = Array.from(this.formElement.querySelectorAll(this.errorSpanClass));
  //   errorSpan.forEach(span => {
  //     span.textContent = '';
  //   });
  // }

 enableValidation() {
    this._setEventListener();
  }

}

const removeErrorSpan = (popup) => {
    const errorSpan = Array.from(popup.querySelectorAll('.popup__item-error'));
    errorSpan.forEach(span => {
      span.textContent = '';
    });
  }

// const pickValidityMessage = (inputElement, config) => {
//     if (((inputElement.type !== 'url')&&(!inputElement.validity.valueMissing))||(inputElement.validity.valid)) {
//       return;
//     } else if (inputElement.validity.valueMissing) {
//       inputElement.setCustomValidity(config.customMessages.missedInput);
//     } else {
//       inputElement.setCustomValidity(config.customMessages.urlMismatch);
//     }
//   }
  
//   //сделаем функции добавления и удаления сообщений об ошибках
//   const showError = (errorElement, inputElement, config) => {
//     inputElement.classList.add(config.inputErrorClass);
//     errorElement.textContent = inputElement.validationMessage;
//   }
  
//   const hideError = (errorElement, inputElement, config) => {
//     inputElement.classList.remove(config.inputErrorClass);
//     errorElement.textContent = inputElement.validationMessage;
//   }
  
//   //сделаем функцию проверки валидности полей формы
//   const checkInputValidity = (inputElement, formElement, config) => {
//     inputElement.setCustomValidity('');
//     const isInputValid = inputElement.validity.valid;
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     pickValidityMessage (inputElement, config);
//     if(!isInputValid) {
//       showError(errorElement, inputElement, config);
//     } else {
//       hideError(errorElement, inputElement, config);
//     }
//   }
  
//   const toggleButton = (button, isActive = false, config) => {
//     if(isActive) {
//       button.classList.remove(config.inactiveButtonClass);
//       button.disabled = false;
//     } else {
//       button.classList.add(config.inactiveButtonClass);
//       button.disabled = 'disabled';
//     }
//   }
  
//   //сделаем слушатель на каждую форму и вызовем там проверку полей
//   const setEventListener = (formElement, config) => {
//     const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//     const submitButton = formElement.querySelector(config.submitButtonSelector);
    
//     inputList.forEach((input) => {
//       input.addEventListener('input', () => {
//         checkInputValidity(input, formElement, config);
//         toggleButton(submitButton, formElement.checkValidity(), config);
//       })
//     });
//     formElement.addEventListener('submit',(evt)=> {
//         evt.preventDefault();
//         toggleButton(submitButton, false, config);
//       });
//   }
  
  
//   //Проверка отправки форм
//   const enableValidation = (config) => {
//     const forms = Array.from(document.querySelectorAll(config.formSelector));
//     forms.forEach(form => {
//       setEventListener(form, config);
//       })
//   }
  
// export { removeErrorSpan, pickValidityMessage, showError, hideError, checkInputValidity, toggleButton, setEventListener, enableValidation};   
export { FormValidator, removeErrorSpan }