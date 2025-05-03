const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "showInputError"
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = formElement.querySelector("#" + errorMessageID);
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add(settings.inputErrorClass);
}

const hideInputError = (formElement, inputElement) => {
  const errorMessageID = inputElement.id + "-error";
  const errorMessageElement = formElement.querySelector("#" + errorMessageID);
  inputElement.classList.remove(settings.inputErrorClass);
  errorMessageElement.textContent = "";
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
}

const disableButton = (buttonElement) => {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
}

const enableButton = (buttonElement) => {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
}

const SetEventListeners = (formElement, config) => {
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
      SetEventListeners(formElement, config);
    });
}

enableValidation(settings);