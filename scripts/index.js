
//---------------------------------------------------------------------------------------------------------------//

//Template
const initialCardsList = document.querySelector(".element__grid"); // переменная ul
const initialCardsTemplate = document.querySelector("#grid-template").content; // переменная template

//---------------------------------------------------------------------------------------------------------------//

const popupAll = document.querySelectorAll(".popup"); //выбираю все попапы для оверлей

//---------------------------------------------------------------------------------------------------------------//

//переменные profile + popup edit
const popupOpenEdit = document.querySelector(".popup_edit"); // переиенная модалки edit
const popupCloseEdit = document.querySelector(".popup__close-edit"); //переиенная модалки  Close buttone
const popupFormEdit = document.querySelector(".popup__form-edit"); // переменная формы edit
const nameInputEdit = document.querySelector(".popup__fill_value_name"); // переменная выбор имя поля
const jobInputEdit = document.querySelector(".popup__fill_value_description"); //переменная  выбор имя поля
const profileButtoneEdit = document.querySelector(".profile__button-edit"); //переменная карандаша
const profileTitle = document.querySelector(".profile__title"); // переменная  профиля имя
const profileSubtitle = document.querySelector(".profile__subtitle"); // переменная   профиля описания

//---------------------------------------------------------------------------------------------------------------//

//переменные element  + popup add
const popupAdd = document.querySelector(".popup_add"); //переменные окна add
const popupCloseAdd = document.querySelector(".popup__close-add"); //переменная  х
const popupFormAdd = document.querySelector(".popup__form-add"); //переменная форма попап добавления картинок
const nameInputAdd = document.querySelector(".popup__fill_value_title"); //переменная  поле текста
const linkInputAdd = document.querySelector(".popup__fill_value_image"); //переменная поле ссылки картинки
const profileButtoneAdd = document.querySelector(".profile__button-add"); //переменная  +

//---------------------------------------------------------------------------------------------------------------//

//переменные element  + popup Full image
const popupFull = document.querySelector(".popup_full");
const popupModalImg = document.querySelector(".popup__modal-img");
const popupTextImg = document.querySelector(".popup__text-img");
const popupContainerImg = document.querySelector(".popup__container-img");
const popupCloseImg = document.querySelector(".popup__close-img");

//---------------------------------------------------------------------------------------------------------------//
const disabledButtonAdd = document.querySelector(".popup__sumbit-add");
//---------------------------------------------------------------------------------------------------------------//
//функция отображения карточек тимплейт
function createCard(elementName, elementLink) {
  const cardElement = initialCardsTemplate
    .querySelector(".element__item-grid")
    .cloneNode(true); // клонирование разметки
  const elementTitleTmplt = cardElement.querySelector(
    ".element__title-grid"
  ); // переменная разметки тимплейт  Н2
  const elementImageTmplt = cardElement.querySelector(
    ".element__image-grid"
  ); // переменная тимплейт img
  elementTitleTmplt.textContent = elementName; //.textContent = element.name; // добавление в разметку текст
  elementImageTmplt.alt = elementName; //.alt = element.link; // добавление в alt текста с Титла
  elementImageTmplt.src = elementLink; //.src = element.link; // добавление в разметку картинку

  cardElement
    .querySelector(".element__like-buttone")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like-active");
    }); //  лайк Актив

  cardElement
    .querySelector(".element__delete-buttone")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element__item-grid").remove();
    }); //удаление карточек

  elementImageTmplt.addEventListener("click", () => {
    openPopupFullImage(elementImageTmplt.src, elementTitleTmplt.textContent);
  }); //вызов на клик - полномаштабная картинка

  return cardElement; //завершает выполнение текущей функции и возвращает её значение
};

// переборка массива методом  цикла forEach
initialCards.forEach((element) => {
  const cardElement = createCard(element.name, element.link); // обьявляю переменную массива  которая равна  функции тимплейт с учеетом элементов массива
  addCard(cardElement); // вызов функции добавления карточки в которую перемещается функция  тимплейт с cloneNode
});

//---------------------------------------------------------------------------------------------------------------//

//функция редактирования формы edit
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInputEdit.value;
  profileSubtitle.textContent = jobInputEdit.value;
  closePopup(popupOpenEdit);
};

//---------------------------------------------------------------------------------------------------------------//

// Вставляет узлы перед первым дочерним элементом узла add
function addCard(cardElement) {
  initialCardsList.prepend(cardElement);
};
// функция добавления карточек в разметку  add
function handleCardFormSubmitAdd(evt) {
  evt.preventDefault();
  const card = createCard(nameInputAdd.value, linkInputAdd.value); // выбор полей попапОкнаКартинок по Бэм )
  addCard(card); // вызов функции добавления карточек в начало массива с элементами массива
  closePopup(popupAdd);
};

//---------------------------------------------------------------------------------------------------------------//

// функция открфтия полномаштабной картинки
function openPopupFullImage(elementLink, elementName) {
  popupModalImg.src = elementLink;
  popupTextImg.textContent = elementName;
  popupModalImg.alt = elementName;
  openPopup(popupFull);
};

//---------------------------------------------------------------------------------------------------------------//

//единые функции всех popap
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", closePopupEsc);
};

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", closePopupEsc);
};
//функция закрытия по ESC
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};
//функция закрытия по Овер
function closePopupArea(evt, popup) {
  if (evt === popup) {
    closePopup(popup);
  }
};

//---------------------------------------------------------------------------------------------------------------//

// вызов  сохранение edit
popupFormEdit.addEventListener("submit", handleFormSubmitEdit);
// вызов окна открытие , закрытие , добавление add
popupFormAdd.addEventListener("submit", handleCardFormSubmitAdd);

//---------------------------------------------------------------------------------------------------------------//

//функция открытия попап edit
profileButtoneEdit.addEventListener("click", () => {
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
  openPopup(popupOpenEdit);
});

//функция открытия popup add
profileButtoneAdd.addEventListener("click", () => {
  openPopup(popupAdd);
  popupFormAdd.reset();
  disabledButtonAdd.disabled = true;
});

//---------------------------------------------------------------------------------------------------------------//

//слушатель закрытия попап edit
popupCloseEdit.addEventListener("click", () => {
  closePopup(popupOpenEdit);
});

//слушатель закрытия.крестик popup add
popupCloseAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

//слушатель закрытия.крестик popup img
popupCloseImg.addEventListener("click", () => {
  closePopup(popupFull);
});
//слушатель закрытия по овер
popupAll.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    closePopupArea(evt.target, popup);
  });
});

//---------------------------------------------------------------------------------------------------------------//
