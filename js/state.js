import { INITIAL_STATE } from './config.js';

export const gameState = JSON.parse(JSON.stringify(INITIAL_STATE));

export function resetGameState(name, brand) {
    Object.assign(gameState, JSON.parse(JSON.stringify(INITIAL_STATE)));
    gameState.company.name = name;
    gameState.company.brand = brand;
}

export const Format = {
    currency(value) {
        return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
    number(value) {
        return Number(value).toLocaleString("pt-BR");
    },
    date(day, month, year) {
        const d = String(day).padStart(2, "0");
        const m = String(month).padStart(2, "0");
        return `${d}/${m}/${year}`;
    }
};
