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

let basket = {
    basketBlock: null,
    buttomReset: null,
    purchases: [
        {
            idProduct: 1,
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
            idProduct: 1,
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
    clearBasket() {
        this.purchases = [];
        this.generateBasket();
    },
    generateBasket() {
        let n = 0;
        let m = 0;
        if (this.purchases.length) {
            this.purchases.forEach(purchase => {
                this.basketBlock.insertAdjacentHTML('afterbegin', basketElement.renderElement(purchase));
                n++;
                m += purchase.quantity * purchase.price;
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

basket.init();