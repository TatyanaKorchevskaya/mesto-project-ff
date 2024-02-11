const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "94722f8e-9854-4848-81d1-a8145df88ee4",
    "Content-Type": "application/json",
  },
};

function checkResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function changeProfileApi(name, about) {
 
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResult);
}

function createCardApi(name, link) {
  
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResult);
}

function changeAvatarApi(avatar) {
 
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(checkResult);
}

function getProfileApi() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(checkResult);
}

function getCardsApi() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(checkResult);
}

function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResult);
}
function addLikeApi(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResult);
}

function deleteLikeApi(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(checkResult);
}

function loading(btn, text) {
  btn.textContent = text;
}

export {
  changeProfileApi,
  createCardApi,
  changeAvatarApi,
  getProfileApi,
  getCardsApi,
  deleteCardApi,
  addLikeApi,
  deleteLikeApi,
  loading,
};
