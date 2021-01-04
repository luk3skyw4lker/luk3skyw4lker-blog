---
title: 'Construindo gráficos com React Native'
excerpt: 'Sempre foi um desafio construir gráficos com React Native, hoje eu demonstrarei como fazê-lo de uma maneira fácil usando uma biblioteca que constrói os gráficos usando uma abordagem de SVG'
coverImage: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=Construindo%20**gráficos**%20com%20**React%20Native**&images=https://cdn.worldvectorlogo.com/logos/react-2.svg&images=https://www.flaticon.com/svg/static/icons/svg/784/784814.svg'
date: '2020-12-18T13:58:07.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=Construindo%20**gráficos**%20com%20**React%20Native**&images=https://cdn.worldvectorlogo.com/logos/react-2.svg&images=https://www.flaticon.com/svg/static/icons/svg/784/784814.svg'
---

## Visão geral

Eu vejo muitas dúvidas sobre como construir e mostrar gráficos em React Native e hoje eu escrevo este artigo esperando que se torne um guia claro e bom para qualquer um que esteja procurando um bom tutorial em como fazê-lo.

Primeiro, vamos dar uma olhada nas duas bibliotecas mais usadas hoje:

- **<a href="https://www.npmjs.com/package/react-native-chart-kit">react-native-chart-kit</a>**
- **<a href="https://www.npmjs.com/package/react-native-svg-charts">react-native-svg-charts</a>**

Essas são as duas bibliotecas mais usadas disponíveis no NPM, mas uma vez que a **react-native-chart-kit** não é tão personalizável como a **react-native-svg-charts**, nós ficaremos com a segunda. Ambas vêm com componentes prontos para uso, mas a svg-charts proporciona mais personalização e uma documentação melhor também.

