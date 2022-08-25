function toggleCardStatus() {
    const cardWrapper = document.querySelector('.cart-wrapper'),
          // находим елемент отображ-й надпись что корзина пустая
          cardEmptyBadge = document.querySelector('[data-cart-empty]'),
          orderForm = document.querySelector('#order-form');
    // провер-м кол-во елементов внутри данного блока, испол-м св-во children
    if (cardWrapper.children.length > 0) {
        // когда товар в корзине есть то скрываем поле "корзина пустая"
        // класс none прописан в стилях Бутстрапа
        cardEmptyBadge.classList.add('none');
        // далее работаем с блоком оформить заказ, убир-м класс none из разметки
        orderForm.classList.remove('none');

    } else {
        cardEmptyBadge.classList.remove('none');
        orderForm.classList.add('none');
    }

}





// .children
// коллекция детей, которые являются элементами.

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
