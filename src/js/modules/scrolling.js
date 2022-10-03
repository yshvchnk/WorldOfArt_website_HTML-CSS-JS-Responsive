const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        // проміжок, який пролистали
        if (document.documentElement.scrollTop > 1650) {
            // краще на використовувати toggle, бо посилання буде мигати, так як буде працювати при будь-якому русі мишки
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    // scrolling with request animation frame
    // шукаємо всі посилання з шарпом
    let links = document.querySelectorAll('[href^="#"'),
        speed = 0.2;
    
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                // верхня границя елемента, до якого скролимо, getBoundingClientRect -допомагає отримати доступ до властивостей, наприклад, top
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                // стартова позиція
                start = null;
            
            requestAnimationFrame(step);
            // time - передається атоматично
            function step(time) {
                // один раз виконується
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    // кількість пікселів, на яку треба пролистати в результаті операцій і в які сторону
                    r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));
                // скрол до певних координат
                document.documentElement.scrollTo(0, r);
                // функція рекурсивно запускає себе, поки не виконається
                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });


    // Pure JS scrolling

    const element = document.documentElement,
        body = document.body;
    
    const calcScroll = () => {
        upElem.addEventListener('click', function (event) {
            // можемо отримати з 2 команд, тож розглядаємо для двох варіантів - убезпечуємо від багів, якщо браузер не підтримує щось
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);
            // хеш -невідємна частина локальних посилань, тож перевіряємо, чи клікнули на посилання
            if (this.hash !== '') {
                // відміняємо стандартну поведінку браузера, так як клік буде по посиланню
                event.preventDefault();
                // елемент до якго будемо скролити
                let hashElement = document.querySelector(this.hash),
                    // скільки пролистати до батька цього елемента, до якого листаємо
                    hashElementTop = 0;
                // вичисляємо це значення - перебираємо всіх батьків елемента, який шукаємо і дізнатись, скільки пікселів відлистати
                while (hashElement.offsetParent) {
                    // скільки пікселів лишилось до верхньої границі батьківського елемента від хеш-елемента
                    hashElementTop += hashElement.offsetTop;
                    hashElement = hashElement.offsetTop;
                }

                hashElementTop = Math.round(hashElementTop);

                smoothScroll(scrollTop, hashElementTop, this.hash);
            }
        });
    };

    const smoothScroll = (from, to, hash) => {
        let timeInterval = 1,
            prevScrollTop,
            speed;
        // перевіряємо напрям руху - вгору чи вниз
        if (to > from) {
            speed = 30;
        } else {
            speed = -30;
        }
        // анімація
        let move = setInterval(function () {
            // вичисляємо динамічно значення(воно міняється)
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);
            // умова гарантує, що долистали до потрібної позиціє
            if (
                prevScrollTop === scrollTop ||
                (to > from && scrollTop >= to) ||
                (to < from && scrollTop <= to)
            ) {
                clearInterval(move);
                // знаходимо всі знаки шарпа в рядку href
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
            } else {
                // сторінка буде рухатись залежно від існуючого значення
                body.scrollTop += speed;
                element.scrollTop += speed;
                // як змінюється значення
                prevScrollTop = scrollTop;
            }
        }, timeInterval);
    };

    // calcScroll();

};

export default scrolling;