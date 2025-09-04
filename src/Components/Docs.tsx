import DocArticle from './DocArticle.tsx'

const Docs = () => {
    return (
        <div
        // className="bg-amber-500 p-4"
        >
            <p>
                I will add documentation here soon.
            </p>
            <DocArticle
            title="Variable"
            description="hello" 
            codeExample={`/> Comment\ndeclare name\ninput("Enter your name: ", name)\np("Welcome, ")\np(name)\np("!")`}
            isNew={true}
            tags={["hello", "abc"]}
            />
        </div>
    )
}

export default Docs
