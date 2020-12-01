import Head from 'next/head';

import MoreStories from '../components/more-stories';
import Container from '../components/container';
import HeroPost from '../components/hero-post';
import Layout from '../components/layout';
import Intro from '../components/intro';

import { BLOG_TITLE } from '../lib/constants';
import { getAllPosts } from '../lib/api';

import Post from '../types/post';

type Props = {
	allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
	const [heroPost, ...morePosts] = allPosts;

	return (
		<>
			<Layout>
				<Head>
					<title>{BLOG_TITLE}</title>
				</Head>
				<Container>
					<Intro />
					{heroPost && (
						<HeroPost
							title={heroPost.title}
							coverImage={heroPost.coverImage}
							date={heroPost.date}
							author={heroPost.author}
							slug={heroPost.slug}
							excerpt={heroPost.excerpt}
						/>
					)}
					{morePosts.length > 0 && <MoreStories posts={morePosts} />}
				</Container>
			</Layout>
		</>
	);
};

export default Index;

export const getStaticProps = async () => {
	const allPosts = getAllPosts([
		'title',
		'date',
		'slug',
		'author',
		'coverImage',
		'excerpt'
	]);

	return {
		props: { allPosts }
	};
};
