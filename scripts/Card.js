import {openPopup} from './index.js'

export {Card};

class Card {
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
    }

    _getTemplate() { // вернуть разметку карточки
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        return cardElement;
    }

    generateCard() { // добавить данные в разметку
        this._element = this._getTemplate();

        this._setEventListener(); // добавим обработчики

        this._element.querySelector('.element__pic').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__pic').alt = this._name;

        return this._element;
    }

    _setEventListener() { // ставим слушатели: лайка, удаления, открытия
        this._element.querySelector('.element__like-btn').addEventListener('click', () => {
            this._addLike();
        });
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.element__pic').addEventListener('click', () => {
            this._openImage();
        });
    }

    _addLike() { // лайкаем
        this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_active');
    }

    _deleteCard() { // удаляем
        this._element.querySelector('.element__delete').closest('.element').remove();
        this._element = null;
    }

    _openImage() { // открываем
        document.querySelector('.popup__img').setAttribute('src', this._link);
        document.querySelector('.popup__img').setAttribute('alt', this._name);
        document.querySelector('.popup__title-img').textContent = this._name;
        openPopup(document.querySelector('.popup_view-img'));
    }
}