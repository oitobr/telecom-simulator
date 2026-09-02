import { gameState, Format } from '../state.js';

export const HUD = {
    elements: {
        companyName: document.getElementById("display-company-name"),
        money: document.getElementById("display-money"),
        customers: document.getElementById("display-customers"),
        date: document.getElementById("display-date")
    },

    update() {
        if (this.elements.companyName) {
            this.elements.companyName.textContent = gameState.company.brand || gameState.company.name;
        }
        if (this.elements.money) {
            this.elements.money.textContent = Format.currency(gameState.company.money);
        }
        if (this.elements.customers) {
            this.elements.customers.textContent = Format.number(gameState.company.customers);
        }
        if (this.elements.date) {
            this.elements.date.textContent = Format.date(gameState.date.day, gameState.date.month, gameState.date.year);
        }
    }
};
