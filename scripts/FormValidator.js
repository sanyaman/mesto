//---------------------------------------------------------------------------------------------------------------//
export default class FormValidator {
  constructor(classConfiguration, validateElement) {
    this._configuration = classConfiguration;
    this._element = validateElement;
    this.inputLists = Array.from(
      this._element.querySelectorAll(this._configuration.inputSelector)
    );
    this.buttonElement = this._element.querySelector(
      this._configuration.submitButtonSelector
    );
  }
  //---------------------------------------------------------------------------------------------------------------//
  //показать спан
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._configuration.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._configuration.errorClass);
  }
  //---------------------------------------------------------------------------------------------------------------//
  //скрыть спан
  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._configuration.inputErrorClass);
    errorElement.classList.remove(this._configuration.errorClass);
    errorElement.textContent = "";
  }
  //---------------------------------------------------------------------------------------------------------------//
  // Служба безопасности Сбербанка
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  //---------------------------------------------------------------------------------------------------------------//
  // проверка  Службы безопасности Сбербанка -  доступ отказан
  _hasInvalidInput() {
    return this.inputLists.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // меня не видно
  _disableButton = () => {
    this.buttonElement.classList.add(this._configuration.inactiveButtonClass);
    this.buttonElement.disabled = true;
  };
  // меня видно
  _activateButton = () => {
    this.buttonElement.classList.remove(
      this._configuration.inactiveButtonClass
    );
    this.buttonElement.disabled = false;
  };

  // выбор кнопки с Газом/ без Газа
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._activateButton();
    }
  };
  //---------------------------------------------------------------------------------------------------------------//
  // прошлушка Яндекс Алиса
  _setEventListeners() {
    this._toggleButtonState();
    this.inputLists.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  resetValidation() {
    this._toggleButtonState();
    this.inputLists.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  enableValidation() {
    this._setEventListeners();
  }
}
//---------------------------------------------------------------------------------------------------------------//
