---
title: 'O que é litografia?'
excerpt: 'Você já pensou em como processadores são feitos? Ou em como eles funcionam por dentro? Hoje eu vou tentar explicar um pouco desses assuntos para você e falar sobre litografia, que é um conceito presente na construção de todas as CPUs hoje em dia.'
coverImage: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=O%20que%20é%20**litografia**%3F&images=https://www.svgrepo.com/show/135990/cpu.svg'
date: '2022-07-10T13:00:00.000Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=O%20que%20é%20**litografia**%3F&images=https://www.svgrepo.com/show/135990/cpu.svg'
---

## Introdução à História de Processadores

Um processador, também conhecido como uma CPU (Unidade de Processamento Central ou Central Processing Unit em inglês) é essencialmente um circuito eletrônico capaz de executar instruções que são contidas dentro de um **programa**, funciona como um **ábaco** automatizado, o que faz com que o sistema numérico sendo usado afete como ele funciona. Ele performa algumas operações tais como entrada e saída de dados (I/O), aritmética básica, lógica e instruções de controle especificadas pelo programa. Ele também interage com outras partes do computador, como a RAM, dispositivos de memória não volátil, chipsets de placa mãe e outros processadores especializados tais como GPUs (Unidades de Processamento Gráfico ou Graphic Processing Unit em inglês).

No início dos anos 50, cada design de computador era completamente único, se você escrevesse um programa pra uma máquina específica, o mesmo programa não poderia nunca rodar em uma máquina diferente, mesmo que fosse um computador da mesma marca. Essa liberdade era muito importante na época, porque os designers eram muito restringidos pelo custo eletrônico e a melhor organização para o computador ainda estava sendo explorada. Funcionalidades importantes também foram introduzidas nessa época: **registradores de índice**, o **endereço de retorno**, **operadores imediatos** e **detecção de operadores inválidos**. Como dito antes, o tipo de sistema numérico afeta como um computador funciona (isso ainda é verdade nos dias de hoje), então no início dos anos 50 a maioria dos computadores usavam o sistema decimal e eram construídos para processar especificamente tarefas numéricas, o que significa que suas funções matemáticas funcionavam na base 10 ao invés da base 2 como é hoje, e eles também não eram simplesmente decimais representados como binários, algumas máquinas tinham **dez tubos de vácuo** por dígito para cada registrador do processador.

## O Transistor

No ano de 1947, nos Laboratórios Bell (o braço de pesquisa da AT&T), o copmonente principal de processadores modernos foi primeiramente demonstrado com sucesso, seu nome era: **transistor**. Um transistor é um componente semicondutor com três terminais para conexão em um circuito eletrônico, ele substitui o **triodo** de tubo de vácuo (que era um tubo de vácuo com 3 eletrodos dentro de um envelope de vidro evacuado). Um transistor é essencialmente um interruptor controlado eletronicamente que pode ser ligado ou desligado por meio de aplicação ou remoção de tensão no portão e existem basicamente dois tipos de transistores: nMOS e pMOS, o nMOS é o que permite a passagem de corrente quando o portão está ligado e o pMOS é o que permite a passagem de corrente quando o portão está desligado, esses são os transistores utilizados na **construção de CPUs** e um processador é construído por meio da conexão de vários transistores (e outros componentes, mas vamos manter o artigo simples) juntos em diferentes padrões, permitindo que o processador performe ações diferentes dependendo do circuito acionado.

## O que é litografia?

Já aprendemos que um processador é formado por vários transistores ligados juntos em diferntes padrões, e já que esses transistores são semicondutores físicos, eles tem um **tamanho** e tendo um tamanho, você pode colocar apenas uma quantidade limitada deles em um espaço. Também sabemos que processadores não são tão grandes, então temos duas possibilidades: ou um processador tem apenas alguns transistores ou os transistores são incrivelmente pequenos. Pode parecer óbvio, mas a segunda opção é a verdadeira, os transistores dentro de um processador são incrivelmente pequenos e a **litografia de um processador** é o nome que damos para o tamanho de cada transistor dentro de um processador que é medido em metros (usualmente seguido por um **prefixo de unidade**, como micro ou nano).

## A litografia do primeiro processador

O primeiro microprocessador comercial produzido foi o **Intel 4004**, ele tinha uma litografia de **10 micrômetros** e foi feito com 2300 transistores, lançado em 1971. Suas funcionalidades incluiam um barramento de dados com a capacidade de 4 bits e um barramento de endereço com capacidade de 16 bits. O tamanho do die era de 12mm<sup>2</sup>. Ele tinha uma taxa de clock de 740kHz a 750kHz e podia processar um máximo de 92500 instruções por segundo. 10 micrômetros já é um tamanho bem pequeno na escala normal mas colocando isso no contexto computacional de hoje, esses transistores eram absolutamente enormes e o 4004 tinha tão poucos deles que não tinha tanta capacidade, por isso computadores faziam trabalhos tão triviais nessa época.

