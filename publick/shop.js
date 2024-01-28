//Общий класс для товаров и корзины
class AbstractList { 
	items = [];

	constructor (item = []) {
		this.item = [];
	}

	//методы добавления товара и удаления
	add (item){
		const findeItem = this.items.find(fitem => {
			return fitem.title === item.title;
		})

		const addedPromise = new Promise(resolve => {
			if(findeItem) {
				findeItem.counter++;
			} else {
				this.items.push(item)
			}
			resolve();
		})

		addedPromise.then(this.render.bind(this));
	}

	remove(){
		//todo;
	}

	render(){
		this.items.forEach(good => {
			good.render();
		})
	}
}

//список товара
class GoodsList extends AbstractList {
	_cartInstance = null;
	_pageCounter = 1;

	constructor(ListInstance){
		super();
		this._cartInstance = ListInstance;

		this.initShowMoreBtn()

		let goodsPromse = this.fetchGoods();//arr
		goodsPromse.then(() => {
			this.render();
		})

	}

	initShowMoreBtn(){
		const btn = document.querySelector('.showmore');
		btn.addEventListener('click', () => {
			this.fetchGoods()
				.then(() => {
					this.render();
				})
		})
	}
 
	fetchGoods() {
		const result = fetch(`/database/page${this._pageCounter}.json`);
		return result
			.then(res => res.json())
			.then(data => {
				this._pageCounter++;
				this.items.push(...data.data.map(cur => new GoodsItem(cur, this._cartInstance)))
			})
			.catch(e => console.log(e));
	}

	render(){
		const placeToRender = document.querySelector('.goods-list');
		if (placeToRender) {
				placeToRender.innerHTML = '';
				this.items.forEach(good => {
				good.render(placeToRender);
			})
		}
	}
}

//Корзина
class Cart extends AbstractList {
	constructor(){
		super();
		this.init();
	}
 
	//создадим корзину
	init(){
		const block = document.createElement('div');
		block.classList.add('cart');

		const list = document.createElement('div');
		list.classList.add('cart_list');
		block.appendChild(list);

		const ButtonInstance = new Button('Корзина', () => {
			list.classList.toggle('shown');
		});
		block.appendChild(ButtonInstance.getTemplate());

		const placeToRender = document.querySelector('header');
		if (placeToRender){
			placeToRender.appendChild(block);
		}
		this.render();
	}
 
	render(){
		const placeToRender = document.querySelector('.cart_list');
		if(placeToRender){
			placeToRender.innerHTML = '';
			if (this.items.length) {
				this.items.forEach(good => {
					good.render(placeToRender);
				})
			} else {
				placeToRender.innerHTML = 'Товаров нет';
			}
		}
		
	}
}

//карточка товара
class GoodsItem {
	title = '';
	price = 0;
	counter = 1;
	_cartInstance = null;//свойство карзины
	constructor({ title, price }, CartInstance ) {
		this.title = title;
		this.price = price;
		this._cartInstance = CartInstance;
	}

	render(placeToRender){ 
		if(placeToRender) { 
			const block = document.createElement('div');
			block.classList.add('goods-item')
			block.innerHTML = `
				<div class="img-item">
					<img src="https://imgholder.ru/200х400/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson" alt="">
				</div>
				<div class="meta">
					<div class="meta_row">
						<span class="key good">Товар:</span>
						<span class="value">${this.title}</span>
					</div>
					<div class="meta_row">
						<span class="price good">Цена:</span>
						<span class="value">${this.price}</span>
					</div>
					<div class="btn_holder"></div>
				</div>
			`;

			placeToRender.appendChild(block);

			const AddButton = new Button ('Добавить в корзину', () => {
				this._cartInstance.add(new GoodItemInCart(this));
			});
			block.querySelector('.btn_holder').appendChild(AddButton.getTemplate());
		}
	}
}

//создаем объект в корзине
class GoodItemInCart extends GoodsItem {
	constructor(props) {
		super(props)
	}

	//переопределяем метод рендер
	render(placeToRender){
		if(placeToRender) {
			const block = document.createElement('div');
			block.innerHTML = `${this.title} = ${this.price} x ${this.counter}`
			placeToRender.appendChild(block);
		}
	}
}

const CartInstance = new Cart();
const ListInstance = new GoodsList(CartInstance);//список товаров