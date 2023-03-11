class Card {
    constructor(data, selectorTemplate, handleCardClick) { // данные карточки, id шаблона, инструкцию(слушатели на картинку)
        this._selectorTemplate = selectorTemplate;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() { // рендерим карточки
        const cardElement = document
            .querySelector(this._selectorTemplate)
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
            this._handleCardClick(this._name, this._link); // передаём в колбэк данные карточки при клике на картинку
        });
    }

    _addLike() { // лайкаем
        this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_active');
    }

    _deleteCard() { // удаляем
        this._element.querySelector('.element__delete').closest('.element').remove();
        this._element = null;
    }
}

export { Card };