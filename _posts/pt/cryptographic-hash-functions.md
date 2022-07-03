---
title: 'Funções de hash criptográficas'
excerpt: 'Neste artigo falaremos um pouco sobre criptografia com foco em funções de hash, suas diferenças para outros algoritmos criptográficos e para que elas são úteis.'
coverImage: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=**Funções%20de%20hash**%20criptográficas&images=https://cdn.iconscout.com/icon/free/png-256/recovery-key-1824312-1545968.png'
date: '2022-07-03T13:00:00.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=**Fun%C3%A7%C3%B5es%20de%20hash**%20criptogr%C3%A1ficas&images=https://cdn.iconscout.com/icon/free/png-256/recovery-key-1824312-1545968.png'
---

## Introdução a algoritmos criptográficos

Um algoritmo criptográfico pode ser explicado como qualquer outro algoritmo, que vem a ser uma sequência finita de passos bem definidos para resolver um problema específico ou para realizar algum tipo de computação, existem muitos algoritmos, mas quando entramos na área de algoritmos criptográficos, estamos falando de algoritmos usados para realizar algum cálculo sobre alguns dados que devem ser confiáveis ou confidenciais, como senhas que não devem ser lidas, uma assinatura digital ou alguma informação que é usada como meio de autenticação por qualquer software. Elas são usadas para proteção de privacidade em geral.

## O que é uma função de hash criptográfica?

Uma função de hash criptográfica (também conhecida como CHF) é um algoritmo matemático que transforma alguns dados de tamanho arbitrário (que são chamados de **mensagens**) em uma matriz de bits com tamanho fixo que é chamada de **valor de hash** ou **message digest**. Uma CHF deve ser sempre determinística, o que significa que se você sempre passar a mesma mensagem, sempre terminará com o mesmo resultado, também existem mais algumas propriedades que são ideais em um CHF:

- Deve ser **rápido** calcular uma hash para qualquer mensagem;
- Deve ser inviável reverter o processo de hash (ou seja, você não deve conseguir calcular a mensagem a partir de uma determinado hash);
- Deve ser inviável que duas mensagens acabem tendo a mesma hash;
- Uma pequena alteração na mensagem deve alterar o hash resultante de uma maneira que pareça não correlacionada com o valor do hash antigo.

A grande maioria das CHFs é projetada para receber uma string de qualquer comprimento como entrada e produzir um valor de hash de comprimento fixo. Uma CHF deve ser capaz de resistir a qualquer tipo de ataque de **criptoanálise**.

## Propriedades

O nível de segurança de uma CHF pode ser definido usando as seguintes propriedades:

- Resistência à pré-imagem
- Resistência à segunda pré-imagem
- Resistência a colisões

Vamos mergulhar mais fundo em cada uma dessas propriedades

### Resistência à pré-imagem

Dado qualquer valor de hash _h_, não deve ser fácil encontrar uma mensagem _m_ tal que _h = hash(m)_. Que está relacionado ao conceito de uma função unidirecional, você só pode calcular o hash a partir de uma mensagem e nunca fazer o inverso (calcular uma mensagem a partir de uma hash).

### Resistência à segunda pré-imagem

Dada uma entrada m<sub>1</sub>, deve ser difícil encontrar uma entrada m<sub>2</sub> tal que _hash(m<sub>1</sub>) = hash(m<sub >2</sub>)_. Essa propriedade também é chamada de resistência à colisão fraca, qualquer função que não possua essa propriedade é suscetível a um ataque segunda de pré-imagem.

### Resistência a colisões

Dadas muitas entradas, você não deve ser capaz de gerar hashes iguais para qualquer uma delas, todos devem ser completamente diferentes um do outro. A resistência à colisão implica em **segunda resistência à pré-imagem**, mas não implica em resistência à pré-imagem. A suposição mais fraca é sempre preferida, mas uma função que é apenas resistente à segunda pré-imagem é considerada insegura e não é recomendada para uso em produção.

Informalmente, todas essas propriedades significam que um adversário mal-intencionado não pode substituir ou modificar a entrada de dados sem causar uma enorme diferença no digest, portanto, se duas strings tiverem o mesmo digest, você pode assumir com certeza que são a mesma string. A resistência à segunda pré-imagem impede que um invasor crie um documento com o mesmo hash que um documento que ele não pode controlar e a resistência à colisão impede que um invasor crie dois documentos diferentes com o mesmo hash.

