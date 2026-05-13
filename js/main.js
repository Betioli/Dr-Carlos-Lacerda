document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const pergunta = item.querySelector('.faq-pergunta');

        if (!pergunta) {
            return;
        }

        pergunta.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach((faqItem) => faqItem.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    if (!('IntersectionObserver' in window)) {
        return;
    }

    const elementosAnimados = document.querySelectorAll(
        '.consequencia-card, .diferencial-card, .problema-card, .resolve-item, .faq-item'
    );

    if (!elementosAnimados.length) {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
