---
title: 'SEO in social media'
excerpt: 'Many people still do not understand about SEO and site indexing, especially when related to social media engagement, so today we are going to cover this topic to help anyone who wants to have better engagement with their publications.'
coverImage: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=**SEO**%20in%20social%20media&images=https://www.svgrepo.com/show/45741/search.svg'
date: '2022-01-21T17:00:00.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=**SEO**%20in%20social%20media&images=https://www.svgrepo.com/show/45741/search.svg'
---

## What is SEO?

SEO stands for Search Engine Optimization and it's the process of optimizing your site technical configuration, content relevance and link popularity so it's pages are easily indexable, more relevant and easier to find with user search queries and, as a consequence, better ranking in search engines.

Search engines is what helps people to find what they want, like Google, to do that work they have to understand the vast amount of websites and pages that makes up the web. They run a certain sophisticated algorithm to retrieve pages that are relevant to the user query.

## How does this work on a site?

For you to do a good SEO on your site, you must know some HTML tags that are important for the search engines (especially Google, since it owns 92% of the market share of search engines, that is why usually you'll see SEO tutorials focused on Google).

These tags will tell the search engine crawler how to "read" the content of your site, this helps the search engines knows about what your content is about and how to categorize the material. Some of them also have impact on how the visitor sees the content of your page in the search engine page and how social media displays your article's page. Let's take a look on some important tags:

### Title Tags

This is one of the most imporant tags for SEO since it is the label of your content and one of the principal match points for a search engine to see your page, every result present on them is derived from the title. The title tag doesn't necessarily needs to match the article title, but you want to keep a certain level of correspondence between them.

If you have a article with the title "How to learn JavaScript" and put up a title like "Why you should learn JavaScript" it will cause confusion for your readers, they will most likely skip your article. There are also ways of optimizing you title tags, but it's not a matter for this article. Here is one example on how to use the title tag:

```html
<head>
	<title>How to learn JavaScript the best way</title>
</head>
```

As you can see, it goes inside the <head\> tag of you page, because it's not meant to be a visual element, it's only a data point of your page setting.

### Meta Tags

Meta tags are also super important for your SEO, they can be used by the search engines crawler to get extra info from your site and index it better, one good example of this is the sinppet of text below any search title, it is usually taken from the description meta tag of a site. Take a look at this example:

```html
<meta
	name="description"
	content="Learn JavaScript fast and the easy way by reading our introduction article!"
/>
```

One key phrase here is the "JavaScript fast and the easy way", this is a good example of how you can include good key phrases to improve the ranking of your website.

There are other meta tags also, but it would be too much to cover them all in one article, but the main ones are the _description_ tag and the _keywords_ tag, that makes it easier for the search engine to find your page. It is importatn to warn too that your _keywords_ tag should be aligned with the content of your site or it could cause confusion on your readers and make them skip your content.

### Header Tags

The header tags are used to mark some titles inside your article, don't underestimate their power, they make your content easier to read and to search for key terms. Most of the visitors (about 55%) will spend about 15 seconds skimming through your content and headers will help them find what they're looking for.

A example would be: what if a reader that is here are interested only on read about meta tags? Header tags would help him find what he's looking for in no time, otherwise he would leave without even engaging the content. In terms of SEO, header tags can help the search engines segmentate your page and build featured rich snippets. Take a look at the hierarchy of the header tags:

- <h1\> – usually reserved for webpage titles;
- <h2\> – highlights the topic of the title;
- <h3\> – reflects points in regards to the topic;
- <h4\> – supports points from <h3\>;
- <h5\> – not often used, but great for supporting points of <h4\>.

### Add OG Tags and Twitter Cards

Open Graph (OG) tags can help out boosting search and display abilities of your site in social media, if you post your article on Facebook as an example, it will use open graph to display information about the content you're sharing. Here is an example of a OG tag:

```html
<meta name="og:title" property="og:title" content="SEO in social media" />
```

Now if you share the article on Facebook, it will show your title taken directly from the og:title meta tag. It supports descriptions and images too. The Open Graph tags simply give you options for customize how your page is going to look when shared to social media, you could even have one description tag for Google and another for social media, which is very useful if you're trying to target specific users in each platform. You should just make sure that your social media description tag still matches the content into the page, after all, it's all about relevance.

Another good resource is the Twitter Cards platform, they work in a very similar way to OG but they're specific for Twitter. To enable it you should use the following tag:

```html
<meta name="twitter:card" content="summary" />
```

Now if you go to the [Twitter Cards Reference](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) you'll see that you have many ways of styling a card and many specific Twitter meta tags to work with, you even have a [Twitter Card Validator](https://cards-dev.twitter.com/validator) where you just paste the URL of your site and then it validates the card for you or return you any error if any necessary tag is not found.

## Conclusion

We took a look into important SEO tags and setup some grounds for you to start your studies. I hope the content here was useful for you and added knowledge to your portfolium of ideas.

If you have any doubts, you could contact me via email or open an issue on the blog repo, my GitHub profile with tehse informations is right below this conclusion, be free to reach me!
