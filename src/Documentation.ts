import type { DocArticleProps } from "./Components/DocArticle.tsx"

export const DocumentationArray: DocArticleProps[] = [
    {
        title: "Comments",
        description: "use `\\>` to add comments.",
        codeExample: "/> I am Comment.",
        isNew: true,
        tags: ["Comments"]
    },
    {
        title: "Variable",
        description: "A variable can be declare by using `declare` keyword.",
        codeExample: "declare name\ninput(\"Enter your name: \", name)\np(\"Welcome, \")\np(name)\n",
        isNew: false,
        tags: ["keyword", "input", "print"]
    },
    {
        title: "Input",
        description: "The input function is used to get user input.",
        codeExample: "declare name\ninput(\"Enter your name: \", name)\np(name)",
        isNew: false,
        tags: ["input"]
    },
    {
        title: "Print",
        description: "The p function is used to print output.",
        codeExample: "p(\"Hello, World!\")",
        isNew: false,
        tags: ["print"]
    },
]
