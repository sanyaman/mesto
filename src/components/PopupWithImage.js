import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._element.querySelector('.popup__modal-img');
        this._subtitleElement = this._element.querySelector('.popup__text-img');
    }

    open(data) {
        this._imageElement.src = data.image;
        this._imageElement.alt = data.description;
        this._subtitleElement.textContent = data.description;
        super.open();
    }

}
