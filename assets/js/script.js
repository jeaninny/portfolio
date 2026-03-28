// Seção Header
const header = document.querySelector("header");

// Seção about
const about = document.querySelector("#about");

// Seção Projects
const swiperWrapper = document.querySelector(".swiper-wrapper");

// Formulário
const formulario = document.querySelector("#formulario");

// Expressão Regular de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


// Evento para desaparecer borda do cabeçalho ao rolar a página

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add("sem-borda");
    } else {
        header.classList.remove("sem-borda");
    }  
});


// Função de preenchimento da Seção About
async function getAboutGitHub() {

    try {
        // Requisição do tipo GET para a API do GitHub
        const resposta = await fetch("https://api.github.com/users/jeaninny");

        // Converter a Resposta para JSON
        const perfil = await resposta.json();

        // Avatar
        const avatar = document.querySelector("#about-avatar");
        avatar.src = perfil.avatar_url;
        avatar.alt = perfil.name;

        // Link GitHub
        const githubLink = document.querySelector("#about-github");
        githubLink.href = perfil.html_url;

        // Seguidores
        const followers = document.querySelector("#followers");
        followers.textContent = perfil.followers;

        // Repositórios
        const repos = document.querySelector("#repos");
        repos.textContent = perfil.public_repos;

    } catch (error) {
        console.error("Erro ao buscar dados no GitHub", error);
    }
}

// Função buscar os dados dos projetos

async function getProjectsGitHub() {
    try {
        // Requisição do tipo GET para a API do GitHub
        const resposta = await fetch("https://api.github.com/users/jeaninny/repos");        

        // Converter a Resposta para JSON
        const repositorios = await resposta.json();

        // Selecionar repositórios específicos pelos IDs dos repositórios desejados
        const repositoriosEscolhidos = [
            1170686198, //projeto blog pessoal
            1176864908, //projeto loja games generation
            1149017635, //projeto conta bancária
            1152808978, //projeto farmácia
            1154494885, //projeto final bloco_01 ecommerce
            1184299032, //projeto final bloco_02 farmácia
        ];
        
        // Filtrar os repositórios
        const reposFiltrados = repositorios.filter(repo =>
            repositoriosEscolhidos.includes(repo.id)
        );


        swiperWrapper.innerHTML = "";

        // Cores e ícones das linguagens
        const linguagens = {
            "JavaScript": { icone: "javascript" },
            "TypeScript": { icone: "typescript" },
            "Python": { icone: "python" },
            "Java": { icone: "java" },
            "HTML": { icone: "html" },
            "CSS": { icone: "css" },
            "PHP": { icone: "php" },
            "C#": { icone: "csharp" },
            "Go": { icone: "go" },
            "Kotlin": { icone: "kotlin" },
            "Swift": { icone: "swift" },
            "GitHub": { icone: "github" },
        };

        reposFiltrados.forEach(repositorio => {
            // Identifica a Linguagem padrão do Repositório
            const linguagem = repositorio.language || "GitHub";

            // Seleciona o ícone da Linguagem Padrão
            const config = linguagens[linguagem] || linguagens["GitHub"];

            // Monta a URL que aponta para o ícone da linguagem padrão
            const urlIcone = `./assets/icons/languages/${config.icone}.svg`;

            // Formata o Nome do repositório
            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, " ") // Substitui hifens e underlines por espaços em banco
                .replace(/[^a-zA-Z0-9\s]/g, "") //Remove caracteres especiais
                .toUpperCase(); // Converte a string em letras maiúsculas

            // Descrição do Reposótio
            const descricao = repositorio.description
                ? (repositorio.description.length > 100
                    ? repositorio.description.substring(0, 97) + "..."
                    : repositorio.description)
                : "Projeto desenvolvido no GitHub";

            // Tags do Repositório
            const tags = repositorio.topics?.length > 0
                ? repositorio.topics
                .slice(0, 3).
                map(topic => `<span class="tag">${topic}</span>`)
                .join("")
                : `<span class="tag">${linguagem}</span>`;

            // Botões de ação (Renderização condicional do botão deploy)
            const botoesAcao = `
            <!-- Links do Projeto -->
            <div class="project-buttons">
            <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
            GitHub
            </a>
            ${repositorio.homepage ?
                    `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">
            Deploy
            </a>`
                    : ""}
            </div>
            `

            // Construir o Card
            swiperWrapper.innerHTML += `
                    <div class="swiper-slide">
                        <article class="project-card">

                            <!-- Ícone da Tecnologia padrão do projeto -->
                            <figure class="project-image">
                                <img src="${urlIcone}"
                                alt="Ícone ${linguagem}"
                                >
                            </figure>

                            <!-- Conteúdo do Projeto -->
                            <div class="project-content">
                                <h3>${nomeFormatado}</h3>
                                <p>${descricao}</p>

                                <!-- Tags do Projeto -->
                                <div class="project-tags">
                                    ${tags}
                                </div>
                                ${botoesAcao}
                            </div>
                        </article>
                    </div>
            `
        })
        // Executa a função iniciarSwiper
        iniciarSwiper()
    
    } catch (error) {
        console.error("Erro ao buscar dados no GitHub", error);
    }
}

function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false
            },
            769: { 
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false
            },
            1025: { 
                slidesPerView: 3,
                slidesPerGroup: 3, 
                spaceBetween: 54,
                centeredSlides: false
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        grabCursor: true, 
        slidesOffsetBefore: 0, 
        slidesOffsetAfter: 0, 
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    document.querySelectorAll("form span")
    .forEach(span => span.innerHTML = "");

    let isValid = true;

    const nome = document.querySelector("#nome");
    const erroNome = document.querySelector("#erro-nome");

    if (nome.value.trim().length < 3) {
        erroNome.innerHTML = "O nome deve ter no mínimo 3 caracteres";
        if (isValid) nome.focus();
        isValid = false;
    }

    const email = document.querySelector("#email");
    const erroEmail = document.querySelector("#erro-email");

    if (!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = "Digite um endereço de e-mail válido";
        if (isValid) email.focus();
        isValid = false;
    }

    const assunto = document.querySelector("#assunto");
    const erroAssunto = document.querySelector("#erro-assunto");

    if (assunto.value.trim().length < 5) {
        erroAssunto.innerHTML = "O assunto deve ter no mínimo 5 caracteres";
        if (isValid) assunto.focus();
        isValid = false;
    }

    const mensagem = document.querySelector("#mensagem");
    const erroMensagem = document.querySelector("#erro-mensagem");

    if (mensagem.value.trim().length === 0) {
        erroMensagem.innerHTML = "A mensagem não pode ser vazia";
        if (isValid) mensagem.focus();
        isValid = false;
    }
    
    if (isValid) {
        const submitButton = formulario.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";

        formulario.submit();
    }
});


// Executar a função getAboutGitHub
getAboutGitHub();

// Executar a função getProjectsGitHub
getProjectsGitHub();