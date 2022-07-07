const apiConfig = {
    url: "https://mesto.nomoreparties.co/plus-cohort-13",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "5f5f6516-2c69-4593-ad66-9a5c627fc536"
    }
}

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(res)
}

function getProfile () {
    return fetch(`${apiConfig.url}/users/me`, {
        headers: apiConfig.headers
    })
    .then(onResponse)  
}

function editProfileInfo (data) {
    return fetch(`${apiConfig.url}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify(data)
    })
    .then(onResponse)
}

function editProfilePic (data) {
    return fetch(`${apiConfig.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify(data)
    })
    .then(onResponse)
}


function getAllCards () {
    return fetch(`${apiConfig.url}/cards`, {
        headers: apiConfig.headers
    })
    .then(onResponse)
}

function addCardToServer (data) {
    return fetch(`${apiConfig.url}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify(data)
    })
    .then(onResponse)
}

function removeCardFromServer (dataId) {
    return fetch(`${apiConfig.url}/cards/${dataId}`, {
        method: 'DELETE',
        headers: apiConfig.headers,
    })
    .then(onResponse)
}

function addLike (dataId, data) {
    return fetch(`${apiConfig.url}/card/likes/${dataId}`, {
        method: 'PUT',
        headers: apiConfig.headers,
        body: JSON.stringify(data)
    })
    .then(onResponse)
}

function removeLike (dataId) {
    return fetch(`${apiConfig.url}/card/likes/${dataId}`, {
        method: 'DELETE',
        headers: apiConfig.headers,
    })
    .then(onResponse)
}

export { apiConfig, getProfile, editProfileInfo, editProfilePic, getAllCards, addCardToServer, removeCardFromServer, addLike, removeLike };