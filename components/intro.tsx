import { BLOG_TITLE } from '../lib/constants';

type Props = {
	locale: string;
};

const Intro = ({ locale }: Props) => {
	const headline =
		locale === 'en'
			? 'Welcome! May the content here lead you to the right path.'
			: 'Bem vindo! Que o conteúdo aqui te leve para o caminho certo.';

	return (
		<section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
			<h1 className="text-6xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
				{BLOG_TITLE}.
			</h1>
			<h4 className="text-center md:text-left text-lg mt-5 md:pl-8 items-center">
				{headline}
			</h4>
		</section>
	);
};

export default Intro;
