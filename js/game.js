// ==========================================
// TELECOM SIMULATOR - GAME.JS
// Versão 1.0 - Base do jogo
// ==========================================

// Estado básico do jogo
const gameState = {
    running: false,
    minimized: false,
    maximized: false,

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
// FUNÇÕES DE TELA
// ==========================================

function showMainMenu() {
    mainMenu.style.display = "flex";
    gameInterface.style.display = "none";
}

function showGame() {
    mainMenu.style.display = "none";
    gameInterface.style.display = "block";

    gameState.running = true;

    console.log("Telecom Simulator iniciado!");
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

    gameState.company.name = companyName;
    gameState.company.brand = brandName;

    // Capital inicial
    gameState.company.money = 1000000;

    // Clientes iniciais
    gameState.company.customers = 0;

    // Data inicial
    gameState.date.day = 1;
    gameState.date.month = 1;
    gameState.date.year = 2026;

    saveGame();

    showGame();

    alert(
        `Empresa criada!\n\n` +
        `Empresa: ${companyName}\n` +
        `Marca: ${brandName}\n` +
        `Capital inicial: R$ 1.000.000`
    );
}


// ==========================================
// CONTINUAR
// ==========================================

function continueGame() {

    const savedGame = localStorage.getItem(
        "telecomSimulatorSave"
    );

    if (!savedGame) {
        alert("Nenhum jogo salvo encontrado.");
        return;
    }

    try {

        const data = JSON.parse(savedGame);

        Object.assign(gameState, data);

        showGame();

        alert(
            `Jogo carregado!\n\n` +
            `Empresa: ${gameState.company.brand}`
        );

    } catch (error) {

        console.error(error);

        alert(
            "Não foi possível carregar o jogo."
        );
    }
}


// ==========================================
// SALVAR JOGO
// ==========================================

function saveGame() {

    localStorage.setItem(
        "telecomSimulatorSave",
        JSON.stringify(gameState)
    );

    console.log("Jogo salvo.");
}


// ==========================================
// CARREGAR JOGO
// ==========================================

function loadGame() {

    const savedGame = localStorage.getItem(
        "telecomSimulatorSave"
    );

    if (!savedGame) {

        alert(
            "Não existe nenhum jogo salvo."
        );

        return;
    }

    continueGame();
}


// ==========================================
// CONFIGURAÇÕES
// ==========================================

function openSettings() {

    alert(
        "CONFIGURAÇÕES\n\n" +
        "As configurações serão adicionadas aqui.\n\n" +
        "• Volume\n" +
        "• Música\n" +
        "• Efeitos sonoros\n" +
        "• Tela cheia\n" +
        "• Qualidade gráfica\n" +
        "• Velocidade do jogo"
    );
}


// ==========================================
// SAIR
// ==========================================

function exitGame() {

    const confirmExit = confirm(
        "Tem certeza que deseja sair?"
    );

    if (!confirmExit) {
        return;
    }

    // Em navegador não podemos fechar a aba
    // livremente. Então voltamos para o menu.

    gameState.running = false;

    showMainMenu();
}


// ==========================================
// MINIMIZAR
// ==========================================

function minimizeGame() {

    gameState.minimized = !gameState.minimized;

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

    if (gameState.maximized) {

        gameWindow.classList.add(
            "maximized"
        );

    } else {

        gameWindow.classList.remove(
            "maximized"
        );
    }
}


// ==========================================
// BOTÕES DO MENU
// ==========================================

if (playButton) {

    playButton.addEventListener(
        "click",
        showGame
    );
}

if (newGameButton) {

    newGameButton.addEventListener(
        "click",
        newGame
    );
}

if (continueButton) {

    continueButton.addEventListener(
        "click",
        continueGame
    );
}

if (loadButton) {

    loadButton.addEventListener(
        "click",
        loadGame
    );
}

if (settingsButton) {

    settingsButton.addEventListener(
        "click",
        openSettings
    );
}

if (exitButton) {

    exitButton.addEventListener(
        "click",
        exitGame
    );
}


// ==========================================
// CONTROLES DA JANELA
// ==========================================

if (minimizeButton) {

    minimizeButton.addEventListener(
        "click",
        minimizeGame
    );
}

if (maximizeButton) {

    maximizeButton.addEventListener(
        "click",
        maximizeGame
    );
}

if (closeButton) {

    closeButton.addEventListener(
        "click",
        exitGame
    );
}


// ==========================================
// TECLADO
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        // ESC volta para o menu
        if (event.key === "Escape") {

            if (gameState.running) {
                showMainMenu();
            }
        }

        // CTRL + S salva
        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "s"
        ) {

            event.preventDefault();

            if (gameState.running) {
                saveGame();

                console.log(
                    "Jogo salvo com Ctrl + S."
                );
            }
        }
    }
);


// ==========================================
// AUTOSAVE
// ==========================================

// Salva automaticamente a cada 60 segundos

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
