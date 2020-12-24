# Luk3skyw4lker's Blog

This is my personal blog. I've started it using the existing Next.js template [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) and added my own styles. This is my first step to create content on the internet, so please be patient when something is wrong or buggy.

I'm actually using Markdown files to write my articles, since it's lighter and easier to manage than a full database of articles. I also have a plan to add a visit counter using MongoDB (that's the more complex feature of the blog) and change a lot of styles too. So this will be a long project, and in the middle, I'll be sending some articles with basic knowledge.

The blog also uses fully static generated pages, provided by Next.js SSG feature.

## Libraries

To handle the metadata of every file the project uses [`gray-matter`](https://github.com/jonschlinkert/gray-matter) and to process and convert the Markdown files to HTML we use [`remark`](https://github.com/remarkjs/remark) and [`remark-html`](https://github.com/remarkjs/remark-html).

For the frontend, the blog is built all using [Tailwind CSS](https://tailwindcss.com).
