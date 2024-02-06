const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

const cardTemplate = document.querySelector("#element-template").content;

function deleteCard(element) {
  element.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

function getCard(item, { deleteCard, likeCard, handleImageClick }) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementTitle = cardElement.querySelector(".element__title");
  const elementImage = cardElement.querySelector(".element__image");
  elementTitle.textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = `Фотография: ${item.name}`;

  // const cardElement = name;
  cardElement
    .querySelector(".element__delete-button")
    .addEventListener("click", function () {
      deleteCard(cardElement);
    });
  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", likeCard);
  cardElement
    .querySelector(".element__image")
    .addEventListener("click", handleImageClick);

  return cardElement;
}

export { initialCards, deleteCard, likeCard, getCard }