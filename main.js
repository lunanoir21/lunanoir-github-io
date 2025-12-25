document.addEventListener('DOMContentLoaded', () => {

    const translations = {
        tr: {
            hero_subtitle: "Minimalist. AI Developer. Vibe Coder. Shadow.",
            scroll_hint: "AŞAĞI KAYDIR",
            about_label: "HAKKIMDA",
            about_text: "Siber güvenlikle uğraşan ve boş zamanlarında AI ile vibe coding yapan biriyim.",
            projects_label: "PROJELERİM",
            umbtrace_desc: "Gelişmiş dijital iz sürme ve OSINT analiz motoru.",
            view_github: "GitHub'da İncele →",
            certs_label: "SERTİFİKALARIM",
            contact_label: "İLETİŞİM"
        },
        en: {
            hero_subtitle: "Minimalist. AI Developer. Vibe Coder. Shadow.",
            scroll_hint: "SCROLL DOWN",
            about_label: "ABOUT",
            about_text: "Cybersecurity specialist. Vibe coding with AI in the shadows.",
            projects_label: "PROJECTS",
            umbtrace_desc: "Advanced digital footprint tracking and OSINT analysis engine.",
            view_github: "View on GitHub →",
            certs_label: "CERTIFICATES",
            contact_label: "CONTACT"
        }
    };

    const langBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('lang') || 'tr';

    function updateLanguage() {
        if (langBtn) {
            langBtn.textContent = currentLang === 'tr' ? 'EN' : 'TR';
        }

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[currentLang] && translations[currentLang][key]) {
                el.innerText = translations[currentLang][key];
            }
        });

        document.documentElement.lang = currentLang;
        localStorage.setItem('lang', currentLang);
    }

    updateLanguage();

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'tr' ? 'en' : 'tr';
            updateLanguage();
        });
    }

    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            themeBtn.classList.add('rotate-anim');
            setTimeout(() => themeBtn.classList.remove('rotate-anim'), 500);
        });
    }

    const cursor = document.getElementById('cursor');

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        document.body.style.cursor = 'none';

        cursor.style.left = '50%';
        cursor.style.top = '50%';

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const links = document.querySelectorAll('a, button, .project-item, .cert-item');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            });
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    } else {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
        document.querySelectorAll('*').forEach(el => el.style.cursor = 'auto');
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section, footer');
    sections.forEach(section => {
        observer.observe(section);
    });
});
