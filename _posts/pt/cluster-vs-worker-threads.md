---
title: 'Cluster vs Worker Threads'
excerpt: 'Há muitas discussões sobre os módulos Cluster e Worker Threads em Node.js, mas o que eles são afinal? São os mesmos? Similares? Como eles funcionam? Nós vamos responder todas essas dúvidas com este artigo.'
coverImage: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=**Cluster**%20vs%20**Worker%20Threads**&images=https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg'
date: '2022-01-09T17:00:00.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=**Cluster**%20vs%20**Worker%20Threads**&images=https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg'
---

## Introdução

Façamos algumas introduções para estes dois: Cluster e Worker Threads são dois módulos nativos do ambiente de execução Node.js, eles já virão pré-instalados quando você instalar o Node.js na sua máquina. Ambos têm funcionalidades similares mas com algumas diferenças cruciais que fazem cada um único.

Hoje nós vamos aprender sobre como esses dois módulos funcionam e onde usar cada um deles, eu deixarei alguns exemplos de código na página e um repositório do github no final do artigo para acesso a eles. Vamos entrar no assunto falando do módulo `cluster` primeiro.

## Cluster

Como a documentação do Node.js aponta, ele é single-threaded por padrão, o que significa que originalmente não era possível que ele tomasse vantagem de sistemas multi-core nativamente, mas desde a versão 0.10.x do ambiente de execução o módulo cluster torna possível que se tenha a vantagem de processamento paralelo (uma das vantagens de sistemas multi-core). Um bom uso do módulo cluster é um servidor HTTP, onde todos os processos criados escutarão a mesma porta. Exemplo:

```js
import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';
import process from 'process';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
	console.log(`Primary ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});
} else {
	// Workers can share any TCP connection
	// In this case it is an HTTP server
	http
		.createServer((req, res) => {
			res.writeHead(200);
			res.end('hello world\n');
		})
		.listen(8000);

	console.log(`Worker ${process.pid} started`);
}
```

Ele usa o método `child_process.fork()` para criar novos processos, por usar essa aproximação, todos os processos podem se comunicar via IPC (Comunicação Inter-Processo) e enviarem gerenciadores de servidores para qualquer outro processo. São suportadas dois métodos principais de gerenciamento e distribuição de conexões recebidas:

- Round-Robin (padrão em todas as plataformas exceto Windows): O processo primário escuta a porta, aceita novas conexões e depois disso distribui as para os workers usando um método round-robin (um algoritmo de agendamento de CPU onde é dado para cada processo um tempo fixo de execução de forma cíclica) com algumas inteligências nativas para não existir sobrecarga em nenhum worker;

- Segundo método: Nesse método o processo primário só cria o socket de escuta e envia as conexões para os workers para que ele aceite a conexão diretamente.

Teoricamente o segundo método seria o mais performático, porém na prática a sua distribuição tende a ser desbalanceada por motivos de vagas no scheduler do sistema operacional, estatísticas mostram que 70% de todas as conexões acabam ficando com apenas 2 de 8 processos quando o segundo método é usado.

Dado o fato de que `server.listen()` entrega a maior parte do trabalho para o processo primário, existem três casos onde o comportamento de um processo Node.js normal e de um processo cluster diferem:

- `server.listen({ fd: 7 })`: Nesse caso a mensagem é enviada para o processo primário, o descritor de arquivo número 7 será escutado e o gerenciador é passado para o worker diretamente ao invés de escutar a ideia do worker de o que o descritor de arquivo 7 referencia;

- `server.listen(handle)`: Escutar gerenciadores causará explicitamente com que o worker use o gerenciador enviado ao invés de se comunicar com o processo primário;

- `server.listen(0)`: Normalmente isso causaria com que os servidores escutassem uma porta aleatória mas em um cluster cada worker vai receber a mesma porta "randômica" toda vez que usarem o `listen(0)` já que a porta só é aleatória na primeira chamada e previsível depois dela. Se quiser que um worker escute uma porta única, você deve gerar um número de porta a partir do ID do worker.

Já que o Node.js não oferece lógica de roteamento, é importante que você planeje sua aplicação de uma forma que não use muitos objetos de dados em memória para coisas como sessão e login.

Por serem processos separados, os workers do módulo cluster podem ser parados e reiniciados a qualquer momento sem nenhum malefício para outros processos, enquanto existirem workers rodando o servidor continuará aceitando novas conexões, se não houver nenhum worker vivo as conexões existentes serão terminadas e novas conexões serão recusadas. O Node.js não gerencia automaticamente a quantidade de workers, ao invés disso a aplicação é totalmente responsável por gerenciar a quantidade de workers de acordo com sua necessidade.

Finalmente, usamos como exemplo um servidor HTTP, mas o módulo cluster pode ser usado para qualquer ocasião que exija processos trabalhadores.

## Worker Threads

Esse módulo torna possível o trabalho com múltiplas threads que executam Javascript em paralelo no Node.js. Diferente dos módulos `cluster` e `child_process`, o módulo `worker_threads` manipula threads ao invés de processos, é aí onde mora a grande diferença entre esses módulos, ambos são usados para processamento em paralelo, mas o módulo cluster faz uso de processos enquanto o módulo `worker_threads` faz uso de threads do SO. O módulo `worker_threads` não deve ser usado para operações de I/O, já que os mecanismos nativos que executam esses tipos de operações as tratam mais efetivamente do que os workers.

Isso pode parecer só uma diferença técnica, como se não importasse qual deles usar ambos fazem o mesmo trabalho usando métodos diferentes, mas isso é um pensamento errado. O módulo `worker_threads` é melhor quando há trabalhos que exigem muita CPU, como cálculos matemáticos complexos, redefinição de tamanho de imagens e processamento de vídeo. Vamos usar o cálculo de números primos de 2 a 10,000,000 para exemplificar:

```js
console.time('PRIMES');

