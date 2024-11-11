// Imagem default
defaultContent = `
    <div class='item-img'>
        <img src='images/technician.webp'>
    </div>
    <div class='item-description'>
        Check out our opportunities for graduate students and makers!
    </div>
`;
defaultDiv = document.getElementById('dynamic-content');
defaultDiv.innerHTML = defaultContent;

// Trocar imagem
function content(item) {
    const contentDiv = document.getElementById('dynamic-content');
    let content = '';

    switch (item) {
        case 'item1':
            content = `
                <div class='item-img'>
                    <img src='images/technician.webp'>
                </div>
                <div class='item-description'>
                    Check out our opportunities for graduate students and makers!
                </div>
            `;
            break;

        case 'item2':
            content = `
                <div class='item-img'>
                    <img src='images/factoryimg.jpg'>
                </div>
                <div class='item-description'>
                    Expand your silicon wafer supply with us!
                </div>
            `;
            break;

        case 'item3':
            content = `
            <div class='item-img'>
                <img src='images/outsideimg.jpg'>
            </div>
            <div class='item-description'>
                <p>We obtained 71% renewable electricity in 2023!</p>
            </div>
        `;
            break;

        default:
            content = `
                <h2>Bem-vindo!</h2>
                <p>Clique em um item à esquerda para mudar o conteúdo.</p>
            `;
    }
    // console.log("chegou aqui" + item);

    contentDiv.innerHTML = content;
}



// MOB - TOP1

var images = [
    'images/arduino.jpg',
    'images/silicon.jpg',
    'images/privacyy.png'
];
let text = [
    'Advanced development board: high-performance microcontroller, GPIO, USB, I2C, SPI, UART. Ideal for prototyping, IoT, automation.',
    'High-tech methodologies ensure superior quality and sustainable practices for unmatched performance, including advanced silicon wafer technologies.',
    'Advanced circuit design focuses on secure, reliable performance, using innovative techniques to safeguard data and enhance resilience.'
];

var currentImageIndex = 0;

function previousImg() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = images.length - 1;
    }
    updateSlider();
}

function nextImg() {
    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0;
    }
    updateSlider();
}

function updateSlider() {
    var imgElement = document.getElementById('slider-image');
    imgElement.src = images[currentImageIndex];

    var textElement = document.getElementById('mob-top1-text');

    // texto
    textElement.textContent = text[currentImageIndex];
}



// TOP 1 DESKTOP AUTO-SLIDER
const carouselContainer = document.querySelector('.carousel-container');
const blocks = document.querySelectorAll('.block');

let interval = setInterval(nextSlider, 4000);
let index = 0;

function nextSlider() {
    index++;
    if (index >= blocks.length) {
        index = 0;
    }

    const translateValue = index * 390 + 40; // 390 é a largura do bloco

    // se estiver no index 1 (ir para segunda imagem) ele calcula com gap, se for a primeira, sem gap
    index != 0 ? carouselContainer.style.transform = `translateX(-${translateValue}px)` : carouselContainer.style.transform = `translateX(-${translateValue - 40}px)`
    index > 1 ? carouselContainer.style.transform = `translateX(-${translateValue + 40}px)` : 0;

    resetSliderInterval();
}

function previousSlide() {
    index--;

    if (index < 0) {
        index = blocks.length - 1;
        const translateValue = index * 390 + 80;
        carouselContainer.style.transform = `translateX(-${translateValue}px)`;
        resetSliderInterval();
        return;
    }

    const translateValue = index * 390 + 40; // 390 é a largura do bloco

    // se estiver no index 1 (ir para segunda imagem) ele calcula com gap, se for a primeira, sem gap
    index > 0 ? carouselContainer.style.transform = `translateX(-${translateValue}px)` : carouselContainer.style.transform = `translateX(-${translateValue - 40}px)`
    resetSliderInterval();
}


function resetSliderInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlider, 4000);
}




// PRODUCTS

fetch('vmore.json')
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById('product-list');
        products.forEach(produto => {
            const item = document.createElement('li');
            const link = document.createElement('a');
            // O link vai para produto.html?id=produto1, produto2, etc.
            link.href = `produto.html?id=${produto.id}`;
            link.textContent = `${produto.nome}`;
            item.appendChild(link);
            productList.appendChild(item);
        });
    });

//Coloca o email do usuário no title do icone do usuário

document.addEventListener('DOMContentLoaded', function() {
    let userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
        console.log('Valor de userEmail recuperado do localStorage:', userEmail);

        const classDoIcone = document.querySelector(".current-user");
        if (classDoIcone) {
            classDoIcone.title = userEmail;
        }
    } else {
        console.error("userEmail não encontrado no localStorage.");
    }
});