import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
	return fs.readdirSync(join(postsDirectory, 'en'));
}

export function getPostBySlug(
	params: { slug: string; locale?: string },
	fields: string[] = []
) {
	const realSlug = params.slug.replace(/\.md$/, '');
	const fullPath = join(
		postsDirectory,
		params.locale || 'en',
		`${realSlug}.md`
	);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);

	type Items = {
		[key: string]: string;
	};

	const items: Items = {};

	// Ensure only the minimal needed data is exposed
	fields.forEach(field => {
		if (field === 'slug') {
			items[field] = realSlug;
		}
		if (field === 'content') {
			items[field] = content;
		}

		if (data[field]) {
			items[field] = data[field];
		}
	});

	return items;
}

export function getAllPosts(fields: string[] = [], locale: string = 'en') {
	const slugs = getPostSlugs();
	const posts = slugs
		.map(slug => getPostBySlug({ slug, locale }, fields))
		// sort posts by date in descending order
		.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

	return posts;
}
