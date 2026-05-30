document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const updateNavbarState = () => {
        if (!navbar) {
            return;
        }

        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };

    updateNavbarState();
    window.addEventListener('scroll', updateNavbarState, { passive: true });

    const faqTabsContainer = document.querySelector('[data-faq-tabs]');
    const faqTabs = faqTabsContainer
        ? Array.from(faqTabsContainer.querySelectorAll('[data-faq-tab]'))
        : [];
    const faqIndicator = faqTabsContainer
        ? faqTabsContainer.querySelector('.faq-tabs-indicator')
        : null;
    const faqPanels = Array.from(document.querySelectorAll('[data-faq-panel]'));
    const faqItems = Array.from(document.querySelectorAll('.faq-item'));

    const positionIndicator = () => {
        if (!faqTabsContainer || !faqIndicator || !faqTabs.length) {
            return;
        }

        const activeTab =
            faqTabs.find((tab) => tab.classList.contains('is-active')) ??
            faqTabs[0];
        const containerRect = faqTabsContainer.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();
        const offsetLeft = tabRect.left - containerRect.left;

        faqIndicator.style.width = `${tabRect.width}px`;
        faqIndicator.style.transform = `translateX(${offsetLeft}px)`;
    };

    const closeAllFaqItems = () => {
        faqItems.forEach((item) => item.classList.remove('active'));
    };

    const setActiveFaqTab = (tabKey) => {
        faqTabs.forEach((tab) => {
            const isActive = tab.dataset.faqTab === tabKey;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        faqPanels.forEach((panel) => {
            panel.classList.toggle('is-active', panel.dataset.faqPanel === tabKey);
        });

        closeAllFaqItems();
        requestAnimationFrame(positionIndicator);
    };

    faqTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            setActiveFaqTab(tab.dataset.faqTab);
        });
    });

    faqItems.forEach((item) => {
        const pergunta = item.querySelector('.faq-pergunta');

        if (!pergunta) {
            return;
        }

        pergunta.addEventListener('click', () => {
            const panel = item.closest('.faq-panel');
            const activePanel = faqPanels.find((faqPanel) =>
                faqPanel.classList.contains('is-active')
            );

            if (panel && activePanel && panel !== activePanel) {
                return;
            }

            const isActive = item.classList.contains('active');

            if (panel) {
                panel.querySelectorAll('.faq-item.active').forEach((openItem) => {
                    openItem.classList.remove('active');
                });
            }

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    const initialTab = faqTabs.find((tab) => tab.classList.contains('is-active'));
    if (initialTab?.dataset.faqTab) {
        setActiveFaqTab(initialTab.dataset.faqTab);
    } else if (faqTabs[0]?.dataset.faqTab) {
        setActiveFaqTab(faqTabs[0].dataset.faqTab);
    }

    window.addEventListener('resize', positionIndicator, { passive: true });

    if ('ResizeObserver' in window && faqTabsContainer) {
        const observer = new ResizeObserver(positionIndicator);
        observer.observe(faqTabsContainer);
    }

    if (!('IntersectionObserver' in window)) {
        return;
    }

    const elementosAnimados = document.querySelectorAll(
        '.consequencia-card, .diferencial-card, .problema-card, .resolve-item, .onde-react-card, .onde-react-copy, .onde-react-globe, .faq-item'
    );

    if (!elementosAnimados.length) {
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

    elementosAnimados.forEach((elemento) => {
        observer.observe(elemento);
    });
});
