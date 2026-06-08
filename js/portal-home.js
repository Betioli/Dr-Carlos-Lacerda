import { obterArtigosHome } from './portal-artigos.js';

const montarImagem = (imagem) => {
    if (/^https?:\/\//.test(imagem) || imagem.startsWith('/')) {
        return imagem;
    }

    return `image-portal/${imagem}`;
};

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('portal-home-wrapper');

    if (!wrapper) {
        return;
    }

    wrapper.innerHTML = obterArtigosHome()
        .map(
            (artigo) => `
                <article class="card-artigo" data-id="${artigo.id}">
                    <img
                        class="card-artigo-image"
                        src="${montarImagem(artigo.imagem)}"
                        alt="${artigo.titulo}"
                        loading="lazy"
                    />
                    <div class="card-artigo-content">
                        <div class="card-artigo-categoria">${artigo.categoria}</div>
                        <h3 class="card-artigo-titulo">${artigo.titulo}</h3>
                        <a class="card-artigo-link" href="portal/${artigo.link.replace('./', '')}">Ler mais</a>
                    </div>
                </article>
            `
        )
        .join('');
});
