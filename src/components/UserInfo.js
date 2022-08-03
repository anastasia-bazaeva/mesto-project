export class UserInfo {
    constructor({profileName, profileDescription, profileAvatar}) {
        this._name = profileName;
        this._description = profileDescription;
        this._avatar = profileAvatar;
    }

    getUserInfo() {
    const user = {
        userName: this._name.textContent,
        userAbout: this._description.textContent 
      }
      return user;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._description.textContent = data.about;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
    }
}