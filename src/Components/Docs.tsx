import DocArticle from './DocArticle.tsx'
import { DocumentationArray } from '../Documentation.ts'

const Docs = () => {
    return (
        <>
            <h2 className=" pl-3.5 pb-2 font-bold font-mono" >Documentation:</h2>
            
            <div
                className=" flex flex-row flex-wrap justify-evenly mb-4 "
            >
                {
                    DocumentationArray.map(
                        (article) => (
                            <DocArticle
                                title={article.title}
                                description={article.description}
                                codeExample={article.codeExample}
                                isNew={article.isNew}
                                tags={article.tags}
                            />
                        )
                    )
                }
            </div>
        </>
    )
}

export default Docs
