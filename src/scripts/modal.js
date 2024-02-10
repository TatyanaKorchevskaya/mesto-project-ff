import { hideInputError } from "./validate.js";
import { clearValidation, validationConfig } from "./index.js";

function openPopup(el) {
  el.classList.add("popup_opened");
  window.addEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    popupOpened && closePopup(popupOpened);
  }
}

function closePopup(el) {
  el.classList.remove("popup_opened");
  window.removeEventListener("keydown", closePopupEsc);
  const form = el.querySelector("form");
  if (form != null) clearValidation(form, validationConfig);
}
export { openPopup, closePopupEsc, closePopup };
