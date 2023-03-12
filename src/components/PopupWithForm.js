import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
    constructor(selectorPopup, { handleSubmitForm }) {
        super(selectorPopup);
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__input-text');
        this._handleSubmitForm = handleSubmitForm;
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach((input) => {
            formValues[input.name] = input.value
        });
        return formValues;
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues())
        });
        super.setEventListeners();
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }
}

export { PopupWithForm };


// =)
//самый сложный модуль, как же я устал тратить на тебя время, отпусти