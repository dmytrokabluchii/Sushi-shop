// Добавление товара в корзину
function showCardsInBucket() {
    // div внутри корзины, в котрый мы добав-м товары
    const cardWrapper = document.querySelector('.cart-wrapper');
    // Добавляем прослушку на всем окне при клике, т.е. отслеживаем клик на стр-це
    window.addEventListener('click', (event) => {
        // провер-м сделан ли клик по нашей кнопке(дата артибут: data-cart) "добавить в корзину"
        // провер-м есть ли в нашем дата-атрибуте данный атрибут, в этом поможем метод Element.hasAttribute()
        if (event.target.hasAttribute('data-cart')) {
            // далее нам нужно найти карточку с товаром где сдел-ли клик чтобы собр-ть с неё необ-е данные
            // обратим-я к родителю тега button, т.е. к классу 'card' через метод closest()
            const card = event.target.closest('.card');
            // далее собир-м данные с нашей карточки и все данные что мы соберем опишем в виде объекта
            const productInfo = {
                // у всех карточек есть дата-атрибут(data-id) со значением
                // запись ниже вернет нам значение атрибута выбранной карточки
                id: card.dataset.id,
                // далее получ-м путь к нашей картинке, где метод getAttribute() вернет на значение, т.е. путь к картинке
                // и этот путь будет наход-ся в св-ве imgSrc
                imgSrc: card.querySelector('.product-img').getAttribute('src'),
                // обращ-ся к классу .item-title в html и получ-м его текст-е знач-е через innerText
                title: card.querySelector('.item-title').innerText,
                // кол-во ролов в упак-ке, обр-ся соот. к дата-атрибуту
                itemsInBox: card.querySelector('[data-items-in-box]').innerText,
                // далее обращ-ся к колич-ву и цене товара в карточках
                weight: card.querySelector('.price__weight').innerText,
                price: card.querySelector('.price__currency').innerText,
                // ну и соот. наш счетчик
                counter: card.querySelector('[data-counter]').innerText,
            };
            // выше мы собрали все данные и можем размещать их в корзине 
            
            // провер-м есть ли такой товар в корзине, если он есть то не будем добав-ть его а просто увелич-м счетчик
            const itemInCard = cardWrapper.querySelector(`[data-id="${productInfo.id}"]`);
            //если товар есть в корзине
            if (itemInCard) {
                // находи элемент счетчика
                const counterElement = itemInCard.querySelector('[data-counter]');
                // и когда он найден склад-и то число что есть в корзине с числом счетчика в карточке кот-е хотим добав-ть
                counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
            } else {
                // если товара нет в корзине
                // созд-м шаблон и помещ-м наш html div в перем-ю, где в нужные места подст-м нужные данные кот-е у нас мен-ся
                    const cardItemHTML = `
                    <div class="cart-item" data-id="${productInfo.id}">
                        <div class="cart-item__top">
                            <div class="cart-item__img">
                                <img src=${productInfo.imgSrc} alt="${productInfo.title}">
                            </div>
                            <div class="cart-item__desc">
                                <div class="cart-item__title">${productInfo.title}</div>
                                <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>
                                <div class="cart-item__details">
                                    <div class="items items--small counter-wrapper">
                                        <div class="items__control" data-action="minus">-</div>
                                        <div class="items__current amount-products" data-counter="">${productInfo.counter}</div>
                                        <div class="items__control" data-action="plus">+</div>
                                    </div>
                                    <div class="price">
                                        <div class="price__currency price-portion">${productInfo.price}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                // отобразим товар выше в нашей корзине, обращ-ся к обертке катрочек cardWrapper
                // для вставки HTML-кода внутрь елемента испол-м метод insertAdjacentHTML(), который в кач-ве аргум-в приним-т
                // значения(позиция, сам_елемент), каждый новый товар будем добавл-ть в конец елемента
                cardWrapper.insertAdjacentHTML('beforeend', cardItemHTML);
            }
            // Отображ-е статуса корзины Пустая / Полная
            toggleCardStatus();
            // Пересчет общей стоимости товаров в корзине
            calcCardPriceAndDelivery();   

            // console.log(productInfo.title);
            // console.log(productInfo.counter);
            // console.log(productInfo.price);
            return productInfo;
        }
    });
}
showCardsInBucket();






// hasAttribute()
// Метод возвращает Boolean значение указывающее, имеет ли указанный элемент указанный атрибут или нет.
// hasAttributes()
// Метод возвращает Boolean значение, указывая содержит данный элемент какие-либо атрибуты или нет.

// getAttribute()
// getAttribute() возвращает значение указанного атрибута элемента. Если элемент не содержит данный атрибут, 
// могут быть возвращены null или "" (пустая строка); 
// Синтаксис: let attribute = element.getAttribute(attributeName);
// где attribute - переменная, которой будет присвоено значение attributeName, 
// attributeName - имя атрибута, значение которого необходимо получить.

// insertAdjacentHTML()   (стр.114 Юдеми-тетрадь)
// Разбирает указанный текст как HTML или XML и вставляет полученные узлы (nodes) в DOM дерево в 
// указанную позицию. Данная функция не переписывает имеющиеся элементы, что предотвращает дополнительную сериализацию 
// и поэтому работает быстрее, чем манипуляции с innerHTML. Т.е. метод позвол-т вставлять кусок HTML-кода внутрь елемента!
// Синтаксис: targetElement.insertAdjacentHTML(position, text);
// Параметры: position: определяет позицию добавляемого элемента относительно элемента, вызвавшего метод. 
// Должно соответствовать одному из следующих значений:
// 'beforebegin': до самого element (до открывающего тега).
// 'afterbegin': сразу после открывающего тега  element (перед первым потомком).
// 'beforeend': сразу перед закрывающим тегом element (после последнего потомка).
// 'afterend': после element (после закрывающего тега).
// text: Строка, которая будет проанализирована как HTML или XML и вставлена в DOM дерево документа
