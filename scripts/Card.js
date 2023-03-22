//---------------------------------------------------------------------------------------------------------------//
//класс+конструктор карточек
export default class Card {
  constructor(data, templateSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._element = document.querySelector(templateSelector).content;
    this._openPopupFullImage = openPopup;
  }
  //---------------------------------------------------------------------------------------------------------------//
  //выбор иконки Лайк
  _likeButtone(targetButtone) {
    targetButtone.target.classList.toggle("element__like-active");
  }
  //---------------------------------------------------------------------------------------------------------------//
  //выбор иконки яндекс
  _deleteButtone(targetButtone) {
    const cardElement = targetButtone.target.closest(".element__item-grid");
    cardElement.remove();
  }
  //---------------------------------------------------------------------------------------------------------------//
  //функция отображения карточек тимплейт
  createCard() {
    const cardElement = this._element
      .querySelector(".element__item-grid")
      .cloneNode(true);
    const image = cardElement.querySelector(".element__image-grid");
    image.src = this._link;
    cardElement.querySelector(".element__title-grid").textContent = this._name;
    cardElement
      .querySelector(".element__delete-buttone")
      .addEventListener("click", (evt) => this._deleteButtone(evt));
    cardElement
      .querySelector(".element__like-buttone")
      .addEventListener("click", (evt) => this._likeButtone(evt));
    image.addEventListener("click", () =>
      this._openPopupFullImage(this._name, this._link)
    );
    return cardElement;
  }
}
//---------------------------------------------------------------------------------------------------------------//
