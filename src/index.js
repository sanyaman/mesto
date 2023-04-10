//подключение экспорта
import "./pages/index.css";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import {
  formEditProfileValidator,
  config,
  formEditProfile,
  formAddCardValidator,
  formEditCards,
  initialCards,
} from "./utils/constants.js";

const addSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      addSection.addItem(renderCard(item));
    },
  },
  config.elements
);


const editProfile = new FormValidator(config, formEditProfile);
const addCards = new FormValidator(config, formEditCards);
const popupEditProfile = new PopupWithForm(
  ".popup_edit",
  handleProfileFormSubmit
);
const popupAddCard = new PopupWithForm(
  ".popup_add",
  handleEditCardsSubmit
);
const popupImage = new PopupWithImage(".popup_full");
const userInfo = new UserInfo(config);
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.job;

function renderCard(item) {
  const card = new Card(item, ".gridTemplate", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(elementImage) {
  popupImage.openPopup(elementImage);
}

function handleProfileFormSubmit(evt, data) {
  evt.preventDefault(); 
  userInfo.setUserInfo(data);
  popupEditProfile.closePopup();

}

function handleEditCardsSubmit(evt, data) {
  evt.preventDefault();
  addSection.addItem(renderCard(data));
  popupAddCard.closePopup();
  addCards.toggleButtonState();
}

formEditProfileValidator.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  editProfile.toggleButtonState();
  popupEditProfile.openPopup();

});

formAddCardValidator.addEventListener("click", () => {
  popupAddCard.openPopup();
  formEditCards.reset();
  addCards.toggleButtonState();
  
  
});

addSection.renderItems();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
addCards.enableValidation();
editProfile.enableValidation();
addCards.toggleButtonState();
editProfile.toggleButtonState();
