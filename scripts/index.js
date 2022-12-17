let Popup = document.querySelector('.popup'); //окно редактирования профиля
let formElement = document.querySelector('.popup__container'); //в целом можно было и удалить, не, т.к см. выше? 
let nameInput = formElement.querySelector('#profile-name'); //ввод значения в поле с именем
let jobInput = formElement.querySelector('#profile-about'); //ввод значения в поле "увлечения"
//кнопки
let editProfileBtn = document.querySelector('.profile__edit-btn'); //кнорка редактирования профиля
let saveProfileBtn = formElement.querySelector('.popup__save-btn'); //кнопка сохранения изменений профиля
let closeProfileBtn = formElement.querySelector('.popup__close-btn'); //кнопка закрытия окна редактирования профиля

//открываем окно редактирования профиля
function openEditProfile() {
  Popup.classList.add('popup_opened'); //добавляет модификатор для открытия окна редактирования профиля
  nameInput.value = document.querySelector('.profile__name').textContent; //берет значение в имени профиля
  jobInput.value = document.querySelector('.profile__about').textContent; //берет значение с "увлечения"
}
//клик по кнопке редактирования профиля
editProfileBtn.addEventListener('click', openEditProfile);

function handleFormSubmit(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы
  document.querySelector('.profile__name').textContent = nameInput.value; //заменяем значение в имени профиля
  document.querySelector('.profile__about').textContent = jobInput.value; //заменяем значение с "увлечения"
  Popup.classList.remove('popup_opened'); //окно редактирования закрывается
}
//Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//закрываем окно редактирования профиля
function closeEditProfile() {
  Popup.classList.remove('popup_opened'); //окно редактирования закрывается
}
//клик по кнопке закрытия окна редактирования профиля
closeProfileBtn.addEventListener('click', closeEditProfile);