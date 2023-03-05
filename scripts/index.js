import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, config} from './constants.js';

const setPopups = Array.from(document.querySelectorAll('.popup'));
//профиль
const profileName = document.querySelector('.profile__name'); // дефолт строка с именем профиля
const profileAbout = document.querySelector('.profile__about'); // дефолт строка с "увлечениями"
const popupEditProfile = document.querySelector('.popup_edit-profile'); //окно ред-ия профиля
const nameInput = document.querySelector('#profile-name'); // ввод значения в поле с именем
const jobInput = document.querySelector('#profile-about'); // ввод значения в поле "увлечения"
//картинка
const popupAddImage = document.querySelector('.popup_add-image'); // окно добавления картники
const imgInputTitle = document.querySelector('#image-name'); // ввод подписи к картинке 
const imgInputLink = document.querySelector('#image-link'); // ввод ссылки на картинку
const elementsList = document.querySelector('.elements__list') // список картинок
const elementTemplate = document.querySelector('#element-template').content; // шаблон для новых картинок
const imgFormInputs = Array.from(popupAddImage.querySelectorAll('.popup__input-text'));
const imgFormSubmitBtn = popupAddImage.querySelector('.popup__save-btn');
//формы
const profileForm = document.querySelector('.popup__form_edit'); // форма ред профиля
const imageForm = document.querySelector('.popup__form_add'); // форма добав картинки
//открытая картинка
const popupImage = document.querySelector('.popup_view-img'); // форма открытой картинки
const imageViewLink = popupImage.querySelector('.popup__img'); // ссылка на картинкку
const imageViewTitle = popupImage.querySelector('.popup__title-img'); // подпись картинки
//кнопки
const btnEditProfile = document.querySelector('.profile__edit-btn'); // кнопка ред-ия профиля
const btnClosePopups = document.querySelectorAll('.popup__close-btn'); // ВСЕ кнопки закрытия поп-апов
const btnAddImage = document.querySelector('.profile__add-btn'); // кнопка добавить картинку
// валидация формы профиля
const validatorProfile = new FormValidator(config, '.popup__form_edit');
validatorProfile.enableValidation();
// валидация формы карточки
const validatorAddPicture = new FormValidator(config, '.popup__form_add');
validatorAddPicture.enableValidation();

initialCards.reverse().forEach((item) => {
  const cardElement = createCard(item)
  elementsList.prepend(cardElement); // Добавляем в DOM
})

function createCard(item) {
  const card = new Card(item, '#element-template');
  const cardElement = card.generateCard()
  return cardElement
}

function addCardsPopup(evt) {
  evt.preventDefault();
  const newCard = createCard( {name: imgInputTitle.value, link: imgInputLink.value} );
  elementsList.prepend(newCard);
  closePopup(popupAddImage);
  imageForm.reset();
  validatorAddPicture.toggleButtonState();
}

imageForm.addEventListener('submit', addCardsPopup);

// ф-ия открытия поп-апов
export function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupPressEscape);
}

// ф-ия закрытия поп-апов
function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupPressEscape);
}

// обработчик закрытия поп-апов
btnClosePopups.forEach((button) => {
  button.addEventListener('click', () => {
    const currentPopup = button.closest('.popup');
    closePopup(currentPopup);
  })
})

// закрытие поп-апа нажатием на оверлей
function closePopupClickOverlay() {  
  setPopups.forEach((popup) => {
    popup.addEventListener('click', evt => {
      if (evt.target === evt.currentTarget) {
        closePopup(popup);
       }
    })
  })
} 
closePopupClickOverlay()

// ф-ия закрытия поп-апа клавишей Esc
function closePopupPressEscape(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
}

// ф-ия сохранения введенных данных профиля
function savePopup(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

// обработчик события submit
profileForm.addEventListener('submit', savePopup);

// обработчик редактирования профиля
btnEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
})

// обработчик добавления новой картинки
btnAddImage.addEventListener('click', () => {
  imageForm.reset();
  openPopup(popupAddImage);
})