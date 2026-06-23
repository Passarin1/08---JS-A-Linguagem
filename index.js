const fs = require("fs");
const readline = require("readline-sync");

// ======================
// BANCO DE PALAVRAS
// ======================

const categorias = {
    Tecnologia: [
        { palavra: "JAVASCRIPT", dica: "Linguagem da web" },
        { palavra: "PYTHON", dica: "Linguagem simples e poderosa" },
        { palavra: "ALGORITMO", dica: "Passos de solução" },
        { palavra: "COMPUTADOR", dica: "Máquina de processamento" },
        { palavra: "SERVIDOR", dica: "Fornece serviços em rede" },
        { palavra: "BANCO", dica: "Armazena dados" },
        { palavra: "SISTEMA", dica: "Conjunto organizado" }
    ],

    Animais: [
        { palavra: "ELEFANTE", dica: "Grande mamífero" },
        { palavra: "TIGRE", dica: "Felino listrado" },
        { palavra: "JACARE", dica: "Réptil de rio" },
        { palavra: "GIRAFA", dica: "Pescoço longo" },
        { palavra: "PINGUIM", dica: "Não voa" },
        { palavra: "CANGURU", dica: "Salta alto" },
        { palavra: "TARTARUGA", dica: "Casco protetor" }
    ],

    Frutas: [
        { palavra: "ABACAXI", dica: "Tropical espinhosa" },
        { palavra: "MORANGO", dica: "Pequena e vermelha" },
        { palavra: "BANANA", dica: "Amarela curva" },
        { palavra: "MELANCIA", dica: "Cheia de água" },
        { palavra: "LARANJA", dica: "Vitamina C" },
        { palavra: "GOIABA", dica: "Doce e aromática" },
        { palavra: "ACEROLA", dica: "Muito vitamina C" }
    ]
};

// ======================
// FORCA ASCII
// ======================

const forca = [
`
 +---+
 |   |
     |
     |
     |
     |
=========`,
`
 +---+
 |   |
 O   |
     |
     |
     |
=========`,
`
 +---+
 |   |
 O   |
 |   |
     |
     |
=========`,
`
 +---+
 |   |
 O   |
/|\\  |
     |
     |
=========`,
`
 +---+
 |   |
 O   |
/|\\  |
/ \\  |
     |
=========`
];

// ======================
// FUNÇÕES
// ======================

function mostrarPalavra(palavra, corretas) {
    return palavra
        .split("")
        .map(l => (corretas.includes(l) ? l : "_"))
        .join(" ");
}

function venceu(palavra, corretas) {
    return palavra.split("").every(l => corretas.includes(l));
}

function salvarRanking(nome, pontos) {
    let ranking = [];

    try {
        ranking = JSON.parse(fs.readFileSync("ranking.json"));
    } catch {}

    ranking.push({ nome, pontos });

    ranking.sort((a, b) => b.pontos - a.pontos);

    fs.writeFileSync("ranking.json", JSON.stringify(ranking, null, 2));
}

function mostrarRanking() {
    try {
        const ranking = JSON.parse(fs.readFileSync("ranking.json"));

        console.log("\n===== RANKING =====");

        ranking.slice(0, 10).forEach((j, i) => {
            console.log(`${i + 1}. ${j.nome} - ${j.pontos}`);
        });

    } catch {
        console.log("\nSem ranking ainda.");
    }
}

// ======================
// JOGO
// ======================

function jogar() {

    console.clear();
    console.log("=== JOGO DA FORCA ===");

    const nome = readline.question("Nome: ");

    const cats = Object.keys(categorias);

    cats.forEach((c, i) => {
        console.log(`${i + 1} - ${c}`);
    });

    let escolha;
    do {
        escolha = Number(readline.question("Categoria: "));
    } while (escolha < 1 || escolha > cats.length);

    const categoria = cats[escolha - 1];

    const palavraObj =
        categorias[categoria][Math.floor(Math.random() * categorias[categoria].length)];

    const palavra = palavraObj.palavra;
    const dica = palavraObj.dica;

    let corretas = [];
    let tentadas = [];
    let erros = 0;
    const maxErros = 5;

    let pontos = 0;
    let dicaUsada = false;

    while (erros < maxErros) {

        console.clear();

        console.log(`Jogador: ${nome}`);
        console.log(`Categoria: ${categoria}`);
        console.log(forca[erros]);

        console.log("\nPalavra:", mostrarPalavra(palavra, corretas));
        console.log("Tentadas:", tentadas.join(" "));
        console.log(`Erros: ${erros}/${maxErros}`);

        const input = readline.question("> ").toUpperCase().trim();

        // DICA
        if (input === "DICA") {
            if (!dicaUsada) {
                console.log("\nDica:", dica);
                dicaUsada = true;
                pontos -= 20;
            } else {
                console.log("\nDica já usada.");
            }
            readline.question("");
            continue;
        }

        // PALAVRA INTEIRA
        if (input.length > 1) {

            if (input === palavra) {
                console.log("\nAcertou a palavra!");
                pontos += 50;
                corretas = [...new Set(palavra.split(""))];
                break;
            } else {
                console.log("\nErrado!");
                erros++;
                readline.question("");
                continue;
            }
        }

        // LETRA
        if (!/^[A-Z]$/.test(input)) {
            console.log("\nDigite apenas UMA letra.");
            readline.question("");
            continue;
        }

        if (tentadas.includes(input)) {
            console.log("\nLetra repetida.");
            readline.question("");
            continue;
        }

        tentadas.push(input);

        if (palavra.includes(input)) {
            corretas.push(input);
            pontos += 10;
        } else {
            erros++;
        }

        if (venceu(palavra, corretas)) {
            pontos += (maxErros - erros) * 5;
            break;
        }
    }

    console.clear();

    if (venceu(palavra, corretas)) {
        console.log("🎉 VOCÊ VENCEU!");
    } else {
        console.log("💀 VOCÊ PERDEU!");
    }

    console.log("Palavra:", palavra);
    console.log("Pontos:", pontos);

    salvarRanking(nome, pontos);
    mostrarRanking();
}

// ======================
// LOOP
// ======================

while (true) {
    jogar();

    const r = readline.question("\nJogar novamente? (S/N): ").toUpperCase();
    if (r !== "S") break;
}

console.log("\nFim do jogo");