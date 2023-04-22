// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import "./index.css"
import { addBtn, editBtn, editAvatar, validateConfig, profileActivity, profileName, profileAvatar, formValidators } from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDelete from "../components/PopupDelete.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import { Api } from "../components/Api.js";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function activateValidation(classConfiguration) {
  const formList = Array.from(document.querySelectorAll(classConfiguration.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(classConfiguration, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function createCard(item) {
  const card = new Card({
    data: item, handleCardClick: (item) => {
      popupPreview.open(item);
    }, handleLikeClick: (liked, id) => {
      apiRequest.toggleLike(liked, id)
        .then(data => { card.updateLikes(data, userInfo.getUserId()) })
        .catch(err => console.log("Ошибка:", err))
    }, handleDeleteIconClick: (element, id) => {
      popupDeleteImg.open(element, id)
    }
  }, "#gridTemplate");
  const cardElement = card.createCard(userInfo.getUserId());
  return cardElement
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const apiRequest = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64/",
  headers: {
    authorization: "8bd00c41-1f48-4e16-b589-00a5dc2c8828",
    "Content-Type": "application/json"
  }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Promise.all([apiRequest.getUserData(), apiRequest.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    cardList.rendererItems(cards);
  })
  .catch((err) => console.log("Ошибка:", err))
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const userInfo = new UserInfo({ nameElement: profileName, activityElement: profileActivity, avatarElement: profileAvatar});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const cardList = new Section(createCard, ".element__grid");
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const popupPreview = new PopupWithImage(".popup_full");
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const popupDeleteImg = new PopupDelete({
  popupSelector: ".popup_confirmation", handleformSubmit:
    (element, id) => {
      apiRequest.removeCard(id)
        .then(() => {
          element.remove();
          popupDeleteImg.close()
        })
        .catch((err) => console.log("Ошибка:", err))
    }
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const popupEditInfo = new PopupWithForm({
  popupSelector: ".popup_edit", handleformSubmit: (item) => {
    apiRequest.setUserData(item)
      .then(data => {
        userInfo.setUserInfo(data);
        popupEditInfo.close()
      })
      .catch((err) => console.log("Ошибка:", err))
      .finally(() => popupEditInfo.renderLoading(false))
  }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const popupAddCard = new PopupWithForm({
  popupSelector: ".popup_add", handleformSubmit: (item) => {
    apiRequest.uploadCard(item)
      .then(data => {
        cardList.addItem(createCard(data));
        popupAddCard.close();
      })
      .catch((err) => console.log("Ошибка:", err))
      .finally(() => popupAddCard.renderLoading(false))
  }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const popupUpdateAvatar = new PopupWithForm({
  popupSelector: ".popup_profile", handleformSubmit: (item) => {
    apiRequest.setUserAvatar(item)
      .then(data => {
        userInfo.setUserInfo(data);
        popupUpdateAvatar.close();
      })
      .catch((err) => console.log("Ошибка:", err))
      .finally(() => popupUpdateAvatar.renderLoading(false))
  }
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
popupDeleteImg.setEventListeners();
popupEditInfo.setEventListeners();
popupAddCard.setEventListeners();
popupUpdateAvatar.setEventListeners();
popupPreview.setEventListeners();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
editBtn.addEventListener("click", () => {
  popupEditInfo.open();
  popupEditInfo.setUserData(userInfo.getUserInfo())
  formValidators["popupFormEdit"].clearInputErrors();
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
addBtn.addEventListener("click", () => {
  popupAddCard.open();
  formValidators["popupFormAdd"].clearInputErrors();
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
editAvatar.addEventListener("click", () => {
  popupUpdateAvatar.open();
  formValidators["popupFormAvatar"].clearInputErrors();
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
activateValidation(validateConfig);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(◕‿◕)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




