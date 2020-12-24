import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body className="bg-dark text-neutral">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
