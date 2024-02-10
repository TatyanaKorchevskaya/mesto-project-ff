const reg = /^[а-яА-Яa-zA-ZЁё\-\s]*$/;

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

function hasInvalidValue(inputs) {
  let result = false;
  inputs.forEach((input) => {
    if (input.hasAttribute("data-text-error") && !reg.test(input.value)) {
      result = true;
    }
  });
  if (inputs.some((input) => !input.validity.valid)) {
    result = true;
  }
  return result;
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, button, config);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
}

function isValid(form, input, config) {
  if (input.hasAttribute("data-text-error") && !reg.test(input.value)) {
    showCustomError(form, input, config);
  } else if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}
function showCustomError(form, input, config) {
  input.classList.add(config.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = input.getAttribute("data-text-error");
  span.classList.add(config.errorClass);
}

function showInputError(form, input, config) {
  input.classList.add(config.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = input.validationMessage;
  span.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
  input.classList.remove(config.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = "";
  span.classList.remove(config.errorClass);
}

function toggleButtonState(inputs, button, config) {
  if (hasInvalidValue(inputs)) {
    disableSubmitButton(button, config);
  } else {
    enableSubmitButton(button, config);
  }
}

function enableSubmitButton(button, config) {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
}

function disableSubmitButton(button, config) {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}
export { enableValidation, disableSubmitButton, hideInputError };