No entanto, mesmo que uma função atenda a todos esses critérios ela ainda pode ter propriedades indesejáveis, as CHFs atualmente populares são vulneráveis ​​ao ataque de extensão de comprimento, onde dado um _hash(m)_ e um _len(m)_ mas não _m_, escolhendo um _m'_ adequado um invasor pode calcular _hash(m + m')_ onde + representa a concatenação de duas strings. Este ataque pode ser usado para quebrar esquemas de autenticação ingênuos baseados em funções de hash, para contornar esse problema você pode usar a **construção HMAC**.

## Grau de dificuldade

Na área criptográfica "difícil" significa "quase certamente fora do alcance de qualquer adversário que deva ser impedido de quebrar o sistema enquanto a segurança do sistema for considerada importante", o que implica que o significado do termo é um pouco dependente da aplicação uma vez que o esforço que um agente malicioso pode colocar na tarefa é proporcional ao seu ganho esperado, mas o esforço geralmente se multiplica com o tamanho do digest, então até mesmo uma vantagem de mil vezes no poder de processamento pode ser neutralizada adicionando algumas dezenas de bits no comprimento do digest.

Para mensagens selecionadas de um conjunto limitado de mensagens, como senhas ou quaisquer outras mensagens mais curtas, deve ser viável reverter o processo tentando todas as mensagens possíveis no conjunto. Como os CHFs são projetados para serem calculados rapidamente, algumas funções especiais de derivação de chave que exigem maiores recursos de computação foram desenvolvidas para dificultar esses ataques de força bruta.

O termo "difícil" também pode ter um significado puramente matemático, como "não solucionável em **tempo polinomial assintótico**", essas interpretações de dificuldade são importantes para o estudo de CHFs **provavelmente seguros**, mas não têm uma forte ligação à segurança prática dos mesmos. Como exemplo, um algoritmo de tempo exponencial pode ser rápido o suficiente para tornar um ataque viável, por outro lado, um algoritmo de tempo polinomial (que requer mais poder de processamento) pode ser muito lento para qualquer uso prático.

## Aplicações de CHFs

Uma CHF possui diversas aplicações, principalmente na área de segurança da informação, alguns exemplos são: assinaturas digitais, MACs (códigos de autenticação de mensagens), e muitas outras formas de autenticação. Eles também podem ser usados para impressão digital, para indexar dados em tabelas de hash, para detectar dados duplicados ou identificar exclusivamente um recurso, como somas de verificação de verificação para detectar corrupção de dados em geral.

### Integridade das mensagens e identificação dos arquivos

Como uma das propriedades de uma CHF é que dada sempre a mesma mensagem você sempre terá o mesmo valor de hash no final, eles podem ser usados ​​para verificar a integridade de mensagens e arquivos comparando os resumos de mensagens antes e depois da transmissão, se houver alguma diferença entre essas comparações, significa que a mensagem ou o arquivo foram corrompidos ou modificados no processo de transmissão.

Os CHFs comuns usados ​​para essas verificações são: **MD5**, **SHA-1** ou **SHA-2**. Eles são comumente usados ​​para verificar a integridade de arquivos baixados e troca de mensagens entre sistemas. O processo estabelecido por essas verificações pode ser chamado de **cadeia de confiança** desde que os hashes sejam postados em um site confiável, que geralmente é o site de origem, autenticado por HTTPS. O uso de CHFs e cadeia de confiança pode detectar alterações maliciosas no conteúdo da mensagem.

Muitos sistemas de gerenciamento de código-fonte, como **Git**, **Mercurial** e **Monotone**, usam o **sha1sum** de vários tipos de conteúdo para identificar recursos exclusivamente (conteúdo de arquivo, árvores de diretório, informações de ancestralidade e etc.). As redes de compartilhamento de arquivos ponto a ponto também aproveitam as funções CHF para identificar arquivos, no link ed2k uma variante do hash MD4 é combinada com o tamanho do arquivo fornecendo informações suficientes para localizar, baixar e verificar o conteúdo de um arquivo. Os links magnéticos também são um bom exemplo do uso de CHFs para identificar arquivos em uma árvore de hash ou lista de hash.