const min = 2;
const max = 1e7;
const primes = [];

function generatePrimes(start, range) {
	let isPrime = true;
	let end = start + range;

	for (let i = start; i < end; i++) {
		for (let j = min; j < Math.sqrt(end); j++) {
			if (i !== j && i % j === 0) {
				isPrime = false;
				break;
			}
		}

		if (isPrime) {
			primes.push(i);
		}

		isPrime = true;
	}
}

generatePrimes(min, max);

console.timeEnd('PRIMES');
```

Como pode se perceber, usamos o método `console.time()` para calcular o tempo de execução de todo o script, sem o uso do `worker_threads` foram precisos 12.4 segundos para o cálculo ser finalizado. Agora vejamos o outro caso:

```js
console.time('PRIMES');

const {
	Worker,
	isMainThread,
	parentPort,
	workerData
} = require('worker_threads');

const min = 2;
let primes = [];

function generatePrimes(start, range) {
	let isPrime = true;
	let end = start + range;

	for (let i = start; i < end; i++) {
		for (let j = min; j < Math.sqrt(end); j++) {
			if (i !== j && i % j === 0) {
				isPrime = false;
				break;
			}
		}

		if (isPrime) {
			primes.push(i);
		}

		isPrime = true;
	}
}

if (isMainThread) {
	const max = 1e7;
	const threadCount = Number(process.argv[2]) || 2;
	const threads = new Set();

	console.log(`Running with ${threadCount} threads...`);

	const range = Math.ceil((max - min) / threadCount);
	let start = min;

	for (let i = 0; i < threadCount - 1; i++) {
		const myStart = start;

		threads.add(
			new Worker(__filename, { workerData: { start: myStart, range } })
		);

		start += range;
	}

	threads.add(
		new Worker(__filename, {
			workerData: { start, range: range + ((max - min + 1) % threadCount) }
		})
	);

	for (let worker of threads) {
		worker.on('error', err => {
			throw err;
		});

		worker.on('exit', () => {
			threads.delete(worker);

			console.log(`Thread exiting, ${threads.size} running...`);

			if (threads.size === 0) {
				console.timeEnd('PRIMES');
			}
		});

		worker.on('message', msg => {
			primes = primes.concat(msg);
		});
	}
} else {
	generatePrimes(workerData.start, workerData.range);
	parentPort.postMessage(primes);
}
```

Parece um script totalmente novo, porém apenas adicionamos a lógica de `worker_threads`. Quando se está na thread principal, apenas o setup das threads dependentes é executado, e quando não se está, automaticamente significa que você está em uma thread dependente e então você pode chamar sua função de processamento pesado.

Se o script for executado com a quantidade padrão de threads (2 como especificado pela variável `threadCount`), ele será executado em 6.3 segundos (pouco mais que a metade do tempo original) para o cálculo ser finalizado. Mas o número de threads pode ser mudado sendo passado como segundo argumento do comando `node`, dessa forma:

```
node <nome_do_arquivo>.js <quantidade_de_threads>
```

Eu o executei com 4 e 8 threads também, com 4 foram precisos 3.3 segundos para o script ser executado e com 8 foram precisos 2.8 segundos e como você pode perceber, o tempo nem sempre é diminuído pela metade quando você dobra a quantidade de threads. Outro ponto importante de ser notado é que trabalhos que exigem muito da CPU são altamente dependentes da velocidade do clock da máquina onde está sendo executado o script, então se esse mesmo script for executado em outra máquina, o resultado de tempo pode não ser o mesmo especificado neste artigo (pode ser mais rápido ou mais devagar).

## Conclusão

Nós vimos o poder e a diferença dos módulos `cluster` e `worker_threads` hoje e eu espero que esse artigo tenha feito voce entender todas as nuances entre esses dois módulos e suas aplicaçoes.

Se existe alguma dúvida ou alguma errata, contate me no meu Github (o link está no meu nome de usuário no final da página).
