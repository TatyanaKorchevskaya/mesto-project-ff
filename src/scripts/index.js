import { deleteCard, likeCard, getCard } from "./cards.js";
import {
  enableValidation,
  disableSubmitButton,
  hideInputError,
} from "./validate.js";
import { openPopup, closePopupEsc, closePopup } from "./modal.js";

import {
  changeProfileApi,
  createCardApi,
  changeAvatarApi,
  getProfileApi,
  getCardsApi,
  loading,
} from "./api.js";

const profileInfoEditButton = document.querySelector(
  ".profile-info__edit-button"
);
const cardAddButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_edit_profile");
const popupAdd = document.querySelector(".popup_add_element");
const popupImage = document.querySelector(".popup_image_active");
const popupAvatar = document.querySelector(".popup_avatar_edit");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const placeInput = document.querySelector(".popup__input_type_place");
const linkInput = document.querySelector(".popup__input_type_link");
const avatarInput = document.querySelector(".popup__input_type_avatar");
const profileName = document.querySelector(".profile-info__title");
const profileJob = document.querySelector(".profile-info__intro");
const profileAvatar = document.querySelector(".profile__avatar");
const closeButtons = document.querySelectorAll(".popup__close");

const profileAvatarEdit = document.querySelector(".profile__wrapper");

const cardsContainer = document.querySelector(".elements__container");
const cardTemplate = document.querySelector("#element-template").content;

const zoomImage = document.querySelector(".popup__image");
const zoomDescription = document.querySelector(".popup__description");

const addCardSubmitButton = popupAdd.querySelector(".popup__button");
const profileSubmitButton = popupEdit.querySelector(".popup__button");
const avatarSubmitButton = popupAvatar.querySelector(".popup__button");

const profileForm = document.forms["profile-info"];
const avatarForm = document.forms["avatar-form"];
const cardForm = document.forms["card-form"];

let user = {};

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

  changeProfileApi(nameInput, jobInput, profileSubmitButton)
    .then((res) => {
      loading(profileSubmitButton, "Сохранить")
      disableSubmitButton(profileSubmitButton, validationConfig)
    })
    .catch((err) => {
      console.log(err);
    });
  closePopup(popupEdit);
}

function renderInitialCards(cards) {
  cards.forEach(renderCard);
}

function renderCard({ name, link, likes, owner, _id }) {
  const newItem = {
    name: name,
    link: link,
    likes: likes,
    owner: owner,
    id: _id,
  };
  const cardElement = getCard(
    newItem,
    {
      deleteCard,
      likeCard,
      handleImageClick,
    },
    user
  );
  cardsContainer.append(cardElement);
}

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

  createCardApi(placeInput, linkInput, addCardSubmitButton)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      loading(addCardSubmitButton, "Создать")
      disableSubmitButton(addCardSubmitButton, validationConfig)
      const newItem = {
        name: result.name,
        link: result.link,
        likes: result.likes,
        owner: result.owner,
        id: result._id,
      };
      const newCardElement = getCard(
        newItem,
        {
          deleteCard,
          likeCard,
          handleImageClick,
        },
        user
      );

      cardsContainer.prepend(newCardElement);
      evt.target.reset();
      closePopup(popupAdd);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
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

profileAvatarEdit.addEventListener("click", () => {
  openPopup(popupAvatar);
  // disableSubmitButton(addCardSubmitButton, validationConfig);
});

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  profileAvatar.setAttribute("src", avatarInput.value);

  changeAvatarApi(avatarInput, avatarSubmitButton)
  .then((res) => {
    loading(avatarSubmitButton, "Сохранить")
    disableSubmitButton(avatarSubmitButton, validationConfig)
  })
  .catch((err) => {
    console.log(err);
  });
  closePopup(popupAvatar);
}

function clearValidation(form, config) {
  const formInputs = form.querySelectorAll("input");
  
  formInputs.forEach((input) => {
    hideInputError(form, input, config);
  });
}

function changeProfile(user) {
  profileName.textContent = user.name;
  profileJob.textContent = user.about;
  changeAvatar(user.avatar);
}

function changeAvatar(avatarUrl) {
  profileAvatar.setAttribute("src", avatarUrl);
}

getProfileApi()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    user = result;
    changeProfile(user);
  })
  .catch((err) => {
    console.log(err);
  });

getCardsApi()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    renderInitialCards(result);
  })
  .catch((err) => {
    console.log(err);
  });

export { clearValidation, validationConfig };
