import { obterArtigosPorArea } from './portal-artigos.js';

const normalizarCaminhoDoLink = (link) => `../../portal/${link.replace('./', '')}`;

const criarCard = (artigo) => `
    <article class="card-artigo" data-id="${artigo.id}">
        <img
            class="card-artigo-image"
            src="${artigo.imagem}"
            alt="${artigo.titulo}"
            loading="lazy"
        />
        <div class="card-artigo-content">
            <div class="card-artigo-categoria">${artigo.categoria}</div>
            <h3 class="card-artigo-titulo">${artigo.titulo}</h3>
            <a class="card-artigo-link" href="${normalizarCaminhoDoLink(artigo.link)}">Ler mais</a>
        </div>
    </article>
`;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-carrossel-area]').forEach((carrossel) => {
        const area = carrossel.dataset.carrosselArea;
        const wrapper = carrossel.querySelector('.carrossel-wrapper');

        if (!area || !wrapper) {
            return;
        }

        const artigos = obterArtigosPorArea(area).slice(0, 8);

        wrapper.innerHTML = artigos.map(criarCard).join('');
    });
});
