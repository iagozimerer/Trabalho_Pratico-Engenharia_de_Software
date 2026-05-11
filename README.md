# Trabalho-Pr-tico-Engenharia-de-Software-e-o-Legado-Wordle-Multi-

# RELATÓRIO TÉCNICO — REFATORAÇÃO MVC

## Objetivo

O sistema original possuía:
- lógica de negócio;
- renderização da interface;
- persistência volátil;
- controle de eventos;

misturados em um único arquivo HTML.

A proposta da refatoração foi aplicar:
- arquitetura MVC;
- modularização;
- boas práticas de desenvolvimento;
- melhoria de legibilidade e manutenção.

---

# 1. Aplicação do padrão MVC

## Model

Arquivo:
- GameModel.js

Responsabilidades:
- gerenciamento do estado do jogo;
- controle da palavra secreta;
- cálculo de pontuação;
- controle da rodada;
- armazenamento do tabuleiro;
- validação das palavras.

O Model não possui dependência da interface.

---

## View

Arquivo:
- GameView.js

Responsabilidades:
- renderização do tabuleiro;
- atualização visual;
- exibição de mensagens;
- atualização de score;
- exibição das instruções.

A View não possui regras de negócio.

---

## Controller

Arquivo:
- GameController.js

Responsabilidades:
- captura de eventos do teclado;
- mediação entre Model e View;
- fluxo da aplicação;
- coordenação das ações do jogo.

---

# 2. Modularização

O sistema foi dividido em múltiplos arquivos:

- HTML → estrutura
- CSS → estilos
- JS → regras separadas em camadas

Isso melhora:
- organização;
- escalabilidade;
- reutilização;
- manutenção.

---

# 3. Melhorias de nomenclatura

Variáveis antigas:
- r_a
- c_a
- sc
- rd
- m

Foram substituídas por:
- currentRow
- currentColumn
- score
- round
- board

Melhorando significativamente a legibilidade.

---

# 4. Eliminação de números mágicos

Valores fixos foram centralizados em:
- constants.js

Exemplos:
- tamanho da palavra;
- limite de tentativas;
- pontuação;
- estados de tile.

---

# 5. Validação robusta dos dicionários

Foi criada validação no DictionaryService.

Problema original:
- palavra "CODE" possuía apenas 4 letras.

Solução:
- filtragem automática de palavras inválidas;
- geração de warnings no console.

---

# 6. Separação de responsabilidades

O código original possuía funções "faz-tudo".

Exemplo:
- comecar()
- onkeydown()

Após a refatoração:
- cada método possui apenas uma responsabilidade.

---

# 7. Benefícios obtidos

## Manutenibilidade
Código mais fácil de modificar.

## Escalabilidade
Novos idiomas e funcionalidades podem ser adicionados facilmente.

## Legibilidade
Nomes autoexplicativos e responsabilidades claras.

## Reutilização
Componentes desacoplados.

## Testabilidade
Model pode ser testado independentemente da interface.

---

# Conclusão

A refatoração transformou um sistema monolítico e acoplado em uma arquitetura modular baseada em MVC, aplicando boas práticas modernas de engenharia de software e melhorando significativamente a qualidade interna do projeto.
