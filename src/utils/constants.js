//переменная массивакарточек
import zebraFish from "../image/1.jpg";
import angelFish from "../image/2.jpg";
import butterflyFish from "../image/3.jpg";
import butterflymaskFish from "../image/4.jpg";
import wrasseFish from "../image/7.jpg";
import mandarinFish from "../image/8.jpg";

export const initialCards = [
    {
        name: "Жёлтая Зебрасома",
        link: zebraFish
    },
    {
        name: "Рыба ангел",
        link: angelFish
    },
    {
        name: "Бабочка Пинцет",
        link: butterflyFish
    },
    {
        name: "Губан лавандовый",
        link: wrasseFish
    },
    {
        name: "Бабочка Масковая",
        link: butterflymaskFish
    },
    {
        name: "Мандаринка Глянцевая",
        link: mandarinFish
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

