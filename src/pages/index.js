import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  initialCards,
  config,
  btnEditProfile,
  btnAddImage,
  btnSubmitAdd
} from '../components/constants.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js'

const validatorProfile = new FormValidator(config, '.popup__form_edit');

const validatorAddPicture = new FormValidator(config, '.popup__form_add');

const userInfo = new UserInfo({
  userName: '.profile__name',
  userInfo: '.profile__about'
});

const popupImage = new PopupWithImage('.popup_view-img');

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultCardList.addItem(createCard(item));
  }
}, '.elements__list')

function createCard(item) {
  const card = new Card(item, '#element-template', handleCardClick);
  return card.generateCard()
}

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const popupEditForm = new PopupWithForm('.popup_edit-profile', {
  handleSubmitForm: (inputs) => {
    userInfo.setUserInfo({
      name: inputs[0].name,
      info: inputs[0].info
    });
    popupEditForm.close();
  }
})

const popupAddForm = new PopupWithForm('.popup_add-image', {
  handleSubmitForm: (inputs) => {
    defaultCardList.addItem(createCard(inputs[0]));
    validatorAddPicture.disableSubmitButton(btnSubmitAdd);
    popupAddForm.close('.popup_add-image');
  }
})

const openProfilePopup = () => {
  popupEditForm.setInputValues(userInfo.getUserInfo());
  validatorProfile.resetValidation();
  popupEditForm.open();
}

const openAddPopup = () => {
  validatorAddPicture.resetValidation();
  popupAddForm.open();
}

btnEditProfile.addEventListener('click', () => openProfilePopup());
btnAddImage.addEventListener('click', () => openAddPopup());

popupImage.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();
defaultCardList.renderItems();
validatorProfile.enableValidation();
validatorAddPicture.enableValidation();