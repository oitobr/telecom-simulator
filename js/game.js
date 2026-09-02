// ==========================================
// TELECOM SIMULATOR - GAME.JS (v2.0)
// ==========================================

const gameState = {
    running: false,
    paused: false,
    minimized: false,
    maximized: false,

    company: {
        name: "",
        brand: "",
        money: 0,
        customers: 0,
        arpu: 45.00,          // Receita Média Por Usuário (mensal)
        monthlyCosts: 15000   // Custo operacional fixo mensal
    },

    date: {
        day: 1,
        month: 1,
        year: 2026
    },

    settings: {
        tickRate: 1000,       // 1 segundo real = 1 dia no jogo
        autosaveInterval: 60000
    }
};

let gameLoopInterval = null;

// ==========================================
// ELEMENTOS DA INTERFACE (DOM)
// ==========================================

const DOM = {
    // Janelas
    gameWindow: document.getElementById("game-window"),
    mainMenu: document.getElementById("main-menu"),
    gameInterface: document.getElementById("game-interface"),

    // Botões do Menu
    playButton: document.getElementById("play-button"),
    newGameButton: document.getElementById("new-game-button"),
    continueButton: document.getElementById("continue-button"),
    loadButton: document.getElementById("load-button"),
    settingsButton: document.getElementById("settings-button"),
    exitButton: document.getElementById("exit-button"),

    // Controles da Janela
    minimizeButton: document.getElementById("minimize"),
    maximizeButton: document.getElementById("maximize"),
    closeButton: document.getElementById("close"),

    // Displays de Status no Jogo
    displayCompanyName: document.getElementById("display-company-name"),
    displayMoney: document.getElementById("display-money"),
    displayCustomers: document.getElementById("display-customers"),
    displayDate: document.getElementById("display-date")
};

// ==========================================
// SISTEMA DE INTERFACE (UI)
// ==========================================

const UI = {
    showMainMenu() {
        DOM.mainMenu.style.display = "flex";
        DOM.gameInterface.style.display = "none";
        Engine.stop();
    },

    showGame() {
        DOM.mainMenu.style.display = "none";
        DOM.gameInterface.style.display = "block";
        Engine.start();
    },

    updateDisplay() {
        if (DOM.displayCompanyName) {
            DOM.displayCompanyName.textContent = gameState.company.brand || gameState.company.name;
        }

        if (DOM.displayMoney) {
            DOM.displayMoney.textContent = gameState.company.money.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        }

        if (DOM.displayCustomers) {
            DOM.displayCustomers.textContent = gameState.company.customers.toLocaleString('pt-BR');
        }

        if (DOM.displayDate) {
            const day = String(gameState.date.day).padStart(2, '0');
            const month = String(gameState.date.month).padStart(2, '0');
            DOM.displayDate.textContent = `${day}/${month}/${gameState.date.year}`;
        }
    },

    toggleMinimize() {
        gameState.minimized = !gameState.minimized;
        if (DOM.gameWindow) {
            DOM.gameWindow.style.transform = gameState.minimized ? "scale(0.7)" : "scale(1)";
            DOM.gameWindow.style.opacity = gameState.minimized ? "0.5" : "1";
        }
    },

    toggleMaximize() {
        gameState.maximized = !gameState.maximized;
        if (DOM.gameWindow) {
            DOM.gameWindow.classList.toggle("maximized", gameState.maximized);
        }
    }
};

// ==========================================
// MOTOR DE SIMULAÇÃO (GAME LOOP)
// ==========================================

const Engine = {
    start() {
        if (gameState.running) return;
        gameState.running = true;
        gameState.paused = false;

        UI.updateDisplay();
        gameLoopInterval = setInterval(() => this.tick(), gameState.settings.tickRate);
        console.log("Motor de simulação iniciado.");
    },

    stop() {
        gameState.running = false;
        if (gameLoopInterval) {
            clearInterval(gameLoopInterval);
            gameLoopInterval = null;
        }
        console.log("Motor de simulação parado.");
    },

    pause() {
        gameState.paused = !gameState.paused;
    },

    tick() {
        if (!gameState.running || gameState.paused) return;

        this.advanceTime();
        UI.updateDisplay();
    },

    advanceTime() {
        gameState.date.day++;

        // Virada de mês (considerando 30 dias por simplicidade)
        if (gameState.date.day > 30) {
            gameState.date.day = 1;
            gameState.date.month++;

            Economy.processMonthlyFinances();

            // Virada de ano
            if (gameState.date.month > 12) {
                gameState.date.month = 1;
                gameState.date.year++;
            }
        }
    }
};

