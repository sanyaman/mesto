//---------------------------------------------------------------------------------------------------------------//
export default class Card {
  constructor(data, cardElement, openPopupFullImage) {
    this._name = data.name;
    this._link = data.link;
    this._cardElement = cardElement;
    this._openPopupFullImage = openPopupFullImage
  }
  //вынес в отдельную функц
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardElement)
      .content
      .querySelector(".element__item-grid")
      .cloneNode(true);

    return cardElement
  }
  // лайк актив 
  _likeActive(targetButtone) {
    targetButtone.target.classList.toggle("element__like-active");
  }

  //генер карт 
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image-grid");
    this._elementLikeButtone = this._element.querySelector(".element__like-buttone");
    this._elementDeleteButtone = this._element.querySelector(".element__delete-buttone");
    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;
    this._element.querySelector(".element__title-grid").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
  // прослушка
  _setEventListeners() {
    this._elementLikeButtone.addEventListener("click", evt => this._likeActive(evt));
    this._elementDeleteButtone.addEventListener("click", () => this._element.remove());
    this._elementImage.addEventListener("click", () => {
    this._openPopupFullImage(this._name, this._link);
    });
  }
}
