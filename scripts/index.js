let popup = document.querySelector(".popup"); //переиенная модалки 
let popupOpen = document.querySelector(".profile__button-edit"); //переменная карандаша
let popupClose = document.querySelector(".popup__close"); // переменная  кнопки закрыть
let profileTitle = document.querySelector(".profile__title"); // переменная  профиля имя
let profileSubtitle = document.querySelector(".profile__subtitle"); // переменная   профиля описания
let formElement = document.querySelector(".popup__form"); // переменная формы
let nameInput = document.querySelector(".popup__fill_value_name"); // переменная выбор имя поля
let jobInput = document.querySelector(".popup__fill_value_description"); //переменная  выбор имя поля

const initialCardsList = document.querySelector(".element__grid"); // переменная ul
const initialCardsTemplate = document.querySelector("#grid-template").content; // переменная template
const popupFormAdd = document.querySelector(".popup__form-add");  //переменная форма попап добавления картинок
const nameImputAdd = document.querySelector(".popup__fill_value_title"); //переменная  поле текста 
const linkImputAdd = document.querySelector(".popup__fill_value_image"); //переменная поле ссылки картинки 
const popupAdd = document.querySelector(".popup__add"); //переменные окна add
const popupOpenAdd = document.querySelector(".profile__button-add"); //переменная  +
const popupCloseAdd = document.querySelector(".popup__close-add"); //переменная  х
//---------------------------------------------------------------------------------------------------------------//

//функция открытия попап edit
function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
//функция закрытия попап edit
function closePopup() {
  popup.classList.remove("popup_opened");
  formElement.reset();
}
//функция редактирования формы edit
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

// вызов окна  открытие , закрытие , сохранение edit
popupOpen.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleFormSubmit);

//---------------------------------------------------------------------------------------------------------------//


//функция открытия popup add
function openPopupAdd() {
  popupAdd.classList.add("popup_opened");
}
//функция закрытия.крестик popup add
function closePopupAdd() {
  popupAdd.classList.remove("popup_opened");
  formElement.reset();
}
// Вставляет узлы перед первым дочерним элементом узла
function addCard(initialCardsElement) {
  initialCardsList.prepend(initialCardsElement);
}
// функция добавления карточек в разметку 
function handleCardFormSubmitAdd(evt) {
  evt.preventDefault();
  const fieldInput = addCardTemplate(nameImputAdd.value, linkImputAdd.value); // выбор полей попапОкнаКартинок по Бэм (пс. но можно и по нэйм:) )
  addCard(fieldInput); // вызов функции добавления карточек в начало массива с элементами массива
  evt.target.reset();
  closePopupAdd(); 
}

// вызов окна открытие , закрытие , добавление add
popupOpenAdd.addEventListener("click", openPopupAdd);
popupCloseAdd.addEventListener("click", closePopupAdd);
popupFormAdd.addEventListener("submit", handleCardFormSubmitAdd);



//---------------------------------------------------------------------------------------------------------------//

//открытие полномаштабной картинки 
const  popupFull = document.querySelector(".popup__full");
const  popupModal = document.querySelector(".popup__modal-img");
const  popupText = document.querySelector(".popup__text-img");
const  popupContainerImg = document.querySelector(".popup__container-img");
const  popupCloseImg = document.querySelector(".popup__close-img");

//функция открытия popup img
function popupOpenImg () {
  popupFull.classList.add("popup_opened")

}
//функция закрытия.крестик popup img
function closePopupImg () {
  popupFull.classList.remove("popup_opened")

}
// функция связывающая массив,тимплейт и полей попап имг
function popupFullImage(elementLink ,elementName) {
  popupModal.src = elementLink;
  popupText.textContent = elementName; 
  popupModal.alt = elementName ; 
  popupOpenImg (popupFull);
  
}
//initialCardsList.addEventListener("click", popupOpenImg);
popupCloseImg.addEventListener("click", closePopupImg);

//---------------------------------------------------------------------------------------------------------------//

//Для картинок
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
// переборка массива методом  цикла forEach
initialCards.forEach((element) => {
  const initialCardsElement = addCardTemplate(element.name, element.link); // обьявляю переменную массива  которая равна  функции тимплейт с учеетом элементов массива
  addCard(initialCardsElement); // вызов функции добавления карточки в которую перемещается функция  тимплейт с cloneNode
});

//функция отображения карточек тимплейт 
function addCardTemplate(elementName, elementLink) {
  const initialCardsElement = initialCardsTemplate.cloneNode(true); // клонирование разметки
  const elementTitleTmplt = initialCardsElement.querySelector(".element__title-grid"); // переменная разметки тимплейт  Н2
  const elementImageTmplt = initialCardsElement.querySelector(".element__image-grid"); // переменная тимплейт img
  elementTitleTmplt.textContent = elementName;  //.textContent = element.name; // добавление в разметку текст
  elementImageTmplt.alt = elementName;  //.alt = element.link; // добавление в alt текста с Титла
  elementImageTmplt.src = elementLink; //.src = element.link; // добавление в разметку картинку


  initialCardsElement
    .querySelector(".element__like-buttone")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("element__like-active");
    }); //  лайк Актив

  initialCardsElement
    .querySelector(".element__delete-buttone")
    .addEventListener("click", function (event) {
      event.target.closest(".element__item-grid").remove();
    }); //удаление карточек

  elementImageTmplt.addEventListener("click", () => {
      popupFullImage( elementImageTmplt.src,  elementTitleTmplt.textContent);
    }); //вызов на клик - полномаштабная картинка 

  return initialCardsElement; //завершает выполнение текущей функции и возвращает её значение
  
};

