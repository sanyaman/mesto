//---------------------------------------------------------------------------------------------------------------//
//подключение экспорта
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
//---------------------------------------------------------------------------------------------------------------//
//переменные profile + popup edit
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const profileButtoneEdit = profile.querySelector(".profile__button-edit");
const profileButtoneAdd = profile.querySelector(".profile__button-add");
const popupFormEdit = document.forms["editingform"];
const popupEdit = document.querySelector(".popup_edit");
const jobInputEdit = popupEdit.querySelector(".popup__fill_value_description");
const nameInputEdit = popupEdit.querySelector(".popup__fill_value_name");
//---------------------------------------------------------------------------------------------------------------//
//переменные element  + popup add
const popupAdd = document.querySelector(".popup_add");
const popupFormAdd = document.forms["addingform"];
const nameInputAdd = popupAdd.querySelector(".popup__fill_value_title");
const linkInputAdd = popupAdd.querySelector(".popup__fill_value_image");
//---------------------------------------------------------------------------------------------------------------//
//переменные element  + popup Full image
const popupFull = document.querySelector(".popup_full");
const popupModalImg = popupFull.querySelector(".popup__modal-img");
const popupTextImg = popupFull.querySelector(".popup__text-img");
//---------------------------------------------------------------------------------------------------------------//
// прочие переменные
const Allpopups = document.querySelectorAll(".popup");
const elementGrid = document.querySelector(".element__grid");

const formValidators = {};

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
/*const cleanValidationFields = (fill) => {
  fill
    .querySelectorAll(".popup__fill_error")
    .forEach((fill) => fill.classList.remove("popup__fill_error"));
  fill
    .querySelectorAll(".popup__fill-error_active")
    .forEach((fill) => fill.classList.remove("popup__fill-error_active"));
};*/
//---------------------------------------------------------------------------------------------------------------//
// попапы
function getOpenedPopup(popups) {
  const list = Array.from(popups);
  return list.find((popups) => {
    if (popups.classList.contains("popup_opened")) {
      return popups;
    }
  });
}
// закрыть попап
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(getOpenedPopup(Allpopups));
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
    closePopup(getOpenedPopup(Allpopups));
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
function includeValidation(classConfiguration) {
  const formLists = Array.from(
    document.querySelectorAll(classConfiguration.formSelector)
  );
  formLists.forEach((formElement) => {
    const validator = new FormValidator(classConfiguration, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
//---------------------------------------------------------------------------------------------------------------//

function appendCard(evt) {
  //disableButton(popupFormAdd);
  evt.preventDefault();
  elementGrid.prepend(
    createCard({ name: nameInputAdd.value, link: linkInputAdd.value })
  );
  evt.target.reset();
  closePopup(popupAdd);
}

function createCard(cardData) {
  const card = new Card(cardData, "#grid-template", openPopupFullImage);
  const cardElement = card.cgenerateCard();
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  elementGrid.append(cardElement);
});

//---------------------------------------------------------------------------------------------------------------//
Allpopups.forEach((popups) => {
  popups.addEventListener("click", handlePopupClose);
});
//---------------------------------------------------------------------------------------------------------------//
profileButtoneAdd.addEventListener("click", () => {
  // cleanValidationFields(popupFormAdd);
  popupFormAdd.reset();
  openPopup(popupAdd);
  //formValidators[popupFormEdit.getAttribute('addingform')].resetValidation()
  formValidators["addingform"].resetValidation();
});

//---------------------------------------------------------------------------------------------------------------//
profileButtoneEdit.addEventListener("click", () => {
  //cleanValidationFields(popupFormEdit);
  openPopup(popupEdit);
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
  //formValidators[popupFormAdd.getAttribute('editingform')].resetValidation()
  formValidators["editingform"].resetValidation();
});
//---------------------------------------------------------------------------------------------------------------//
popupFormEdit.addEventListener("submit", editProfile);
popupFormAdd.addEventListener("submit", appendCard);
//---------------------------------------------------------------------------------------------------------------//
includeValidation(validateConfiguration);
//---------------------------------------------------------------------------------------------------------------//
