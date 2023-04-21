export default class UserInfo {
    constructor({ nameElement, activityElement, avatarElement }) {
        this._name = nameElement;
        this._about = activityElement;
        this._avatar = avatarElement;
        this._id = "anonymous";
    }

    getUserInfo() {
        this._userValues = {
            name: this._name.textContent,
            about: this._about.textContent,
        };
        return this._userValues;
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._avatar.src = avatar;
        this._id = _id;
    }

    getUserId() {
        return this._id;
    }

}
