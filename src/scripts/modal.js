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
}
export { openPopup, closePopupEsc, closePopup };