Se você quiser mais opiniões, você pode checar esse [Top 8 Bibliotecas de Gráficos para React Native](https://blog.logrocket.com/the-top-8-react-native-chart-libraries-for-2021/) (o artigo está em inglês). Okay, vamos começar com o nosso projeto.

## Inicialização

Para nos poupar tempo na configuração do projeto, eu construí uma tela base para começarmos, você pode encontrar ela no [**Repositório do Github**](https://github.com/luk3skyw4lker/rn-charts.git). Nós vamos construir alguns dados randômicos para renderizar em nosso gráfico e no fim do artigo, haverão duas sugestões para evoluir o projeto.

**Nota**: Há apenas uma coisa que você tem que fazer para progredir com o projeto: criar uma conta na [**OpenWeatherMap**](https://openweathermap.org) e adquirir sua API Key para colocar na variável OPEN_WEATHER_KEY. Se você não fizer isso, o app irá lhe mostrar uma grande quantidade de dados NaN. O processo é bastante simples, uma vez que você tiver criado a conta, vá até a tab API no menu de navegação superior e depois que estiver lá, clique no seu nome de usuário no topo direito da página, você verá uma opção My API Keys, clique nela e você terá acesso a suas API Keys. Você tem a opção de usar a padrão ou criar uma nova.

Certo, agora que temos a parte principal do projeto conosco, vamos começar fazendo um gráfico de linha simples no container vazio adicionando este código na View presente na linha 169 do arquivo **App.tsx**:

```jsx
<View style={styles.chart}>
	<LineChart
		style={{ height: 200 }}
		data={[10, 15, 20, 10, 19]}
		svg={{ stroke: 'rgb(0, 0, 0)', strokeWidth: 1.8 }}
		contentInset={{
			top: 20,
			bottom: 20,
			right: 10,
			left: 10
		}}
	></LineChart>
</View>
```

Você não vai precisar importar o componente LineChart uma vez que ele já está importado no topo do arquivo. Neste ponto, você estará vendo um gráfico de linha dentro do antes vazio container com uma linha preta fazendo o caminho dos dados.

Vamos dar uma olhada em cada propriedade que estamos passando ao componente LineChart:

- style: as propriedades de estilo, tais como width, height, elevation, shadow e tudo mais (algumas não vão funcionar uma vez que o gráfico é desenhado totalmente usando componentes SVG);
- data: O array de dados para o gráfico renderizar, esses dados **devem ser** um array ou o gráfico não será renderizado. Se um dos dados for `undefined` ou `null`, não há problema, uma vez que o gráfico por si irá tratar isso;
- svg: The SVG style specification, such as stroke, fill, strokeWidth, fillOpacity and many more, we use that to style our chart line (it also can be the bar, pie or area, depending on the chart type);
- svg: A especificação de estilo SVG, tais como stroke, fill, strokeWidth, fillOpacity e muitas outras, nós usamos isso para estilizar a linha do gráfico (também pode ser a barra, torta ou área, dependendo do tipo do gráfico);
- contentInset: O distância que as partes internas do gráfico terão em relação às margens.

Certo, agora que olhamos as propriedades que passamos, vamos fazer o nosso gráfico ficar um pouco mais chique. O primeiro passo será instalar uma biblioteca que vai nos possibilitar adicionar curvas no nosso gráfico, execute o seguinte comando no seu terminal (cheque se está no diretório do projeto):

```shell
npm install d3-shape
```

Se você estiver usando yarn, apenas troque `npm install` por `yarn add`.

Agora para ter o nosso gráfico com curvas, devemos importar a biblioteca d3-shape no topo do nosso arquivo e adicoinar uma nova propriedade ao componente LineChart, a propriedade `curve`:

```jsx
import * as shape from 'd3-shape'

...

<View style={styles.chart}>
	<LineChart
		style={{ height: 200 }}
		data={[10, 15, 20, 10, 19]}
		svg={{ stroke: 'rgb(0, 0, 0)', strokeWidth: 1.8 }}
		contentInset={{
			top: 20,
			bottom: 20,
			right: 10,
			left: 10
		}}
		curve={shape.curveMonotoneX}
	></LineChart>
</View>

...

export default App;
```

A opção `curveMonotoneX` é a mais adequada para nosso projeto, já que vamos adicionar alguns marcadores e legendas ao projeto. Ela enfatiza os pontos corretos e nos poupa um tempo de configuração e cálculo.

Certo, agora nosso gráfico está bastante mais chique do que antes, mas ainda vamos adicionar duas features nele:

- Círculos indicadores em cada ponto de dados
- Legenda no topo de cada círculo

Mas primeiro eu acho que devemos entender como o SVG funciona, então vamos lá.

## Entendendo como o SVG funciona

De acordo com a MDN, SVG pode ser definido como uma **Linguagem de marcação baseada em XML para descrever vetores gráficos de duas dimensões**. Então ela é basicamente um padrão de Web aberto baseado em texto para descrever imagens que podem ser renderizadas de forma limpa e é projetada para funcionar junto com outros padrões da web, tais como CSS, DOM, JS e etc. Colocando em termos de correspondência: SVG é para gráficos o que o HTML é para texto.

Note que SVG funciona com vetores bidimensionais, você tem que entender que uma imagem SVG é construída usando uma aproximação similar ao "plano cartesiano", usando x e y como referência para cada elemento. Entender isso me ajudou bastante com essa biblioteca em específico. De agora em diante nós trabalharemos bastante com referências x e y para especificar a posição para nossos elementos no plano do gráfico.

Okay, nós acabamos de fazer uma rápida conversa sobre SVG, se você quiser entender ainda mais sobre SVG, visite a [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG), será de grande ajuda para você, a maior parte do conteúdo deste resumo foi tirada de lá.

## De volta aos gráficos

Então, voltando para os gráficos, vamos fazer a primeira tarefa que mencionei, o círculo em cada ponto de dado. Para fazer isso, nós devemos primeiro criar nossos próprios componentes `Markers` e `Label`. Para fazêlo, você deve criar uma pasta components dentro da pasta `src` existente e dentro dessa pasta, criar um arquivo `ChartComponents.tsx`. Será a partir desse arquivo que exportaremos todos os nossos componentes customizados.

Ambos os componentes são bem simples, nós usaremos algumas vantagens da própria biblioteca para fazer o processo ser mais fácil.

### Markers

O componente `Markers` consistirá de um círculo preto que será posicionado em cada ponto marcado. Escreva o seguinte código no nosso arquivo **ChartComponents.tsx**:

```jsx
import React from 'react';
import { Circle } from 'react-native-svg';

export const Markers = ({ x, y, data }) => {
	return data.map((item, index) => (
		<Circle
			key={index}
			cx={x(index)}
			cy={y(item)}
			r={5}
			stroke="#222"
			fill="#222"
		/>
	));
};
```

Todo componente passado como um fiho do componente LineChart, recebe um objeto de props que tem muitas propriedades dentro de si. Nós focaremos nas propriedades **x**, **y**, e **data** por razões práticas.

A propriedade **x**, é uma função de escala para indicar onde o componente será posicionado em relação ao eixo x. A propriedade **y** tem os mesmos princípios, mas para o eixo y. Nós usamos a propriedade **data** como uma referência, uma vez que o gráfico foi construído totalmente com base nesse array. No nosso caso, o ponto y será sempre correspondente ao dado no gráfico, e o ponto x será o index do dado dentro do array data com pequenos ajustes (nós faremos isso no próximo componente), mas você pode brincar com os valores para ver exatamente como tudo funciona.

Certo, eu dei toda a explicação mas não te mostrei como colocar isso na tela, mas para fazer isso, você simplesmente importa o componente no seu `App.tsx` e passa ele como um filho do componente LineChart, assim:

```jsx
import { Markers } from './src/components/ChartComponents';

...

<View style={styles.chart}>
	<LineChart
		style={{ height: 200 }}
		data={[10, 15, 20, 10, 19]}
		svg={{ stroke: 'rgb(0, 0, 0)', strokeWidth: 1.8 }}
		contentInset={{
			top: 20,
			bottom: 20,
			right: 10,
			left: 10
		}}
		curve={shape.curveMonotoneX}
	>
		<Markers />
	</LineChart>
</View>

...

export default App;
```

### Labels

Certo, com toda essa informação, acho que você já deve saber como implementar o componente `Labels`, certo? Escreva o seguinte código no nosso arquivo de componentes, logo abaixo do componente Markers:

```jsx
import React from 'react';
import { Circle, Text } from 'react-native-svg';

...

export const Labels = ({ x, y, data }) => {
	return data.map((item, index) => (
		<Text
			key={index}
			x={x(index)}
			y={y(item) - 13}
			fontSize={15}
			fontWeight="lighter"
			stroke="#222"
			fill="#222"
			textAnchor="middle"
		>{`${item}°C`}</Text>
	));
};
```

Agora só temos que fazer como fizermos com o componente `Markers` e adicionar isso ao nosso LineChart, seu código vai se parecer com este:

```jsx
import {
	Markers,
	Labels
} from './src/components/ChartComponents';

...

<View style={styles.chart}>
	<LineChart
		style={{ height: 200 }}
		data={[10, 15, 20, 10, 19]}
		svg={{ stroke: 'rgb(0, 0, 0)', strokeWidth: 1.8 }}
		contentInset={{
			top: 20,
			bottom: 20,
			right: 10,
			left: 10
		}}
		curve={shape.curveMonotoneX}
	>
		<Markers />
		<Labels />
	</LineChart>
</View>

...

export default App;
```

Mas você vai notar que o gráfico está estranho agora, algumas informações parecem estar fora dos limites da View, certo? E é exatamente o que está acontecendo. Mas como consertar isso? Nós faremos uso da propriedade contentInset do componente LineChart, configure para ser algo assim:

```jsx
contentInset={{
	top: 40,
	bottom: 40,
	right: 25,
	left: 25
}}
```

Agora nosso gráfico parece bem mais chique e agradável, não é?

## Considerações Finais

Hoje nós vimos como construir um gráfico real usando a biblioteca `react-native-svg-charts` e React Native e eu tenho um desafio para aqueles que chegaram até aqui:

Se você quiser testar seu gráfico com dados reais, use a variável de estado `forecast` para formatar e mostrar alguns dados no gráfico. Posso garantir que será uma experiência e tanto.

O desafio não será publicado no GitHub ainda, mas eu planejo resolver e postar assim que possível. Atualmente estou trabalhando em construir o básico do blog e traduzi-lo para pt-BR, então tomará um pouco de tempo.

De qualquer forma, obrigado por ter vindo até o fim do artigo e eu esperoq ue você tenha aprendido algo! Obrigado.