// ==========================================
// SISTEMA ECONÔMICO
// ==========================================

const Economy = {
    processMonthlyFinances() {
        const revenue = gameState.company.customers * gameState.company.arpu;
        const expenses = gameState.company.monthlyCosts;
        const netProfit = revenue - expenses;

        gameState.company.money += netProfit;

        console.log(
            `[FECHAMENTO MENSAL] Mes: ${gameState.date.month}/${gameState.date.year} | ` +
            `Receita: R$ ${revenue.toFixed(2)} | Despesas: R$ ${expenses.toFixed(2)} | ` +
            `Resultado: R$ ${netProfit.toFixed(2)}`
        );
    }
};

// ==========================================
// GESTÃO DE PERSISTÊNCIA (SAVE / LOAD)
// ==========================================

const Storage = {
    SAVE_KEY: "telecomSimulatorSave",

    save() {
        try {
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(gameState));
            console.log("Jogo salvo com sucesso.");
            return true;
        } catch (error) {
            console.error("Erro ao salvar o jogo:", error);
            return false;
        }
    },

    load() {
        const savedData = localStorage.getItem(this.SAVE_KEY);

        if (!savedData) return false;

        try {
            const data = JSON.parse(savedData);
            Object.assign(gameState.company, data.company);
            Object.assign(gameState.date, data.date);
            Object.assign(gameState.settings, data.settings);

            UI.showGame();
            return true;
        } catch (error) {
            console.error("Erro ao carregar os dados salvos:", error);
            return false;
        }
    }
};

// ==========================================
// FLUXO DE JOGO
// ==========================================

function newGame() {
    const companyName = prompt("Digite o nome da sua empresa:");
    if (!companyName) return;

    const brandName = prompt("Digite o nome da marca:");
    if (!brandName) return;

    // Reinicializa o estado
    gameState.company.name = companyName;
    gameState.company.brand = brandName;
    gameState.company.money = 1000000;
    gameState.company.customers = 100; // Começa com 100 clientes de teste

    gameState.date.day = 1;
    gameState.date.month = 1;
    gameState.date.year = 2026;

    Storage.save();
    UI.showGame();
}

function continueGame() {
    if (!Storage.load()) {
        alert("Nenhum jogo salvo encontrado ou dados corrompidos.");
    }
}

function openSettings() {
    alert(
        "CONFIGURAÇÕES\n\n" +
        "• Velocidade da simulação\n" +
        "• Controles de Áudio\n" +
        "• Qualidade Gráfica"
    );
}

function exitGame() {
    if (confirm("Deseja salvar e sair para o menu principal?")) {
        Storage.save();
        UI.showMainMenu();
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function initEventListeners() {
    if (DOM.playButton) DOM.playButton.addEventListener("click", () => UI.showGame());
    if (DOM.newGameButton) DOM.newGameButton.addEventListener("click", newGame);
    if (DOM.continueButton) DOM.continueButton.addEventListener("click", continueGame);
    if (DOM.loadButton) DOM.loadButton.addEventListener("click", continueGame);
    if (DOM.settingsButton) DOM.settingsButton.addEventListener("click", openSettings);
    if (DOM.exitButton) DOM.exitButton.addEventListener("click", exitGame);

    if (DOM.minimizeButton) DOM.minimizeButton.addEventListener("click", () => UI.toggleMinimize());
    if (DOM.maximizeButton) DOM.maximizeButton.addEventListener("click", () => UI.toggleMaximize());
    if (DOM.closeButton) DOM.closeButton.addEventListener("click", exitGame);

    // Atalhos do Teclado
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && gameState.running) {
            UI.showMainMenu();
        }

        if (event.ctrlKey && event.key.toLowerCase() === "s") {
            event.preventDefault();
            if (gameState.running) Storage.save();
        }

        if (event.code === "Space" && gameState.running) {
            event.preventDefault();
            Engine.pause();
            console.log(gameState.paused ? "Jogo Pausado" : "Jogo Retomado");
        }
    });

    // Autosave periódico
    setInterval(() => {
        if (gameState.running) Storage.save();
    }, gameState.settings.autosaveInterval);
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

initEventListeners();
UI.showMainMenu();
console.log("Telecom Simulator - Sistema carregado com sucesso.");
