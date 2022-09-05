const phoneInput = document.querySelector('.phone-number'),
      BOT_TOKEN = '5324396066:AAFDhE5HZ4_mI54HC4OmzWCfjxawduNh8S8',
      CHAT_ID = '-1001758890997';

function showSuccess() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your order send, we are connect with you soon!',
        showConfirmButton: false,
        timer: 5000,
    });
}
function showInfoValidate() {
    Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Enter your number phone!',
        showConfirmButton: false,
        timer: 4000
    });
}
function showError() {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Server error!',
        showConfirmButton: false,
        timer: 3000
    });
}

function validatePhone() {
    [].forEach.call(document.querySelectorAll('#form_phone'), function(input) {
        let keyCode;
        function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        // Element.selectionStart - повертає/задає позицію початку виділення у текстовому полі textarea або input
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+38(___)___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            newValue = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = newValue.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
            return "\\d{1," + a.length + "}";
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
            this.value = newValue;
        }
        if (event.type == "blur" && this.value.length < 5) {
            this.value = "";
        } 

        }
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
    });
}
validatePhone();

const sendForm = document.querySelector('form');
postData(sendForm); 
// Якщо форм декілька на сайті
// document.querySelectorAll('form').forEach(item => {postData(item);});

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleProducts = document.querySelectorAll('.cart-item__title'),
              amount = document.querySelectorAll('.amount-products'),
              pricePortion = document.querySelectorAll('.price-portion'),
              deliveryCost = document.querySelector('.delivery-cost').innerText,
              totalPrice = document.querySelector('.total-price').innerText;   
        // Array.from() - створює новий масив з масивоподібного об'єкта.
        const allTitle = Array.from(titleProducts, (el) => el.innerText),
              allAmount = Array.from(amount, (el) => el.innerText + 'шт.'),
              allPricePortion  = Array.from(pricePortion, (el) => el.innerText + ' ');
        // console.log(allTitle, allAmount, allPricePortion);
        let text = encodeURI(`Suchi Shop\nOrder client:\nTitle order: ${allTitle};\nAmount portion: ${allAmount};\nPrice portion: ${allPricePortion};\nDelivery: ${deliveryCost};\nTotal price order: ${totalPrice} ₴;\nPhone: ${phoneInput.value};`);
        if (phoneInput.value !== '') { 
        axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=` + 
        text + '&parse_mode=html') 
        .then( () => {
            showSuccess();
        })
        .catch( () => { 
            showError(); 
        })
        .finally( () => {
            // Очищаемо форму після відправки методом reset()
            form.reset();
        }); 
        } else {
            showInfoValidate();
        }
    });
}


// Array.from() - створює новий масив з масивоподібного об'єкта.
//      Синтаксис: 
// Array.from( arrayLike[, mapFn[, thisArg ]])
//      Параметри:
// - arrayLike - масивоподібний об'єкт.
// - mapFn - Необов'язковий параметр. Функція, що викликається для кожного елемента масиву.
// - thisArg - Необов'язковий параметр. Значення, що використовується в якості this при виконанні функції mapFn.
//      Опис:
// from() метод обєкту Array який дозволяє створювати масиви з:
// - масивоподібних об'єктів (об'єктів з властивістю length і елементами по індексним ключам);
// - ітерируємих об'єктів (об'єктів, з яких ви можете дістати їх елементи, наприклад Map або Set).
// Array.from() має необов'язковий параметр mapFn, який дозволяє вам виконувати функцію map для кожного елемента створюваного масиву 
// (або його підкласу). Простіше кажучи, виклик Array.from(obj, mapFn, thisArg) еквівалентний ланцюжку Array.from(obj).map(mapFn, thisArg), 
// за винятком того, що він не створює проміжного масиву. Це особливо важливо для деяких підкласів масиву, наприклад типизованих масивів, 
// оскільки проміжний масив неминуче призведе до усічення значень, щоб вони підпали під відповідний тип.