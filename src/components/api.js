
export class Api {
    constructor (options) {
        this._url = options.url;
        this._headers = options.headers;
    }
    checkResponse = (res) => {
        return res.ok ? res.json() : Promise.reject(res)
    }
    
    getProfile () {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this.checkResponse)  
    }
    
    editProfileInfo (data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this.checkResponse)
    }
    
    editProfilePic (data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this.checkResponse)
    }
    
    
    getAllCards () {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this.checkResponse)
    }
    
    addCardToServer (data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this.checkResponse)
    }
    
    removeCardFromServer (dataId) {
        return fetch(`${this._url}/cards/${dataId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this.checkResponse)
    }
    
    changeLikeButton (dataId, isLiked) {
        return fetch(`${this._url}/cards/likes/${dataId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers,
        })
        .then(this.checkResponse)
    }
}
