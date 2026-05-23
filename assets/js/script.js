// ─────────────────────────────────────────
// SELETORES
// ─────────────────────────────────────────
const header = document.querySelector('header');
const formulario = document.querySelector('#formulario');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


// ─────────────────────────────────────────
// MENU HAMBURGUER
// ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('ativo');
    mobileMenu.classList.toggle('aberto');
    
});

// Fecha ao clicar em um link
mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('ativo');
        mobileMenu.classList.remove('aberto');
    });
});


// ─────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.rv').forEach(el => revealObserver.observe(el));

// ─────────────────────────────────────────
// LOTTIE
// Arquivo em: ./assets/animations/laptop.json
// ─────────────────────────────────────────
if (typeof lottie !== 'undefined') {
    lottie.loadAnimation({
        container: document.getElementById('lottie-container'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './assets/animations/laptop.json',
    });
}

// ─────────────────────────────────────────
// GITHUB — avatar da seção About
// ─────────────────────────────────────────
async function getAboutGitHub() {
    try {
        const res = await fetch('https://api.github.com/users/jeaninny');
        const data = await res.json();

        const avatar = document.querySelector('#about-avatar');
        if (avatar) {
            avatar.src = data.avatar_url;
            avatar.alt = data.name || 'Jeaninny Teixeira';
        }

        const githubLink = document.querySelector('#about-github');
        if (githubLink) githubLink.href = data.html_url;

    } catch (err) {
        console.error('Erro ao buscar perfil do GitHub:', err);
    }
}

// ─────────────────────────────────────────
// DADOS DE FALLBACK
// Usados quando a API falha ou para enriquecer
// repos sem descrição/topics/homepage
// ─────────────────────────────────────────
const FALLBACK_REPOS = [
    {
        name: 'blog-pessoal',
        language: 'TypeScript',
        description: 'API REST com autenticação JWT, documentação Swagger, TypeORM e deploy no Render. Backend NestJS + PostgreSQL.',
        topics: ['nestjs', 'jwt', 'swagger', 'postgresql'],
        html_url: 'https://github.com/jeaninny/blog-pessoal',
        homepage: 'https://blog-pessoal-production.up.railway.app',
        owner: { login: 'jeaninny' },
        stargazers_count: 0,
    },
    {
        name: 'blogpessoal-react',
        language: 'TypeScript',
        description: 'Frontend do blog em React + TypeScript. Integração com API NestJS, autenticação por token e gestão completa de postagens.',
        topics: ['react', 'vite', 'typescript'],
        html_url: 'https://github.com/jeaninny/blogpessoal-react',
        homepage: 'https://blogpessoal-blush.vercel.app',
        owner: { login: 'jeaninny' },
        stargazers_count: 0,
    },
    {
        name: 'fitness-backend',
        language: 'TypeScript',
        description: 'API REST de treinos personalizados com cálculo de IMC, autenticação JWT, NestJS e deploy no Render.',
        topics: ['nestjs', 'jwt', 'typescript'],
        html_url: 'https://github.com/jeaninny/fitness-backend',
        homepage: 'https://fitness-backend.onrender.com',
        owner: { login: 'jeaninny' },
        stargazers_count: 0,
    },
    {
        name: 'rh-backend',
        language: 'TypeScript',
        description: 'API de gestão de colaboradores com autenticação JWT, validação de dados e persistência em MySQL, estruturada com NestJS.',
        topics: ['nestjs', 'mysql', 'typescript'],
        html_url: 'https://github.com/jeaninny/rh-backend',
        homepage: '',
        owner: { login: 'jeaninny' },
        stargazers_count: 0,
    }
];

// Repos que não devem aparecer no portfólio
const REPOS_OCULTOS = ['jeaninny', 'portfolio'];

// Ordem preferida de exibição
const FEATURED_ORDER = [
    'blog-pessoal',
    'blogpessoal-react',
    'fitness-backend',
    'rh-backend',
];

// Cores das linguagens (dot colorido)
const LANG_COLORS = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
};

