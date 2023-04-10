import { Popup } from './Popup.js';


export class PopupWithForm extends Popup {
    constructor(popupSelector, sumbitForm) {
        super(popupSelector);
        this._sumbitForm = sumbitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputElements = this._popup.querySelectorAll('.popup__fill');
    }
    _getInputValues() {
        
        const inputElement = {};
        for (let i = 0; i < this._inputElements.length; i++) {
            const item = this._inputElements.item(i);
            inputElement[item.name] = item.value;
        }

        return inputElement
    }
    setEventListeners() {
        this._data = this._getInputValues;
        this._form.addEventListener('submit', (evt) => { this._sumbitForm(evt, this._data()) });
        super.setEventListeners();
    }
    closePopup() {
        this._form.reset();
        super.closePopup();
        
    }
}