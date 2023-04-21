export default class Card {
    constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._element = document.querySelector(templateSelector).content;
        this._liked = false;
        this._owned = false;

    }

    updateLikes(data, user) {
        this._likes = data.likes;
        this._hasUserLike(user)
        this._likeCount.textContent = data.likes.length;
    }

    _addLike() {
        this._likeBtn.classList.add('element__like-active');
        this._liked = true;
    }
    _removeLike() {
        this._likeBtn.classList.remove('element__like-active');
        this._liked = false;

    }

    _hasUserLike(userId) {
        if (this._likes.some((owner) => {
            return owner._id === userId
        })) {
            this._addLike();
            return
        }
        this._removeLike();
    }

    _isOwner(userId) {
        if (userId === this._ownerId) {
            this._owned = true;
            return true;
        }
        return false
    }

    _setEventListeners() {
        if (this._owned) {
            this._card.querySelector('.photo__delete-btn').addEventListener('click', () => { this._handleDeleteIconClick(this._card, this._cardId) })
        }
        this._likeBtn.addEventListener('click', () => { this._handleLikeClick(this._liked, this._cardId) });
        this._image.addEventListener('click', () => this._handleCardClick({ image: this._link, description: this._name }));
    }

    createCard(userId) {
        this._card = this._element.querySelector('.element__item-grid').cloneNode(true);
        if (!this._isOwner(userId)) {
            this._card.querySelector('.element__delete-buttone').remove();
        }
        this._image = this._card.querySelector('.element__image-grid');
        this._likeBtn = this._card.querySelector('.element__like-buttone');
        const name = this._card.querySelector('.element__title-grid');
        this._likeCount = this._card.querySelector('.element__counter');
        this._image.src = this._link;
        this._image.alt = this._name;
        name.textContent = this._name;
        this._likeCount.textContent = this._likes.length;
        this._hasUserLike(userId);
        this._setEventListeners();
        return this._card;
    }

}
