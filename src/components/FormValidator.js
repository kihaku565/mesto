class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._config = config;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _checkInputValidity(inputElement) { // проверка на корректность введенных данных
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage); 
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) { // добавления класса с ошибкой
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`); // span ошибки
        inputElement.classList.add(this._config.inputErrorClass); // добавить класс ошибки полю
        errorElement.textContent = errorMessage; // текст сообщения с ошибкой
        errorElement.classList.add(this._config.errorClass); // стиль класса с ошибки
    }

    _hideInputError(inputElement) { // удаления класса с ошибкой
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`); // span ошибки
        inputElement.classList.remove(this._config.inputErrorClass); // удалить класс ошибки поля
        errorElement.classList.remove(this._config.errorClass); // удалить класс ошибки
        errorElement.textContent = ''; // удалить текст с ошибкой
    }

    toggleButtonState() { // переключения кнопки
        if (this._hasInvalidInput()) { // проверяем форму
            this.disableSubmitButton(this._buttonElement);
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    disableSubmitButton = (button) => {
        button.classList.add(this._config.inactiveButtonClass);
        button.disabled = true;
    }

    _hasInvalidInput() { // проверка наличия невалидного поля
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _setEventListener() { // добавления обработчиков всем полям формы
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => { // повесить обработчики на инпуты
                this._checkInputValidity(inputElement); // проверить валидны ли поля
                this.toggleButtonState();
            });
        });
    }

    enableValidation() { // включение валидации
        this._setEventListener();
    }

    resetValidation() { // управление кнопкой сабмита
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}

export { FormValidator };