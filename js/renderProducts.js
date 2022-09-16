const productContainer = document.querySelector('#products-container');

// Запус-м фун-ю ниже чтобы она выпол-сь первой, сработала и товары были получены(т.е. показаны на сайте)
getProducts();

// Асинхр-я функ-я получ-я данных из файла products.json
// Созд-м фун-ю которая будет асинхр-й, испол-м async, который выпол-ся в четкой послед-ти
async function getProducts() {
    // Получаем данные из products.json 
    // с помощью метода fetch() мы будем получать данные с нашего JSON файла
    // в данном случае для fetch нам нужно указать адресс относит-но стр-цы index.html, на кот-й будет запуск-ся данный код
    // и чтобы дождаться пока они будут получены мы испол-м await
    // в перем-й response у нас записан объект с типа response, который содер-т ответ который мы получили
    const response = await fetch('./js/products.json');
    // console.log(response);  // Response {type: 'basic', url: 'http://127.0.0.1:5500/js/products.json', redirected: false, …}
    // внутри этого объекта также содер-ся тело ответа - [[Prototype]]: Response
    // и чтобы поработать с этим телом ответа его нужно достать оттуда, и в завим-ти от того какой тип данным мы должны 
    // получить есть различные методы для того чтобы получ-ть этот ответ. И т.к. у нас JSON файл есть соот. метод json()
    // этот метод поможет нас достать необ-е данные с ответа, также метод сразу конвертир-т данные из json формата
    // т.е. формата строки в формат JS, и у нас по факту будет корректный js массив с объектами внутри
    // в данном случае нам тоже нужно подождать пока это действие выпол-ся, испол-м await
    // await нужно испол-ть не только что-бы подождать, но и что-бы перед-ть резул-т метода json
    // Т.е. парсим их из JSON формата в JS
    const productArray = await response.json();
    // console.log(productArray);   //  [{…}, {…}, {…}, {…}]   массив с продуктами
    // 0: id: 1 imgSrc: "philadelphia.jpg" itemsInBox: 6 price: 300 title: "Филадельфия хит ролл" weight: 180 [[Prototype]]:Object

    // Запускаем функ-ю рендера(отображ-я товара)
    // Мы уже получ-и данные из fetch(), преоб-ли их в массив и перед-ли его в фун-ю renderProducts()
    renderProducts(productArray);
}

// теперь мы получили все данные по продуктам и далее нам нужно их рендерить, напишем отдел-ю фун-ю для этого
// она принимает в себя массив с продуктами (productArray)
function renderProducts(productArray) {
    // проходим по всем элементам в массиве productArray
    productArray.forEach( (item)=> {
        // и далее выпол-м похожий действия как делали с корзиной, т.е. подст-м нужные нам значения
        const productHTML = `
            <div class="col-md-6">
                <div class="card mb-4" data-id="${item.id}">
                    <img class="product-img" src="img/roll/${item.imgSrc}" alt="">
                    <div class="card-body text-center">
                        <h4 class="item-title lng-cardsTitle">${item.title}</h4>
                        <p><small data-items-in-box class="text-muted lng-amountInPortion">В одной порции: ${item.itemsInBox} шт.</small></p>
                        <div class="details-wrapper">
                            <!-- Счетчик -->
                            <div class="items counter-wrapper">
                                <div class="items__control" data-action="minus">-</div>
                                <div class="items__current" data-counter>1</div>
                                <div class="items__control" data-action="plus">+</div>
                            </div>
                            <!-- // Счетчик -->
                            <div class="price">
                                <div class="price__weight">${item.weight}г.</div>
                                <div class="price__currency">${item.price} ₴</div>
                            </div>
                        </div>
                        <button data-cart type="button" class="btn btn-block btn-outline-warning lng-addToBusket">
                        + в корзину</button>
                    </div>
                </div>
            </div>
        `;
        // далее добавляем этот шаблон в наш контейнер испол-я метод insertAdjacentHTML
        productContainer.insertAdjacentHTML('beforeend', productHTML);
    });
}
// Т.е. фун-я выше renderProducts принимает в себя массив, проходит по нему, генерирует для нужных нам элементов массива
// соот. разметку и по очериди вставит ее перед закрытием конт-ра productContainer и вызыв-ть ее будем внутри фун-и getProducts()



// async function
// Объявление async function определяет асинхронную функцию, которая возвращает объект AsyncFunction.
// Функция async может содержать выражение await, которое приостанавливает выполнение функции async и ожидает ответа 
// от переданного Promise, затем возобновляя выполнение функции async и возвращая полученное значение.
// Ключевое слово await допустимо только в асинхронных функциях.

// Async/await
// (async)Подожди пока эти данные будут получены и только потом передавай их далее(await).
// await нужно испол-ть не только что-бы подождать, но и что-бы перед-ть резул-т метода json
// т.е. что-бы получ-ть именно тот результат что возвр-т нам Promise и потом с этим резул-м работать,
// поэтому достаем его так же через await

// json()
// для получения тела ответа нам нужно использовать дополнительный вызов метода.
// Response предоставляет несколько методов, основанных на промисах, для доступа к телу ответа в различных форматах:
// - response.text() – читает ответ и возвращает как обычный текст,
// - response.json() – декодирует ответ в формате JSON,
// - response.formData() – возвращает ответ как объект FormData (разберём его в следующей главе),
// - response.blob() – возвращает объект как Blob (бинарные данные с типом),
// - response.arrayBuffer() – возвращает ответ как ArrayBuffer (низкоуровневое представление бинарных данных)
// Например, получим JSON-объект с последними коммитами из репозитория на GitHub:
// let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
// let response = await fetch(url);
// let commits = await response.json(); // читаем ответ в формате JSON
// console.log(commits[0].author.login);
// В нашем случае метод сразу конвертир-т данные из json формата, т.е. формата строки, в формат JS, 
// т.е. у нас по факту будет корректный js массив с объектами внутри

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

