//---------------------------------------------------------------------------------------------------------------//
//подключение экспорта
import Card from "./Card.js";
import Validate from "./FormValidator.js";
//---------------------------------------------------------------------------------------------------------------//
//переменные profile + popup edit
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const profileButtoneEdit = profile.querySelector(".profile__button-edit");
const profileButtoneAdd = profile.querySelector(".profile__button-add");
const popupFormEdit = document.querySelector(".popup__form-edit");
const popupEdit = document.querySelector(".popup_edit");
const jobInputEdit = popupEdit.querySelector(".popup__fill_value_description");
const nameInputEdit = popupEdit.querySelector(".popup__fill_value_name");
//---------------------------------------------------------------------------------------------------------------//
//переменные element  + popup add
const popupAdd = document.querySelector(".popup_add");
const popupFormAdd = document.querySelector(".popup__form-add");
const nameInputAdd = popupAdd.querySelector(".popup__fill_value_title");
const linkInputAdd = popupAdd.querySelector(".popup__fill_value_image");
//---------------------------------------------------------------------------------------------------------------//
//переменные element  + popup Full image
const popupFull = document.querySelector(".popup_full");
const popupModalImg = popupFull.querySelector(".popup__modal-img");
const popupTextImg = popupFull.querySelector(".popup__text-img");
//---------------------------------------------------------------------------------------------------------------//
// прочие переменные
const popupAll = document.querySelectorAll(".popup");
const elementGrid = document.querySelector(".element__grid");
//---------------------------------------------------------------------------------------------------------------//
//переменная массивакарточек
const initialCards = [
  {
    name: "Жёлтая Зебрасома",
    link: "https://sanyaman.github.io/mesto/image/1.jpg",
  },
  {
    name: "Рыба ангел",
    link: "https://sanyaman.github.io/mesto/image/4.jpg",
  },
  {
    name: "Бабочка Пинцет",
    link: "https://sanyaman.github.io/mesto/image/3.jpg",
  },
  {
    name: "Губан лавандовый",
    link: "https://sanyaman.github.io/mesto/image/7.jpg",
  },
  {
    name: "Бабочка Масковая",
    link: "https://sanyaman.github.io/mesto/image/2.jpg",
  },
  {
    name: "Мандаринка Глянцевая",
    link: "https://sanyaman.github.io/mesto/image/8.jpg",
  },
];
//---------------------------------------------------------------------------------------------------------------//
//переменная конфига  валидации
const validateConfiguration = {
  formSelector: ".popup__form",
  inputSelector: ".popup__fill",
  submitButtonSelector: ".popup__sumbit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__fill_error",
  errorClass: "popup__fill-error_active",
};
//---------------------------------------------------------------------------------------------------------------//
// функция очистки полей валидации
const cleanValidationFields = (fill) => {
  fill
    .querySelectorAll(".popup__fill_error")
    .forEach((fill) => fill.classList.remove("popup__fill_error"));
  fill
    .querySelectorAll(".popup__fill-error_active")
    .forEach((fill) => fill.classList.remove("popup__fill-error_active"));
};
//---------------------------------------------------------------------------------------------------------------//
// попапы
function activePopup(popupAll) {
  const list = Array.from(popupAll);
  return list.find((popupAll) => {
    if (popupAll.classList.contains("popup_opened")) {
      return popupAll;
    }
  });
}
// закрыть попап
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(activePopup(popupAll));
  }
}
// открыть попап
function openPopup(targetPopup) {
  targetPopup.classList.add("popup_opened");
  document.addEventListener("keyup", closePopupEsc);
}
// закрыть попап по эскп
function closePopup(targetPopup) {
  if (targetPopup !== undefined) {
    targetPopup.classList.remove("popup_opened");
    document.removeEventListener("keyup", closePopupEsc);
  }
}
// тут уже надоело коменты писать
function handlePopupClose(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(activePopup(popupAll));
  }
}
//---------------------------------------------------------------------------------------------------------------//
function openPopupFullImage(cardName, cardLink) {
  popupModalImg.src = cardLink;
  popupModalImg.alt = cardName;
  popupTextImg.textContent = cardName;
  openPopup(popupFull);
}
//---------------------------------------------------------------------------------------------------------------//
function editProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInputEdit.value;
  profileSubtitle.textContent = jobInputEdit.value;
  closePopup(popupEdit);
}
//---------------------------------------------------------------------------------------------------------------//
function enableValidation(forms, classConfiguration) {
  forms.forEach((form) => {
    const validateForm = new Validate(classConfiguration, form);
    validateForm.enableValidation();
  });
}
//---------------------------------------------------------------------------------------------------------------//
function addCard(evt) {
  evt.preventDefault();
  const card = new Card(
    { name: nameInputAdd.value, link: linkInputAdd.value },
    "#grid-template",
    openPopupFullImage
  );
  const newCard = card.createCard();
  elementGrid.prepend(newCard);
  evt.target.reset();
  closePopup(popupAdd);
}

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#grid-template", openPopupFullImage);
  const cardElement = card.createCard();
  elementGrid.append(cardElement);
});
//---------------------------------------------------------------------------------------------------------------//
popupAll.forEach((popupAll) => {
  popupAll.addEventListener("click", handlePopupClose);
});
//---------------------------------------------------------------------------------------------------------------//
profileButtoneAdd.addEventListener("click", () => {
  cleanValidationFields(popupFormAdd);
  openPopup(popupAdd);
  popupFormAdd.reset();
});
//---------------------------------------------------------------------------------------------------------------//
profileButtoneEdit.addEventListener("click", () => {
  cleanValidationFields(popupFormEdit);
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
  openPopup(popupEdit);
});
//---------------------------------------------------------------------------------------------------------------//
popupFormEdit.addEventListener("submit", editProfile);
popupFormAdd.addEventListener("submit", addCard);
//---------------------------------------------------------------------------------------------------------------//
enableValidation([popupFormAdd, popupFormEdit], validateConfiguration);
//---------------------------------------------------------------------------------------------------------------//
