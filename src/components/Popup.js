export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._element = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handlePopupClose(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            this.close();
        }
    }

    setEventListeners() {
        this._element.addEventListener('click', (evt) => this._handlePopupClose(evt));

    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._element.classList.add('popup_opened');
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._element.classList.remove('popup_opened');
    }
}
