// ===================================
// PAGINA INTERNA DE ARTIGO
// ===================================

/**
 * CALCULO DE TEMPO DE LEITURA
 * Baseado em velocidade media: 250-300 palavras por minuto
 * Padrao usado: 275 palavras/min
 */
function calcularTempoLeitura() {
    const corpoArtigo = document.querySelector('.artigo-corpo');

    if (!corpoArtigo) {
        return 0;
    }

    // Extrair apenas texto (sem HTML)
    const texto = corpoArtigo.innerText || corpoArtigo.textContent || '';

    // Contar palavras (split por espaco e filtrar vazios)
    const palavras = texto
        .trim()
        .split(/\s+/)
        .filter((palavra) => palavra.length > 0).length;

    // Calcular minutos (275 palavras/min e o padrao)
    const velocidadeLeitura = 275;
    const minutos = Math.ceil(palavras / velocidadeLeitura);

    // Minimo de 1 minuto, maximo de 60
    return Math.max(1, Math.min(minutos, 60));
}

/**
 * ATUALIZAR BADGE DE TEMPO DE LEITURA
 * Insere minutos calculados no HTML
 */
function atualizarBadgeTempoLeitura() {
    const badge = document.querySelector('.artigo-leitura');

    if (!badge) {
        return;
    }

    const minutos = calcularTempoLeitura();
    badge.textContent = `📖 ${minutos} min de leitura`;
}

/**
 * FADE-IN EM SCROLL
 * Anima elementos quando entram no viewport
 */
function inicializarFadeInScroll() {
    if (!('IntersectionObserver' in window)) {
        return;
    }

    const elementos = document.querySelectorAll(
        '.pull-quote, .artigo-figura, .artigos-relacionados-interno'
    );

    if (!elementos.length) {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementos.forEach((elemento) => {
        observer.observe(elemento);
    });
}

/**
 * SMOOTH SCROLL PARA ANCORAS
 * Quando clicar em links internos, scroll suave
 */
function inicializarSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (evento) => {
            const alvo = document.querySelector(link.getAttribute('href'));

            if (!alvo) {
                return;
            }

            evento.preventDefault();

            alvo.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    });
}

/**
 * INICIALIZACAO GERAL
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Calcular e atualizar badge de tempo de leitura
    atualizarBadgeTempoLeitura();

    // 2. Inicializar fade-in ao scroll
    inicializarFadeInScroll();

    // 3. Inicializar smooth scroll para ancoras
    inicializarSmoothScroll();

    // 4. Navbar scroll (reutilizado de main.js)
    // Ja executado por main.js que esta linkado antes

    // 5. Carrossel (reutilizado de carrossel.js)
    // Ja executado por carrossel.js que esta linkado antes

    // 6. Artigos relacionados (reutilizado de areas-related.js)
    // Ja executado por areas-related.js que esta linkado antes
});
