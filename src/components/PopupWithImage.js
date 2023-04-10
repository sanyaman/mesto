import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopupCard = this._popup.querySelector('.popup__modal-img');
        this._titlePopupCard = this._popup.querySelector('.popup__text-img');
    }
    openPopup(cardElement) {
        
        const cardImage = cardElement.querySelector('.element__image-grid');
        const cardTitle = cardElement.querySelector('.element__title-grid');

        this._imagePopupCard.src = cardImage.src;
        this._imagePopupCard.alt = cardTitle.textContent;
        this._titlePopupCard.textContent = cardTitle.textContent;
        super.openPopup();
    };
}