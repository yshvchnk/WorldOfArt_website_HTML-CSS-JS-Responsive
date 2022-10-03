const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key.match(/[^a-z 0-9]/ig)) {
                // якщо умова не виконується
                e.preventDefault();
            }
        });
    });
};

export default checkTextInputs;