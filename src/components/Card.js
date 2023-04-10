export class Card {
    constructor({ name, link }, cardSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element__item-grid')
            .cloneNode(true);

        return cardElement;
    }

    _likeCard(evt) {
        evt.target.classList.toggle('element__like-active');
    }

    _deleteCard() {
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__title-grid').textContent = this._name;
        const imageAltSrc = this._element.querySelector('.element__image-grid');
        imageAltSrc.src = this._link;
        imageAltSrc.alt = this._name;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__image-grid').addEventListener('click', () => {
            this._handleCardClick(this._element);
        });

        this._element.querySelector('.element__like-buttone').addEventListener('click', (evt) => {
            this._likeCard(evt);
        });

        this._element.querySelector('.element__delete-buttone').addEventListener('click', () => {
            this._deleteCard();
        });

    }

}

