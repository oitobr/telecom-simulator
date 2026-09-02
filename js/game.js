// ==========================================
// TELECOM SIMULATOR - GAME.JS
// Versão 1.0 - Sistema de interface
// ==========================================


// ==========================================
// ESTADO DO JOGO
// ==========================================

const gameState = {
    running: false,
    minimized: false,
    maximized: false,

    currentTab: "empresa",

    company: {
        name: "",
        brand: "",
        money: 0,
        customers: 0
    },

    date: {
        day: 1,
        month: 1,
        year: 2026
    }
};


// ==========================================
// ELEMENTOS DA INTERFACE
// ==========================================

const gameWindow = document.getElementById("game-window");
const mainMenu = document.getElementById("main-menu");
const gameInterface = document.getElementById("game-interface");
const navigationTabs = document.getElementById("navigation-tabs");
const contentArea = document.getElementById("content-area");

const playButton = document.getElementById("play-button");
const newGameButton = document.getElementById("new-game-button");
const continueButton = document.getElementById("continue-button");
const loadButton = document.getElementById("load-button");
const settingsButton = document.getElementById("settings-button");
const exitButton = document.getElementById("exit-button");

const minimizeButton = document.getElementById("minimize");
const maximizeButton = document.getElementById("maximize");
const closeButton = document.getElementById("close");


// ==========================================
// ABAS
// ==========================================

const tabs = [
    {
        id: "empresa",
        name: "Empresa",
        image: "assets/tabs/tab_empresa.png"
    },

    {
        id: "rede",
        name: "Rede",
        image: "assets/tabs/tab_rede.png"
    },

    {
        id: "clientes",
        name: "Clientes",
        image: "assets/tabs/tab_clientes.png"
    },

    {
        id: "financas",
        name: "Finanças",
        image: "assets/tabs/tab_financas.png"
    },

    {
        id: "planos",
        name: "Planos",
        image: "assets/tabs/tab_planos.png"
    },

    {
        id: "funcionarios",
        name: "Funcionários",
        image: "assets/tabs/tab_funcionarios.png"
    },

    {
        id: "marketing",
        name: "Marketing",
        image: "assets/tabs/tab_marketing.png"
    },

    {
        id: "tecnologia",
        name: "Tecnologia",
        image: "assets/tabs/tab_tecnologia.png"
    },

    {
        id: "estatisticas",
        name: "Estatísticas",
        image: "assets/tabs/tab_estatisticas.png"
    },

    {
        id: "noticias",
        name: "Notícias",
        image: "assets/tabs/tab_noticias.png"
    },

    {
        id: "ma",
        name: "M&A",
        image: "assets/tabs/tab_ma.png"
    }
];


// ==========================================
// CRIAR ABAS
// ==========================================

function createTabs() {

    navigationTabs.innerHTML = "";

    tabs.forEach(tab => {

        const button = document.createElement("button");

        button.className = "navigation-tab";

        button.dataset.tab = tab.id;

        button.title = tab.name;

        button.style.backgroundImage =
            `url("${tab.image}")`;

        button.addEventListener(
            "click",
            () => selectTab(tab.id)
        );

        navigationTabs.appendChild(button);
    });

    selectTab(gameState.currentTab);
}


// ==========================================
// SELECIONAR ABA
// ==========================================

function selectTab(tabId) {

    gameState.currentTab = tabId;

    const tabButtons =
        document.querySelectorAll(".navigation-tab");

    tabButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.tab === tabId
        );
    });

    showTabContent(tabId);
}


// ==========================================
// CONTEÚDO DAS ABAS
// ==========================================

function showTabContent(tabId) {

    const tab = tabs.find(
        item => item.id === tabId
    );

    if (!tab) {
        return;
    }

    contentArea.innerHTML = "";

    const title = document.createElement("h2");

    title.textContent = tab.name;

    title.style.fontSize = "22px";
    title.style.marginBottom = "10px";

    contentArea.appendChild(title);


    const message = document.createElement("p");

    message.textContent =
        `Painel de ${tab.name}.`;

    contentArea.appendChild(message);


    // ======================================
    // EMPRESA
    // ======================================

    if (tabId === "empresa") {

        contentArea.innerHTML = `
            <h2>Empresa</h2>

            <p>
                <strong>Empresa:</strong>
                ${gameState.company.name || "Nenhuma"}
            </p>

            <p>
                <strong>Marca:</strong>
                ${gameState.company.brand || "Nenhuma"}
            </p>

            <p>
                <strong>Dinheiro:</strong>
                R$ ${formatMoney(gameState.company.money)}
            </p>

            <p>
                <strong>Clientes:</strong>
                ${gameState.company.customers.toLocaleString("pt-BR")}
            </p>
        `;
    }


    // ======================================
    // OUTRAS ABAS
    // ======================================

    if (tabId === "rede") {
        contentArea.innerHTML = `
            <h2>Rede</h2>
            <p>Gerencie sua infraestrutura de telecomunicações.</p>
        `;
    }

    if (tabId === "clientes") {
        contentArea.innerHTML = `
            <h2>Clientes</h2>
            <p>Gerencie seus clientes e assinantes.</p>
        `;
    }

    if (tabId === "financas") {
        contentArea.innerHTML = `
            <h2>Finanças</h2>
            <p>Veja receitas, despesas, lucros e dívidas.</p>
        `;
    }

    if (tabId === "planos") {
        contentArea.innerHTML = `
            <h2>Planos</h2>
            <p>Crie e gerencie seus planos.</p>
        `;
    }

    if (tabId === "funcionarios") {
        contentArea.innerHTML = `
            <h2>Funcionários</h2>
            <p>Contrate e gerencie sua equipe.</p>
        `;
    }

    if (tabId === "marketing") {
        contentArea.innerHTML = `
            <h2>Marketing</h2>
            <p>Crie campanhas para sua empresa.</p>
        `;
    }

    if (tabId === "tecnologia") {
        contentArea.innerHTML = `
            <h2>Tecnologia</h2>
            <p>Pesquise e desbloqueie novas tecnologias.</p>
        `;
    }

    if (tabId === "estatisticas") {
        contentArea.innerHTML = `
            <h2>Estatísticas</h2>
            <p>Veja os dados e gráficos da sua empresa.</p>
        `;
    }

    if (tabId === "noticias") {
        contentArea.innerHTML = `
            <h2>Notícias</h2>
            <p>Acompanhe os acontecimentos do mercado.</p>
        `;
    }

    if (tabId === "ma") {
        contentArea.innerHTML = `
            <h2>M&A</h2>
            <p>Compre, venda e faça fusões com empresas.</p>
        `;
    }
}


