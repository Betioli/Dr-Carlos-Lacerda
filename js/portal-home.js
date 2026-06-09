import { obterArtigosHome } from './portal-artigos.js';

const montarImagem = (imagem) => {
    if (/^https?:\/\//.test(imagem) || imagem.startsWith('/')) {
        return imagem;
    }
    return `image-portal/${imagem}`;
};

// Função para inicializar o carrossel após os cards serem carregados
function reiniciarCarrossel() {
    // Pequeno delay para garantir que o DOM foi atualizado
    setTimeout(() => {
        if (typeof inicializarCarrossel === 'function') {
            inicializarCarrossel();
        }
    }, 150);
}

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('portal-home-wrapper');

    if (!wrapper) {
        console.warn('Elemento #portal-home-wrapper não encontrado');
        return;
    }

    // Carrega os artigos
    const artigosHTML = obterArtigosHome()
        .map((artigo) => `
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
        `)
        .join('');

    wrapper.innerHTML = artigosHTML;

    // Reinicia o carrossel depois de inserir os cards
    reiniciarCarrossel();
});