### Operação e verificação de assinatura

Uma assinatura digital é um esquema matemático para verificar a autenticidade de documentos digitais e CHFs podem ser usadas como ferramentas para proteger a mensagem, o que permite que o cálculo da assinatura seja realizado no digest de hash relativamente pequeno e de tamanho estático. A mensagem será considerada autêntica se a verificação da assinatura for bem-sucedida, dada a assinatura e o digest de hash recalculado sobre a mensagem. Caso a verificação não seja bem-sucedida, a mensagem provavelmente poderá ter sido alterada durante a transmissão por meio de um ataque **Man In The Middle (MITM)**, por exemplo.

Isso só pode ser alcançado devido à propriedade de integridade da mensagem dos CHFs que protege e ajuda a criar esquemas de assinaturas digitais eficientes.

### Verificação de senha

Um dos usos mais comuns de uma CHF é para segurança e verificação de senha. Se você armazenar sua senha de usuário com texto simples, isso pode levar a muitos problemas de segurança, já que sua aplicação pode ser invadida e seu banco de dados vazado, nesse caso o adversário malicioso teria acesso a todos os seus sistemas apenas lendo os dados que ele roubou. Uma das formas de diminuir o perigo é armazenar apenas o hash digest de cada senha e para autenticar seu usuário você faz o hash da senha fornecida por ele e compara com o hash armazenado. Se você usar esse método, deverá fornecer um sistema de redefinição de senha, pois não é possível calcular a senha de um usuário a partir de seu valor de hash.

Uma das propriedades mencionadas anteriormente é que as CHFs são projetadas para serem calculadas rapidamente e, como resultado, é possível tentar senhas adivinhadas em altas taxas. Usando uma GPU comum, você pode tentar bilhões de senhas possíveis por segundo. Para resolver esse problema, você pode usar funções de hash de senha projetadas para executar **extensão de chaves**, alguns exemplos são: **PBKDF2**, **scrypt** ou **Argon2**, elas usam um esquema de invocações repetidas de uma CHF para aumentar o tempo e, em alguns casos, a quantidade de memória necessária para executar ataques de força bruta em digest de senha armazenados. Essas funções de hash de senha geralmente exigem o uso de um grande valor de **salt** aleatório não secreto que pode ser armazenado junto com o hash, essa salt torna a saída aleatória e torna impossível para um adversário armazenar uma tabela de senhas e hashes pré-computados que pode ser comparado a qualquer digest de hash de senha.

### Prova de trabalho

Um sistema, protocolo ou função de Prova de Trabalho é uma medida econômica usada para impedir ataques DoS e muitos outros abusos de serviço em uma rede pela exigência de algum trabalho do solicitante do serviço, geralmente isso significa tempo de processamento de um computador. O conceito-chave desses esquemas é sua assimetria, onde o trabalho deve ser moderadamente difícil, mas viável para o solicitante, mas fácil de verificar para o provedor de serviços. Um dos sistemas populares usados ​​em Bitcoin e Hashcash é o uso de inversões parciais de hash para provar que o trabalho foi feito para desbloquear uma recompensa de mineração em Bitcoin e como um token de boa vontade para enviar um e-mail em Hashcash.

O processo consiste em que o remetente seja solicitado a encontrar uma mensagem cujo valor de hash comece com um número de bits zero, a quantidade média de trabalho necessária ao remetente para encontrar uma mensagem válida é exponencial no número de bits zero necessários no valor de hash, enquanto o receptor pode validar a mensagem executando uma única função de hash. Novamente com o exemplo de Hashcash: o remetente é obrigado a gerar um cabeçalho no qual o valor de hash SHA-1 de 160 bits tenha os primeiros 20 bits como zeros, o que significa que o remetente terá que tentar até 2<sup>19 </sup> vezes para encontrar um cabeçalho válido.

## Conclusão

E é isso por este artigo, hoje falamos sobre um assunto bem denso, Funções de Hash Criptográficas, falamos sobre o que são, suas propriedades e suas aplicações, espero que o conteúdo aqui tenha feito a diferença para você. Em caso de dúvidas, consulte meu **[Github](https://github.com/luk3skyw4lker)** e entre em contato comigo por e-mail, LinkedIn ou Twitter. Até logo!