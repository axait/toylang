import type { DocArticleProps } from "./Components/DocArticle.tsx"

export const Documentation: DocArticleProps[] = [
    {
        title: "Variable",
        description: "A variable is a container for storing data values.",
        codeExample: "declare name\ninput(\"Enter your name: \", name)\np(\"Welcome, \")\np(name)\np(\"!\")",
        isNew: true,
        tags: ["variables", "input", "print"]
    },
    {
        title: "Input",
        description: "The input function is used to get user input.",
        codeExample: "declare name\ninput(\"Enter your name: \", name)\np(name)",
        tags: ["input"]
    },
    {
        title: "Print",
        description: "The p function is used to print output.",
        codeExample: "p(\"Hello, World!\")",
        tags: ["print"]
    }
]