Um ano depois outro microprocessador seria lançado, a versão melhorada do 4004, o **Intel 8008**. Ele foi construído usando a mesma litografia de 10 micrômetros mas com um pequeno aumento na quantidade de transistores, tendo 3500 transistores. Claro que se os tamanho dos transistores não mudaram mas sua quantidade sim, o tamanho da matriz do 8008 deveria ser maior que a do seu predecessor. O 8008 era 3 milímetros quadrados maior do que o 4004, chegando a 15mm<sup>2</sup>. Seu alcance de clock ia de 200kHz a 800kHz, uma faixa maior do que seu predecessor e um maior clock máximo também.

O próximo avanço da litografia aconteceria 2 anos depois com o lançamento do **Intel 8080** que tinha uma litografia de 6 micrômetros, um grande salto para essa época. O 8080 também tinha alguns milhares de transistores a mais do que o 8008, contendo 4500 transistores e 1 núcleo. Houve também um grande salto de clock, com seu clock base sendo 2MHz e seu máximo sendo 3.125MHz. O tamanho de sua matriz era de 20.1mm<sup>2</sup>.

### A transição para nanômetros

Alguns anos mais tarde, precisamente 11 anos, nós chegamos a marca da litografia de **1 micrômetro** com o 80386, também conhecido como i386, com **275,000 transistores**, o que foi um grande salto a partir dos processadores anteriores que tinham apenas alguns milhares de transistores. Ele tinha um clock base de 16MHz e um máximo de 40MHz, um barramento de data e de endereço com capacidade de 32 bits, que era bastnate rápido para a época. Depois dele veio o i486, foi o último processador a ser fabricado no processo de micrômetros, sua litografia era de 0.6 micrômetros e depois disso, partiríamos para a escala dos **nanômetros** com um nome bastante conhecido por entusiastas de TI.

No ano de 1993, o primeiro processador Pentium foi lançado, o P5 era empacotado com várias features e foi o primeiro processador a ser construído no processo da escala de nanômetros com uma litografia de 600nm e 3,100,000 transistores. Ele também veio com uma FPU (Unidade de Ponto Flutuante ou Floating Point Unit) mais rápida, um barramento de dados com maior capacidade e cache L1 (herdado do i486, que foi o primeiro processador a ter cache de dados L1).

Dois anos depois a arquitetura P6 foi lançada com o processador Pentium mais conhecido, o Pentium II, sua litografia foi quase cortada pela metade com os processos de 350nm e 250nm, ele foi lançado no ano de 1995 e descontinuado nos anos 2000, os processadores feitos nessa arquitetura chegavam a ter 7,500,000 transistores e uma matriz de 194.8mm<sup>2</sup>.

Nos mesmos anos 2000 onde a arquitetura P6 foi descontinuada a série dos Pentium 4 foi lançada, não falaremos sobre todos os processadores da linha aqui, mas seu menor processador tinha uma litografia de 65nm e tinha 188 milhões de transistores dentro dele, o que é uma grande quantidade de transistores. O clock nessa linha já havia chegado aos GHz, indo de 1.3GHz a 3.8GHz.

De tempos em tempos a litografia foi ficando menor e menor até chegarmos aos tamanhos de 5 nanômetros hoje, anunciados pela AMD na Computex 2022, alguns dizem que estamos perto da menor litografia possível com as ferramentas atuais, que seria 3nm. Ir além dos 3nm causaria alguns problemas de troca de portões (gate switching) porque os transistores estariam muito perto do tamanho de um átomo, um traço de 3nm tem aproximadamente a largura de 10 átomos.

## Conclusão

Então, para fechar o assunto, temos uma maneira muito boa de fabricar processadores que vem sendo usada desde 1971, mas está chegando ao limite, a CPU com a menor litografia hoje tem algo como 4,15 bilhões de transistores dentro dela, o que é uma **enorme** diferença desde os primeiros processadores. Se pensarmos em quanto a quantidade de transistores aumentou desde o primeiro processador em 50 anos, a diferença é surpreendente.

Se você tiver alguma dúvida ou correção sobre este artigo, você pode me encontrar no github como **[@luk3skyw4lker](https://github.com/luk3skyw4lker/)** e me enviar um e-mail ou abrir um PR no repositório do blog. Obrigado por ler!