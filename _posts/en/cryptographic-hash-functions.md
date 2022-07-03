---
title: 'Cryptographic Hash Functions'
excerpt: 'In this article we will talk a little bit about cryptography focused into hash functions, differences to the cryptographic algorithms and why they are so useful.'
coverImage: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=Cryptographic%20**hash**%20**functions**&images=https://cdn.iconscout.com/icon/free/png-256/recovery-key-1824312-1545968.png'
date: '2022-07-03T13:00:00.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=Cryptographic%20**hash**%20**functions**&images=https://cdn.iconscout.com/icon/free/png-256/recovery-key-1824312-1545968.png'
---

## Introduction to cryptographic algorithms

A cryptographic algorithm can be explained as any other algorithm, which comes to be a finite sequence of well-defined steps to solve a specific problem or to perform some sort of computation, there are a lot of algorithms, but when we enter the cryptographic algorithms area, we're talking about algorithms used to perform some computation upon some data that should be trustable or sensitive, like passwords not meant to be read, a digital signature or some info that is used as authentication mean by any software. They are used to privacy protection in general.

## What is a cryptographic hash function?

A cryptographic hash function (aka CHF) is a mathematical algorithm that transforms some data of arbitrary size (which is called the **message**) into a bit array with fixed size which is caled the **hash value** or **message digest**. A CHF must always be deterministic, which means that if you always pass the same message, it will always end up with the same result, there are also a few more properties that are ideal in a CHF:

- It should be **quick** to compute the hash value for any given message;
- It should be infeasible to reverse the hashing process (i.e you should not be able to calculate the message from a given hash);
- It should be infeasible for two messages to end up having the same hash;
- A minor change in the message should change the resulting hash in a way that appears uncorrelated with the old hash value.

The vast majority of CHFs is designed to receive a string of any given length as input and produce a fixed-length hash value. A CHF must be able to withstand any type of **cryptoanalysis** attack.

## Properties

The security level of a CHF can be defined using the following properties:

- Pre-image resistance
- Second pre-image resistance
- Collision resistance

Let's dive deeper into each one of this properties

### Pre-image resistance

Given any hash value h, it should not be easy to find a message _m_ such that _h = hash(m)_. Which is related to the concept of a one-way function, you can only calculate the hash from a message, and never do the reverse (calculate a message from a hash).

### Second pre-image resistance

Given an input m<sub>1</sub>, it should be difficult to find an input m<sub>2</sub> such that _hash(m<sub>1</sub>) = hash(m<sub>2</sub>)_. This property is also referred to as weak collision resistance, any function that lacks this property is susceptible to second pre-image attack.

### Collision resistance

Given many inputs, you should not be able to generate equal hashes for anyone of them, all should be completely different from one another. Collision resistance implies in **second pre-image resistance** but doesn't imply in pre-image resistance. The weaker assumption is always preferred but a function that is only second pre-image resistant is considered insecure and it's not recommended to production use.

Informally, all those properties mean that a malicious adversary cannot replace or modify the data input without it causing a massive difference in the digest, so if two strings have the same digest, you can assume with certainty that they're the same string. Second pre-image resistance prevents an attacker of crafting a document with the same hash that a document that he can't control and collision resistance prevents an attacker of crafting two different documents with the same hash.

However, even if a function meets all these criteria may still have undesirable properties, currently popular CHFs are vulnerable to length-extension attack, where a given _hash(m)_ and a _len(m)_ but not _m_, by choosing a suitable _m'_ an attacker can calculate _hash(m + m')_ where + represents concatenation of the strings. This attack can be used to break naive authentication schemes based on hash functions, to work around this problem you can use the **HMAC construction**.

## Degree Of Dificulty

In the cryptographic area "difficult" means "almost certainly beyond the reach of any adversary that should be prevented of breaking the system as long as the system security is deemed important", which implies that the meaning of the term is somewhat dependant on the application since the effort of a malicious agent may put into the task is proportional to their expected gain, but the effort usually multiplies with the digest length, so even a thousand-fold advantage in processing power can be neutralized by adding a few dozen bits at the digest length.

For messages selected from a limited set of messages, like passwords or any other shorter messages, it should be feasible to reverse the process by trying all the possible messages in the set. Because CHFs are designed to be computed quickly, some special key derivation functions that require greater computing resources have been developed to make such brute-froce attacks more difficult.

