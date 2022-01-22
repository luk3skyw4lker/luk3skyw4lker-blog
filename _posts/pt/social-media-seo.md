---
title: 'SEO nas redes sociais'
excerpt: 'Muitas pessoas ainda não entendem sobre SEO e indexação de sites, principalmente quando relacionado ao engajamento nas mídias sociais, então hoje vamos cobrir este tópico para ajudar quem deseja ter um melhor engajamento com suas publicações.'
coverImage: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=**SEO**%20em%20redes%20sociais&images=https://www.svgrepo.com/show/45741/search.svg'
date: '2022-01-21T17:00:00.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=**SEO**%20em%20redes%20sociais&images=https://www.svgrepo.com/show/45741/search.svg'
---

## O que é SEO?

SEO significa Optimização de Motor de Busca (Search Engine Optimization) e é o processo de otimizar a configuração técnica do seu site, relevância de conteúdo e popularidade do link para que as páginas sejam mais facilmente indexadas, mais relevantes e mais fáceis de se encontrar em buscas de usuários e, como consequência, melhor posicionamento em motores de busca.

Motores de busca são o que ajudam as pessoas a encontrarem o que elas querem, como o Google, para fazer este trabalho eles têm que entender a vasta quantidade de websites que formam a web. Eles rodam certos agoritmos sofisticados para buscar páginas que são relevantes para a busca do usuário.

## Como isso funciona em um site?

Para você fazer um bom SEO no seu site, você deve conhecer algumas tags HTML que são importantes para os motores de busca (especialmente o Google, já que ele têm cerca de 92% do market share de motores de busca, é por isso que geralmente você verá tutoriais de SEO focados no Google).

Essas tags vão dizer ao buscador do motor de busca como "ler" o conteúdo do seu site, isso ajuda os motores de busca a saber sobre o que é o seu conteúdo e como categorizar o material. Algumas delas também tem impacto em como o visitante vê o conteúdo da sua página no motor de busca e como as redes sociais mostra a página do seu artigo. Vamos dar uma olhada em algumas tags importantes:

### Tags Title

Essa é uma das tags mais importantes para SEO já que é o rótulo da sua página e um dos principais pontos de correspondência para um motor de busca ver a sua página, todo resultado presente neles é derivado do título. A tag título não necessariamente precisa ser igual ao título do artigo, mas você quer manter um certo nível de correspondência entre eles.

Se você tem um artigo com um título "Como aprender JavaScript" e colcoa um título "Porquê você deveria aprender JavaScript" isso vai causar confusão nos seus leitores, eles vão muito provavelmente pular seu artigo. Também há formas de otimizar suas tags de título, mas não é um assunto para este artigo. Aqui está um exemplo sobre como usar a tag título:

```html
<head>
	<title>How to learn JavaScript the best way</title>
</head>
```

Como você pode ver, ela vai dentro da tag <head\> da sua página, porque ela não deve ser um elemento visual, é apenas um ponto de dados da configuração da sua página.

### Tags Meta

Tags meta também são super importantes para seu SEO, elas podem ser usadas pelos buscadores de motores de busca para pegar informações extra do seu site e indexá-la melhor, um bom exemplo disso é o trecho de texto abaixo de qualquer título de busca, ele é usualmente tirado de uma tag meta de descrição de um site. Olhe este exemplo:

```html
<meta
	name="description"
	content="Aprenda JavaScript rápido e de uma maneira simples lendo nosso artigo de introdução!"
/>
```

Uma frase chave aqui é "JavaScript rápido e da forma fácil", esse é um bom exemplo de como você pode incluir frases chave para melhorar o posicionamento do seu site.

Há muitas outras tags meta também, mas isso seria demais para cobrir neste artigo em um artigo, mas as principais são a tag _description_ e a tag _keywords_, que torna mais fácil para os motores de busca encontrarem sua página. É importante alertar também que sua tag _keywords_ deveria ser alinhada com o conteúdo do seu site ou também poderia causar confusão nos seus leitores e fazer eles pularem seu conteúdo.

### Tags Header

A tags header são usadas para marcar alguns títulos dentro do seu artigo, não subestime o poder delas, eles tornam seu conteúdo mais fácil de ser lido e para procurar termos a chave. Muitos dos visitantes (cerca de 55%) vai gastar 15 segundos rolando pelo seu conteúdo e títulos vão ajudar eles encontrarem o que eles estão procurando.

Um exemplo seria: e se um leitor que está interessado apenas em ler sobre tags meta? Tags de título o ajudariam a encontrar o que ele está procurando muito rápido, do contrário ele sairia sem nem engajar o conteúdo. Em termos de SEO, tags de título podem ajudar os motores de busca segmentar sua página e construir trechos cheios de conteúdo. Dê uma olhada na hierarquia das tags título:

- <h1\> – usualmente reservada para títulos de páginas;
- <h2\> - destaca os tópicos dos títulos;
- <h3\> – reflete pontos relacionados aos tópicos;
- <h4\> – pontos de suporte para <h3\>;
- <h5\> – não usada frequentemente, mas ótima para pontos de suporte de <h4\>.

### Adicione Tags OG e Twitter Cards

Tags Open Graph (OG) podem ajudar a melhorar a procura e as habilidades de mostra do seu site em redes sociais, se você posta seu artigo no Facebook como um exemplo, ele usará as tags open graph mostra as informações sobre o conteúdo que você está compartilhando. Aqui está um exemplo de uma tag OG:

```html
<meta name="og:title" property="og:title" content="SEO em rede social" />
```

Agora se você compartilhar o artigo no Facebook, ele vai mostrar o título tirado direto da tag meta og:title. Ela também suporta descrições e imagens. As tags Open Graph simplesmente te dão opções de como customizar sua página vai parecer quando compartilhada nas redes sociais, você poderia até ter uma tag de descrição para o Google e outra para redes sociais, que é muito útil se você está tentando atingir usuários específicos em cada plataforma. Você deve apenas ter certeza de que sua tag de descrição ainda corresponde o conteúdo da sua página, afinal, é tudo sobre relevância.

Outro bom recurso é a plataforma Twitter Cards, eles funcionam de uma forma parecida com as tags OG mas são específicas para o Twitter. Para habilitá-las você deveria usar a seguinte tag:

```html
<meta name="twitter:card" content="summary" />
```

Agora se você for até a [Referência de Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) você verá que existem várias formas de estilizar um card e muitas meta tags específicas do Twitter para se trabalhar, você tem até um [Validador de Twitter Cards](https://cards-dev.twitter.com/validator) onde você apenas cola a URL do seu site e ele valida o card para você ou retorna algum erro se qualquer tag necessária não for encontrada.

## Conclusão

Nós vimos algumas tags importantes para SEO e formamos algumas bases para você iniciar seus estudos. Eu espero que o conteúdo aqui tenha sido útil para você e que tenha adicionado conhecimento ao seu portfólio de idéias.

Se você tiver qualquer dúvida, você pode me contatar por email ou abrir uma issue no repositório do blog, meu perfil do GitHub com todas essas informações está logo abaixo desta descrição, se sinta livre para me contatar!
