import { useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import PlaygroundTitle from './PlaygroundTitle'

const CodeEditor = () => {
    const startCode = `/> Comment\ndeclare x\np(x)\ninput("Enter x: ",x)\np(551+25)\np("hello")\np(x+5)`
    const [code, setCode] = useState(startCode);
    const monaco = useMonaco();

    useEffect(() => {
        if (monaco) {
            // ✅ Register new language
            monaco.languages.register({ id: "mylang" });

            // ✅ Tokenizer (simple grammar)
            monaco.languages.setMonarchTokensProvider("mylang", {
                tokenizer: {
                    root: [
                        // keywords
                        [/\bdeclare\b/, "keyword-declare"],
                        [/\binput\b/, "keyword-input"],
                        [/\bp\b/, "keyword-p"],

                        // strings
                        [/"([^"\\]|\\.)*$/, "string.invalid"],
                        [/"([^"\\]|\\.)*"/, "string"],

                        // numbers
                        [/\b\d+\b/, "number"],

                        // comments
                        [/\/>.*/, "comment"],
                    ],
                },
            });

            // ✅ Custom theme (black bg + colors)
            monaco.editor.defineTheme("mylang-dark", {
                base: "vs-dark",
                inherit: true,
                rules: [
                    { token: "keyword-declare", foreground: "ff5555", fontStyle: "bold" }, // red-ish
                    { token: "keyword-input", foreground: "50fa7b", fontStyle: "bold" },   // green-ish
                    { token: "keyword-p", foreground: "8be9fd", fontStyle: "bold" },       // cyan-ish
                    { token: "string", foreground: "f1fa8c" },   // yellow
                    { token: "number", foreground: "bd93f9" },   // purple
                    { token: "comment", foreground: "555555", fontStyle: "italic" }, // dim gray
                ],

                colors: {
                    "editor.background": "#000000", // full black bg
                    "editor.foreground": "#ffffff",
                },
            });

            monaco.editor.setTheme("mylang-dark");
        }
    }, [monaco]);


    return (
        <div className="flex flex-col gap-4 mt-[2rem]">
            <PlaygroundTitle />
            <Editor
                className="border-1 p-2 min-h-[400px] w-[80vw] m-auto"
                defaultLanguage="javascript"
                defaultValue="// Write some code..."
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="hc-black" // "vs-light" or "vs-dark"
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    automaticLayout: true,
                }}
            />

        </div>
    );
};

export default CodeEditor;