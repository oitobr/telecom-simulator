export const TABS_CONFIG = [
    { id: "empresa", name: "Empresa", image: "assets/buttons/tab/tab_empresa.png" },
    { id: "clientes", name: "Clientes", image: "assets/buttons/tab/tab_clientes.png" },
    { id: "planos", name: "Planos", image: "assets/buttons/tab/tab_planos.png" },
    { id: "dinheiro", name: "Finanças", image: "assets/buttons/tab/tab_dinheiro.png" },
    { id: "funcionarios", name: "Funcionários", image: "assets/buttons/tab/tab_funcionarios.png" },
    { id: "marketing", name: "Marketing", image: "assets/buttons/tab/tab_marketing.png" },
    { id: "lojas", name: "Lojas", image: "assets/buttons/tab/tab_lojas.png" },
    { id: "torres", name: "Torres", image: "assets/buttons/tab/tab_torres.png" },
    { id: "fibra", name: "Fibra Óptica", image: "assets/buttons/tab/tab_fibra.png" },
    { id: "4g", name: "Rede 4G", image: "assets/buttons/tab/tab_4g.png" },
    { id: "5g", name: "Rede 5G", image: "assets/buttons/tab/tab_5g.png" },
    { id: "wifi", name: "Wi-Fi", image: "assets/buttons/tab/tab_wifi.png" },
    { id: "energia", name: "Energia", image: "assets/buttons/tab/tab_energia.png" },
    { id: "tecnologia", name: "Tecnologia", image: "assets/buttons/tab/tab_tecnologia.png" },
    { id: "antlel", name: "Anatel / Regulação", image: "assets/buttons/tab/tab_antlel.png" },
    { id: "mea", name: "M&A", image: "assets/buttons/tab/tab_mea.png" },
    { id: "metas", name: "Metas", image: "assets/buttons/tab/tab_metas.png" },
    { id: "estatisticas", name: "Estatísticas", image: "assets/buttons/tab/tab_estatisticas.png" },
    { id: "ranking", name: "Ranking", image: "assets/buttons/tab/tab_ranking.png" },
    { id: "configs", name: "Configurações", image: "assets/buttons/tab/tab_configs.png" },
    { id: "salvar", name: "Salvar", image: "assets/buttons/tab/tab_salvar.png" }
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
