//---------------------------------------------------------------------------------------------------------------//

// Функция  показа текста ошибки
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  configuration
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(configuration.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configuration.errorClass);
};

//---------------------------------------------------------------------------------------------------------------//
// Функция  скрытия текста ошибки
const hideInputError = (formElement, inputElement, configuration) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(configuration.inputErrorClass);
  errorElement.classList.remove(configuration.errorClass);
  errorElement.textContent = "";
};
//---------------------------------------------------------------------------------------------------------------//

const checkInputValidity = (formElement, inputElement, configuration) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      configuration
    );
  } else {
    hideInputError(formElement, inputElement, configuration);
  }
};
//---------------------------------------------------------------------------------------------------------------//

const setEventListeners = (formElement, configuration) => {
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  const inputList = Array.from(
    formElement.querySelectorAll(configuration.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configuration.submitButtonSelector
  );
  toggleButtonState(
    inputList,
    buttonElement,
    configuration.inactiveButtonClass
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, configuration);
      toggleButtonState(
        inputList,
        buttonElement,
        configuration.inactiveButtonClass
      );
    });
  });
};

//---------------------------------------------------------------------------------------------------------------//

const enableValidation = (configuration) => {
  const formList = Array.from(
    document.querySelectorAll(configuration.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, configuration);
  });
};
//---------------------------------------------------------------------------------------------------------------//
// кнопки визибл / инвизибл
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const invisibleButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
};
const visibleButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
};
// выбор кнопки с Газом/ без газа
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    invisibleButton(buttonElement, inactiveButtonClass);
  } else {
    visibleButton(buttonElement, inactiveButtonClass);
  }
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__fill",
  submitButtonSelector: ".popup__sumbit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__fill_error",
  errorClass: "popup__fill-error_active",
});
//---------------------------------------------------------------------------------------------------------------//
// Функция добавления кнопке :disabled если поля не соответствуют

//----
