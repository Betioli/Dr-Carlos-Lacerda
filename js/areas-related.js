import { obterArtigosPorArea } from './portal-artigos.js';

const normalizarCaminhoDoLink = (link) => `../../portal/${link.replace('./', '')}`;

const montarImagem = (imagem) => {
    if (/^https?:\/\//.test(imagem) || imagem.startsWith('/')) {
        return imagem;
    }

    // Detecta a profundidade pelo padrão da URL (funciona no Live Server E GitHub Pages)
    const pathname = window.location.pathname;
    let depth = 0;

    if (pathname.match(/\/portal\/artigos\//)) {
        depth = 3;  // portal/artigos/artigo-XXX/
    } else if (pathname.match(/\/areas\//)) {
        depth = 2;  // areas/nome-da-area/
    } else if (pathname.match(/\/portal\//)) {
        depth = 1;  // portal/
    }

    return '../'.repeat(depth) + 'image-portal/' + imagem;
};

// O código abaixo agora roda direto, sem o wrapper do DOMContentLoaded
document.querySelectorAll('[data-carrossel-area]').forEach((carrossel) => {
    const area = carrossel.dataset.carrosselArea;
    const wrapper = carrossel.querySelector('.carrossel-wrapper');

    if (!area || !wrapper) {
        return;
    }

    const artigos = obterArtigosPorArea(area).slice(0, 8);

    wrapper.innerHTML = artigos.map(criarCard).join('');
});