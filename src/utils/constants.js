//переменная массивакарточек
export const initialCards = [
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

export const formEditProfile = document.querySelector(".popup__form-edit");
export const formAddCardValidator = document.querySelector(".profile__button-add");
export const formEditCards = document.querySelector(".popup__form-add");



export const formEditProfileValidator = document.querySelector(".profile__button-edit");
export const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__fill",
    submitButtonSelector: ".popup__sumbit",
    inputErrorClass: "popup__fill_error",
    errorActiveClass: "popup__fill-error_active",
    infoName: ".profile__title",
    infoJob: ".profile__subtitle",
    elements: ".element__grid",
    inactiveButtonClass: ".popup__submit_disabled"
};

