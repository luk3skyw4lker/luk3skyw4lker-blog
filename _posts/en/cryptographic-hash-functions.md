---
title: 'Cryptographic Hash Functions'
excerpt: 'In this article we will talk a little bit about cryptography focused into hash functions, differences to the cryptographic algorithms and why they are so useful.'
coverImage: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=Cryptographic%20**hash**%20**functions**&images=https://cdn.iconscout.com/icon/free/png-256/recovery-key-1824312-1545968.png'
date: '2022-05-30T15:45:00.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=Cryptographic%20**hash**%20**functions**&images=https://cdn.iconscout.com/icon/free/png-256/recovery-key-1824312-1545968.png'
---

## Introduction to Cryptographic algorithms

A cryptographic algorithm can be explained as any other algorithm, which comes to be a finite sequence of well-defined steps to solve a specific problem or to perform some sort of computation, there are a lot of algorithms, but when we enter the cryptographic algorithms area, we're talking about algorithms used to perform some computation upon some data that should be trustable or sensitive, like passwords not meant to be read, a digital signature or some info that is used as authentication by any software. They are used to privacy protection in general.

## What is a cryptographic hash function?

A cryptographic hash function (aka CHF) is a mathematical algorithm that transforms some data of arbitrary size (which is called the **message**) into a bit array with fixed size which is caled the **hash value** or **message digest**.