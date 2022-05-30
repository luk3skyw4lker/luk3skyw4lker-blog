---
title: 'Automatizando padrões de mensagem de commit com @commitlint/cli'
excerpt: 'Mensagens de commit podem realmente melhorar a organização, observação e padrões do seu repositório. Hoje vamos aprender como podemos implementá-las da forma correta (e automatizada).'
coverImage: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=**Corrigindo**%20mensagens%20de%20commit%20no%20git&images=https://cdn.worldvectorlogo.com/logos/gitignoreio-1.svg'
date: '2020-12-16T13:58:07.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=**Corrigindo**%20mensagens%20de%20commit%20no%20git&images=https://cdn.worldvectorlogo.com/logos/gitignoreio-1.svg'
---

## Primeiramente

Okay, vamos começar por entender o que é o git e porque deveríamos usá-lo.

Em termos planos, **git** é um Sistema de Controle de Versão Distribuído (SCV Distribuído), que torna mais fácil o rastreamento de mudanças em arquivos para que quando você mude um arquivo (criar/atualizar), ele pode determinar se o arquivo é novo e se não for o **git** te dirá exatamente o que mudou naquele arquivo. Há outros SVCs Distribuídos que você pode utilizar, tais como ArX, Fossil, Mercurial, Monotone e etc. É possível fazer um artigo inteiro apenas sobre SCVs (incluído os não distribuídos).

