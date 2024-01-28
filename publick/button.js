class Button {
  _text = '';
  _onClickclb = null;

  constructor (text, clb) {
    this._text = text;
    this._onClickclb = clb;
  }

  get text () {
    return this._text
  }

  set text (value) {
    this._text = value
  }

  onBtnClick () {
    if(typeof this._onClickclb === 'function') {
      this._onClickclb()
    }
  }

  getMainTemplate () {
    const btn = document.createElement('div');
    btn.classList.add('btn');

    return btn
  }

  getTemplate () {
    const btn = this.getMainTemplate()
    btn.innerHTML = this.text

    btn.addEventListener('click', () => {
      this.onBtnClick()
    })

    return btn
  }

}
4