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
    cardsTitle2: {
        ua: 'Каліфорнія Темпура',
        ru: 'Калифорния темпура',
        en: 'California tempura',
    },
    cardsTitle3: {
        ua: 'Запечений рол «Каліфорнія»',
        ru: 'Запеченый ролл «Калифорния»',
        en: 'Baked roll «California»',
    },
    cardsTitle4: {
        ua: 'Філадельфія рол',
        ru: 'Филадельфия ролл',
        en: 'Philadelphia roll',
    },
    amountInPortion: {
        ua: 'В одній порції: 6шт.',
        ru: 'В одной порции: 6шт.',
        en: 'The portion has: 6pcs.',
    },
    weightPortion: {
        ua: 'г.',
        ru: 'гр.',
        en: 'gr.',
    },
    addToBusket: {
        ua: '+ до кошика',
        ru: '+ в корзину',
        en: '+ add to busket'
    },
    deliveryInBusket: {
        ua: 'Безкоштовно',
        ru: 'Бесплатно',
        en: 'Free'
    }
};
  
//   Change language
document.querySelectorAll('.lang button').forEach((item) => {
    item.addEventListener('click', setLang);
});

// To change "active" class for lang-buttons
let btnContainer = document.getElementById("lang-wrapper");
// Get all buttons with class="btn-lang" inside the container
let btns = btnContainer.getElementsByClassName("btn-lang");
// Loop through the buttons and add the active class to the current/clicked button
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// Function for change language
function setLang() {
    const titleRoll = document.querySelectorAll('.lng-cardsTitle'),
          textToBuscet = document.querySelectorAll('.lng-addToBusket'),
          amountPortion = document.querySelectorAll('.lng-amountInPortion'),
          weightPortion = document.querySelectorAll('.lng-weightPortion');

    for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            // change text in placeholder
            if (elem.classList.contains('lng-phoneCustomer')) {
                elem.placeholder = langArr['phoneCustomer'][this.value];
            }
            if (elem.classList.contains('lng-cardsTitle')) {
                titleRoll.forEach((item, i) => {
                    if (i === 1) {
                        item.innerText = langArr['cardsTitle2'][this.value];
                    }
                    else if (i === 2) {
                        item.innerText = langArr['cardsTitle3'][this.value];
                    }
                    else if (i === 3) {
                        item.innerText = langArr['cardsTitle4'][this.value];
                    }
                    // Or second variant
                    // (i === 1) ? item.innerText = langArr['cardsTitle2'][this.value]:
                    // (i === 2) ? item.innerText = langArr['cardsTitle3'][this.value]:
                    // (i === 3) ? item.innerText = langArr['cardsTitle4'][this.value]: 
                    // false;
                });
            }
            else if (elem.classList.contains('lng-addToBusket')) {
                textToBuscet.forEach((item) => {
                    item.innerText = langArr['addToBusket'][this.value];
                });
            }
            else if (elem.classList.contains('lng-amountInPortion')) {
                amountPortion.forEach((item) => {
                    item.innerText = langArr['amountInPortion'][this.value];
                });
            }
            else if (elem.classList.contains('lng-weightPortion')) {
                weightPortion.forEach((item) => {
                    item.innerText = langArr['weightPortion'][this.value];
                });
            }           
            elem.innerHTML = langArr[key][this.value];
        }
    }
}
