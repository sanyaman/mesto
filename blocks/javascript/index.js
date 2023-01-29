let popup = document.querySelector(".popup"); // переиенная модалки 
let profilebuttonedit = document.querySelector(".profile__button-edit"); //переменная карандаша 
let popupclose = document.querySelector(".popup__close"); // переменная  кнопки закрыть
let popupsumbit = document.querySelector(".popup__sumbit"); //переменная кнопки сохранить
let popupfill = document.querySelector(".popup__fill"); //переменная полей формы из нее взять  name  
let profiletitle = document.querySelector(".profile__title"); // переменная  профиля имя 
let profilesubtitle = document.querySelector(".profile__subtitle"); // переменная   профиля описания

// функция клика на карандаш и вызова модального окна 
profilebuttonedit.addEventListener("click", function () {
popup.classList.add("popup__active");
nameInput.value = profiletitle.textContent;
jobInput.value = profilesubtitle.textContent;
});
// функция клика на крестик и закрытие модального окна 
popupclose.addEventListener("click", function () {
popup.classList.remove("popup__active");
document.querySelector(".popup__form").reset();
});


let formElement = document.querySelector(".popup__form"); // переменная формы 
let nameInput = formElement.elements.name;   // выбор имя поля
let jobInput = formElement.elements.description; //  выбор имя поля


//функция редактирования
function handleFormSubmit(evt) {
evt.preventDefault();
profiletitle.textContent = nameInput.value;
profilesubtitle.textContent = jobInput.value;
popup.classList.remove("popup__active");
}
//яндекс бонус
formElement.addEventListener("submit", handleFormSubmit);
