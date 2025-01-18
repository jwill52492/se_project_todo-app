class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupClosedBtn = this._popupElement.querySelector(".popup__close");

  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }


  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
  }

  setEventListeners() {
    this._popupClosedBtn.addEventListener("click", () => {
      this.close();
    });


    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}

export default Popup;