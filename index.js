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

// ======================
// RANKING
// ======================

function salvarRanking(nome, pontos, modo) {

    const arquivo =
        modo === 2 ? "ranking-mp.json" : "ranking-solo.json";

    let ranking = [];

    try {
        ranking = JSON.parse(fs.readFileSync(arquivo));
    } catch {
        ranking = [];
    }

    ranking.push({ nome, pontos });

    ranking.sort((a, b) => b.pontos - a.pontos);

    fs.writeFileSync(arquivo, JSON.stringify(ranking, null, 2));
}

function mostrarRanking() {

    console.log("\n===== RANKING SOLO =====");

    try {
        const solo = JSON.parse(fs.readFileSync("ranking-solo.json"));
        solo.slice(0, 5).forEach((j, i) => {
            console.log(`${i + 1}. ${j.nome} - ${j.pontos}`);
        });
    } catch {
        console.log("Sem ranking solo ainda.");
    }

    console.log("\n===== RANKING MULTIPLAYER =====");

    try {
        const mp = JSON.parse(fs.readFileSync("ranking-mp.json"));
        mp.slice(0, 5).forEach((j, i) => {
            console.log(`${i + 1}. ${j.nome} - ${j.pontos}`);
        });
    } catch {
        console.log("Sem ranking multiplayer ainda.");
    }
}

// ======================
// PARTIDA (ENGINE)
// ======================

function rodarPartida(jogador, palavra, dica) {

    let corretas = [];
    let tentadas = [];
    let erros = 0;
    const maxErros = 5;

    let pontos = 0;
    let dicaUsada = false;

    while (erros < maxErros) {

        console.clear();

        console.log(`Jogador: ${jogador}`);
        console.log(forca[erros]);

        console.log("\nPalavra:", mostrarPalavra(palavra, corretas));
        console.log("Tentadas:", tentadas.join(" "));
        console.log(`Erros: ${erros}/${maxErros}`);

        const input = readline.question("> ").toUpperCase().trim();

        if (input === "DICA") {
            if (!dicaUsada) {
                console.log("\nDica:", dica);
                dicaUsada = true;
                pontos -= 20;
            }
            readline.question("");
            continue;
        }

        if (input.length > 1) {

            if (input === palavra) {
                pontos += 50;
                corretas = [...new Set(palavra.split(""))];
                break;
            } else {
                erros++;
                continue;
            }
        }

        if (!/^[A-Z]$/.test(input)) continue;

        if (tentadas.includes(input)) continue;

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

    return pontos;
}

// ======================
// JOGO PRINCIPAL
// ======================

function jogar() {

    console.clear();
    console.log("=== JOGO DA FORCA ===");

    console.log("\nModo de jogo:");
    console.log("1 - Solo");
    console.log("2 - 2 Jogadores (Duelo)");

    const modo = Number(readline.question("Escolha: "));

    const jogador1 = readline.question("\nNome Jogador 1: ");

    const cats = Object.keys(categorias);

    cats.forEach((c, i) => {
        console.log(`${i + 1} - ${c}`);
    });

    let escolha;
    do {
        escolha = Number(readline.question("Categoria: "));
    } while (escolha < 1 || escolha > cats.length);

    const categoria = cats[escolha - 1];

    // ======================
    // SOLO
    // ======================
    if (modo === 1) {

        const palavraObj =
            categorias[categoria][Math.floor(Math.random() * categorias[categoria].length)];

        const pontos = rodarPartida(jogador1, palavraObj.palavra, palavraObj.dica);

        console.clear();
        console.log("🎮 FIM DA PARTIDA");
        console.log("Pontos:", pontos);

        salvarRanking(jogador1, pontos, 1);
        mostrarRanking();

        return;
    }

    // ======================
    // 2 JOGADORES (RODADA INVERTIDA)
    // ======================

    const jogador2 = readline.question("\nNome Jogador 2: ");

    console.clear();
    console.log("⚔️ DUEL MODE INICIADO");

    // Jogador 1 cria palavra
    console.log(`\n${jogador1}, crie a palavra para ${jogador2}`);
    const palavra1 = readline.question("> ").toUpperCase();
    const dica1 = readline.question("Dica: ");

    const pontos2 = rodarPartida(jogador2, palavra1, dica1);

    // Jogador 2 cria palavra
    console.log(`\n${jogador2}, agora crie a palavra para ${jogador1}`);
    const palavra2 = readline.question("> ").toUpperCase();
    const dica2 = readline.question("Dica: ");

    const pontos1 = rodarPartida(jogador1, palavra2, dica2);

    // ======================
    // RESULTADO FINAL
    // ======================

    console.clear();
    console.log("🏁 RESULTADO FINAL");

    console.log(`${jogador1}: ${pontos1} pontos`);
    console.log(`${jogador2}: ${pontos2} pontos`);

    if (pontos1 > pontos2) console.log(`🏆 Vencedor: ${jogador1}`);
    else if (pontos2 > pontos1) console.log(`🏆 Vencedor: ${jogador2}`);
    else console.log("🤝 Empate!");

    salvarRanking(jogador1, pontos1, 2);
    salvarRanking(jogador2, pontos2, 2);

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