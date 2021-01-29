---
title: 'Explicando hoisting em Javascript'
excerpt: 'Hoisting causa uma grande dúvida entre os desenvolvedores, aqueles que não entendem este conceito estão sempre pensando porque alguma parte do seu código não está funcionando. Hoje vamos aprender o que é hoisting e como evitar este efeito (ou usá-lo conscientemente).'
coverImage: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=**Hoisting**%20explicado&images=https%3A%2F%2Fcdn.worldvectorlogo.com%2Flogos%2Flogo-javascript.svg'
date: '2020-12-14T22:40:07.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=**Hoisting**%20explicado&images=https%3A%2F%2Fcdn.worldvectorlogo.com%2Flogos%2Flogo-javascript.svg'
---

## O que é hoisting (içamento)?

Hoisting é o comportamento padrão do Javascript de mover todas as declarações para o topo do escopo (seja ele o global ou da função) antes da execução do código. Esse comportamento te dá a possiblidade de usar uma variável antes que ela esteja definida, dessa forma:

```javascript
x = 50;

console.log(x);

var x;
```

Se você achou que o código acima mostraria `ReferenceError: 'x' is not defined` ou `undefined`, você está enganado, esse código é executado perfeitamente por causa do hoisting. Na realidade, ambos os erros são diferentes, `undefined` aparece quando uma variável não é inicializada em sua declaração (quando isso ocorre, o tipo da variável também é `undefined`) e o **ReferenceError** aparece quando a variável não foi declarada previamente.

Claro que isso pode levar a infinitos efeitos colaterais no seu código, então é importante saber o que é e como evitar ter esses efetos colaterais ocorrendo.

## Como evitar (ou usar com consciência)

Então há basicamente três formas de evitar o comportamento de hoisting do Javascript:

- Usando a utilidade 'use strict'
- Usando a palavra chave let
- Usando a palavra chave const

Olhemos para cada uma com mais detalhes

### **'use strict'**

A utilidade 'use strict' do ES5 é uma opção que desencoraja o uso de variáveis antes que elas sejam definidas, usando a utlidade 'use strict' e executando o código acima causaria um erro do tipo `ReferenceError: 'x' is not defined`. Além disso, o modo 'use strict' te dá algumas vantagens:

1. Elimina alguns dos erros silenciosos do Javascript, fazendo com que sejam erros explícitos, que serão mostrados pelo interpretador;
2. Torna mais fácil para engines Javascript performar otimizações por meio do conserto de alguns erros;
3. Proíbe algumas sintaxes que são candidatas a serem definidas em futuras versões do JS.

Mas tem suas desvantagens também: se comporta de forma diferente em cada browser, então é altamente recomendado que você performe duros testes de funcionalidade em tudo que deve ser confiável.

### Palavra chave **let**

O comportamento de hoisting é majoritariamente causado pelo uso da palavra chave **var**, todas as variáveis declaradas com a palavra chave **var** são içadas para o topo do escopo atual. Desde o Javascript ES6, a palavra chave **let** foi introduzida, funciona de forma similar a palavra chave **var**, mas com uma diferença principal: **Quando uma variável é declarada com ela, se torna pertencente apenas ao bloco de código na qual foi declarada**.

Aqui está um belo exemplo da diferença entre **var** e **let**:

![var, let and const](/assets/blog/hoisting-explained/const-vs-let-vs-var.png)

Porém, é recomendado o uso da palavra chave **let** apenas quando você precisa alterar o valor de uma variável em tempo de execução, se não será necessário, a próxima opção deve ser a sua escolha.

### Palavra chave **const**

A palavra chave **const** tem o mesmo comportamento que a palavra chave **let**, faz com que a variável pertença ao bloco que foi declarada, mas sua maior diferença reside no próprio nome: **Faz com que a variável seja impossível de ser reatribuída durante o tempo de execução**. Essa é a palavra chave recomendada para declarações de variáveis.

Variáveis declaradas com a palavra chave **const** promovem a imutabilidade e previnem efeitos colaterais, é amplametne usada entre os desenvolvedores JS e pega emprestado o conceito de imutabilidade da Programação Funcional. Na realidade, o próprio Javascript é uma linguagem multi-paradigma, então você pode usar POO, Programação Funcional e vários outros paradigmas.

### Visão geral

Hoje aprendemos sobre o que é e como evitar o comportamento de **hoisting** no Javascript, eu espero que daqui para frente seus códigos fiquem acostumados com as palavras chave **let** e **const** ou se você está em versões antigas do Javascript (pré ES6), você se acostume com o modo **'use strict'**. Obrigado!
