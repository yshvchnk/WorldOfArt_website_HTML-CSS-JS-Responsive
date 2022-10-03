const accordionSecondVar = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', function () {
            
            this.classList.toggle('active-style');
            // спочатку наш блок не видно, що задано в стилі
            this.nextElementSibling.classList.toggle('active-content');
            if (this.classList.contains('active-style')) {
                // висота контента плюс педдінги зі стилів
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });
};

export default accordionSecondVar;