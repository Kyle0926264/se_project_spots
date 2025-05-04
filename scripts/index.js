const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const modals = document.querySelectorAll('.modal');
const profileEditButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-modal");
const editModalCloseBtn = document.querySelector("#modal__close-btn");
const profileName = document.querySelector(".profile__name");
const editModalNameInput = document.querySelector("#profile-name-input");
const profileDescription = document.querySelector(".profile__description");
const editModalDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const editFormElement = document.forms["edit-modal-form"];
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");
const newPostModal = document.querySelector("#new__modal_card");
const newPostButton = document.querySelector(".profile__add-btn");
const closeButtons = document.querySelectorAll(".modal__close-btn");
const newCardFormElement = document.querySelector("#modal__new_card-form");
const cardLinkInput = document.querySelector("#image-link");
const cardNameInput = document.querySelector("#modal__caption");
const previewModal = document.querySelector("#preview__modal");
const previewImage = document.querySelector(".modal__image");
const previewCaption = document.querySelector(".modal__caption");

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button-liked");
  });
  cardDeleteButton.addEventListener("click", () => {
    cardDeleteButton.closest(".card").remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openPopup(previewModal);
  });

  return cardElement;
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  evt.target.reset();
  
  // Get all the inputs and the submit button
  const inputs = Array.from(evt.target.querySelectorAll('.modal__input'));
  const submitButton = evt.target.querySelector('.modal__submit-btn');
  
  // Update button state
  toggleButtonState(inputs, submitButton);
  
  closePopup(editModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closePopup(newPostModal);
  evt.target.reset();

  // Get the submit button
  const submitButton = evt.target.querySelector('.modal__submit-btn');
  // Disable the submit button after reset
  toggleButtonState(Array.from(evt.target.querySelectorAll('.modal__input')), submitButton);
}

profileEditButton.addEventListener("click", () => {
  openPopup(editModal);
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => {
    // Get the form inside this modal
    const form = modal.querySelector("form");
    if (form) {
      form.reset(); // Reset the form
      
      // Clear error messages
      const errorMessages = form.querySelectorAll('.modal__error');
      errorMessages.forEach(errorMessage => {
        errorMessage.textContent = '';
      });
      
      // Remove error styling from inputs
      const inputs = form.querySelectorAll('.modal__input');
      inputs.forEach(input => {
        input.classList.remove('modal__input_type_error');
      });
    }
    closePopup(modal);
  });
});

newPostButton.addEventListener("click", () => openPopup(newPostModal));

editFormElement.addEventListener("submit", handleEditFormSubmit);
newCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
      const openedModal = document.querySelector('.modal_opened');
      if (openedModal) {
          closePopup(openedModal);
      }
  }
});

modals.forEach((modal) => {
  modal.addEventListener('click', function(event) {
      if (event.target === event.currentTarget) {
          closePopup(modal);
      }
  });
});