---
title: 'What is lithography?'
excerpt: 'Did you ever thought about how processors are made? Or how does it work inside? Today I will try to explain a little of these topics for you and speak about lithography, which is one of the concepts present in the making of all CPUs today.'
coverImage: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=What%20is%20**lithography**%3F&images=https://www.svgrepo.com/show/135990/cpu.svg'
date: '2022-07-10T13:00:00.000Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=What%20is%20**lithography**%3F&images=https://www.svgrepo.com/show/135990/cpu.svg'
---

## Introduction to Processors History

A processor, aka CPU (Central Processing Unit), is essentially a electronic circuit capable of executing the instructions that are contained inside a **program**, it works like an automatic **abacus**, which means that the type of number system affects how it works. It performs some operations such as input/output (I/O) operations, basic arithmetic, logics, controlling instructions specified by the program. It also interacts with another parts of the computer, such as RAM, non-volatile memory devices, motherboard chipsets and another specialized processors such as GPUs (Graphic Processing Unit).

Starting from the early 50s, each computer design was completely unique, if you wrote a program for a specific machine, the same program wouldn't ever run in another one, even if it was another computer from the same company. This freedom at the time was very important, because the designers were very constrained by the electronic's cost and the best organization for a computer was still being explored, there was also important features that were introduced at the time: **index registers**, a **return address**, **immediate operands** and **detecting invalid operators**. As said earlier, the type of number system affects how a computer works (this is still true for today), so in the early 50s most of the computers used the decimal system and were build for specific numerical processing tasks, which means that their mathematical functions worked at the base-10 instead of base-2 as it is today, also these weren't simply binary coded decimals, some machines had **ten vaccuum tubes** per digit for each processor register.

### The Transistor

In the year of 1947, at Bell Labs (the research arm of AT&T), the main component of modern processors were first demonstrated successfully, and it's name was: **transistor**. A transistor is a semiconductor device with three terminals for connection to an electric circuit, it replaced the vaccum-tube **triode** (that was a vaccum tube with three electrodes inside an evacuated glass envelope). A transistor is essentially an electronically controlled switch that we can turn on or off by applying or removing tension from the gate and there is basically two types of transistors: nMOS and pMOS, the nMOS is the one that allows current to go through when the gate is on and the pMOS is the one that only allows current to go through when the gate is off, these are the transistors used at the **construction of CPUs** and a processor is built by connecting a lot of transistors (and many other components, but let's keep it simple) together in different patterns, allowing the processor to perform different actions depending on the triggered circuit.

## What is litography?

So we learned that a processor is formed by many transistors binded together in different patterns, and since these transistors are some physical semiconductors, they have a **size** and having a size, you can only fit them into a limited amount of space. We also know that processors are not that big, so we have two possibilites: either a processor has only a few transistors or they are incredibly small, it may seem obvious but the latter is true, the transistors inside a processor are incredibly small and a **processor's litography** is the name that we give to the size degree of each transistor inside a processor which is measured in meters (usually followed by a **unit prefix**, like micro or nano).

The first comercially produced microprocessor was the **Intel 4004**, it had a litography of 10 micrometers and it was made with 2300 transistors. It's features were a data bus with a width of 4 bits and a address bus with a width of 16 bits when multiplexed. It's size was 12mm<sup>2</sup>