export type Challenge = {
  id: number;
  word: string;
  tip: string;
};

export type WordCategoryId = "programming" | "hardware" | "networking";

export type WordCategory = {
  id: WordCategoryId;
  label: string;
  description: string;
  challenges: Challenge[];
};

export const WORD_CATEGORIES: WordCategory[] = [
  {
    id: "programming",
    label: "Programação",
    description: "Linguagens e ferramentas de desenvolvimento",
    challenges: [
      { id: 1, word: "CSS", tip: "Linguagem de estilos" },
      { id: 2, word: "REACT", tip: "Biblioteca para criar interfaces Web" },
      { id: 3, word: "HTML", tip: "Linguagem de marcação" },
      { id: 4, word: "JAVASCRIPT", tip: "Uma das linguagens de programação mais utilizadas no mundo" },
      { id: 5, word: "TYPESCRIPT", tip: "Adiciona tipagem ao JavaScript" },
      { id: 6, word: "PYTHON", tip: "Linguagem conhecida por sua sintaxe simples e legível" },
      { id: 7, word: "JAVA", tip: "Linguagem muito usada em aplicações corporativas e Android" },
      { id: 8, word: "VUE", tip: "Framework JavaScript para construir interfaces" },
      { id: 9, word: "ANGULAR", tip: "Framework web mantido pelo Google" },
      { id: 10, word: "NODE", tip: "Ambiente que permite executar JavaScript no servidor" },
      { id: 11, word: "GIT", tip: "Sistema de controle de versão distribuído" },
      { id: 12, word: "VITE", tip: "Ferramenta de build e servidor de desenvolvimento web" },
      { id: 13, word: "DOCKER", tip: "Plataforma para criar e executar contêineres" },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    description: "Peças e dispositivos de computador",
    challenges: [
      { id: 1, word: "PROCESSADOR", tip: "Componente que executa instruções e cálculos" },
      { id: 2, word: "MEMORIA", tip: "Componente que guarda dados usados pelos programas" },
      { id: 3, word: "TECLADO", tip: "Periférico usado para digitar" },
      { id: 4, word: "MONITOR", tip: "Tela que exibe as imagens do computador" },
      { id: 5, word: "MOUSE", tip: "Periférico usado para mover o cursor" },
      { id: 6, word: "GABINETE", tip: "Estrutura que abriga os componentes do computador" },
      { id: 7, word: "PLACA", tip: "Circuito principal que conecta os componentes" },
      { id: 8, word: "CHIPSET", tip: "Conjunto de circuitos que coordena a placa-mãe" },
      { id: 9, word: "WEBCAM", tip: "Câmera usada em chamadas de vídeo" },
      { id: 10, word: "IMPRESSORA", tip: "Dispositivo que transfere documentos para o papel" },
    ],
  },
  {
    id: "networking",
    label: "Redes e internet",
    description: "Conceitos de conexão e comunicação digital",
    challenges: [
      { id: 1, word: "INTERNET", tip: "Rede mundial que conecta dispositivos" },
      { id: 2, word: "ROTEADOR", tip: "Distribui a conexão entre dispositivos" },
      { id: 3, word: "SERVIDOR", tip: "Computador que fornece serviços para outros dispositivos" },
      { id: 4, word: "PROTOCOLO", tip: "Conjunto de regras para a comunicação entre dispositivos" },
      { id: 5, word: "NAVEGADOR", tip: "Aplicativo usado para acessar páginas da web" },
      { id: 6, word: "DOMINIO", tip: "Nome legível usado para encontrar um site" },
      { id: 7, word: "NUVEM", tip: "Serviços que armazenam dados pela internet" },
      { id: 8, word: "PACOTE", tip: "Unidade de dados enviada pela rede" },
      { id: 9, word: "LATENCIA", tip: "Atraso na comunicação entre dois pontos da rede" },
      { id: 10, word: "MODEM", tip: "Dispositivo que conecta uma rede à internet" },
      { id: 11, word: "ETHERNET", tip: "Tecnologia comum para conexões de rede cabeadas" },
    ],
  },
];
