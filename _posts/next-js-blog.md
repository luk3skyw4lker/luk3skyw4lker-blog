---
title: 'Building a Blog with Next.js and Typescript'
excerpt: 'The JavaScript ecossystem is getting bigger everyday. React is one of the most used techs that are built on top of the JavasScript language and Node.js runtime, and together with it, a lot of frameworks like Gatsby, which is the first concurrent of Next.js.'
coverImage: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=Building%20a%20Blog%20with%20**Typescript**%20and%20**Next.js**&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https://cdn.jsdelivr.net/gh/remojansen/logo.ts@master/ts.svg'
date: '2020-12-01T13:58:07.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=Building%20a%20Blog%20with%20**Typescript**%20and%20**Next.js**&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https://cdn.jsdelivr.net/gh/remojansen/logo.ts@master/ts.svg'
---

## Overview

The JavaScript ecossystem is getting bigger everyday. React is one of the most used techs that are built on top of the JavasScript language and Node.js runtime, and together with it, a lot of frameworks like Gatsby, Next.js, Blitz and many more. Today we will be using Next.js to build a totally static generated blog using one of the most popular features of the framework: Static Site Generation, a.k.a. SSG.

We'll start from the Next.js blog template with Typescript and use the Next.js v10 to build our blog with the latest features that Next.js provides. But then, you must be thinking: "alright, we have the frontend, but what about the API, database and articles?" That's where the fun begins, we will use Markdown to write the articles and as mentioned earlier, the SSG feature of Next.js to pre-render the pages on prod environment. It'll be easy as breathe.

So, the techs we will use here are:

- Node.js
- Next.js
- Typescript
- Markdown

Let's head into it! And in the end, I'll leave a little challenge for you guys to implement.

## Building the blog structure

Alright, so let's start with the basics, to save us time from configuring and installing the whole dependency pack and everything else we will use a pretty nice CLI that the Next.js team has developed the `create-next-app`, you guys must know the `create-react-app` package, and it's very similar to it. So, you have two options:

- Install the package globally and then run the command from your terminal
- Use npx or yarn to execute it without having to install the package globally

I would recommend the second one, since you don't have to remember to periodically upgrade your install, it will always execute the very last stable version, also, note that execute packages remotely on yarn only works if the package has the `create-` prefix.

Using **npx** you can execute:

    npx create-next-app next-js-blog --template blog-starter-typescript

But if you're using **yarn**, use this command instead:

    yarn create next-app next-js-blog --template blog-starter-typescript

Any of these commands will create a directory called 'next-js-blog' with the starter code for the blog, the directory will look like this on your file explorer:

PUT THE IMAGE OF THE DIRECTORY HERE

You'll see that the template already comes with a tailwind.config.js, that's because this template uses [Tailwind](https://tailwindcss.com/) to do the CSS, it's similar to Bootstrap, but it has a little more features and in my opinion works very well.
