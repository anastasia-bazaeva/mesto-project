
class Api {
    constructor (options) {
        this._url = options.url;
        this._urlLikes = options.urlLikes;
        this._headers = options.headers;
    }
    onResponse = (res) => {
        return res.ok ? res.json() : Promise.reject(res)
    }
    
    getProfile () {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this.onResponse)  
    }
    
    editProfileInfo (data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this.onResponse)
    }
    
    editProfilePic (data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this.onResponse)
    }
    
    
    getAllCards () {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this.onResponse)
    }
    
    addCardToServer (data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this.onResponse)
    }
    
    removeCardFromServer (dataId) {
        return fetch(`${this._url}/cards/${dataId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this.onResponse)
    }
    
    changeLikeButton (dataId, isLiked) {
        return fetch(`${this._urlLikes}/${dataId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers,
        })
        .then(this.onResponse)
    }
}
const apiConfig = new Api ({
    url: "https://mesto.nomoreparties.co/plus-cohort-13",
    urlLikes: "https://nomoreparties.co/v1/plus-cohort-13/cards/likes",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "5f5f6516-2c69-4593-ad66-9a5c627fc536"
    }
})


// const onResponse = (res) => {
//     return res.ok ? res.json() : Promise.reject(res)
// }

// function getProfile () {
//     return fetch(`${apiConfig.url}/users/me`, {
//         headers: apiConfig.headers
//     })
//     .then(onResponse)  
// }

// function editProfileInfo (data) {
//     return fetch(`${apiConfig.url}/users/me`, {
//         method: 'PATCH',
//         headers: apiConfig.headers,
//         body: JSON.stringify(data)
//     })
//     .then(onResponse)
// }

// function editProfilePic (data) {
//     return fetch(`${apiConfig.url}/users/me/avatar`, {
//         method: 'PATCH',
//         headers: apiConfig.headers,
//         body: JSON.stringify(data)
//     })
//     .then(onResponse)
// }


// function getAllCards () {
//     return fetch(`${apiConfig.url}/cards`, {
//         headers: apiConfig.headers
//     })
//     .then(onResponse)
// }

// function addCardToServer (data) {
//     return fetch(`${apiConfig.url}/cards`, {
//         method: 'POST',
//         headers: apiConfig.headers,
//         body: JSON.stringify(data)
//     })
//     .then(onResponse)
// }

// function removeCardFromServer (dataId) {
//     return fetch(`${apiConfig.url}/cards/${dataId}`, {
//         method: 'DELETE',
//         headers: apiConfig.headers,
//     })
//     .then(onResponse)
// }

// function changeLikeButton (dataId, isLiked) {
//     return fetch(`${apiConfig.urlLikes}/${dataId}`, {
//         method: isLiked ? 'DELETE' : 'PUT',
//         headers: apiConfig.headers,
//     })
//     .then(onResponse)
// }


// export { apiConfig, getProfile, editProfileInfo, editProfilePic, getAllCards, addCardToServer, removeCardFromServer, changeLikeButton };
export { apiConfig, Api }