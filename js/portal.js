import artigos from './portal-artigos.js';

const montarImagem = (imagem) => {
    if (/^https?:\/\//.test(imagem) || imagem.startsWith('/')) {
        return imagem;
    }

    return `../image%20portal/${imagem}`;
};

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('portal-grid');
    const resultado = document.getElementById('portal-resultado');
    const pagination = document.getElementById('portal-pagination');
    const btnBuscar = document.getElementById('btn-buscar');
    const btnLimpar = document.getElementById('btn-limpar');
    const selectArea = document.getElementById('busca-area');
    const inputPalavra = document.getElementById('busca-palavra');

    if (!grid || !resultado || !btnBuscar || !btnLimpar || !selectArea || !inputPalavra) {
        return;
    }

    const ARTIGOS_POR_PAGINA = 12;
    const MAX_NUMEROS_PAGINA = 10;

    let paginaAtual = 1;

    const normalizar = (valor) =>
        valor
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

    const obterAreaBusca = () => selectArea.value.trim();
    const obterTextoBusca = () => normalizar(inputPalavra.value);

    const combinarCampo = (artigo) => {
        const campos = [
            artigo.titulo,
            artigo.categoria,
            artigo.descricao,
            ...(artigo.palavrasChave ?? []),
        ];

        return normalizar(campos.join(' '));
    };

    const filtrarArtigos = () => {
        const area = obterAreaBusca();
        const palavra = obterTextoBusca();

        return artigos.filter((artigo) => {
            const combinaArea = !area || artigo.area === area;
            const combinaPalavra = !palavra || combinarCampo(artigo).includes(palavra);

            return combinaArea && combinaPalavra;
        });
    };

    const atualizarUrl = () => {
        const params = new URLSearchParams();
        const area = obterAreaBusca();
        const palavra = inputPalavra.value.trim();

        if (area) {
            params.set('area', area);
        }

        if (palavra) {
            params.set('q', palavra);
        }

        if (paginaAtual > 1) {
            params.set('page', String(paginaAtual));
        }

        const novaUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`;
        window.history.replaceState({}, '', novaUrl);
    };

    const obterPaginasVisiveis = (totalPaginas, paginaSelecionada) => {
        if (totalPaginas <= MAX_NUMEROS_PAGINA) {
            return Array.from({ length: totalPaginas }, (_, indice) => indice + 1);
        }

        const inicio = Math.max(1, Math.min(paginaSelecionada - 4, totalPaginas - MAX_NUMEROS_PAGINA + 1));
        const fim = Math.min(totalPaginas, inicio + MAX_NUMEROS_PAGINA - 1);

        return Array.from({ length: fim - inicio + 1 }, (_, indice) => inicio + indice);
    };

    const criarCard = (artigo) => `
        <article class="card-artigo-portal" data-id="${artigo.id}" data-area="${artigo.area}" data-keywords="${artigo.palavrasChave.join(', ')}">
            <img
                class="card-artigo-image"
                src="${montarImagem(artigo.imagem)}"
                alt="${artigo.titulo}"
                loading="lazy"
            />
            <div class="card-artigo-content">
                <div class="card-artigo-categoria">${artigo.categoria}</div>
                <h3 class="card-artigo-titulo">${artigo.titulo}</h3>
                <a class="card-artigo-link" href="${artigo.link}">Ler mais</a>
            </div>
        </article>
    `;

    const renderizarPaginacao = (totalItens, paginaSelecionada) => {
        if (!pagination) {
            return;
        }

        const totalPaginas = Math.max(1, Math.ceil(totalItens / ARTIGOS_POR_PAGINA));
        const paginasVisiveis = obterPaginasVisiveis(totalPaginas, paginaSelecionada);
        const prevDisabled = paginaSelecionada <= 1;
        const nextDisabled = paginaSelecionada >= totalPaginas;

        pagination.innerHTML = `
            <nav class="paginacao" aria-label="Navegação de páginas">
                <button
                    class="paginacao-prev${prevDisabled ? ' is-disabled' : ''}"
                    type="button"
                    data-page="${Math.max(1, paginaSelecionada - 1)}"
                    ${prevDisabled ? 'disabled aria-disabled="true"' : ''}
                >
                    <span aria-hidden="true">‹</span>
                    Anterior
                </button>

                <div class="paginacao-numeros" aria-label="Números das páginas">
                    ${paginasVisiveis
                        .map(
                            (pagina) => `
                                <button
                                    class="paginacao-numero${pagina === paginaSelecionada ? ' is-active' : ''}"
                                    type="button"
                                    data-page="${pagina}"
                                    ${pagina === paginaSelecionada ? 'aria-current="page"' : ''}
                                >
                                    ${pagina}
                                </button>
                            `
                        )
                        .join('')}
                </div>

                <button
                    class="paginacao-next${nextDisabled ? ' is-disabled' : ''}"
                    type="button"
                    data-page="${Math.min(totalPaginas, paginaSelecionada + 1)}"
                    ${nextDisabled ? 'disabled aria-disabled="true"' : ''}
                >
                    Próxima
                    <span aria-hidden="true">›</span>
                </button>
            </nav>
        `;
    };

    const renderizar = () => {
        const resultados = filtrarArtigos();
        const temFiltro = Boolean(obterAreaBusca() || obterTextoBusca());
        const totalPaginas = Math.max(1, Math.ceil(resultados.length / ARTIGOS_POR_PAGINA));

        paginaAtual = Math.min(Math.max(1, paginaAtual), totalPaginas);

        const inicio = (paginaAtual - 1) * ARTIGOS_POR_PAGINA;
        const itensDaPagina = resultados.slice(inicio, inicio + ARTIGOS_POR_PAGINA);

        btnLimpar.hidden = !temFiltro;
        resultado.innerHTML = temFiltro
            ? `<strong>${resultados.length}</strong> artigo(s) encontrado(s) - página <strong>${paginaAtual}</strong> de <strong>${totalPaginas}</strong>`
            : `<strong>${artigos.length}</strong> artigos disponíveis - página <strong>${paginaAtual}</strong> de <strong>${totalPaginas}</strong>`;

        if (!resultados.length) {
            grid.innerHTML = `
                <div class="artigos-vazio">
                    <h3>Nenhum artigo encontrado</h3>
                    <p>
                        Tente outra área ou uma palavra-chave diferente para refinar a busca.
                    </p>
                    <button type="button" id="portal-limpar-vazio">Limpar busca</button>
                </div>
            `;

            const limparVazio = document.getElementById('portal-limpar-vazio');
            limparVazio?.addEventListener('click', limparFiltros);

            if (pagination) {
                pagination.innerHTML = '';
            }

            atualizarUrl();
            return;
        }

        grid.innerHTML = itensDaPagina.map(criarCard).join('');
        renderizarPaginacao(resultados.length, paginaAtual);
        atualizarUrl();
    };

    const limparFiltros = () => {
        selectArea.value = '';
        inputPalavra.value = '';
        paginaAtual = 1;
        renderizar();
        inputPalavra.focus();
    };

    btnBuscar.addEventListener('click', () => {
        paginaAtual = 1;
        renderizar();
    });

    btnLimpar.addEventListener('click', limparFiltros);

    inputPalavra.addEventListener('input', () => {
        paginaAtual = 1;
        renderizar();
    });

    selectArea.addEventListener('change', () => {
        paginaAtual = 1;
        renderizar();
    });

    pagination?.addEventListener('click', (event) => {
        const target = event.target.closest('[data-page]');

        if (!target || target.disabled) {
            return;
        }

        const pagina = Number(target.dataset.page);

        if (Number.isNaN(pagina)) {
            return;
        }

        paginaAtual = pagina;
        renderizar();
    });

    inputPalavra.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            paginaAtual = 1;
            renderizar();
        }
    });

    const params = new URLSearchParams(window.location.search);
    const areaParam = params.get('area');
    const palavraParam = params.get('q');
    const pageParam = Number(params.get('page'));

    if (areaParam && ['familia', 'imobiliario'].includes(areaParam)) {
        selectArea.value = areaParam;
    }

    if (palavraParam) {
        inputPalavra.value = palavraParam;
    }

    if (Number.isInteger(pageParam) && pageParam > 0) {
        paginaAtual = pageParam;
    }

    renderizar();

    if (areaParam || palavraParam || (Number.isInteger(pageParam) && pageParam > 0)) {
        requestAnimationFrame(() => {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});
