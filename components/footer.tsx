import Container from './container';

const Footer = () => {
	return (
		<footer className="bg-accent-1 border-t border-accent-2">
			<Container>
				<div className="py-12 flex flex-col lg:flex-row items-center justify-center">
					<h3 className="text-4xl lg:text-4xl font-bold tracking-tighter leading-tight text-center lg:text-center mb-0">
						Made by{' '}
						<a
							target="_blank"
							href="https://github.com/luk3skyw4lker"
							className="hover:underline"
						>
							luk3skyw4lker
						</a>{' '}
						with Next.js, Typescript and Markdown
					</h3>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
