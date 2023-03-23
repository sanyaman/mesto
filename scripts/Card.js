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
  _toggleLike(targetButtone) {
    targetButtone.target.classList.toggle("element__like-active");
  }
  //---------------------------------------------------------------------------------------------------------------//
  //выбор иконки яндекс
  _deleteCard(targetButtone) {
    const cardElement = targetButtone.target.closest(".element__item-grid");
    cardElement.remove();
  }
  //---------------------------------------------------------------------------------------------------------------//
  //слушатель карт
  _setEventListeners(cardElement, imageElement) {
    cardElement
      .querySelector(".element__delete-buttone")
      .addEventListener("click", (evt) => this._deleteCard(evt));
    cardElement
      .querySelector(".element__like-buttone")
      .addEventListener("click", (evt) => this._toggleLike(evt));
    imageElement.addEventListener("click", () =>
      this._openPopupFullImage(this._name, this._link)
    );
  }
  //функция отображения карточек тимплейт
  cgenerateCard() {
    const cardElement = this._element
      .querySelector(".element__item-grid")
      .cloneNode(true);
    const imageElement = cardElement.querySelector(".element__image-grid");
    const name = cardElement.querySelector(".element__title-grid");
    imageElement.alt = this._name;
    imageElement.src = this._link;
    name.textContent = this._name;
    this._setEventListeners(cardElement, imageElement);
    return cardElement;
  } 
}
//---------------------------------------------------------------------------------------------------------------//
