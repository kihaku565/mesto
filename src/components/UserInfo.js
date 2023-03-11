class UserInfo {
    constructor({ userName, userInfo }) {
        this._profileName = document.querySelector(userName);
        this._profileInfo = document.querySelector(userInfo);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._profileName.textContent;
        this._userInfo.info = this._profileInfo.textContent;
        return this._userInfo;
    }

    setUserInfo({ name, info }) {
        this._profileName.textContent = name;
        this._profileInfo.textContent = info;
    }
}

export { UserInfo }