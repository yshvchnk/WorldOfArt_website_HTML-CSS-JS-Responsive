import { postData } from "./services/requests";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');
    // створюємо масив подій, які відносяться до драгу і дропу, і перебираємо його
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });
    // зупиняємо вспливання і стандартну поведінку
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    // для підсвічування області дропу
    function highlight(item) {
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
    }
    // для прибирання виділення області дропу
    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none";
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else if (item.closest('.col-md-3')) {
            item.closest('.file_upload').style.backgroundColor = "#f7e7e6";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }
    // застосування підсвічування по подіям; навішуємо подію на кожем інпут
    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });
    // скачування підсвічування при дропі чи відході від дроп зони
    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });
    // опрацювання дропу
    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            // файли, які завантажив користувач, dataTransfer - обєкт з файлом, який перетягуємо з файлової структури; тобто дропнуті файли передаємо в інпут
            input.files = e.dataTransfer.files;
            // відображаємо імя скинутого файла
            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = ".";
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name; 
        });
    });

};

export default drop;