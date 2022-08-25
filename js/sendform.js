// import showCards from './card02.js';
const phoneInput = document.querySelector('.phone-number'),
      BOT_TOKEN = '5324396066:AAFDhE5HZ4_mI54HC4OmzWCfjxawduNh8S8',
      CHAT_ID = '-1001758890997';

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

function showSuccess() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your message send, we are connect with you soon!',
        showConfirmButton: false,
        timer: 5000,
    });
}
function showInfoValidate() {
    Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Fill all field marked *!',
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

// const title = document.getElementsByClassName('cart-item__title').innerText;

// берем формы и под каждую из них подвяз-м фун-ю postData, она и будет обработ-м события при отправке
// document.querySelectorAll('form').forEach(item => { 
//     postData(item); 
// });
function postData(form) {
// навеш-м событие 'submit' и оно будет сраб-ть каждый раз когда форма отправ-ся
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // let text = encodeURI(`Suchi Shop\Order client\nName order: ${productInfo.title};\nDelivery: ${deliveryCost};\nTotal price order: ${totalPriceEl};\nPhone: ${phoneInput.value};`);
        let text = encodeURI(`Suchi Shop\nOrder client\nName order: ;\nPhone: ${phoneInput.value};`);
        if (phoneInput.value !== '') { 
        axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=` + 
        text + '&parse_mode=html') 
        .then( () => {
            // console.log(data.status);
            showSuccess();
        })
        .catch( () => { 
            showError(); 
        })
        .finally( () => {
            // очищаем нашу форму после отправки методом reset()
            form.reset();
        }); 
        } else {
        showInfoValidate();
        }
    });
}
postData();



