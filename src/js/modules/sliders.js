const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1, //показ поточного слайду, починаємо з 1го
        paused = false;
    
    const items = document.querySelectorAll(slides);
        
    // Фунція для переміщення індекса і слайдера, n - слайд індекс і як він змінюється вперед чи назад
    function showSlides(n) {
        // показуємо перший слайд, якщо приходить в аргументі номер слайду більше, ніж їх є всього
        if (n > items.length) {
            slideIndex = 1;
        }
        // показуємо останній слайд, якщо приходить в аргументі від'ємне, так як таких індексів у нас немає
        if (n < 1) {
            slideIndex = items.length;
        }
        // приховуємо слайди, які не мають бути показані зараз
        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });
        // показати потрібний слайд (відлік починається з 0, тому -1)
        items[slideIndex - 1].style.display = 'block';
    }
    // первинна ініціалізація, щоб одразу спарцювало при відкритті сторінки
    showSlides(slideIndex);

    // передаємо 1 чи -1 і викликаємо на один слайд більше чи на 1 слайд менше (викликатись буде при кліку)
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // обробляємо можливі помилки
    try {
        // передаємо кнопки сюди на випадок, якщо кнопок немає, скрипт на зламається
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);
        
        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            // слайд, який буде показаний зараз при натисканні кнопки, додаємо йому анімацію і видаляємо відповідну
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });
        
        nextBtn.addEventListener('click', () => {
            // слайд, який буде показаний зараз при натисканні кнопки, додаємо йому анімацію і видаляємо відповідну
            plusSlides(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });
    } catch (e) { } // e - помилка при роботі блока catch
    
    // автоматичне переключення слайдів, якщо не натискати кнопки
    function activateAnimation() {
        if (dir === 'vertical') {
            paused = setInterval(function () {
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 3000);
        } else {
            paused = setInterval(function () {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 3000);
        }
    }
    // первинна ініціалізація анімації
    activateAnimation();

    // щоб слайд автоматично не переключався, коли на нього наведений показник мишки
    // шукаємо батьківський елемент першого слайду (він же бфтьківський і для інших слайдів)
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation(); //при виклику ззмінна paused знову запониться унікальним ідентифікатором setInterval, який буде
    });

};

export default sliders;