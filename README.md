# 08---JS-A-Linguagem

Criado por **Luís henrique rodrigues silva**
**3° periodo de bsi**

## Visão Geral

Este projeto implementa um **Jogo da Forca interativo no terminal**, desenvolvido em **JavaScript (Node.js)**.

O objetivo é aplicar lógica de programação, manipulação de entrada via terminal, estruturas condicionais, arrays, funções e persistência de dados com arquivos JSON.

O sistema inclui:
- Modo solo contra o sistema
- Modo duelo entre dois jogadores
- Sistema de pontuação
- Ranking persistente
- Banco de palavras por categorias

---

## Funcionalidades

### Modo Solo
- Palavra aleatória por categoria
- Jogador tenta adivinhar letras
- Sistema de pontuação por desempenho
- Registro no ranking solo

---

### Modo Duelo (2 Jogadores)
- Jogador 1 define uma palavra e uma dica
- Jogador 2 tenta adivinhar
- Depois os papéis são invertidos
- Pontuação final é somada
- Vencedor definido pelo maior score

---

### Sistema de Pontuação

- ✔️ +10 pontos por letra correta
- ✔️ +50 pontos por palavra completa
- ✔️ Bônus por tentativas restantes
- ❌ -20 pontos ao usar dica

---

### Ranking Persistente

Os resultados são salvos automaticamente em arquivos JSON:

- `ranking-solo.json` → modo solo  
- `ranking-mp.json` → modo duelo  

Ordenado por maior pontuação.

---

## Regras do jogo

O objetivo do jogo é descobrir a palavra secreta antes que o número máximo de erros seja atingido.

* O jogador escolhe uma categoria.
* Uma palavra aleatória da categoria é selecionada.
* A cada rodada, o jogador digita uma letra.
* Se a letra existir na palavra, ela será revelada.
* Se a letra não existir, o jogador perde uma tentativa.
* O jogador pode solicitar uma dica digitando **DICA**, mas receberá uma penalidade na pontuação.
* O jogo termina quando o jogador descobre todas as letras da palavra ou quando esgota suas tentativas.
* Ao final da partida, a pontuação é calculada e registrada no ranking.

## Como jogar

1. Execute o jogo pelo terminal.
2. Digite seu nome quando solicitado.
3. Escolha uma das categorias disponíveis.
4. Digite uma letra por vez para tentar descobrir a palavra.
5. Acompanhe as letras já utilizadas e o número de tentativas restantes.
6. Caso precise de ajuda, digite **DICA** para receber uma pista sobre a palavra.
7. Continue jogando até vencer ou perder a rodada.
8. Ao final, escolha se deseja jogar novamente.

## Como executar

### Pré-requisitos

* Node.js instalado no computador.

### Instalação

Instale a dependência necessária:

```bash
npm install readline-sync
```

### Executando o jogo

No terminal, execute:

```bash
npm start
```

O jogo será iniciado e as instruções aparecerão na tela.
