let popup = document.querySelector('.popup'); //окно редактирования профиля
let nameInput = popup.querySelector('#profile-name'); //ввод значения в поле с именем
let jobInput = popup.querySelector('#profile-about'); //ввод значения в поле "увлечения"
//кнопки
let editProfileBtn = document.querySelector('.profile__edit-btn'); //кнорка редактирования профиля
let saveProfileBtn = popup.querySelector('.popup__save-btn'); //кнопка сохранения изменений профиля
let closeProfileBtn = popup.querySelector('.popup__close-btn'); //кнопка закрытия окна редактирования профиля

//открываем окно редактирования профиля
function openEditProfile() {
  popup.classList.add('popup_opened'); //добавляет модификатор для открытия окна редактирования профиля
  nameInput.value = document.querySelector('.profile__name').textContent; //берет значение в имени профиля
  jobInput.value = document.querySelector('.profile__about').textContent; //берет значение с "увлечения"
}
//клик по кнопке редактирования профиля
editProfileBtn.addEventListener('click', openEditProfile);

function handleFormSubmit(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы
  document.querySelector('.profile__name').textContent = nameInput.value; //заменяем значение в имени профиля
  document.querySelector('.profile__about').textContent = jobInput.value; //заменяем значение с "увлечения"
  popup.classList.remove('popup_opened'); //окно редактирования закрывается
}
//Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popup.addEventListener('submit', handleFormSubmit);

//закрываем окно редактирования профиля
function closeEditProfile() {
  popup.classList.remove('popup_opened'); //окно редактирования закрывается
}
//клик по кнопке закрытия окна редактирования профиля
closeProfileBtn.addEventListener('click', closeEditProfile);