//---------------------------------------------------------------------------------------------------------------//















/*
const popupAddTitle = document.querySelector(".popup__fill_value_title");
const popupAddImage = document.querySelector(".popup__fill_value_image");
const popupFormAdd = document.querySelector(".popup__form-add");


function handleFormSubmit(evt) {
evt.preventDefault();
popupAddTitle.textContent = element.name;
popupAddImage.textContent = element.link;
closePopup();
}

formElement.addEventListener("submit", handleFormSubmit);





const gridContainer = document.querySelector(".element__grid"); //ul
const gridCardsTemplate = document.querySelector("#grid-template").content; //template
const nameImputAdd= document.querySelector(".popup__fill_value_title");  // поле текст
const imageImputAdd= document.querySelector(".popup__fill_value_image"); //  поле урл


function createCard () {
  const initialCardsElements = gridCardsTemplate.cloneNode(true); // клонирование разметки
  initialCardsElements.querySelector(".element__title-grid").textContent = element.name; // добавление в разметку 
  initialCardsElements.querySelector(".element__image-grid").src = element.link; // добавление в разметку 
  initialCardsElements.querySelector(".element__like-buttone").addEventListener("click", function (event) {
  event.target.classList.toggle("element__like-active");
    }); // функция лайк Актив
    gridContainer.append(initialCardsElements) //подтверждение
  };


  initialCards.forEach((element) => {
    const initialCardsElements = createCard(element.name , element.link );
    addCard(initialCardsElements);
    });
    

/*




//добавление массива в html 
const initialCardsList = document.querySelector(".element__grid"); //ul
const initialCardsTemplate = document.querySelector("#grid-template").content; //template
const deleteButtone= document.querySelector(".element__delete-buttone");

initialCards.forEach(function (element) {
  const initialCardsElement = initialCardsTemplate.cloneNode(true); // клонирование разметки
  initialCardsElement.querySelector(".element__title-grid").textContent = element.name; // добавление в разметку 
  initialCardsElement.querySelector(".element__image-grid").src = element.link; // добавление в разметку 
  initialCardsElement.querySelector(".element__like-buttone").addEventListener("click", function (event) {
    event.target.classList.toggle("element__like-active");
    }); // функция лайк Актив
  initialCardsList.append(initialCardsElement) //подтверждение
  
//удаление карточек
  templateCardClone.querySelector('.cards-grid__delete').addEventListener('click', function (evt) {
    evt.target.closest('.cards-grid__item').remove();
  });
  });

*/

/*// клонируем содержимое тега template
const userElement = gridTemplate.querySelector(".element__item-grid").cloneNode(true);
// наполняем содержимым
userElement.querySelector('.element__image-grid').src = element.link;
userElement.querySelector('.element__title-grid').textContent =  element.name;
// отображаем на странице
elementGrid.append(userElement);
*/
/*
const elementGrid = document.querySelector(".element__grid"); // ul class="element__grid"
const itemGrid = document.querySelector(".element__item-grid"); // template li class="element__item-grid"

const gardArray = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  };
});
function render() {
  gardArray.forEach(renderCard);
}

function renderCard(nameValue , linkValue) {
  const gridTemplate = document.querySelector('#grid-template').content;
  const itemElement = gridTemplate.querySelector('.element__item-grid').cloneNode(true);
  itemElement.querySelector('.element__title-grid').textContent=nameValue;
  itemElement.querySelector('.element__image-grid').textContent=linkValue;
  
}
render();
console.log(itemElement); */

// функция добавления новой картинки (не работает попап с ней)
/*

function initialCards(nameValue , linkValue) {
const gridTemplate = document.querySelector('#grid-template').content;
const itemElement = gridTemplate.querySelector('.element__item-grid').cloneNode(true);
itemElement.querySelector('.element__title-grid').textContent=nameValue;
itemElement.querySelector('.element__image-grid').textContent=linkValue;
gridElement.append(itemElement);
} */

//like function

/*

templateGrid.addEventListener('click', function(event) {
  if (event.target.classList.contains('element__like-buttone')){
    event.target.classList.toggle('element__like-active')
    }
});


*/

//const itemGrig = document.querySelector(".element__item-grid"); // template li class="element__item-grid"
//const ImageGrid = document.querySelector(".element__image-grid"); // template
//const deleteButtone = document.querySelector(".element__delete-buttone"); // template
//const infoGrid = document.querySelector(".element__info-grid"); // template
//const titleGrid = document.querySelector(".element__title-grid"); // template
