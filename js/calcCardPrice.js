// Функция подсчета цены товаров в корзине
function calcCardPriceAndDelivery() {
    const cardWrapper = document.querySelector('.cart-wrapper'),
        // далее находим все элементы в .cart-wrapper, это .cart-item
        cardItems = cardWrapper.querySelectorAll('.cart-item'),
        // Елемент с общей стоимостю товаров(Итого ...)
        totalPriceEl = document.querySelector('.total-price'),
        // Елемент с доставка: бесплатно
        deliveryCost = document.querySelector('.delivery-cost'),
        cardDelivery = document.querySelector('[data-cart-delivery]');

    // Общая стоимость товаров
    let priceTotal = 0;
    let currentPrice;
    let deliveryPrice = 150;
    let priceTotalWithDelivery = 0;

    // Обходим все блоки с ценами в корзине, т.е. перебир-м элементы внутри cardItems
    cardItems.forEach( (item) => {
        // далее нам нужно найти кол-во товаров
        const amountEl = item.querySelector('[data-counter]');
        // и стоимость товаров
        const priceEl = item.querySelector('.price__currency');
        // теперь мы можем их * и пол-ть конкр-ю стоимость данного товара
        // при этом нам нужно получ-ть внутр-е текст- содержимое товаров в виде числа
        currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);
        // считаем общую стоимость товаров в корзине
        priceTotal += currentPrice;

        // Некорректно работает просчет итоговой цены при уменьшении кол-ва ролов в корзине!
        if (priceTotal >= 600) {
            return priceTotal;
        } else if (priceTotal < 600) {
            priceTotalWithDelivery = priceTotal + deliveryPrice;
            return priceTotalWithDelivery;
        }
    });

    // Отображаем цену на стр-це
    // totalPriceEl.innerText = priceTotal;
    if (priceTotal >= 600) {
        totalPriceEl.innerText = priceTotal;
    } else if (priceTotal < 600) {
        totalPriceEl.innerText = priceTotalWithDelivery;
    }

    // Работа с отобр-м цены доставки: скрываем / показываем блок с стоим-ю доставки
    if (priceTotal > 0) {
        // удал-м класс т.к. изначально он скрыт
        cardDelivery.classList.remove('none');
        // и как только появл-ся в корзине товар и видно его цену
    } else {
        cardDelivery.classList.add('none');
    }

    // Указыв-м стоимость доставки, если цена более 600р. то доставка беспл-я
    if (priceTotal >= 600) {
        deliveryCost.classList.add('free');
        deliveryCost.innerText = 'бесплатно';
        // Соот. если менее 900р то платная
    } else {
        deliveryCost.classList.remove('free');
        deliveryCost.innerText = '150 ₴';
    }

}



// innerText
// св-во .innerText элемента counter отвеч-т за текст запис-й внутри тега и мы его можем менять

// parseInt()
// приним. строку в кач-ве аргум-а и возв-т целое число в соот. с указ-м основанием системы счисления

// .classList      
// Свойство возвращает псевдомассив DOMTokenList, содержащий все классы элемента.    (ст.110 Юдеми тетрадь)
// classList является геттером. Возвращаемый им объект имеет несколько методов:
// add( String [,String] ) - Добавляет элементу указанные классы
// remove( String [,String] ) - Удаляет у элемента указанные классы
// item ( Number ) - Результат аналогичен вызову сlassList[Number]
// toggle ( String [, Boolean]) - Если класс у элемента отсутствует - добавляет, иначе - убирает. Когда вторым параметром 
// передано false - удаляет указанный класс, а если true - добавляет. Если вторым параметром передан undefined или 
// переменная с typeof == 'undefined', поведение будет аналогичным передаче только первого параметра при вызове toggle.
// contains ( String ) - Проверяет, есть ли данный класс у элемента (вернёт true или false)
// И, конечно же, у ClassList есть заветное свойство length, которое возвращает количество классов у элемента.
