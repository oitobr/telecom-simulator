import { gameState } from './state.js';
import { HUD } from './ui/hud.js';
import { Tabs } from './ui/tabs.js';

let timer = null;

export const Engine = {
    start() {
        if (gameState.running) return;
        gameState.running = true;
        HUD.update();
        Tabs.init();

        timer = setInterval(() => this.tick(), gameState.settings.tickRateMs);
    },

    stop() {
        gameState.running = false;
        if (timer) clearInterval(timer);
    },

    tick() {
        if (!gameState.running || gameState.paused) return;

        // Avanço da data
        gameState.date.day++;
        if (gameState.date.day > 30) {
            gameState.date.day = 1;
            gameState.date.month++;
            
            // Faturamento mensal
            const revenue = gameState.company.customers * gameState.plans.monthlyPrice;
            const opex = gameState.network.antennas * 1200;
            gameState.company.money += (revenue - opex);

            if (gameState.date.month > 12) {
                gameState.date.month = 1;
                gameState.date.year++;
            }
        }

        HUD.update();
    }
};
