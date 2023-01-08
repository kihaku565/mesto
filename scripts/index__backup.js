const elementTemplate = document.querySelector('#element-template').content; //шаблон карточки
let elementsList = document.querySelector('.elements__list') //список фотографий
let popup = document.querySelector('.popup');
let popupEditProfile = document.querySelector('.popup_edit-profile'); //окно ред-ия профиля
let popupAddImage = document.querySelector('.popup_add-image'); //окно добавления картники
let nameInput = popup.querySelector('#profile-name'); //ввод значения в поле с именем
let jobInput = popup.querySelector('#profile-about'); //ввод значения в поле "мои увлечения"
let imgTitleInput = popup.querySelector('#image-name'); //ввод подписи к картинке 
let imgLinkInput = popup.querySelector('#image-link'); //ввод ссылки на картинку
//кнопки
let editProfileBtn = document.querySelector('.profile__edit-btn'); //кнопка ред-ия профиля
let closeProfileBtn = popup.querySelector('.popup__close-btn_edit-profile'); //кнопка закрытия ред-ия профиля
let saveProfileBtn = popup.querySelector('.popup__save-btn'); //кнопка сохр-ия изменений профиля
let addImageBtn = document.querySelector('.profile__add-btn'); //кнопка добавить картинку
let closeAddImageBtn = document.querySelector('.popup__close-btn_add-image'); //кнопка закрытия доб-ия картинки
let likeBtn = document.querySelector('.element__like-btn'); //кнопка лайка
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

//добавить 6 карточек "из коробки"
initialCards.forEach(function (item) {
  const defaultCards = elementTemplate.cloneNode(true); //копировать шаблон карточки
  
  defaultCards.querySelector('.element__title').textContent = item.name; //подпись для картинки из массива
  defaultCards.querySelector('.element__pic').src = item.link; //ссылка на картинку из массива

  elementsList.append(defaultCards); //добавляем в конец списка фотографий и отображаем на странице
})

/*--------------------------------------------------------РЕДАКТИРОВАТЬ ПРОФИЛЬ---*/

//клик по кнопке редактирования профиля
editProfileBtn.addEventListener('click', openEditProfile);
//открыть окно редактирования профиля
function openEditProfile() {
  popupEditProfile.classList.add('popup_opened'); //добавляет модификатор для открытия окна редактирования профиля
  nameInput.value = document.querySelector('.profile__name').textContent; //берет значение в имени профиля
  jobInput.value = document.querySelector('.profile__about').textContent; //берет значение с "мои увлечения"
}

function handleFormSubmit(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы
  document.querySelector('.profile__name').textContent = nameInput.value; //заменить значение в имени профиля
  document.querySelector('.profile__about').textContent = jobInput.value; //заменить значение с "мои увлечения"
  popupEditProfile.classList.remove('popup_opened'); //окно редактирования закрывается
}
//Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupEditProfile.addEventListener('submit', handleFormSubmit);

//клик по кнопке закрытия окна редактирования профиля
closeProfileBtn.addEventListener('click', closeEditProfile);
//закрыть окно редактирования профиля
function closeEditProfile() {
  popupEditProfile.classList.remove('popup_opened'); //окно редактирования закрывается
}

/*--------------------------------------------------------ДОБАВИТЬ КАРТИНКУ---*/

//клик по кнопке добавления картинки
addImageBtn.addEventListener('click', openAddImage);
//открыть окно добавления картинки
function openAddImage() {
  popupAddImage.classList.add('popup_opened');
}




//добавить карточку
function createCards(linkValue, nameValue) {
  let newCard = elementTemplate.querySelector('.element').cloneNode(true); //клонируем содержимое тега template
  newCard.querySelector('.element__pic').src = linkValue; //ввод ссылки на картинку
  newCard.querySelector('.element__title').textContent = nameValue; //подпись к картинке
  //лайк картинки
  likeBtn.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-btn_active');
  });

  //popupAddImage.classList.remove('popup_opened');
  elementsList.prepend(newCard); //добавляем в начало новую картинку
}
//Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupAddImage.addEventListener('submit', createCards);




//клик по кнопке закрытия окна добавления картинки
closeAddImageBtn.addEventListener('click', closeAddImage);
//закрыть окно добавления картинки
function closeAddImage() {
  popupAddImage.classList.remove('popup_opened');
}
