import { deleteCardApi, addLikeApi, deleteLikeApi } from "./api.js";
import { openPopup, closePopupEsc, closePopup } from "./modal.js";

const cardTemplate = document.querySelector("#element-template").content;
const popupImage = document.querySelector(".popup_image_active");
const zoomImage = document.querySelector(".popup__image");
const zoomDescription = document.querySelector(".popup__description");

function deleteCard(element) {
  const cardId = element.getAttribute("data-card-id");
  deleteCardApi(cardId)
    .then((result) => {
      element.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(evt) {
  const element = evt.target;
  const parent = element.closest(".element");
  const cardId = parent.getAttribute("data-card-id");
  const likeCount = parent.querySelector(".element__like-count");
  if (!element.classList.contains("element__like-button_active")) {
    addLikeApi(cardId)
      .then((result) => {
        likeCount.textContent = result.likes.length;
        activeLike(element);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLikeApi(cardId)
      .then((result) => {
        likeCount.textContent = result.likes.length;
        unactiveLike(element);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function activeLike(element) {
  element.classList.add("element__like-button_active");
}

function unactiveLike(element) {
  element.classList.remove("element__like-button_active");
}

function getCard(item, { deleteCard, likeCard, handleImageClick }, user) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementTitle = cardElement.querySelector(".element__title");
  const elementImage = cardElement.querySelector(".element__image");
  const elementLikes = cardElement.querySelector(".element__like-count");
  const elementLike = cardElement.querySelector(".element__like-button");
  const elementDelete = cardElement.querySelector(".element__delete-button");
  elementTitle.textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = `Фотография: ${item.name}`;
  elementLikes.textContent = item.likes.length;

  item.likes.forEach((like) => {
    if (like._id == user._id) {
      activeLike(elementLike);
    }
  });

  if (user._id != item.owner._id) {
    elementDelete.style.display = "none";
  } else {
    cardElement;
    elementDelete.addEventListener("click", function () {
      deleteCard(cardElement);
    });
  }

  cardElement.setAttribute("data-card-id", item.id);
  elementLike.addEventListener("click", likeCard);
  elementImage.addEventListener("click", handleImageClick);

  return cardElement;
}

function handleImageClick(evt) {
  openPopup(popupImage);
  const image = evt.target;
  const description = image
    .closest(".element")
    .querySelector(".element__title").textContent;
  zoomDescription.textContent = description;
  zoomImage.src = image.src;
  zoomImage.alt = `Фотография: ${description}`;
}

export { deleteCard, likeCard, getCard, handleImageClick };
