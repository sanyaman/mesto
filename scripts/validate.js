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
// Функция  проверки ввода
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
// Функция  события и переключение сабмита
const setEventListeners = (formElement, configuration) => {
  const inputList = Array.from(
    formElement.querySelectorAll(configuration.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configuration.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, configuration);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//---------------------------------------------------------------------------------------------------------------//
// Функция  включения валидации + перебор массива всех форм попап
const enableValidation = (configuration) => {
  const formList = Array.from(
    document.querySelectorAll(configuration.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      blockedButton(formElement, configuration);
      evt.preventDefault();
    });
    setEventListeners(formElement, configuration);
  });
};
//---------------------------------------------------------------------------------------------------------------//
// Функция  если ввод текста не соответствует
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
//---------------------------------------------------------------------------------------------------------------//
// Функция  переключения кнопки Сабмит
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.removeAttribute("disabled");
    
  }
  
};
//---------------------------------------------------------------------------------------------------------------//
// Функция добавления кнопке :disabled если поля не соответствуют
const blockedButton = (formElement, configuration) => {
  const buttonElement = formElement.querySelector(
    configuration.submitButtonSelector
  );
  buttonElement.classList.add(configuration.inactiveButtonClass);
  buttonElement.setAttribute("disabled");
};
//---------------------------------------------------------------------------------------------------------------//
//массив классов валидации
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__fill",
  submitButtonSelector: ".popup__sumbit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__fill_error",
  errorClass: "popup__fill-input-error_active",
});


//---------------------------------------------------------------------------------------------------------------//
//вызов функции валидации
//enableValidation();
//---------------------------------------------------------------------------------------------------------------//
