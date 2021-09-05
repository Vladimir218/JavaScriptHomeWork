const basketElement = {
    renderElement(element) {
        return `<div class='basketElement'>
        <div><b>Наименование</b>: ${element.name}</div>
        <div><b>Цена за шт.</b>: ${element.price}</div>
        <div><b>Количество</b>: ${element.quantity}</div>
        <div><b>Стоимость</b>: ${element.quantity * element.price}</div>
    </div>`;
    }
}

const catalogElement = {

    renderElement(element) {
        return `<div class='catalogElement'>
        <div><b>Наименование</b>: ${element.name}</div>
        <div><b>Цена за шт.</b>: ${element.price} руб.</div>
        <div><b>Объем заказа</b>: <input type="text" id = catalog${element.idProduct} size=5" value=1></div>
        <button class = "product_add-to-busket" data-id_product = "${element.idProduct}">Добавить в корзину</button></div>
    </div>`;
    }
}

let catalog = {
    catalogBlock: null,
    catalogPurchases: [
        {
            idProduct: 0,
            name: 'молоток',
            price: 10
        },
        {
            idProduct: 1,
            name: 'отвертка',
            price: 4
        },
        {
            idProduct: 2,
            name: 'зубило',
            price: 5
        }
    ],

    init(idName, basket) {
        this.catalogBlock = document.getElementById(idName);
        this.basket = basket
        this.generateCatalog();
        this.addEventToBasket()
        // this.buttomAdd = document.getElementById('button');
        // this.buttomReset.addEventListener('click', this.clearBasket.bind(this));

    },
    addEventToBasket() {
        this.catalogBlock.addEventListener('click', event => this.addToBasket(event));
    },
    addToBasket(event) {
        if (!event.target.classList.contains('product_add-to-busket')) return;
        const id_product = +event.target.dataset.id_product;
        const addQuantity = this.getInputValue(id_product);
        const productToAdd = this.catalogPurchases.find((product) => product.idProduct === id_product);
        basket.addToBasket(productToAdd, addQuantity);
    },

    getInputValue(id_product) {
        const id = `catalog${id_product}`;
        return document.getElementById(id).value;
    },

    generateCatalog() {

        if (this.catalogPurchases.length) {
            this.catalogPurchases.forEach(purchase => {

                this.catalogBlock.insertAdjacentHTML('afterbegin', catalogElement.renderElement(purchase));
            });

        } else {
            this.catalogBlock.innerHTML = 'Каталог пуст';

        }
    }

}

let basket = {
    basketBlock: null,
    buttomReset: null,
    purchases: [
        {
            idProduct: 0,
            name: 'молоток',
            quantity: 2,
            price: 10
        },
        {
            idProduct: 1,
            name: 'отвертка',
            quantity: 3,
            price: 4
        },
        {
            idProduct: 2,
            name: 'зубило',
            quantity: 1,
            price: 5
        }
    ],

    init() {
        this.basketBlock = document.getElementById('basket');
        this.buttomReset = document.getElementById('button');
        this.buttomReset.addEventListener('click', this.clearBasket.bind(this));
        this.generateBasket();
    },
    addToBasket(productToAdd, addQuantity) {
        let modifyPurchases = null;
        if (productToAdd) {
            this.modifyPurchases = this.purchases.find((product) => product.idProduct === productToAdd.idProduct);

            if (this.modifyPurchases) {
                this.modifyPurchases.quantity += +addQuantity;
            } else {
                this.purchases.push(Object.assign(productToAdd, { quantity: +addQuantity }));

            };
            this.generateBasket();
        } else {
            alert('Ошибка добавления в корзину');
        }
    },

    clearBasket() {
        this.purchases = [];
        this.generateBasket();
    },
    generateBasket() {
        let n = 0;
        let m = 0;
        if (this.purchases.length) {
            this.basketBlock.innerHTML = '';
            this.purchases.forEach(purchase => {
                this.basketBlock.insertAdjacentHTML('afterbegin', basketElement.renderElement(purchase));
                n++;
                m += +purchase.quantity * +purchase.price;
            });
            const totalText = `В корзине: ${n} товаров(а) на сумму ${m} рублей`;
            this.totalBasket(totalText);
        } else {
            this.basketBlock.innerHTML = 'Корзина пуста';

        }
    },

    totalBasket(totalText) {
        const p = document.createElement('p');
        this.basketBlock.appendChild(p);
        p.innerHTML = totalText;
    }
}

catalog.init('catalog', basket);
basket.init();