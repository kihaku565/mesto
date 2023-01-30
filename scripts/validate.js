//объект валидации
const formValues = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input-text_error',
  errorClass: 'popup__input-error_visible'
}

//ф-ия перебора всех форм на странице
function enableValidation(element) {
  const formLists = Array.from(document.querySelectorAll(element.formSelector));
  formLists.forEach((formElement) => {
    setEventListeners(formElement, element);
  })
}

enableValidation(formValues);

//ф-ия проверки на корректность введенных данных
function checkInputValidity(formElement, inputElement, element) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, element);
  } else {
    hideInputError(formElement, inputElement, element);
  }
}

//ф-ия проверки наличия невалидного поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) =>
    !inputElement.validity.valid);
}

//ф-ия переключения кнопки
function toggleButtonState(inputList, buttonElement, element) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(element.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(element.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//ф-ия добавления обработчиков всем полям формы
function setEventListeners(formElement, element) {
  const inputLists = Array.from(formElement.querySelectorAll(element.inputSelector));
  const buttonElement = formElement.querySelector(element.submitButtonSelector);
  toggleButtonState(inputLists, buttonElement, element);

  inputLists.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, element);
      toggleButtonState(inputLists, buttonElement, element);
    })
  })
}

// ф-ия добавления класса с ошибкой
function showInputError(formElement, inputElement, errorMessage, element) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add(element.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(element.errorClass);
}

// ф-ия удаления класса с ошибкой
function hideInputError(formElement, inputElement, element) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove(element.inputErrorClass);
  errorElement.classList.remove(element.errorClass);
  errorElement.textContent = '';
}