export default class FormValidator {
    constructor(classConfiguration, validateElement) {
        this._configuration = classConfiguration;
        this._element = validateElement;
        this.inputList = Array.from(this._element.querySelectorAll(this._configuration.inputSelector));
        this.buttonElement = this._element.querySelector(this._configuration.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._configuration.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._configuration.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._configuration.inputErrorClass);
        errorElement.classList.remove(this._configuration.errorClass);
        errorElement.textContent = '';
    }
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    _hasInvalidInput() {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.buttonElement.classList.add(this._configuration.inactiveButtonClass);
            this.buttonElement.disabled = true;
        } else {
            this.buttonElement.classList.remove(this._configuration.inactiveButtonClass);
            this.buttonElement.disabled = false;
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    clearInputErrors() {
        this._toggleButtonState();
        this.inputList.forEach((input) => {
            this._hideInputError(input);
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}

