const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "94722f8e-9854-4848-81d1-a8145df88ee4",
    "Content-Type": "application/json",
  },
};
function changeProfileApi(nameInput, jobInput, btn) {
  loading(btn, "Сохранение...");
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  });
}

function createCardApi(placeInput, linkInput, btn) {
    loading(btn, "Создание...");
    return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: placeInput.value,
      link: linkInput.value,
    }),
  });
}

function changeAvatarApi(avatarInput, btn) {
    loading(btn, "Сохранение...");
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
  });
}

function getProfileApi() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  });
}

function getCardsApi() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  });
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
  loading,
};
