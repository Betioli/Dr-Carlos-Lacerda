const ROOT = '../../../';
const WHATSAPP_URL =
    'https://api.whatsapp.com/send/?phone=5516982057151&text=Ol%C3%A1%20Dr%20Carlos%20tudo%20j%C3%B3ia%20?%20Vim%20pelo%20site%20e%20preciso%20de%20sua%20ajuda.&type=phone_number&app_absent=0';

const buildNavbar = () => `
    <nav class="navbar">
      <div class="container">
        <a class="navbar-brand" href="${ROOT}index.html">
          <img
            src="${ROOT}image/Logo-nav-bar.png"
            alt="Logo Dr. Carlos Augusto Dias Lacerda"
            class="navbar-logo"
          />
          <div class="navbar-brand-text">
            <h2>Dr. Carlos Augusto Dias Lacerda</h2>
            <span>Advocacia e assessoria jurídica</span>
          </div>
        </a>
        <ul class="navbar-menu">
          <li><a href="${ROOT}index.html#home">Home</a></li>
          <li><a href="${ROOT}index.html#areas">Áreas de Atuação</a></li>
          <li><a href="${ROOT}index.html#como-funciona">Como Funciona</a></li>
          <li><a href="${ROOT}index.html#faq">FAQ</a></li>
          <li><a href="${ROOT}index.html#sobre">Sobre Nós</a></li>
          <li><a href="${ROOT}portal/index.html" class="active">Portal de conteúdo</a></li>
          <li><a href="${ROOT}index.html#contato" class="navbar-cta">Contato</a></li>
        </ul>
      </div>
    </nav>
`;

const buildCta = () => `
  <section class="secao-cta" id="contato">
    <div class="container">
      <h2 class="secao-titulo">Solicite orientação jurídica</h2>
      <a
        href="${WHATSAPP_URL}"
        class="btn-whatsapp"
        target="_blank"
        rel="noreferrer"
      >
        Entre em contato conosco
      </a>
    </div>
  </section>
`;

const buildFooter = () => `
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Menu Rápido</h4>
          <ul>
            <li><a href="${ROOT}index.html#home">Home</a></li>
            <li><a href="${ROOT}index.html#areas">Áreas de Atuação</a></li>
            <li><a href="${ROOT}index.html#como-funciona">Como Funciona</a></li>
            <li><a href="${ROOT}index.html#faq">FAQ</a></li>
            <li><a href="${ROOT}index.html#sobre">Sobre Nós</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Contato</h4>
          <p>WhatsApp: (16) 98205-7151</p>
          <p>Jaboticabal - SP</p>
        </div>

        <div class="footer-section">
          <h4>Redes Sociais</h4>
          <ul>
            <li>
              <a href="https://www.instagram.com/bms_trafego/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li><a href="#">LinkedIn</a></li>
            <li>
              <a href="${WHATSAPP_URL}" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-legal">
          <a>
            ⚖️ Aviso Legal: As informações contidas nesta página têm caráter
            exclusivamente informativo e não constituem promessa de resultado.
          </a>
        </div>

        <div class="footer-credits">
          <div class="footer-left">
            <p>&copy; 2026 Dr. Carlos Augusto Dias Lacerda - OAB/SP 327280</p>
          </div>
          <div class="footer-right">
            <a href="https://www.instagram.com/bms_trafego/" target="_blank" rel="noreferrer">
              Desenvolvido por BMS | Gestão de Tráfego pago
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
`;

const buildWhatsappFloat = () => `
  <a
    href="${WHATSAPP_URL}"
    class="whatsapp-float"
    target="_blank"
    aria-label="Falar no WhatsApp"
    rel="noreferrer"
  >
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.247 1.409 1.417-5.267-0.319-0.524c-1.342-2.201-2.054-4.738-2.054-7.323 0-7.51 6.11-13.62 13.62-13.62s13.62 6.11 13.62 13.62c0 7.51-6.11 13.62-13.62 13.62zM21.305 19.26c-0.346-0.174-2.049-1.007-2.366-1.123-0.317-0.116-0.547-0.174-0.776 0.174s-0.892 1.123-1.094 1.347c-0.201 0.224-0.402 0.251-0.748 0.076-0.346-0.174-1.461-0.537-2.785-1.711-1.03-0.914-1.725-2.044-1.927-2.39-0.201-0.346-0.022-0.533 0.152-0.707 0.156-0.155 0.346-0.402 0.518-0.603 0.174-0.201 0.231-0.346 0.346-0.571 0.116-0.224 0.058-0.427-0.028-0.603s-0.776-1.87-1.063-2.565c-0.28-0.672-0.56-0.58-0.776-0.591-0.201-0.010-0.428-0.012-0.656-0.012s-0.603 0.086-0.92 0.427c-0.317 0.346-1.206 1.179-1.206 2.873s1.235 3.333 1.406 3.561c0.174 0.224 2.425 3.732 5.872 5.234 0.821 0.354 1.462 0.566 1.962 0.724 0.825 0.262 1.577 0.225 2.168 0.137 0.662-0.099 2.045-0.835 2.332-1.642 0.288-0.807 0.288-1.501 0.201-1.642-0.086-0.14-0.317-0.224-0.663-0.398z"
      />
    </svg>
  </a>
`;

document.addEventListener('DOMContentLoaded', () => {
    if (!document.body.classList.contains('pagina-artigo')) {
        return;
    }

    const navbar = document.querySelector('nav.navbar');
    if (navbar) {
        navbar.outerHTML = buildNavbar();
    }

    const existingCta = document.querySelector('.secao-cta');
    if (existingCta) {
        existingCta.remove();
    }

    const existingFooter = document.querySelector('footer');
    const main = document.querySelector('main.artigo-page');
    const ctaWrapper = document.createElement('div');
    ctaWrapper.innerHTML = buildCta();
    const ctaSection = ctaWrapper.firstElementChild;

    if (main && ctaSection) {
        main.insertAdjacentElement('afterend', ctaSection);
    }

    if (existingFooter) {
        existingFooter.outerHTML = buildFooter();
    } else {
        const footerWrapper = document.createElement('div');
        footerWrapper.innerHTML = buildFooter();
        document.body.appendChild(footerWrapper.firstElementChild);
    }

    const existingWhatsapp = document.querySelector('.whatsapp-float');
    if (existingWhatsapp) {
        existingWhatsapp.remove();
    }

    const whatsappWrapper = document.createElement('div');
    whatsappWrapper.innerHTML = buildWhatsappFloat();
    document.body.appendChild(whatsappWrapper.firstElementChild);
});
