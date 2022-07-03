---
title: 'Explaining hoisting in Javascript'
excerpt: 'Hoisting is a big doubt among developers, those who does not understand this concept are always wondering why some part of their code is not working. Today we are going to learn what is hoisting and how to avoid it (or use it consciously).'
coverImage: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=**Hoisting**%20explained&images=https%3A%2F%2Fcdn.worldvectorlogo.com%2Flogos%2Flogo-javascript.svg'
date: '2020-12-14T22:40:07.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnails.luk3skyw4lker.com/api/thumbnail.png?title=**Hoisting**%20explained&images=https%3A%2F%2Fcdn.worldvectorlogo.com%2Flogos%2Flogo-javascript.svg'
---

## What is hoisting?

Hoisting is Javascript default behavior of moving all declarations to the top of the current scope (weather it's the global scope or function scope) before the code execution (something like the "compile" time). This behavior give you the possibility to use a variable before it is declared, like this:

```javascript
x = 50;

console.log(x);

var x;
```

If you thought that this code would throw the `ReferenceError: 'x' is not defined` or `undefined`, you're wrong, this code runs perfectly because of hoisting. In fact, both errors are different, `undefined` appears when the variable isn't initialized on it's declaration (when this occurs, the type of the variable is also `undefined`) and **ReferenceError** appears when the variable was not previously declared.

Of course that this could lead to a infinite side effects on your code, so it's important to know what is it and how to avoid having this side effects ocurring on your code.

## How to avoid it (or use it consciously)

So, there are basically three ways to avoid the hoisting behavior of Javascript:

- Using the 'use strict' utility
- Using the let keyword
- Using the const keyword

Let's take a look on each one with more details

### **'use strict'**

The 'use strict' ES5 utility is a option that desencourages the use of variables before they were defined, using the 'use strict' utility and executing the earlier code would throw a `ReferenceError: 'x' is not defined`. Beyond that, the 'use strict' mode gives you some more advantages:

1. Eliminates some of the silent Javascript errors, making them throw explicit errors, which will be shown by the interpreter;
2. Makes it easier to Javascript engines to perform optimisations by fixing some mistakes;
3. Prohibis some syntax that are likely to be defined in future versions of JS.

But it has it's downsides: it behaves differently on different browsers, so it's very recommended that you perform some rough feature tests to ensure that everything is reliable.

### **let** keyword

The hoisting behavior is majorely caused by the use of the **var** keyword, all variables declared with the **var** keyword are hoisted to the top of the current scope. Since Javascript ES6, the **let** keyword was introduced, it works pretty similar to the **var** keyword, but with a major difference: **When a variable is declared with let, it becomes block scoped**.

Here is a pretty nice example of the difference between **var** and **let**:

![var, let and const](/assets/blog/hoisting-explained/const-vs-let-vs-var.png)

However, it's recommended to use the **let** keyword only when you absolutely have to change the variable value in execution time, otherwise, the next option must be your choice (and it's also more popular).

### **const** keyword

The **const** keyword has the same behavior as the **let** keyword, it makes the variable block scoped, but it's major difference relies on the name itself: **It makes the variable impossible to be reassigned in execution time**. This is the recommended keyword to be used on variable declarations.

Variables declared with the **const** keyword promote immutability and prevent side effects on the code, it is widely used among the JS Developers and it borrows the concept of immutability from Functional Programming. In fact, Javascript itself is a multi-paradigm programming language, so you can both do OOP Programming, Functional Programming or anything else.

### Overview

So today we've learned about what is and how to avoid **hoisting** on Javascript, I hope that from now on, your codes get used to the **let** and **const** keywords or if you're coding in older versions of Javascript (pre ES6), you get used to the **'use strict'** mode. Thanks!
