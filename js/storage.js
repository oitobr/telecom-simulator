import { gameState } from './state.js';

const SAVE_KEY = "telecomSimulatorSave_v3";

export const Storage = {
    save() {
        try {
            localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
            console.log("Jogo salvo.");
        } catch (err) {
            console.error("Erro ao salvar:", err);
        }
    },

    load() {
        const data = localStorage.getItem(SAVE_KEY);
        if (!data) return false;

        try {
            const parsed = JSON.parse(data);
            Object.assign(gameState, parsed);
            return true;
        } catch (err) {
            console.error("Erro ao carregar save:", err);
            return false;
        }
    }
};
