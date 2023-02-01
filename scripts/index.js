let popup = document.querySelector(".popup"); // переиенная модалки
let popupOpen = document.querySelector(".profile__button-edit"); //переменная карандаша
let popupClose = document.querySelector(".popup__close"); // переменная  кнопки закрыть
let profileTitle = document.querySelector(".profile__title"); // переменная  профиля имя
let profileSubtitle = document.querySelector(".profile__subtitle"); // переменная   профиля описания
let formElement = document.querySelector(".popup__form"); // переменная формы
// let nameInput = formElement.elements.name; // переменная выбор имя поля (тоже правильно!!!)
// let jobInput = formElement.elements.description; //переменная  выбор имя поля (тоже правильно!!!)
let nameInput = document.querySelector(".popup__fill_value_name");
let jobInput = document.querySelector(".popup__fill_value_description");
//функция открытия попап
function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
//функция закрытия попап
function closePopup() {
  popup.classList.remove("popup_opened");
  formElement.reset();
}
//функция редактирования формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}
// открытие , закрытие , сохранение
popupOpen.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleFormSubmit);
