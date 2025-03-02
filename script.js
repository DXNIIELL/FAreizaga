document.addEventListener('DOMContentLoaded', () => {
    // Animación para las barras de habilidades
    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width;
            }
        });
    };

    const skillObserver = new IntersectionObserver(animateSkillBars, {
        threshold: 0.5
    });

    document.querySelectorAll('.skill-progress').forEach(progress => {
        progress.dataset.width = progress.style.width;
        progress.style.width = '0';
        skillObserver.observe(progress);
    });

    // Efecto hover para los paneles de cristal
    document.querySelectorAll('.glass-panel').forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            panel.style.setProperty('--mouse-x', `${x}px`);
            panel.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Funcionalidad del menú de accesibilidad
    const accessibilityButton = document.querySelector('.accessibility-button');
    const accessibilityMenu = document.querySelector('.accessibility-menu');
    
    // Toggle del menú
    accessibilityButton.addEventListener('click', () => {
        accessibilityMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!accessibilityMenu.contains(e.target) && !accessibilityButton.contains(e.target)) {
            accessibilityMenu.classList.remove('active');
        }
    });

    // Funciones de accesibilidad
    const accessibilityFunctions = {
        'increase-text': () => document.body.classList.toggle('increased-text'),
        'decrease-text': () => document.body.classList.toggle('decreased-text'),
        'grayscale': () => document.body.classList.toggle('grayscale'),
        'high-contrast': () => document.body.classList.toggle('high-contrast'),
        'negative-contrast': () => document.body.classList.toggle('negative-contrast'),
        'light-background': () => document.body.classList.toggle('light-background'),
        'underline-links': () => document.body.classList.toggle('underline-links'),
        'readable-font': () => document.body.classList.toggle('readable-font'),
        'reset': () => {
            document.body.className = document.body.className
                .split(' ')
                .filter(c => !c.match(/increased-text|decreased-text|grayscale|high-contrast|negative-contrast|light-background|underline-links|readable-font/))
                .join(' ');
        }
    };

    // Agregar event listeners a los botones
    document.querySelectorAll('.accessibility-menu button').forEach(button => {
        const action = button.dataset.action;
        if (accessibilityFunctions[action]) {
            button.addEventListener('click', accessibilityFunctions[action]);
        }
    });

    // Funcionalidad del modo oscuro
    const darkModeButton = document.querySelector('.dark-mode-button');
    const darkModeIcon = darkModeButton.querySelector('i');
    
    // Verificar si hay una preferencia guardada
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    }

    darkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Cambiar el ícono
        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'true');
        } else {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // Funcionalidad del cambio de idioma
    const languageButton = document.querySelector('.language-toggle-button');
    const languageIcon = languageButton.querySelector('i');
    
    // Verificar si hay una preferencia guardada
    const isEnglish = localStorage.getItem('language') === 'en';
    if (isEnglish) {
        document.body.classList.add('english');
    }

    // Textos en ambos idiomas
    const translations = {
        es: {
            skills: "Habilidades",
            languages: "Idiomas",
            certifications: "Certificaciones",
            projects: "Proyectos",
            jrDev: "Jr Developer",
            spanish: "Español",
            english: "Inglés",
            portuguese: "Portugués",
            // Certificaciones
            pythonSecurity: "Automatiza las tareas de ciberseguridad con Python",
            googleCyber: "Certificado de Ciberseguridad de Google",
            googleAI: "Google AI Essentials",
            cyberFundamentals: "Fundamentos de la ciberseguridad",
            linuxSQL: "Herramientas del oficio: Linux y SQL",
            databaseAdmin: "Administrador de bases de datos",
            riskManagement: "Manejo de riesgos",
            networkSecurity: "Conexión y protección: Redes y seguridad de redes",
            dataUsage: "Uso de información y datos"
        },
        en: {
            skills: "Skills",
            languages: "Languages",
            certifications: "Certifications",
            projects: "Projects",
            jrDev: "Jr Developer",
            spanish: "Spanish",
            english: "English",
            portuguese: "Portuguese",
            // Certifications
            pythonSecurity: "Automate Cybersecurity Tasks with Python",
            googleCyber: "Google Cybersecurity Certificate",
            googleAI: "Google AI Essentials",
            cyberFundamentals: "Cybersecurity Fundamentals",
            linuxSQL: "Tools of the Trade: Linux and SQL",
            databaseAdmin: "Database Administrator",
            riskManagement: "Risk Management",
            networkSecurity: "Connection and Protection: Networks and Network Security",
            dataUsage: "Information and Data Usage"
        }
    };

    languageButton.addEventListener('click', () => {
        document.body.classList.toggle('english');
        const isEnglish = document.body.classList.contains('english');
        localStorage.setItem('language', isEnglish ? 'en' : 'es');
        
        // Actualizar textos
        const lang = isEnglish ? 'en' : 'es';
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    });
});