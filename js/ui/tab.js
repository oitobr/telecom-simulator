import { TABS_CONFIG } from '../config.js';
import { gameState, Format } from '../state.js';
import { Storage } from '../storage.js';
import { HUD } from './hud.js';

export const Tabs = {
    container: document.getElementById("navigation-tabs"),
    content: document.getElementById("content-area"),

    init() {
        if (!this.container) return;
        this.container.innerHTML = "";

        TABS_CONFIG.forEach(tab => {
            const btn = document.createElement("button");
            btn.className = `navigation-tab ${tab.id === gameState.currentTab ? "active" : ""}`;
            btn.dataset.tab = tab.id;
            btn.title = tab.name;
            btn.style.backgroundImage = `url("${tab.image}")`;

            btn.addEventListener("click", () => this.switchTab(tab.id));
            this.container.appendChild(btn);
        });

        this.renderContent();
    },

    switchTab(tabId) {
        // Se clicar na aba de Salvar, executa o Save sem trocar permanentemente a visualização
        if (tabId === "salvar") {
            Storage.save();
            alert("Jogo salvo com sucesso!");
            return;
        }

        gameState.currentTab = tabId;
        document.querySelectorAll("#navigation-tabs .navigation-tab").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.tab === tabId);
        });
        this.renderContent();
    },

    renderContent() {
        if (!this.content) return;

        const currentTabObj = TABS_CONFIG.find(t => t.id === gameState.currentTab);
        const title = currentTabObj ? currentTabObj.name : "Painel";

        if (gameState.currentTab === "empresa") {
            this.content.innerHTML = `
                <h2>${title}</h2>
                <p><strong>Empresa:</strong> ${gameState.company.name || "Nenhuma"}</p>
                <p><strong>Marca:</strong> ${gameState.company.brand || "Nenhuma"}</p>
                <p><strong>Dinheiro:</strong> ${Format.currency(gameState.company.money)}</p>
                <p><strong>Clientes:</strong> ${Format.number(gameState.company.customers)}</p>
            `;
        } else if (gameState.currentTab === "torres") {
            this.content.innerHTML = `
                <h2>Torres de Sinal</h2>
                <p>Gerencie suas torres de transmissão.</p>
                <p><strong>Torres Ativas:</strong> ${gameState.network.antennas}</p>
                <p><strong>Capacidade de Clientes:</strong> ${Format.number(gameState.network.capacity)}</p>
                <button id="btn-buy-antenna" class="btn">Comprar Torre (R$ 50.000,00)</button>
            `;

            document.getElementById("btn-buy-antenna")?.addEventListener("click", () => {
                if (gameState.company.money >= 50000) {
                    gameState.company.money -= 50000;
                    gameState.network.antennas += 1;
                    gameState.network.capacity += 1000;
                    HUD.update();
                    this.renderContent();
                } else {
                    alert("Saldo insuficiente!");
                }
            });
        } else {
            this.content.innerHTML = `
                <h2>${title}</h2>
                <p>Painel de ${title}. Conteúdo em desenvolvimento.</p>
            `;
        }
    }
};
