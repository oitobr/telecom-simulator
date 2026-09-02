import { TABS_CONFIG } from '../config.js';
import { gameState, Format } from '../state.js';
import { HUD } from './hud.js';

export const Tabs = {
    container: document.getElementById("navigation-tabs"),
    content: document.getElementById("content-area"),

    init() {
        if (!this.container) return;
        this.container.innerHTML = "";

        TABS_CONFIG.forEach(tab => {
            const btn = document.createElement("button");
            btn.className = `tab-btn ${tab.id === gameState.currentTab ? "active" : ""}`;
            btn.dataset.tab = tab.id;
            btn.innerHTML = `<span>${tab.name}</span>`;

            btn.addEventListener("click", () => this.switchTab(tab.id));
            this.container.appendChild(btn);
        });

        this.renderContent();
    },

    switchTab(tabId) {
        gameState.currentTab = tabId;
        document.querySelectorAll("#navigation-tabs .tab-btn").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.tab === tabId);
        });
        this.renderContent();
    },

    renderContent() {
        if (!this.content) return;

        if (gameState.currentTab === "empresa") {
            this.content.innerHTML = `
                <h2>Visão Geral</h2>
                <p><strong>Empresa:</strong> ${gameState.company.name}</p>
                <p><strong>Marca:</strong> ${gameState.company.brand}</p>
                <p><strong>Clientes Ativos:</strong> ${Format.number(gameState.company.customers)}</p>
                <p><strong>Capital:</strong> ${Format.currency(gameState.company.money)}</p>
            `;
        } else if (gameState.currentTab === "rede") {
            this.content.innerHTML = `
                <h2>Infraestrutura de Rede</h2>
                <p>Torres Ativas: ${gameState.network.antennas}</p>
                <p>Capacidade: ${Format.number(gameState.network.capacity)} clientes</p>
                <button id="btn-buy-antenna">Comprar Torre (R$ 50.000,00)</button>
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
            const currentTabObj = TABS_CONFIG.find(t => t.id === gameState.currentTab);
            this.content.innerHTML = `<h2>${currentTabObj ? currentTabObj.name : "Painel"}</h2><p>Módulo em desenvolvimento.</p>`;
        }
    }
};
