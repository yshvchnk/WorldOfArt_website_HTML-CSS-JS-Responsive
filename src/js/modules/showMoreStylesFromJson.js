import { getResource } from "./services/requests";

const showMoreStylesFromJson = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);
    
    btn.addEventListener('click', function() {
        getResource('assets/db.json')
            // styles - масив в файлі json
            .then(res => createCards(res.styles))
            .catch(error => {
                console.log(error);
                const message = document.createElement('div');
                message.textContent = "Couldn't download more styles";
                message.style.height = '80px';
                message.style.textAlign = 'center';
                message.style.fontSize = '20px';
                document.querySelector('#styles').appendChild(message);
            });
        this.remove();
    });

    function createCards(response) {
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'animated', 'fadeInUp');
            card.innerHTML = `
                <div class=styles-block>
                    <img src=${src} alt = "style">
                    <h4>${title}</h4>
                    <a href="${link}">More</a>
                </div>
            `;
            document.querySelector(wrapper).appendChild(card);
        });
    }
};

export default showMoreStylesFromJson;