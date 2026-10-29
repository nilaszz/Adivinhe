export type Challenge = {
  id: number;
  word: string;
  tip: string;
};

export const WORDS: Challenge[] = [
  { id: 1, word: "CSS", tip: "Linguagem de estilos" },
  { id: 2, word: "REACT", tip: "Biblioteca para criar interfaces Web" },
  { id: 3, word: "HTML", tip: "Linguagem de marcação" },
  {id: 4,  word: "Javascript", tip: "Uma das linguagens de programação mais utilizadas no mundo",},
  { id: 5, word: "Typescript", tip: "Para adicionar tipagem no Javascript" },
  { id: 6, word: "PYTHON", tip: "Linguagem conhecida por sua sintaxe simples e legível" },
  { id: 7, word: "JAVA", tip: "Linguagem muito usada em aplicações corporativas e Android" },
  { id: 8, word: "VUE", tip: "Framework JavaScript para construir interfaces" },
  { id: 9, word: "ANGULAR", tip: "Framework web mantido pelo Google" },
  { id: 10, word: "NODE", tip: "Ambiente que permite executar JavaScript no servidor" },
  { id: 11, word: "GIT", tip: "Sistema de controle de versão distribuído" },
  { id: 12, word: "VITE", tip: "Ferramenta de build e servidor de desenvolvimento web" },
  { id: 13, word: "DOCKER", tip: "Plataforma para criar e executar contêineres" },
];
