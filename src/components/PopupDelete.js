import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor({ popupSelector, handleformSubmit }) {
    super(popupSelector);
    this._handleformSubmit = handleformSubmit;
  }

  open(targetElement, id) {
    super.open();
    this._cardId = id;
    this._targetCard = targetElement;
  }

  setEventListeners() {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleformSubmit(this._targetCard, this._cardId);
    });
    super.setEventListeners();
  }
}
