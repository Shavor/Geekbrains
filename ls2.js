/* 
const User1 = {
	name: 'Dima',
	age: 23,
	job: 'Front-end developer'
}

class User {
	name = 'Dima'
	age = 23
	job = 'Front-end developer'

	publicStatus(){
		console.log('Working hard (no)');
	}
}

const Dima = new User();
Dima.publicStatus()*/

class User {
	constructor(name, age, job) {
		this.name = name;
		this.age = age;
		this.job = job;
	}

	publicStatus(){
		console.log('Working hard (no)');
	}
}

const Dima = new User('Dima', 25, 'Front-end developer');
const Alex = new User('Alex', 26, 'Back-end developer');
// console.log(Dima);

class Button {
	_text = '';

	constructor(text){
		this._text = text;
		this.render();
	}

	get text() {
		return this._text;
	}

	onBtnClick() {
		console.log('Clicked');
	}

	getTemplate(){
		const btn = document.createElement('button');
		btn.classList.add('btn');
		return btn;
	}

	render() {
		const placeToRender = document.querySelector('.btns');
		if(placeToRender) {
			const btn = this.getTemplate()
			btn.innerHTML = this.text;
			placeToRender.appendChild(btn)

			btn.addEventListener('click', this.onBtnClick)
		}
	}
}

class RoundButton extends Button {
	constructor(text){
		super(text);
	}

	getTemplate(){
		const btn = document.createElement('button');
		btn.classList.add('btn', 'round');
		return btn;
	}
}

class AlertButton extends Button {
	constructor(text){
		super(text);
	}

	onBtnClick() {
		console.log('AlertButton');
	}
}
new Button ('Clicked') 

const AlertBtn = new AlertButton('AlertButton');
AlertBtn.onBtnClick()

const RoundBtn = new RoundButton('RoundButton')


//=============Get and Set==================