//профиль
const profileName = document.querySelector('.profile__name'); //дефолт строка с именем профиля
const profileAbout = document.querySelector('.profile__about'); //дефолт строка с "увлечениями"
const popupEditProfile = document.querySelector('.popup_edit-profile'); //окно ред-ия профиля
const nameInput = document.querySelector('#profile-name'); //ввод значения в поле с именем
const jobInput = document.querySelector('#profile-about'); //ввод значения в поле "увлечения"
//картинка
const popupAddImage = document.querySelector('.popup_add-image'); //окно добавления картники
const imgTitleInput = document.querySelector('#image-name'); //ввод подписи к картинке 
const imgLinkInput = document.querySelector('#image-link'); //ввод ссылки на картинку
const elementsList = document.querySelector('.elements__list') //список картинок
const elementTemplate = document.querySelector('#element-template').content;//шаблон для новых картинок
//формы
const profileForm = document.querySelector('form[name=profile-edit-form]'); //форма ред профиля
const imageForm = document.querySelector('form[name=add-image-form]'); //форма добав картинки
//открытая картинка
const setPopupViewImg = document.querySelector('.popup_view-img'); //форма открытой картинки
const viewImg = setPopupViewImg.querySelector('.popup__img'); //ссылка на картинкку
const viewImgTitle = setPopupViewImg.querySelector('.popup__title-img'); //подпись картинки
//кнопки
const editProfileBtn = document.querySelector('.profile__edit-btn'); //кнопка ред-ия профиля
const closeBtn = document.querySelectorAll('.popup__close-btn'); //ВСЕ кнопки закрытия поп-апов
const addImageBtn = document.querySelector('.profile__add-btn'); //кнопка добавить картинку

//массив 6 карточек "из коробки"
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//ф-ия создания новой картинки
function createCard(nameCard, linkCard) {
  const newCard = elementTemplate.querySelector('.element').cloneNode(true);
  const newCardTitle = newCard.querySelector('.element__title');
  const newCardLink = newCard.querySelector('.element__pic');
  const likeBtn = newCard.querySelector('.element__like-btn');
  const deleteBtn = newCard.querySelector('.element__delete');

  newCardTitle.textContent = nameCard;
  newCardLink.setAttribute('src', linkCard);

//добавим обработчик кнопки лайк
  likeBtn.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-btn_active');
  });
//добавим обработчик кнопки удалить
  deleteBtn.addEventListener('click', function() {
    const cardDelete = deleteBtn.closest('.element');
    cardDelete.remove();
  });
//добавим обработчик открытия картинки
newCardLink.addEventListener('click', function() {
    viewImg.setAttribute('src', newCardLink.src);
    viewImgTitle.textContent = (newCardTitle.textContent);
    openPopup(setPopupViewImg);
  });
  return newCard;
}

//ф-ия добавления картинки
function addCards(card) {
  elementsList.prepend(card);
}

//добавим дефолтные картинки
initialCards.reverse().forEach((item) => {
  const nameDefault = item.name;
  const linkDefault = item.link;
  addCards(createCard(nameDefault, linkDefault));
});

//обработчик закрытия поп-апов
closeBtn.forEach((button) => {
  button.addEventListener('click', function() {
    closePopup();
  })
});

//ф-ия открытия поп-апов
function openPopup(showPopup) {
  showPopup.classList.add('popup_opened');
}

//ф-мя закрытия поп-апов
function closePopup() {
  const showedPopup = document.querySelector('.popup_opened');
  showedPopup.classList.remove('popup_opened');
}

//ф-ия сохранения введенных данных профиля
function savePopup(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup();
}

//ф-ия добавления картинок из поп-апа
function addCardsPopup(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы
  addCards(createCard(imgTitleInput.value, imgLinkInput.value))
  closePopup()
}

//обработчик события submit
profileForm.addEventListener('submit', savePopup);
imageForm.addEventListener('submit', addCardsPopup);

//обработчик редактирования профиля
editProfileBtn.addEventListener('click', function() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
})

//обработчик добвления новой картинки
addImageBtn.addEventListener('click', function() {
  imgTitleInput.value = '';
  imgLinkInput.value = '';
  openPopup(popupAddImage);
})