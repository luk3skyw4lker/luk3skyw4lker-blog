import { GetStaticProps } from 'next';
import Head from 'next/head';

import SectionSeparator from '../components/section-separator';
import MoreStories from '../components/more-stories';
import Container from '../components/container';
import HeroPost from '../components/hero-post';
import Layout from '../components/layout';
import Intro from '../components/intro';

import { BLOG_TITLE, HOME_OG_IMAGE_URL } from '../lib/constants';
import { getAllPosts } from '../lib/api';

import Post from '../types/post';

type Props = {
	allPosts: Post[];
	locale: string;
};

const Index = ({ allPosts, locale }: Props) => {
	const [heroPost, ...morePosts] = allPosts;
	const meta_description =
		locale === 'en'
			? "Lucas Lemos's Blog. I write about tech, most often about Javascript and Typescript, it would be my pleasure to have you reading one of my articles!"
			: 'Blog do Lucas Lemos. Escrevo sobre tecnologia, mais frequentemente sobre Javascript e Typescript, seria um prazer ter você lendo meus artigos!';

	return (
		<>
			<Layout>
				<Head>
					<title>{BLOG_TITLE}</title>

					<meta name="description" content={meta_description} />

					<meta property="og:description" content={meta_description} />
					<meta property="og:image" content={HOME_OG_IMAGE_URL} />
					<meta property="og:title" content={BLOG_TITLE} />
					<meta property="og:type" content="website" />
				</Head>
				<Container>
					<Intro locale={locale} />
					{heroPost && (
						<>
							<HeroPost
								title={heroPost.title}
								coverImage={heroPost.coverImage}
								date={heroPost.date}
								author={heroPost.author}
								slug={heroPost.slug}
								excerpt={heroPost.excerpt}
							/>
							<SectionSeparator />
						</>
					)}
					{morePosts.length > 0 && (
						<MoreStories locale={locale} posts={morePosts} />
					)}
				</Container>
			</Layout>
		</>
	);
};

export default Index;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const allPosts = getAllPosts(
		['title', 'date', 'slug', 'author', 'coverImage', 'excerpt'],
		locale as string
	);

	return {
		props: { allPosts, locale }
	};
};
