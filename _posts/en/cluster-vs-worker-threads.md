---
title: 'Cluster vs Worker Threads'
excerpt: 'There is a lot of discussions about the Cluster and Worker Threads modules in Node.js, but what are they after all? Are they the same? Similar? How do they work? We are going to answer all those questions with this article.'
coverImage: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=**Cluster**%20vs%20**Worker%20Threads**&images=https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg'
date: '2022-01-09T17:00:00.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=**Cluster**%20vs%20**Worker%20Threads**&images=https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg'
---

## Introduction

Let's make some introductions for those two: Cluster and Worker Threads are two native modules from the Node.js runtime, they already come pre-installed when you install Node.js on your machine. They have similar functionalities but with some crucial difference that makes each one of them unique.

Today we're going to learn how those two works and where to use each one of them, I'll leave some code examples and at the end of the article there'll be a github repository link for access to them. Let's get into it by talking about the cluster module first.

## Cluster

As it points out the docs, Node.js is single threaded by default, which means that originally you could not take advantage of multi-core systems natively, but since the 0.10.x version of the runtime the cluster module makes it possible to take advantage of parallel processing (one of the advantages of multi-core systems). One good use case of the cluster module is for a HTTP server, where all the workers spawned will share the same listening port. Example:

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

It uses the `child_process.fork()` method to spawn new process, using this approach all process can communicate via the IPC (Inter-Process Communication) and pass server handles back and forth. It supports mainly two approachs of handling the distribution of incoming connections:

- Round-Robin (default in all platforms except on Windows): The primary process listens on a port, accepts new connections and then distributes them to the workers using a round-robin approach (a CPU scheduling algorithm where each process is assigned a fixed time slot in a cyclic way) with some built-in smarts not to overload any worker process.

- Second approach: In this approach the primary process only creates the listen socket and sends the connection to the worker process for him to accept the connection directly.

Theoretically the second approach should give a better performance, but in practice, it's distribution tends to be very unbalanced due to operating system scheduler vagues, statistics shows that 70% of all connections ends up being in only two workers out of eight when using the second approach.

Given the fact the `server.listen()` method hands off most of the work to the primary process, there are three cases where the behavior of a normal Node.js process and a cluster worker differs:

- `server.listen({ fd: 7 })`: In this case the message is passed to the primary, the file descriptor 7 in the parent will be listened on and the handle is passed to the worker rather than listening to the worker idea of what the number 7 file descriptor references;

- `server.listen(handle)`: Listening on handles explicitly will cause the worker to use the provided handle rather than talking to the primary process;

- `server.listen(0)`: Normally this would cause servers to listen on a random port but in a cluster each worker will be provided the same "random" port everytime they use `listen(0)` since the port is only random in the first call and predictable after that. If you want a worker to listen on a unique port you must generate a port number based in the cluster worker ID.

Since Node.js doesn't provide routing logic, it's important to design your application in a way that doesn't rely too heavily on in-memory data objects for things like session and login.

Because cluster worker process are separate process they can be killed and re-spawned according to the application needs without any harm to other workers, as long as there is some workers running the server will keep to accept connections, if there aren't workers alive all connections will be dropped and new connections will be refused. Node.js doesn't automatically manage the number of workers, instead the application is responsible for managing the worker pool based on it's needs.

Finally, we used an HTTP server as an example, but the cluster module can be used on any case that requires worker processes.

## Worker Threads

This module makes it possible to work with multiple threads that executes Javascript in parallel in Node.js. Unlike `cluster` or `child_process`, the `worker_threads` module manipulates threads instead of process, that's where the big difference between those modules lives, both of them are used to parallel processing, but the cluster module makes use of processes while the `worker_threads` make use of OS threads. The `worker_threads` module should not be used to I/O operations, since the native mechanisms that performs this type of operations already treat them more effectively than the workers.

This may appear to be only a technichal difference, like it wouldn't matter which one you use both do the same with different approaches, but this is a wrong thought. The `worker_threads` module is better when you have CPU-intensive jobs to take care of, like complex mathematical calculus and image resizing. Let's see an example for calculating all primes from 2 to 10,000,000:

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

As you can see, we have used the `console.time()` utility to measure the time that the script takes to run, without the use of worker_threads it took 12.4 seconds for the calculus to end. Now let's see the other case:

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

It seems a whole new script, but we have just added the `worker_threads` logics. When you're on the main thread, you just set up the environment for the workers, and when you're not in the main thread, it automatically means you're inside a worker, and then you can call your CPU-intensive function.

If you run this script with the the default thread quantity (2 as the `threadCount` variable sets), it's going to take 6.3 seconds (a little more than half of the original one) for it to calculate all the primes. But you can change the number of threads used by passing it as the second argument of the `node` command, like this:

```
node <name_of_the_file>.js <number_of_threads>
```

I have run it with 4 and 8 threads too, with 4 the time was 3.3 seconds and with 8 was 2.8 seconds and as you can see, the time is not always cutted by half when you double the threads. Another important thing to note is that CPU-intensive jobs are highly dependant on the clock speed of the executing machine, so maybe if you run the same script on another machine, the times won't match the ones described in this article (it can be faster or slower).

## Conclusion

We have seen the power and the difference of the `cluster` and `worker_threads` modules today and I hope this article can make you understand all the nuances between these two modules and their applications.

If there is any doubt or some errata contact me on my Github (the link is on my username at the end of the page). The Github repository for this article can be acessed through this **[link](https://github.com/luk3skyw4lker/cluster-vs-worker-threads)**.
