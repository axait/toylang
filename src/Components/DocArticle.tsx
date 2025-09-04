import Prism from 'prismjs';
import '../styles/CustomPrism.scss';
import "prismjs/components/prism-javascript"; // Load the language you want
import { useEffect } from 'react';

interface DocArticleProps {
	title: string
	description: string
	codeExample: string
	isNew?: boolean
	tags?: string[]
}


const DocArticle = ({ title, description, codeExample, isNew = false, tags }: DocArticleProps) => {

	useEffect(() => {
		Prism.highlightAll(); // Re-run highlight after render
	});

	return (
		<div className="card w-96 border-[0.5px] doc-article-bg">
			<div className="card-body">
				<h2 className="card-title">
					{title}
					{isNew && <div className="badge badge-secondary">NEW</div>}
				</h2>
				<p>
					{description}
				</p>
				<div className="card-actions justify-end">
					{
						tags?.map(
							(tagName) => (
								<div className="badge badge-outline">{tagName}</div>
							)
						)
					}
				</div>
			</div>
			<figure className='mb-2'>
				<pre className="language-javascript line-numbers code-bg w-[94%]">
					<code className="language-javascript">
						{codeExample}
					</code>
				</pre>
			</figure>
		</div>
	)
}

export default DocArticle