Mas então, sendo o git o SCV Distribuído mais popular, realmente faz sentido usá-lo? Sim, git tem uma ótima disposição de ferramentas remotas como gitlab, github e várias outras. Também é bem conhecido pelo versionamento de código e tem muito conhecimento livre na internet, então por razões práticas, git é a nossa melhor opção. Se você deseja conhecer mais sobre git, visite [git-scm](https://git-scm.com/).

Neste artigo, focaremos na parte de **commiting** do git, que é basicamente um registro de uma mudança de arquivo ou de um grupo de arquivos. Há algumas convenções no momento de escrever uma _mensagem de commit_. Nós veremos sobre isso e alguns outros aspectos do git em si.

## Inicializando

**NOTA:** Se você já conhece o git, você pode criar um diretório chamado _git-commit-msg-patters_, inicializar um repositório e pular direto para a seção [**Instalando Dependências**](#installing-deps).

Vamos criar um diretório que conterá nosso projeto, abra seu terminal e digite esses dois comandos em sequência:

```shell
mkdir git-commit-msg-patterns

cd git-commit-msg-patterns
```

O primeiro cria um diretório e o segundo acessa ele, todos os comandos daqui pra frente serão executados tendo esse diretório como base.

Em seguida, nós precisamos inicializar o repositório git com o comando `git init`, isso vai criar uma pasta **.git** no diretório atual e guardar as configurações do git e suas mudanças lá. Essa é a configuração básica.

## Entendendo os conceitos básicos

Então, se você já entende o básico de git, você deve saber que agora nós temos um repositório e qualquer arquivo criado dentro dele estará com o status de **untracked**, quando um arquivo tem este status significa que o git não tem o arquivo indexado previamente em suas mudanças, em outras palavras, significa que **o arquivo é novo dentro do repositório**.

Quando você cria um arquivo, você deve usar o comando `git add` para mudar o status do arquivo para **staged**, um arquivo staged é basicamente o arquivo (ou grupo de arquivos) que serão associados com o próximo **commit**.

Como explicado anteriormente, um **commit** é basicamente um registro de mudanças em um arquivo ou grupo de arquivos, um repositório usualmente tem uma linha do tempo baseada em seus commits e o conceito de commit é usualmente explicado como "um ponto na linha do tempo do repositório", o que é uma explicação bastante direta.

Com tudo explicado, comecemos a parte principal.

<h2 id="installing-deps">Instalando Dependências</h2>

Nós usaremos os **Git Hooks** para checagem automática das mensagens de commit, especialmente o hook _commit-msg_ que é o responsável por checar a mensagem de commit e validá-la. Eu farei um exemplo usando um template básico que eu aprendi [**neste artigo do dev.to**](https://dev.to/helderburato/patterns-for-writing-better-git-commit-messages-4ba0), para tornar a checagem automática, nós usaremos algumas ferramentas JavaScript:

- **<a href="https://commitlint.js.org/#/" class="hover:underline">@commitlint/cli</a>**
- **<a href="https://github.com/typicode/husky/tree/master" class="hover:underline">husky</a>**

E uma dessas configurações:

- **<a href="https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-angular" class="hover:underline">@commitlint/config-angular</a>**
- **<a href="https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional" class="hover:underline">@commitlint/config-conventional</a>**
- **<a href="https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-lerna-scopes" class="hover:underline">@commitlint/config-lerna-scopes</a>**
- **<a href="https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-patternplate" class="hover:underline">@commitlint/config-patternplate</a>**
- **<a href="https://github.com/erikmueller/conventional-changelog-lint-config-atom" class="hover:underline">conventional-changelog-lint-config-atom</a>**
- **<a href="https://github.com/gajus/conventional-changelog-lint-config-canonical" class="hover:underline">conventional-changelog-lint-config-canonical</a>**
- **<a href="https://github.com/Gherciu/commitlint-jira" class="hover:underline">commitlint-config-jira</a>**

Você também pode escrever sua própria configuração (independente de ser baseada em uma das acima ou uma configuração totalmente nova) e publicá-la no npm, eu escrevi uma para padronização de commits no meu trabalho e aqui está ela: [**@bristom/commitlint-config**](https://www.npmjs.com/package/@bristom/commitlint-config), você pode checar o [**Repositório do Github**](https://github.com/bristom/commitlint-config) para ver quais são as regras.

Para instalar o **husky**, **commitlint** e o pacote de configurações que você escolheu como dependências de desenvolvimento você deve rodar:

    npm install husky @commitlint/cli <config-package> --dev

Ou com **yarn**:

    yarn add husky @commitlint/cli <config-package> --dev

No meu caso eu instalarei a [**@bristom/commitlint-config**](https://www.npmjs.com/package/@bristom/commitlint-config), já que é meu padrão.

Então, na raiz do nosso projeto, você pode criar dois arquivos: **.huskyrc** e **commitlint.config.js**. o arquivo .huskyrc guarda as configurações dos git hooks para o husky rodar e o arquivo commitlint.config.js guarda a configuração do commitlint para checar as mensagens de commit. O conteúdo de cada um está listado abaixo:

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
	// Reescreva o @bristom/commitlint-config com o
	// nome do pacote de configuração que você instalou.
	extends: ['@bristom/commitlint-config']
};
```

Certo, com tudo configurado, vamos tentar fazer um commit:

```shell
git commit -m "anything"
```

Isso causará um erro em basicamente todas as configurações instaladas, já que não é compatível com nenhum padrão, mas se eu tentar:

```shell
git commit -m "[feat]: Initial commit"
```

Funcionará perfeitamente (cheque o padrão do seu pacote configuração para fazer o commit corretamente).

## Olhar geral

Então, hoje nós aprendemos um pouco sobre git, git hooks e como automatizar a checagem de padrões de mensagens de commit usando algumas ferramentas Javascript.

Mas mesmo que eu tenha usado apenas Javascript, você pode implementar essas configurações em qualquer código seu e o melhor de tudo: **usando as mesmas ferramentas**, você só deve ter instalado o **<a href="https://nodejs.org" class="hover:underline">Node.js</a>** e ao invés de instalar o commitlint CLI para apenas um projeto, você o instala globalmente usando a flag -g do npm. A desvantagem é que você não terá os hooks automatizados, terá que os configurar por sua conta.

Obrigado por sua atenção e por ter vindo até aqui para aprender, espero te reencontrar logo!
