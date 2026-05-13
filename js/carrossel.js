// ===================================
// CARROSSEL DE ARTIGOS
// ===================================

function inicializarCarrossel() {
    document.querySelectorAll('[data-carrossel]').forEach((carrossel) => {
        const wrapper = carrossel.querySelector('.carrossel-wrapper');
        const prev = carrossel.querySelector('.seta-prev');
        const next = carrossel.querySelector('.seta-next');

        if (!wrapper || !prev || !next) {
            return;
        }

        const getStep = () => {
            const card = wrapper.querySelector('.card-artigo');
            const gap = parseFloat(getComputedStyle(wrapper).gap) || 20;
            return card ? card.getBoundingClientRect().width + gap : 300;
        };

        const updateButtons = () => {
            const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
            prev.disabled = wrapper.scrollLeft <= 5;
            next.disabled = wrapper.scrollLeft >= maxScroll - 5;
        };

        prev.addEventListener('click', () => {
            wrapper.scrollBy({ left: -getStep(), behavior: 'smooth' });
        });

        next.addEventListener('click', () => {
            wrapper.scrollBy({ left: getStep(), behavior: 'smooth' });
        });

        wrapper.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);
        updateButtons();
    });
}

document.addEventListener('DOMContentLoaded', inicializarCarrossel);