// ==========================================
// FORMATAR DINHEIRO
// ==========================================

function formatMoney(value) {

    return Number(value).toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );
}


// ==========================================
// TELA PRINCIPAL
// ==========================================

function showMainMenu() {

    mainMenu.style.display = "flex";

    gameInterface.style.display = "none";

    gameState.running = false;
}


// ==========================================
// ABRIR JOGO
// ==========================================

function showGame() {

    mainMenu.style.display = "none";

    gameInterface.style.display = "flex";

    gameState.running = true;

    createTabs();

    console.log(
        "Telecom Simulator iniciado!"
    );
}


// ==========================================
// NOVO JOGO
// ==========================================

function newGame() {

    const companyName = prompt(
        "Digite o nome da sua empresa:"
    );

    if (!companyName) {
        return;
    }

    const brandName = prompt(
        "Digite o nome da marca:"
    );

    if (!brandName) {
        return;
    }

    gameState.company.name =
        companyName;

    gameState.company.brand =
        brandName;

    gameState.company.money =
        1000000;

    gameState.company.customers =
        0;

    gameState.date.day = 1;
    gameState.date.month = 1;
    gameState.date.year = 2026;

    gameState.currentTab =
        "empresa";

    saveGame();

    showGame();

    alert(
        `Empresa criada!\n\n` +
        `Empresa: ${companyName}\n` +
        `Marca: ${brandName}\n` +
        `Capital inicial: R$ 1.000.000,00`
    );
}


// ==========================================
// CONTINUAR
// ==========================================

function continueGame() {

    const savedGame =
        localStorage.getItem(
            "telecomSimulatorSave"
        );

    if (!savedGame) {

        alert(
            "Nenhum jogo salvo encontrado."
        );

        return;
    }

    try {

        const data =
            JSON.parse(savedGame);

        Object.assign(
            gameState,
            data
        );

        showGame();

    } catch (error) {

        console.error(error);

        alert(
            "Não foi possível carregar o jogo."
        );
    }
}


// ==========================================
// SALVAR
// ==========================================

function saveGame() {

    localStorage.setItem(
        "telecomSimulatorSave",
        JSON.stringify(gameState)
    );

    console.log(
        "Jogo salvo."
    );
}


// ==========================================
// CARREGAR
// ==========================================

function loadGame() {

    continueGame();
}


// ==========================================
// CONFIGURAÇÕES
// ==========================================

function openSettings() {

    alert(
        "CONFIGURAÇÕES\n\n" +
        "Este painel será desenvolvido posteriormente."
    );
}


// ==========================================
// SAIR
// ==========================================

function exitGame() {

    const confirmExit =
        confirm(
            "Tem certeza que deseja sair?"
        );

    if (!confirmExit) {
        return;
    }

    showMainMenu();
}


// ==========================================
// MINIMIZAR
// ==========================================

function minimizeGame() {

    gameState.minimized =
        !gameState.minimized;

    if (gameState.minimized) {

        gameWindow.style.transform =
            "scale(0.7)";

        gameWindow.style.opacity =
            "0.5";

    } else {

        gameWindow.style.transform =
            "scale(1)";

        gameWindow.style.opacity =
            "1";
    }
}


// ==========================================
// MAXIMIZAR
// ==========================================

function maximizeGame() {

    gameState.maximized =
        !gameState.maximized;

    gameWindow.classList.toggle(
        "maximized",
        gameState.maximized
    );
}


// ==========================================
// BOTÕES DO MENU
// ==========================================

playButton?.addEventListener(
    "click",
    showGame
);

newGameButton?.addEventListener(
    "click",
    newGame
);

continueButton?.addEventListener(
    "click",
    continueGame
);

loadButton?.addEventListener(
    "click",
    loadGame
);

settingsButton?.addEventListener(
    "click",
    openSettings
);

exitButton?.addEventListener(
    "click",
    exitGame
);


// ==========================================
// CONTROLES DA JANELA
// ==========================================

minimizeButton?.addEventListener(
    "click",
    minimizeGame
);

maximizeButton?.addEventListener(
    "click",
    maximizeGame
);

closeButton?.addEventListener(
    "click",
    exitGame
);


// ==========================================
// TECLADO
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        // ESC
        if (event.key === "Escape") {

            if (gameState.running) {
                showMainMenu();
            }
        }


        // CTRL + S
        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "s"
        ) {

            event.preventDefault();

            if (gameState.running) {
                saveGame();
            }
        }
    }
);


// ==========================================
// AUTOSAVE
// ==========================================

setInterval(
    function() {

        if (gameState.running) {
            saveGame();
        }

    },
    60000
);


// ==========================================
// INICIALIZAÇÃO
// ==========================================

showMainMenu();

console.log(
    "Telecom Simulator - Sistema carregado."
);
