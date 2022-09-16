const langArr = {
    headerTitle: {
      ua: 'Доставка ролів',
      ru: 'Доставка роллов',
      en: 'Sushi delivery',
    },
  
    headerSubtitle: {
      ua: 'Швидко та смачно',
      ru: 'Оперативно и вкусно',
      en: 'Fast and tasty',
    },
    busketTitle: {
        ua: 'Ваше замовлення',
        ru: 'Ваш заказ',
        en: 'Your order',
    },
    busketEmpty: {
        ua: 'Кошик порожній',
        ru: 'Корзина пустая',
        en: 'Busket is empty',
    },
    deliveryTitle: {
        ua: 'Доставка:',
        ru: 'Доставка:',
        en: 'Delivery:',
    },
    deliveryFree: {
        ua: 'Безкоштовно при замовленні від 600 ₴',
        ru: 'Бесплатно при заказе от 600 ₴',
        en: 'Free for orders over 600 ₴',
    },
    totalTitle: {
        ua: 'Разом:',
        ru: 'Итого:',
        en: 'Total:',
    },
    checkoutTitle: {
        ua: 'Оформити замовлення',
        ru: 'Оформить заказ',
        en: 'Checkout',
    },
    phoneCustomer: {
        ua: 'Ваш номер телефону',
        ru: 'Ваш номер телефона',
        en: 'Your phone number',
    },
    btnOrder: {
        ua: 'Замовити',
        ru: 'Заказать',
        en: 'Order',
    },
    cardsTitle: {
        ua: 'Каліфорнія хіт рол',
        ru: 'Калифорния хит ролл',
        en: 'California hit roll',
    },
    amountInPortion: {
        ua: 'В одній порції:',
        ru: 'В одной порции:',
        en: 'The portion has',
    },
    addToBusket: {
        ua: '+ до кошика',
        ru: '+ в корзину',
        en: '+ add to busket',
    },
    
};
  
//   Change language
document.querySelectorAll('.lang button')
    .forEach((item) => item.addEventListener('click', setLang));
  
function setLang() {
    for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            // change text in placeholder
            if (elem.classList.contains('lng-phoneCustomer')) {
                elem.placeholder = langArr['phoneCustomer'][this.value];
            }
        elem.innerHTML = langArr[key][this.value];
        }
    }
}
