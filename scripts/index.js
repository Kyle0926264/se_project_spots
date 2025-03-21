const intialCards = [
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

const profileEditButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-modal");
const editModalCloseBtn = document.querySelector("#modal__close-btn");
const profileName = document.querySelector(".profile__name");
const editModalNameInput = document.querySelector("#profile-name-input");
const profileDescription = document.querySelector(".profile__description");
const editModalDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const editFormElement = document.querySelector("#edit-modal-form");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const newPostModal = document.querySelector("#new__modal_card");
const newPostButton = document.querySelector(".profile__add-btn");
const newPostModalCloseButton = document.querySelector(
  "#new-post-modal-close-btn"
);
const newCardElement = document.querySelector("#modal__new_card-form");
const cardLinkInput = document.querySelector("#image-link");
const cardNameInput = document.querySelector("#modal__caption");
const previewModal = document.querySelector("#preview__modal");
const previewModalCloseButton = document.querySelector(
  "#preview-modal-close-btn"
);

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

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

  function openPreviewModal(event) {
    previewModal.classList.add("modal_opened");
    const previewImage = document.querySelector(".modal__image");
    const previewCaption = document.querySelector(".modal__caption");
    const clickedImage = event.target;
    const imageSource = clickedImage.src;
    const card = clickedImage.closest(".card");
    const caption = card.querySelector(".card__title").textContent;
    previewImage.src = imageSource;
    previewCaption.textContent = caption;
  }

  function closePreviewModal() {
    previewModal.classList.remove("modal_opened");
  }

  cardImageEl.addEventListener("click", openPreviewModal);
  previewModalCloseButton.addEventListener("click", closePreviewModal);

  return cardElement;
}

function openEditModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  editModal.classList.add("modal_opened");
}

function openNewPostModal() {
  newPostModal.classList.add("modal_opened");
}

function closeEditModal() {
  editModal.classList.remove("modal_opened");
}

function closeNewPostModal() {
  newPostModal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeEditModal();
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeNewPostModal();
}

profileEditButton.addEventListener("click", openEditModal);
editModalCloseBtn.addEventListener("click", closeEditModal);

newPostButton.addEventListener("click", openNewPostModal);
newPostModalCloseButton.addEventListener("click", closeNewPostModal);

editFormElement.addEventListener("submit", handleEditFormSubmit);
newCardElement.addEventListener("submit", handleAddCardSubmit);

intialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});
