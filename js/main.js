import { gameState, resetGameState } from './state.js';
import { Storage } from './storage.js';
import { Engine } from './engine.js';

const DOM = {
    mainMenu: document.getElementById("main-menu"),
    gameInterface: document.getElementById("game-interface")
};

function showGameScreen() {
    if (DOM.mainMenu) DOM.mainMenu.style.display = "none";
    if (DOM.gameInterface) DOM.gameInterface.style.display = "flex";
    Engine.start();
}

function initEvents() {
    document.getElementById("play-button")?.addEventListener("click", () => showGameScreen());

    document.getElementById("new-game-button")?.addEventListener("click", () => {
        const name = prompt("Nome da Empresa:") || "Minha Telecom";
        const brand = prompt("Nome da Marca:") || "TeleConect";
        
        resetGameState(name, brand);
        Storage.save();
        showGameScreen();
    });

    document.getElementById("continue-button")?.addEventListener("click", () => {
        if (Storage.load()) {
            showGameScreen();
        } else {
            alert("Nenhum progresso salvo encontrado.");
        }
    });

    document.getElementById("exit-button")?.addEventListener("click", () => {
        Storage.save();
        Engine.stop();
        if (DOM.gameInterface) DOM.gameInterface.style.display = "none";
        if (DOM.mainMenu) DOM.mainMenu.style.display = "flex";
    });

    // Auto-save periódico
    setInterval(() => {
        if (gameState.running) Storage.save();
    }, gameState.settings.autosaveMs);
}

// Inicializa o evento assim que os scripts forem carregados
initEvents();