// Ícone de pessoas para o badge colaborativo
const PEOPLE_SVG = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
</svg>`;


// ─────────────────────────────────────────
// PAGINAÇÃO DE PROJETOS
// ─────────────────────────────────────────
const PER_PAGE = 4;
let allRepos = [];
let currentPage = 0;

function renderPage(animate = false) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const page = allRepos.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE);

    if (animate) {
        grid.style.opacity = '0';
        grid.style.transform = 'translateX(20px)';
        setTimeout(() => {
            grid.innerHTML = page.map(buildCard).join('');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    grid.style.opacity = '1';
                    grid.style.transform = 'translateX(0)';
                });
            });
        }, 250);
    } else {
        grid.innerHTML = page.map(buildCard).join('');
    }

    const total = allRepos.length;
    const from = currentPage * PER_PAGE + 1;
    const to = Math.min(from + PER_PAGE - 1, total);
    const counter = document.getElementById('proj-counter');
    if (counter) counter.textContent = `${from}–${to} de ${total}`;

    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    if (btnPrev) btnPrev.disabled = currentPage === 0;
    if (btnNext) btnNext.disabled = (currentPage + 1) * PER_PAGE >= total;
}

document.getElementById('btn-prev')?.addEventListener('click', () => {
    if (currentPage > 0) { currentPage--; renderPage(true); }
});
document.getElementById('btn-next')?.addEventListener('click', () => {
    if ((currentPage + 1) * PER_PAGE < allRepos.length) { currentPage++; renderPage(true); }
});

// ─────────────────────────────────────────
// BUILD CARD — monta o HTML de cada projeto
// ─────────────────────────────────────────
function buildCard(repo) {
    const lang = repo.language || '';
    const langColor = LANG_COLORS[lang] || '#888';
    const desc = repo.description || 'Repositório no GitHub.';

    let topics = Array.isArray(repo.topics) ? [...repo.topics].slice(0, 3) : [];
    if (!topics.length && lang) topics = [lang.toLowerCase()];

    const stackLine = topics
        .map(t => `<span class="hi">'${t}'</span>`)
        .join(', ');

    const nome = repo.name
        .replace(/[-_]/g, ' ')
        .replace(/[^a-zA-Z0-9\sÀ-ú]/g, '')
        .trim();

    const isOrg = repo.owner && repo.owner.login !== 'jeaninny';
    const orgBadge = isOrg
        ? `<div class="org-badge">${PEOPLE_SVG} Projeto colaborativo</div>`
        : '';

    const btnDeploy = repo.homepage
        ? `<a href="${repo.homepage}" target="_blank" class="lc dep">🚀 deploy</a>`
        : '';

    return `
        <article class="project-card">
            ${lang ? `<div class="project-lang">
                <span class="lang-dot" style="background:${langColor}"></span>
                ${lang}
            </div>` : ''}
            <div class="project-name">${nome}</div>
            <p class="project-desc">${desc}</p>
            ${orgBadge}
            <div class="project-stack">topics: [${stackLine}]</div>
            <div class="project-footer">
                <a href="${repo.html_url}" target="_blank" class="lc">↗ github</a>
                ${btnDeploy}
            </div>
        </article>
    `;
}

// ─────────────────────────────────────────
// GITHUB — busca projetos
// ─────────────────────────────────────────
async function getProjectsGitHub() {
    try {
        const [resJeaninny, resOrg] = await Promise.all([
            fetch('https://api.github.com/users/jeaninny/repos?per_page=100'),
            fetch('https://api.github.com/users/grupo6-js13/repos?per_page=100'),
        ]);

        if (!resJeaninny.ok) throw new Error('GitHub API indisponível');

        const reposJeaninny = await resJeaninny.json();
        const reposOrg = resOrg.ok ? await resOrg.json() : [];
        const todos = [...reposJeaninny, ...reposOrg];

        FALLBACK_REPOS.forEach(fb => {
            const match = todos.find(r => r.name === fb.name);
            if (match) {
                if (!match.description) match.description = fb.description;
                if (!match.topics || !match.topics.length) match.topics = fb.topics;
                if (!match.homepage) match.homepage = fb.homepage;
            }
        });

        allRepos = [...todos]
            .filter(r => !REPOS_OCULTOS.includes(r.name))
            .sort((a, b) => {
                const ai = FEATURED_ORDER.indexOf(a.name);
                const bi = FEATURED_ORDER.indexOf(b.name);
                if (ai > -1 && bi > -1) return ai - bi;
                if (ai > -1) return -1;
                if (bi > -1) return 1;
                return new Date(b.pushed_at) - new Date(a.pushed_at);
            });

        renderPage();

    } catch (err) {
        console.warn('Usando dados de fallback:', err.message);
        allRepos = [...FALLBACK_REPOS];
        renderPage();
    }
}

// ─────────────────────────────────────────
// FORMULÁRIO — validação
// ─────────────────────────────────────────
if (formulario) {
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        document.querySelectorAll('.form-error')
            .forEach(span => span.textContent = '');

        let isValid = true;

        const nome = document.querySelector('#nome');
        const erroNome = document.querySelector('#erro-nome');
        if (nome.value.trim().length < 3) {
            erroNome.textContent = 'O nome deve ter no mínimo 3 caracteres';
            if (isValid) nome.focus();
            isValid = false;
        }

        const email = document.querySelector('#email');
        const erroEmail = document.querySelector('#erro-email');
        if (!email.value.trim().match(emailRegex)) {
            erroEmail.textContent = 'Digite um endereço de e-mail válido';
            if (isValid) email.focus();
            isValid = false;
        }

        const assunto = document.querySelector('#assunto');
        const erroAssunto = document.querySelector('#erro-assunto');
        if (assunto.value.trim().length < 5) {
            erroAssunto.textContent = 'O assunto deve ter no mínimo 5 caracteres';
            if (isValid) assunto.focus();
            isValid = false;
        }

        const mensagem = document.querySelector('#mensagem');
        const erroMensagem = document.querySelector('#erro-mensagem');
        if (mensagem.value.trim().length === 0) {
            erroMensagem.textContent = 'A mensagem não pode ser vazia';
            if (isValid) mensagem.focus();
            isValid = false;
        }

        if (isValid) {
            const submitBtn = formulario.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            formulario.submit();
        }
    });
}

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────
getAboutGitHub();
getProjectsGitHub();