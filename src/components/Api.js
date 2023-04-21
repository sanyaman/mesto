export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    getInitialCards() {
        return this._request(this._baseUrl + 'cards', {
            headers:
                { authorization: this._headers.authorization }
        })
    }

    getUserData() {
        return this._request(this._baseUrl + 'users/me', {
            headers:
                { authorization: this._headers.authorization }
        })
    }

    setUserData(userData) {
        return this._request(this._baseUrl + 'users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about,
            })
        })
    }

    uploadCard(cardData) {
        return this._request(this._baseUrl + 'cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link,
            })
        })
    }

    removeCard(cardId) {
        return this._request(this._baseUrl + 'cards/' + cardId, {
            method: 'DELETE',
            headers: this._headers,
        })
    };

    toggleLike(methodSwitch, cardId) {
        let method = 'DELETE';
        if (!methodSwitch) {
            method = 'PUT'
        }
        return this._request(this._baseUrl + 'cards/' + cardId + '/likes', {
            method: method,
            headers: this._headers,
        })
    }

    setUserAvatar(avatarLink) {
        return this._request(this._baseUrl + 'users/me' + '/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink.link
            })
        })
    }
}
