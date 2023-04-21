//переменная массивакарточек
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__title");
const profileActivity = profile.querySelector(".profile__subtitle");
const editBtn = profile.querySelector(".profile__button-edit");
const addBtn = profile.querySelector(".profile__button-add");
const editAvatar = profile.querySelector(".profile__avatar-pen");
const profileAvatar = editAvatar.querySelector(".profile__avatar");
const formValidators = {};

const validateConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__fill",
    submitButtonSelector: ".popup__sumbit",
    inputErrorClass: "popup__fill_error",
    errorClass: "popup__fill-error_active",
    inactiveButtonClass: "popup__submit_disabled",
};

export {
    validateConfig,
    addBtn,
    editBtn,
    formValidators,
    profileName,
    profileActivity,
    editAvatar,
    profileAvatar,
}



/* import zebraFish from "../image/1.jpg";
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
*/
