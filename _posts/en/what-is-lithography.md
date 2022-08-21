---
title: 'What is lithography?'
excerpt: 'Did you ever thought about how processors are made? Or how does it work inside? Today I will try to explain a little of these topics for you and speak about lithography, which is one of the concepts present in the making of all CPUs today.'
coverImage: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=What%20is%20**lithography**%3F&images=https://www.svgrepo.com/show/135990/cpu.svg'
date: '2022-08-21T13:00:00.000Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=What%20is%20**lithography**%3F&images=https://www.svgrepo.com/show/135990/cpu.svg'
---

## Introduction to Processors History

A processor, aka CPU (Central Processing Unit) is essentially a electronic circuit capable of executing the instructions that are contained inside a **program**, it works like an automatic **abacus**, which means that the type of number system affects how it works. It performs some operations such as data input/output (I/O), basic arithmetic, logics, controlling instructions specified by the program. It also interacts with another parts of the computer, such as RAM, non-volatile memory devices, motherboard chipsets and another specialized processors such as GPUs (Graphic Processing Unit).

Starting from the early 50s, each computer design was completely unique, if you wrote a program for a specific machine, the same program wouldn't ever run in another one, even if it was another computer from the same company. This freedom at the time was very important, because the designers were very constrained by the electronic's cost and the best organization for a computer was still being explored. There was also important features that were introduced at the time: **index registers**, a **return address**, **immediate operands** and **detection of invalid operators**. As said earlier, the type of number system affects how a computer works (this is still true for today), so in the early 50s most of the computers used the decimal system and were build for specific numerical processing tasks, which means that their mathematical functions worked at the base-10 instead of base-2 as it is today, also these weren't simply binary coded decimals, some machines had **ten vaccuum tubes** per digit for each processor register.

### The Transistor

In the year of 1947, at Bell Labs (the research arm of AT&T), the main component of modern processors were first demonstrated successfully, and it's name was: **transistor**. A transistor is a semiconductor device with three terminals for connection to an electric circuit, it replaced the vaccum-tube **triode** (that was a vaccum tube with three electrodes inside an evacuated glass envelope). A transistor is essentially an electronically controlled switch that we can turn on or off by applying or removing tension from the gate and there is basically two types of transistors: nMOS and pMOS, the nMOS is the one that allows current to go through when the gate is on and the pMOS is the one that only allows current to go through when the gate is off, these are the transistors used at the **construction of CPUs** and a processor is built by connecting a lot of transistors (and many other components, but let's keep it simple) together in different patterns, allowing the processor to perform different actions depending on the triggered circuit.

## What is litography?

So we learned that a processor is formed by many transistors binded together in different patterns, and since these transistors are some physical semiconductors, they have a **size** and having a size, you can only fit them into a limited amount of space. We also know that processors are not that big, so we have two possibilites: either a processor has only a few transistors or they are incredibly small. It may seem obvious but the latter is true, the transistors inside a processor are incredibly small and a **processor's litography** is the name that we give to the size of each transistor inside a processor which is measured in meters (usually followed by a **unit prefix**, like micro or nano).

### The first processors litography

The first comercially produced microprocessor was the **Intel 4004**, it had a litography of **10 micrometers** and it was made with 2300 transistors, released in 1971. It's features included a data bus with a width of 4 bits and a address bus with a width of 16 bits when multiplexed. The die size was 12mm<sup>2</sup>. It had a clock rate of 740kHz to 750kHz and it could process a max of 92500 instructions per second. 10 micrometers is already pretty small in the normal scale but when you put this into today's computational context, these transistors were absolutely huge and the 4004 had so few of them that it couldn't do that much, that's why computers did such simple jobs back then.

A year later another microprocessor would be launched, the improved version of the 4004, the **Intel 8008**. He was built using the same 10 micrometer litography but with a little increase in the transistors quantity having 3500 transistors. Of course that if the transitors size didn't change but their quantity did, the 8008 die should be bigger in size than the 4004. The 8008 die was 3 square milimeters bigger than the 4004, going to 15mm<sup>2</sup>. It's clock was in the range of 200kHz to 800kHz, a bigger range than it's predecessor and a bigger max clock rate too.

The next jump of the litography would come 2 years later with the release of the **Intel 8080** that had a litography of 6 micrometers, a big jump for these times. The 8080 also had a thousand more transistors than the 8008, with 4500 transistors and 1 core. The 8080 also had a big clock rate jump, with it's base clock being 2MHz and it's max being 3.125MHz. It's die size was 20.1mm<sup>2</sup>.

### The transition to nanometers

A few years later, precisely 11 years later, we arrived at the **1 micrometer** litography with the 80386 aka i386 with **275,000 transistors**, which was a big jump from the early processors that had only a thousand of transistors. It had a base clock rate of 16MHz and a max clock rate of 40MHz, a data and address bus width of 32 bits, which was pretty fast for the time being. After the i386 it came the i486, it was the last processor in history to be manufactured at the process of micrometers size, it had a litography of **0.6 micrometers** and after it, we were off to the **nanometers** scale with a pretty recongnizable name for many IT enthusiasts.

At the year of 1993, the first Pentium processor were released, the P5 were bunched with a lot of features and it was the first processor to be built with the nanometer scale process with a litography of 600nm and 3,100,000 transistors. It also came with a faster FPU (Floating Point Unit), wider data bus and the L1 data cache technology (inherited from the i486, that was the first processor to have L1 data cache).

Two years later it came the P6 architecture with the most famous Pentium processor ever, the Pentium II, it's litography was almost cut to the half with the 350nm and 250nm process, it was released at the year of 1995 and discontinued in the 2000's, the processors made by this archteture had up to 7,500,000 transistors inside it and a die size of 194.8mm<sup>2</sup>.

In the same 2000's where the P6 architeture phased-out the Pentium 4 series was released, we're not gonna speak about all of the processors in this series but it's smallest process was 65nm and it had 188 million transistors inside it, which was a pretty big quantity of transitors. The clock size was already up to GHz, going from 1.3GHz to 3.8GHz inside the series.

From times to times the litography kept getting smaller and smaller until we reached the today's sizes of 5nm, announced by AMD at the Computex 2022, some say that this is close to the smallest litography possible with the actual tools, which is 3nm. Going smaller than 3nm would cause some gate switching problems because the transitors would be too close to the size of atoms, a 3nm trace is something like 10 atoms wide.

## Conclusion

So, to close the subject, we have a very good way of manufacturing processors that has been done since the 1971, but it's reaching a limit, the CPU with the smallest litography today has something like 4.15 billion transistors inside them, which is a **huge** difference since the first processors. If we think about how much the transistors quantity has increased since the first processor in 50 years the difference is astouding.

If you have any doubt or correction about this article, you can find me on github as **[@luk3skyw4lker](https://github.com/luk3skyw4lker/)** and email me or open a PR at the blog repository. Thanks for reading!