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
import { GetStaticPaths } from 'next';

type Props = {
	post: PostType;
	morePosts: PostType[];
	preview?: boolean;
};

const Post = ({ post, morePosts, preview }: Props) => {
	const router = useRouter();

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<Layout preview={preview}>
			<Container>
				<Header />
				{router.isFallback ? (
					<PostTitle>Loading…</PostTitle>
				) : (
					<>
						<article className="mb-32">
							<Head>
								<title>{post.title} | Lucas Lemos Blog</title>

								<meta name="description" content={post.excerpt} />
								<meta property="og:image" content={post.coverImage} />
							</Head>
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

type Params = {
	params: {
		slug: string;
	};
};

// Add Next.js internationalization config and then get the articles by path
// Like: /en/building-charts-with-react-native or /pt/building-charts-with-react-native
export async function getStaticProps({ params }: Params) {
	const post = getPostBySlug(params.slug, [
		'title',
		'date',
		'slug',
		'author',
		'content',
		'ogImage',
		'coverImage',
		'excerpt'
	]);

	const content = await markdownToHtml(post.content || '');

	return {
		props: {
			post: {
				...post,
				content
			}
		}
	};
}

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = getAllPosts(['slug']);

	return {
		paths: posts.map(posts => {
			return {
				params: {
					slug: posts.slug
				}
			};
		}),
		fallback: 'blocking'
	};
};
