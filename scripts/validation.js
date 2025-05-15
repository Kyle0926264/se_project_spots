const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "showInputError"
}

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = formElement.querySelector("#" + errorMessageID);
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
}

const resetValidation = (inputList, settings) => {
    inputList.forEach((inputElement) => {
        const formElement = inputElement.closest(settings.formSelector);
        hideInputError(formElement, inputElement, settings);
    });
}

const hideInputError = (formElement, inputElement, config) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = formElement.querySelector("#" + errorMessageID);
  inputElement.classList.remove(config.inputErrorClass);
  errorMessageElement.textContent = "";
}

const checkInputValidity = (formElement, inputElement, config) => { if (!inputElement.validity.valid) { showInputError(formElement, inputElement, inputElement.validationMessage, config); } else { hideInputError(formElement, inputElement, config); } }

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, config) => {
if (hasInvalidInput(inputList)) {
 disableButton(buttonElement, config);
} else {
 enableButton(buttonElement, config);
}
}

const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
}

const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

 
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

const enableValidation = (config) => {
    const formList = (document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, config);
    });
}

export { settings, resetValidation, disableButton, enableButton };

enableValidation(settings);