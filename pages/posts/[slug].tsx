import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';

import PostHeader from '../../components/post-header';
import PostTitle from '../../components/post-title';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import Header from '../../components/header';
import Layout from '../../components/layout';

import { getPostBySlug, getAllPosts } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import PostType from '../../types/post';

type Props = {
	post: PostType;
	// morePosts: PostType[];
	preview?: boolean;
};

const Post = ({ post, preview }: Props) => {
	const router = useRouter();

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<Layout preview={preview}>
			<Head>
				<title>{post.title} | Lucas Lemos Blog</title>

				<meta name="description" content={post.excerpt} />

				<meta property="og:description" content={post.excerpt} />
				<meta property="og:image" content={post.coverImage} />
				<meta property="og:title" content={`${post.title}`} />
				<meta property="og:type" content="article" />
			</Head>
			<Container>
				<Header />
				{router.isFallback ? (
					<PostTitle>Loading…</PostTitle>
				) : (
					<>
						<article className="mb-32">
							<PostHeader
								title={post.title}
								coverImage={post.coverImage}
								date={post.date}
								author={post.author}
							/>
							<PostBody content={post.content} />
						</article>
					</>
				)}
			</Container>
		</Layout>
	);
};

export default Post;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	const post = getPostBySlug(
		{ slug: params?.slug as string, locale: locale as string },
		[
			'title',
			'date',
			'slug',
			'author',
			'content',
			'ogImage',
			'coverImage',
			'excerpt'
		]
	);

	const content = await markdownToHtml(post.content || '');

	return {
		props: {
			post: {
				...post,
				content
			}
		}
	};
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	const [firstLocale, lastLocale] = locales as string[];
	const posts = getAllPosts(['slug']);

	const paths = posts
		.map(post => {
			return [
				{
					params: {
						slug: post.slug
					},
					locale: firstLocale
				},
				{
					params: {
						slug: post.slug
					},
					locale: lastLocale
				}
			];
		})
		.flat(1);

	return {
		paths,
		fallback: 'blocking'
	};
};
