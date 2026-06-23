# 08---JS-A-Linguagem

Criado por luis he

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
