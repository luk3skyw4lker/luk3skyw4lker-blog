---
title: 'Automating commit message patterns with @commitlint/cli'
excerpt: 'Commit messages pattern can really improve your repository organization, observation and standards, today we will learn how to implement them the right (and automated) way.'
coverImage: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=**Linting**%20git%20commit%20messages&images=https://cdn.worldvectorlogo.com/logos/gitignoreio-1.svg'
date: '2020-12-16T13:58:07.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=**Linting**%20git%20commit%20messages&images=https://cdn.worldvectorlogo.com/logos/gitignoreio-1.svg'
---

## First Things First

Alright, let's start by understanding what is git and why sould we use it.

In plain terms, **git** is a Distributed Version Control System (Distributed VCS), that makes it easier to track changes to files, so when you change a file (create/update), it can determine if the file is new and if the file isn't **git** will tell you exaclty what changed on the file. There are another Distributed VCSs that you can use, like ArX, Fossil, Mercurial, Monotone, etc. I can make a whole article speaking of VCSs here (including the non distributed ones).

But then, being git the most popular Distributed VCS, does it really makes sense to use it? Yes, git has a good disposition of remote tools like gitlab, github and many others. It's also well known for versioning code and it has a lot of free knowledgement on the internet, so for practical reasons, git is our best option. If you wish to know more about git, visit [git-scm](https://git-scm.com/).

In this article, we will focus on the **committing** part of git, which is basically a register of the change in a file or group of files. There are some conventions to write a _commit message_ we'll look into it and into some other aspects of git itself.

## Initializing

**NOTE:** If you already know git, you can create a directory called _git-commit-msg-patterns_ and initialize a repository and jump right into the [**Installing Deps**](#git-hooks) section.

Let's create a directory that will contain our project, open your terminal and type these two commands in sequence:

```shell
mkdir git-commit-msg-patterns

cd git-commit-msg-patterns
```

The first one create a directory and the second access it, all commands from now on will be executed having this directory as basis.

Next, we need to initialize the git repository with the `git init` command, this will create a **.git** folder in the actual directory and store the git settings and changes there. This is the basic setup

## Understanding basic concepts

So, if you already know git, you must be aware that now we have a repository and any file created inside it will be at the status of **untracked**, when a file has this status it means that git don't have the file previously indexed in it's changes, in other words, it means that the **file is new inside the repository**.

When you create a file, you should use the `git add` command to change it's status to **staged**, a staged file is basically the file (or group of files) that will be associated with the next **commit**.

As explained earlier, a **commit** is basically a register of a changes in a file or a group of files, a repository usually haves a timeline based on it's commits and the commit concept is usually explained as a "point of the repository timline", which is a pretty straight foward explanation.

With everything explained, let's get into the main part.

<h2 id="installing-deps">Installing Deps</h2>

We will use **Git Hooks** for the automatic check of commit messages, specially the _commit-msg_ hook which is the one that is responsible for checking the commit message pattern and validate it. I'll make an example using a basic template that I've learned from [this dev.to article](https://dev.to/helderburato/patterns-for-writing-better-git-commit-messages-4ba0), to turn the check automatic, we'll use some Javascript tools:

- **<a href="https://commitlint.js.org/#/" class="hover:underline">@commitlint/cli</a>**
- **<a href="https://github.com/typicode/husky/tree/master" class="hover:underline">husky</a>**

And one of these configs:

- **<a href="https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-angular" class="hover:underline">@commitlint/config-angular</a>**
- **<a href="https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional" class="hover:underline">@commitlint/config-conventional</a>**
- **<a href="https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-lerna-scopes" class="hover:underline">@commitlint/config-lerna-scopes</a>**
- **<a href="https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-patternplate" class="hover:underline">@commitlint/config-patternplate</a>**
- **<a href="https://github.com/erikmueller/conventional-changelog-lint-config-atom" class="hover:underline">conventional-changelog-lint-config-atom</a>**
- **<a href="https://github.com/gajus/conventional-changelog-lint-config-canonical" class="hover:underline">conventional-changelog-lint-config-canonical</a>**
- **<a href="https://github.com/Gherciu/commitlint-jira" class="hover:underline">commitlint-config-jira</a>**

You can also write your own config (wheter it's based on one of the aboves or it's a total new config) and publish it to npm, I wrote one for padronizing the commits in my work repos and here it is: [**@bristom/commitlint-config**](https://www.npmjs.com/package/@bristom/commitlint-config), you can check the [**Github repository**](https://github.com/bristom/commitlint-config) to see what are the rules.

To install **husky**, **commitlint** and the config you chose as development dependencies you should run:

    npm install husky @commitlint/cli <config-package> --dev

Or with **yarn**

    yarn add husky @commitlint/cli <config-package> --dev

In my case I'll install the [**@bristom/commitlint-config**](https://www.npmjs.com/package/@bristom/commitlint-config), as it is my default.

Then, in the root of our project, you create two files: **.huskyrc** and **commitlint.config.js**. The .huskyrc file stores the git hooks config for husky to run, and the commitlint.config.js stores the commitlint config to check the commit messages. The content for each one is listed below:

**.huskyrc**

```json
{
	"hooks": {
		"commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
	}
}
```

**commitlint.config.js**

```javascript
module.exports = {
	// Replace the @bristom/commitlint-config with the
	// name of the config package you've just installed.
	extends: ['@bristom/commitlint-config']
};
```

Alright, with everything setup, let's try to make a commit:

```shell
git commit -m "anything"
```

This will throw an error on basically all configs installed, since isn't compatible with any pattern, but if instead I try:

```shell
git commit -m "[feat]: Initial commit"
```

It will work perfectly (check the pattern of you config package to make the commit right).

## Overview

Now, today we've learned a little bit about git, git hooks and how to automate the check of commit messages patterns using some Javascript tools.

But even if I had only used Javascript, you can implement it on any code of yours and the better of it: **using the same tools**, you just have to install **<a href="https://nodejs.org" class="hover:underline">Node.js</a>** and instead of install the commitlint CLI scoped for a project, you install it using the -g flag of npm. The downside is that you won't have hooks automated too, you'll have to configure them on your own.

Thanks for your attention and for coming all the way here to learn, hope to see you soon!
