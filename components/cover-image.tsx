import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
	title: string;
	src: string;
	slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
	const image = (
		<div
			className={cn('shadow-small', {
				'hover:shadow-medium transition-shadow duration-200': slug
			})}
		>
			<Image
				src={src}
				alt={`Cover Image for ${title}`}
				layout="responsive"
				width="55"
				height="32"
			/>
		</div>
	);

	return (
		<div className="sm:mx-0">
			{slug ? (
				<Link as={`/posts/${slug}`} href="/posts/[slug]">
					<a aria-label={title}>{image}</a>
				</Link>
			) : (
				image
			)}
		</div>
	);
};

export default CoverImage;
