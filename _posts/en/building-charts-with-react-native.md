---
title: 'Building charts in React Native'
excerpt: 'It was always a challenge to build charts in React Native, today I will show you how to do it in a easy way using a library that builds the charts using an svg approach.'
coverImage: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=Building%20**charts**%20in%20**React%20Native**&images=https://cdn.worldvectorlogo.com/logos/react-2.svg&images=https://www.svgrepo.com/show/167736/pie-charts.svg'
date: '2020-12-18T13:58:07.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=Building%20**charts**%20in%20**React%20Native**&images=https://cdn.worldvectorlogo.com/logos/react-2.svg&images=https://www.flaticon.com/svg/static/icons/svg/784/784814.svg'
---

## Overview

I see many doubts about how to build and display charts in React Native and today I'm writing this article hoping that it becomes a very clear and good guide for anyone who's trying to find a easy tutorial on how to do it.

At first, let's take a look into the two most used libraries today:

- **<a href="https://www.npmjs.com/package/react-native-chart-kit">react-native-chart-kit</a>**
- **<a href="https://www.npmjs.com/package/react-native-svg-charts">react-native-svg-charts</a>**

These are the two most used libraries on the NPM Package Registry, but since **react-native-chart-kit** isn't personalizable as **react-native-svg-charts**, we'll stick with the second one. Both of them comes with ready to use components, but svg-charts provides more personalization and better documentation as well.

