export const TABS_CONFIG = [
    { id: "empresa", name: "Empresa", icon: "building-2" },
    { id: "rede", name: "Rede & Infra", icon: "radio-tower" },
    { id: "clientes", name: "Clientes", icon: "users" },
    { id: "financas", name: "Finanças", icon: "trending-up" },
    { id: "planos", name: "Planos", icon: "receipt" },
    { id: "funcionarios", name: "Equipe", icon: "user-check" },
    { id: "marketing", name: "Marketing", icon: "megaphone" },
    { id: "tecnologia", name: "P&D Tech", icon: "cpu" },
    { id: "estatisticas", name: "Estatísticas", icon: "bar-chart-3" },
    { id: "noticias", name: "Notícias", icon: "newspaper" },
    { id: "ma", name: "M&A", icon: "briefcase" }
];

export const INITIAL_STATE = {
    running: false,
    paused: false,
    minimized: false,
    maximized: false,
    currentTab: "empresa",

    company: {
        name: "",
        brand: "",
        money: 1000000,
        customers: 0,
        satisfaction: 85
    },

    network: {
        antennas: 1,
        capacity: 1000,
        techLevel: "4G"
    },

    plans: {
        monthlyPrice: 49.90
    },

    date: {
        day: 1,
        month: 1,
        year: 2026
    },

    settings: {
        tickRateMs: 1000,
        autosaveMs: 60000
    }
};
