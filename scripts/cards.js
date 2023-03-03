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

  
  enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__fill",
  submitButtonSelector: ".popup__sumbit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__fill_error",
  errorClass: "popup__fill-error_active"
});