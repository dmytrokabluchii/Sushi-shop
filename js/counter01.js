// Находим кнопку - и + в карточке с товаром
const btnMinus = document.querySelector('[data-action="minus"]'),
      btnPlus = document.querySelector('[data-action="plus"]'),
      // работаем со счетчиком в атрибуте data-counter
      counter = document.querySelector('[data-counter]');

// будем отслеживать клик по кнопке - и + в карточках с товаром
btnMinus.addEventListener('click', () => {
    console.log('minus click');
    // Проверяем что-бы счетчик был больше 0
    if (parseInt(counter.innerText) > 0) {
        // -- сработает аналог-но вар-ту ++ только соот. наоборот
        counter.innerText = --counter.innerText;
    }
});
// будем отслеживать клик по кнопке + в карточках с товаром
btnPlus.addEventListener('click', () => {
    console.log('plus click');
    // ++ даст нам увелич-е счет-ка на +1 и это знач-е останется в перем-й пока не кликнет еще раз
    counter.innerText = ++counter.innerText;
});



// parseInt()
// приним. строку в кач-ве аргум-а и возв-т целое число в соот. с указ-м основанием системы счисления

// innerText
// св-во .innerText элемента counter отвеч-т за текст запис-й внутри тега и мы его можем менять

