// Seleciona os elementos do menu hambúrguer e links
const hamburger = document.querySelector('.hamburger'); // Ícone do menu hambúrguer
const mobileMenu = document.querySelector('.nav-links-mobile'); // Menu de navegação mobile
const dropdownToggle = document.querySelectorAll('.dropdown-toggle'); // Seleciona todos os itens de dropdown

// Função para alternar entre abrir e fechar o menu mobile e mudar o ícone do hambúrguer
hamburger.addEventListener('click', () => {
    // Alterna a classe 'active' para exibir ou ocultar o menu
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Mudar o ícone de hambúrguer para X quando o menu estiver ativo
    const icon = hamburger.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.replace('bi-list', 'bi-x'); // Troca o ícone para 'X'
    } else {
        icon.classList.replace('bi-x', 'bi-list'); // Troca o ícone para 'lista' quando fechado
    }
});

// Função para alternar os dropdowns no menu mobile
dropdownToggle.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault(); // Previne o comportamento padrão de redirecionamento de link

        // Encontra o dropdown pai e alterna a classe 'active' para exibir ou ocultar os itens do dropdown
        const parentDropdown = toggle.closest('.dropdown');
        parentDropdown.classList.toggle('active');
    });
});

// Fecha o menu mobile ao clicar fora dele
document.addEventListener('click', (e) => {
    // Verifica se o clique foi fora do menu ou do ícone hambúrguer
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('active'); // Fecha o menu
        hamburger.classList.remove('active'); // Reseta a classe do ícone hambúrguer

        // Volta o ícone para o hambúrguer (bi-list)
        const icon = hamburger.querySelector('i');
        icon.classList.replace('bi-x', 'bi-list');
    }
});







let currentSlide = 0;
let slidesToShow = 3; // Número de slides visíveis inicialmente
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let startX; // Para detectar o ponto inicial do toque
let isMobile = window.innerWidth <= 768; // Detectar se o dispositivo é mobile

// Função para mover os slides e garantir que eles apareçam por completo
function moveSlide(step) {
    currentSlide += step;

    if (currentSlide < 0) {
        currentSlide = totalSlides - slidesToShow;
    } else if (currentSlide > totalSlides - slidesToShow) {
        currentSlide = 0;
    }

    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(${-currentSlide * (100 / slidesToShow)}%)`;
    updateDots();
}

// Função para ir a um slide específico com as bolinhas
function goToSlide(index) {
    currentSlide = index;
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(${-currentSlide * (100 / slidesToShow)}%)`;
    updateDots();
}

// Atualizar as bolinhas indicadoras
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Detectar mudança de tela para ajustar o número de slides visíveis e bolinhas
function adjustSlides() {
    if (window.innerWidth <= 480) {
        slidesToShow = 1;
    } else if (window.innerWidth <= 768) {
        slidesToShow = 2;
    } else {
        slidesToShow = 3;
    }
    moveSlide(0); // Ajustar o slide visível após o resize
    updateDots(); // Atualizar bolinhas com base no número de slides visíveis
}

// Suporte a toque (touch) no mobile
const slider = document.querySelector('.slider');

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX > endX + 50) {
        // Deslizar para a esquerda (próximo slide)
        moveSlide(1);
    } else if (startX < endX - 50) {
        // Deslizar para a direita (slide anterior)
        moveSlide(-1);
    }
});

// Inicializar com o número correto de slides visíveis e as bolinhas
window.addEventListener('resize', adjustSlides);
adjustSlides();












