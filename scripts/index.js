//---------------------------------------------------------------------------------------------------------------//

//Массив картинок
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

//Template
const initialCardsList = document.querySelector(".element__grid"); // переменная ul
const initialCardsTemplate = document.querySelector("#grid-template").content; // переменная template

//---------------------------------------------------------------------------------------------------------------//

const popupAll = document.querySelectorAll(".popup"); //выбираю все попапы для оверлей

//---------------------------------------------------------------------------------------------------------------//

//переменные profile + popup edit
const popupOpenEdit = document.querySelector(".popup_edit"); // переиенная модалки edit
const popupCloseEdit = document.querySelector(".popup__close-edit");//переиенная модалки  Close buttone
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
const popupFormAdd = document.querySelector(".popup__form-add");  //переменная форма попап добавления картинок
const nameInputAdd = document.querySelector(".popup__fill_value_title"); //переменная  поле текста 
const linkInputAdd = document.querySelector(".popup__fill_value_image"); //переменная поле ссылки картинки 
const profileButtoneAdd = document.querySelector(".profile__button-add"); //переменная  +

//---------------------------------------------------------------------------------------------------------------//

//переменные element  + popup Full image
const  popupFull = document.querySelector(".popup_full"); 
const  popupModalImg = document.querySelector(".popup__modal-img");
const  popupTextImg = document.querySelector(".popup__text-img");
const  popupContainerImg = document.querySelector(".popup__container-img");
const  popupCloseImg = document.querySelector(".popup__close-img");

//---------------------------------------------------------------------------------------------------------------//
const resetFillSpan = document.querySelectorAll(".popup__fill-input-error");
const resetFillInput = document.querySelectorAll(".popup__fill");
//const submitEdit = document.querySelectorAll(".popup__sumbit-edit");

//---------------------------------------------------------------------------------------------------------------//
//функция отображения карточек тимплейт 
function addCardTemplate(elementName, elementLink) {
  const initialCardsElement = initialCardsTemplate.querySelector(".element__item-grid").cloneNode(true); // клонирование разметки
  const elementTitleTmplt = initialCardsElement.querySelector(".element__title-grid"); // переменная разметки тимплейт  Н2
  const elementImageTmplt = initialCardsElement.querySelector(".element__image-grid"); // переменная тимплейт img
  elementTitleTmplt.textContent = elementName;  //.textContent = element.name; // добавление в разметку текст
  elementImageTmplt.alt = elementName;  //.alt = element.link; // добавление в alt текста с Титла
  elementImageTmplt.src = elementLink; //.src = element.link; // добавление в разметку картинку

  initialCardsElement
    .querySelector(".element__like-buttone")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like-active");
    }); //  лайк Актив

  initialCardsElement
    .querySelector(".element__delete-buttone")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element__item-grid").remove();
    }); //удаление карточек

  elementImageTmplt.addEventListener("click", () => {
      popupFullImage( elementImageTmplt.src,  elementTitleTmplt.textContent);
    }); //вызов на клик - полномаштабная картинка 

  return initialCardsElement; //завершает выполнение текущей функции и возвращает её значение
  
};

// переборка массива методом  цикла forEach
initialCards.forEach((element) => {
  const initialCardsElement = addCardTemplate(element.name, element.link); // обьявляю переменную массива  которая равна  функции тимплейт с учеетом элементов массива
  addCard(initialCardsElement); // вызов функции добавления карточки в которую перемещается функция  тимплейт с cloneNode
});


//---------------------------------------------------------------------------------------------------------------//

//функция редактирования формы edit
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInputEdit.value;
  profileSubtitle.textContent = jobInputEdit.value;
  closePopup(popupOpenEdit);
}

//---------------------------------------------------------------------------------------------------------------//

// Вставляет узлы перед первым дочерним элементом узла add
function addCard(initialCardsElement) {
  initialCardsList.prepend(initialCardsElement);
}
// функция добавления карточек в разметку  add
function handleCardFormSubmitAdd(evt) {
  evt.preventDefault();
  const cardInputsAdd = addCardTemplate(nameInputAdd.value, linkInputAdd.value); // выбор полей попапОкнаКартинок по Бэм )
  addCard(cardInputsAdd); // вызов функции добавления карточек в начало массива с элементами массива
  closePopup(popupAdd); 
}

//---------------------------------------------------------------------------------------------------------------//

// функция открфтия полномаштабной картинки
function popupFullImage(elementLink ,elementName) {
  popupModalImg.src = elementLink;
  popupTextImg.textContent = elementName; 
  popupModalImg.alt = elementName ; 
  openPopup(popupFull);
  
}

//---------------------------------------------------------------------------------------------------------------//

//единые функции всех popap 
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keyup', closePopupEsc);
  
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keyup', closePopupEsc);
}
//функция закрытия по ESC
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(".popup_opened"));
  }
}
//функция закрытия по Овер
function closePopupArea(evt, popup) {
  if (evt == popup) {
    closePopup(popup);
  }
}

//функция сброса полей ошибки при открытии модалок
function clearErrorPopup() {
  for (let i = 0; i < resetFillSpan.length; i++) {
    resetFillSpan[i].textContent = "";
    resetFillSpan[i].classList.remove("popup__fill-input-error_active");
    resetFillInput[i].classList.remove("popup__fill_error");
  }
  
}
//---------------------------------------------------------------------------------------------------------------//

// вызов  сохранение edit
popupFormEdit.addEventListener("submit", handleFormSubmit);
// вызов окна открытие , закрытие , добавление add
popupFormAdd.addEventListener("submit", handleCardFormSubmitAdd);

//---------------------------------------------------------------------------------------------------------------//

//функция открытия попап edit
profileButtoneEdit.addEventListener("click", () => {
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
  clearErrorPopup(); //вообщем знаний не хватило как реализовать правильно  сброс модалки профиля , 
  // сабмит становится неактивным ,
  openPopup(popupOpenEdit);

});

//функция открытия popup add
profileButtoneAdd.addEventListener("click", () => {
  openPopup(popupAdd);
  clearErrorPopup();
  popupFormAdd.reset();

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