The term "difficult" can also have a purely mathematical meaning, such as "not solvable in **asymptoptic polynomial time**", these interpretations of difficulty are important to the study of **provably secure** CHFs but haven't had a strong connection to the pratical security of them. As an example, a exponential-time algorithm can be fast enough to make a feasible attack, conversely, a polynomial-time algorithm (that requires more processing power) may be too slow for any practical use.

## CHF Appplications

A CHF has many applications, especially at the information security area, some examples are: digital signatures, MACs (message authentication codes), and many other forms of authentication. They can also be used for fingerprinting, to index data in hash tables, to detect duplicate data or uniquely identify a resource, as checksums to detect data corruption in general.

### Integrity of messages and identification of files

Since one of the properties of a CHF is that given always the same message you will always have the same hash value at the end, they can be used to verify the integrity of messages and files by comparing the message digests before and after the transmission, if there is any difference between these comparisions, it means that the message or the file were corrupted or modified in the transmission process.

Common CHFs used for these checkings are: **MD5**, **SHA-1** or **SHA-2**. They're commonly used to verify integrity of downloaded files and message exchange between systems. The process estabilshed by these verifications can be called **chain of trust** as long as the hashes are posted in a trusted website, which is usually the originating site, authenticated by HTTPS. The use of CHFs and chain of trust can detect malicious changes to the message content.

Many source code management systems such as **Git**, **Mercurial** and **Monotone** use the **sha1sum** of various types of content to uniquely identify resources (file content, directory trees, ancestry information and etc.). Peer to peer filesharing networks also takes advantage of CHF functions to identify files, in the ed2k link a variant of the MD4 hash is combined with the file size providing sufficient information for locating, downloading and verifying the content of a file. Magnet links are also a good example of the use of CHFs to identify files in a hash tree or hash list.

### Signature operation and verification

A digital signature is a mathematical scheme for verifying the authenticity of digital documents and CHFs can be used as tools for securing the message, which allows the signature calculation to be performed on the relatively small and statically sized hash digest. The message will be considered authentic if the signature verification succeeds given the signature and the recalculated hash digest over the message, if it doesn't succeeds, the message could be probably changed over the transmission by, as an example, a **Man In The Middle (MITM)** attack.

This only can be achieved due the message integrity property of CHFs that secures and helps to create efficient digital signatures schemes.

### Password verification

One of the most common used of a CHF is for password securing and verification. If you store your user password with plain text, this could lead to a lot of security problems, given the fact that your application can be hacked and you database leaked, the malicious adversary would have access to all of your systems just by reading the data that he has stolen, one of the ways to reduce the danger is to only store the hash digest of each password and to authenticate your user you hash the password provided by him and compares it with the stored hash. If you use this method you should provide a password reset system, since you can't calculate the password of a user from it's hashed value.

One of the properties mentioned earlier is that CHFs are designed to be computed quickly and as a result, it is possible to try guessed passwords at high rates. Using a common GPU you can try billions of possible password per second. To solve this problem you can use password hash functions that are designed to perform **key-stretching**, a few examples are: **PBKDF2**, **scrypt** or **Argon2**, they use a scheme of repeated invocations of a CHF to increase the time and in some cases the amount of memory required to perform brute-force attacks on stored password digests. These password hash functions usually require the use of a large random non-secret salt value that can be stored together with the hash, this salt randomizes the output and makes it impossible to an adversary to store a table of passwords and pre-computed hashes that can be compared to any password hash digest.

### Proof of work

A Proof Of Work system, protocol or function, is an economic measure used to deter DoS attacks and many other service abuses on a network by the requirement of some work from the service requester, usually this means processing time from a computer. The key concept of these schemes is their asymmetry, where the work should be moderately hard but feasible for the requester but easy to check for the service provider. One of the popular systems used at Bitcoin and Hashcash is the use of partial hash inversions to prove that the work was done to unlock a mining reward in Bitcoin and as a good-will token to send an email at Hashcash.

The process consists in the sender being required to find a message whose hash value begins with a number of zero bits, the average amount of work required by the sender in order to find a valid message is exponential in the number of zero bits required in the hash value, while the receiver can validate the message by executing a single hash function. Again with the example of Hashcash: the sender is required to generate a header in which the 160-bit SHA-1 hash value has the first 20 bits as zeros, which means that the sender will have to try up to 2<sup>19</sup> times to find a valid header.

## Conclusion

And that's it for this article, today we spoke about a very dense subject, Cryptographic Hash Functions, we talked about what they are, their properties and their applications, I hope the content here made a difference for you. For any doubts, you check my **[Github](https://github.com/luk3skyw4lker)** and contact me via email, LinkedIn or Twitter. See you later!