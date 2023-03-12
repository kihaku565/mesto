import { Popup } from './Popup.js'

class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._popupImage = document.querySelector('.popup__img');
        this._popupText = document.querySelector('.popup__title-img');
    }

    open(name, link) {
        super.open()
        this._popupImage.setAttribute('src', link);
        this._popupImage.setAttribute('alt', link);
        this._popupText.textContent = name;
    }
}

export { PopupWithImage }