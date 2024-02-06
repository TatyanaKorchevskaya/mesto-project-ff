import { initialCards, deleteCard, likeCard, getCard } from "./cards.js";
import { enableValidation, disableSubmitButton } from "./validate.js";
import { openPopup, closePopupEsc, closePopup } from "./modal.js";

const profileInfoEditButton = document.querySelector(
  ".profile-info__edit-button"
);
const cardAddButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_edit_profile");
const popupAdd = document.querySelector(".popup_add_element");
const popupImage = document.querySelector(".popup_image_active");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const placeInput = document.querySelector(".popup__input_type_place");
const linkInput = document.querySelector(".popup__input_type_link");
const profileName = document.querySelector(".profile-info__title");
const profileJob = document.querySelector(".profile-info__intro");
const closeButtons = document.querySelectorAll(".popup__close");

const cardsContainer = document.querySelector(".elements__container");
const cardTemplate = document.querySelector("#element-template").content;

const zoomImage = document.querySelector(".popup__image");
const zoomDescription = document.querySelector(".popup__description");

const addCardSubmitButton = popupAdd.querySelector(".popup__button");

const profileForm = document.forms["profile-info"];
const cardForm = document.forms["card-form"];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function fillProfileInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function renderInitialCards() {
  initialCards.forEach(renderCard);
}

function renderCard({ name, link }) {
  // const newItem = createCard(name, link)
  const newItem = {
    'name': name,
    'link': link
  }
  const cardElement = getCard(newItem, { deleteCard, likeCard, handleImageClick });
  cardsContainer.append(cardElement);
}

renderInitialCards();


// function createCard(name, link) {
//   const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
//   const elementTitle = cardElement.querySelector(".element__title");
//   const elementImage = cardElement.querySelector(".element__image");
//   elementTitle.textContent = name;
//   elementImage.src = link;
//   elementImage.alt = `Фотография: ${name}`;
//   return cardElement;
// }

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newItem = {
    'name': placeInput.value,
    'link': linkInput.value
  }
  // const newItem = createCard(placeInput.value, linkInput.value)
  const newCardElement = getCard(newItem, { deleteCard, likeCard, handleImageClick });
  cardsContainer.prepend(newCardElement);
  evt.target.reset();
  closePopup(popupAdd);
  // enableValidation(validationConfig)
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

cardForm.addEventListener("submit", handleCardFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});

enableValidation(validationConfig);

profileForm.addEventListener("submit", handleProfileFormSubmit);

profileInfoEditButton.addEventListener("click", () => {
  openPopup(popupEdit);
  fillProfileInputs();
});

cardAddButton.addEventListener("click", () => {
  openPopup(popupAdd);
   disableSubmitButton(addCardSubmitButton, validationConfig);
});
