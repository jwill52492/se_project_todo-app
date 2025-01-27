class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formSelector = settings.formSelector;
    this._formEl = formEl;
    this.settings = settings;
  }


  _showInputError = (formEl, inputElement, errorMessage) => {
    const errorMessageElement = formEl.querySelector(`#${inputElement.id}-error`);
    errorMessageElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError = (formEl, inputElement) => {
    const errorMessageElement = formEl.querySelector(`#${inputElement.id}-error`);
    errorMessageElement.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.classList.remove(this._errorClass)
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        this._formEl,
        inputElement,
        inputElement.validationMessage,
      );
    } else {
      this._hideInputError(this._formEl, inputElement);
    }
  }


  _disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector),
    );
    this._submitButton = this._formEl.querySelector(
      this.settings.submitButtonSelector,
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._formEl.reset();
    this._disableSubmitButton();
  }


  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      this.resetValidation();
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;