If you want more opinions, you can check out this [Top 8 Charts Libraries For React Native](https://blog.logrocket.com/the-top-8-react-native-chart-libraries-for-2021/). Alright, let's get started with our project.

## Initialization

To save us time in the configuration of the project, I've built a base screen for us to start, you can find it on the [**GitHub Repository**](https://github.com/luk3skyw4lker/rn-charts.git). We will build some random data to render on our chart and in the end of the article, there will be two suggestions to evolve the project.

There's only one thing you must do in order to proceed with the project: create an account on [**OpenWeatherMap**](https://openweathermap.org) and get an API Key to put into the OPEN_WEATHER_KEY variable. If you don't do it, the app will show you a lot of NaN data. The process is very simple, once you've created the account, just go into the API tab in the top nav menu and then click your username on the top right of the screen, you'll see the My API Keys as an option, click it and you'll have access to your API Keys. You have the option to use the default one or create a new key.

Right, so now that we have the main part of the project with us, let's start by making a simple chart on the empty container by adding this code inside the View on line 169 of the **App.tsx** file:

```jsx
<View style={styles.chart}>
	<LineChart
		style={{ height: 200 }}
		data={[10, 15, 20, 10, 19]}
		svg={{
			stroke: 'rgb(0, 0, 0)',
			strokeWidth: 1.8
		}}
		contentInset={{
			top: 20,
			bottom: 20,
			right: 10,
			left: 10
		}}
	></LineChart>
</View>
```

You won't need to import LineChart since it's already imported on the top of the file. At that point, you will be seeing a line chart inside the after empty container with a black line making the way of the data.

Let's take a look on each prop that we're passing to the LineChart component:

- style: the style properties, such as height, width, elevation, shadow and everything else (some will not work since the chart is totally drawed using SVG Components);
- data: The data array for the chart to render, this data **must be** an array or the chart will not render. If one of the data is `undefined` or `null`, there is no problem, since the chart itself treats it for us.
- svg: The SVG style specification, such as stroke, fill, strokeWidth, fillOpacity and many more, we use that to style our chart line (it also can be the bar, pie or area, depending on the chart type).
- contentInset: The "padding" that the insides of the chart will have.

Alright, now that we've looked on the props we passed, let's make our chart more fancy. The fisrt step is to install a new library that will make it possible to add curves in our chart, execute the following command in your terminal (making sure you're inside the project directory):

```shell
npm install d3-shape
```

If you're using yarn, just replace `npm install` with `yarn add`.

Now to have our chart being curved, we must import the d3-shape library on the top of the file and add a new prop to the LineChart component, the `curve` property:

```jsx
import * as shape from 'd3-shape'

...

<View style={styles.chart}>
	<LineChart
		style={{ height: 200 }}
		data={[10, 15, 20, 10, 19]}
		svg={{
			stroke: 'rgb(0, 0, 0)',
			strokeWidth: 1.8
		}}
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

The `curveMonotoneX` is the more adequate for our project, since we will be adding some markers and labels to the project. It emphasizes the right points and spare us configuration and calculus time.

Right, so now our chart is a lot more fancy than before, but we will add two more features on it:

- Circle indicators on each data point
- Label on top of each circle

But I think that we must know how SVG works after doing that, so let's do it.

## Understanding how SVG works

According to the MDN, SVG can be defined as a **XML-based markup language for describing two dimensional based vector graphics**. So it's basically a text-based open Web standard to describe images that can be cleanly at any size and are designed to work with another web standards such as CSS, DOM, JS etc. Putting into correspondence terms: SVG is for graphics what HTML is to text.

Noting that SVG works with two dimensional vectors, you must understand that a SVG image is built using a "cartesian plane" similar approach, using x and y as reference for each element. Understanding this helped me a lot on working with this specific library. From now on we will work a lot with x and y references to specify a position for our elements in the chart plane.

Alright, we just made a brief talk about SVG, if you want to know more, visit the [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG), it will help you understand more about SVG, most of the content of that briefing, was taken from there.

## Back to the charts

So, getting back to the charts, let's do the first task I've mentioned, the circle on each data point. To do that, we must at first create our own `Markers` and `Label` compnents. To do that, you should create a components folder inside the `src` existant folder and inside it, create a `ChartComponents.tsx` file. It will be from this file that we will export all of our custom chart components.

Both components are very simple, we will use some caveats from the library itself to make it easier to build them.

### Markers

The `Markers` component will consist of a black circle that will be positioned on each marked data point. Just write the following code into our **ChartComponents.tsx** file:

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

Every component you pass as a child of the LineChart component, receives a props object that has many properties inside it. We'll focus on the **x**, **y** and **data** props for pratical reasons.

The **x** property, is a scale function to indicate where the component will be positioned in relation with the x axis. The **y** has the same principles, but for the y axis. We use the **data** property as reference, since the chart was built all on top of that array. In our case, the y point will always be the correspondent of the data in the chart, and the x will be the index of the data inside the data array with little adjustments (we'll do it on the next component), but you can play with the values to see exactly how it works.

Right, I gave all the explanation but didn't show you how to put it on the screen, but to put it, you just simply have to import it on your `App.tsx` and pass it as a child of the LineChart component, like this:

```jsx
import {
	Markers
} from './src/components/ChartComponents';

...

<View style={styles.chart}>
	<LineChart
		style={{ height: 200 }}
		data={[10, 15, 20, 10, 19]}
		svg={{
			stroke: 'rgb(0, 0, 0)',
			strokeWidth: 1.8
		}}
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

Right, so with all of that information you must know how to implement the `Labels` component, right? Write the following lines of code into the components file, right below the Markers component:

```jsx
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

Now we just have to do how we did with the `Markers` component and add it to our LineChart, your code will look something like this:

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
		svg={{
			stroke: 'rgb(0, 0, 0)',
			strokeWidth: 1.8
		}}
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

But you'll notice that the chat is strange now, some info seems to be out of the bounds of the View, right? That's precisely what is happening. But how to fix it? We'll make use of the contentInset prop of the LineChart component, set it to be like this:

```jsx
contentInset={{
	top: 40,
	bottom: 40,
	right: 25,
	left: 25
}}
```

Now our content looks a lot more agradable and our chart a lot more fancy, don't you think?

## Final Considerations

Today we have saw how to build a real chart using the `react-native-svg-charts` library and React Native and I have a challenge for those who came to the end of this article:

If you want to test your chart with some real data, use the `forecast` state variable to format and show some data into the chart. I can guarantee that will be a very nice experience for you to do.

The challenge won't be published on the GitHub yet, but I plan to solve it and post as fast as I can. I'm actually working on building the basics of the blog and translating it to pt-BR, so it will take a little time.

Anyway, I thank you for coming to the end of this article and I hope you have learned something! Thanks.
