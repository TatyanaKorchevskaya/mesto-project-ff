const cardTemplate = document.querySelector("#element-template").content;

function deleteCard(element) {
  const cardId = element.getAttribute("data-card-id");

  fetch(`https://nomoreparties.co/v1/wff-cohort-5/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "94722f8e-9854-4848-81d1-a8145df88ee4",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      element.remove();
    });
}

function likeCard(evt) {
  const element = evt.target;
  const parent = element.closest(".element");
  const cardId = parent.getAttribute("data-card-id");
  const likeCount = parent.querySelector(".element__like-count");
  if (!element.classList.contains("element__like-button_active")) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-5/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: "94722f8e-9854-4848-81d1-a8145df88ee4",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        likeCount.textContent = result.likes.length;
        activeLike(element);
      });
  } else {
    fetch(`https://nomoreparties.co/v1/wff-cohort-5/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "94722f8e-9854-4848-81d1-a8145df88ee4",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        likeCount.textContent = result.likes.length;
        unactiveLike(element);
      });
  }
  // evt.target.classList.toggle("element__like-button_active");
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
  const elementDelete = cardElement.querySelector(".element__delete-button");
  elementTitle.textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = `Фотография: ${item.name}`;
  elementLikes.textContent = item.likes.length;

  item.likes.forEach((like) => {
    if (like._id == user._id) {
      activeLike(cardElement.querySelector(".element__like-button"));
    }
  });

  if (user._id != item.owner._id) {
    elementDelete.style.display = "none";
  } else {
    cardElement
      .querySelector(".element__delete-button")
      .addEventListener("click", function () {
        deleteCard(cardElement);
      });
  }

  cardElement.setAttribute("data-card-id", item.id);

  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", likeCard);
  cardElement
    .querySelector(".element__image")
    .addEventListener("click", handleImageClick);

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

export { deleteCard, likeCard, getCard };
