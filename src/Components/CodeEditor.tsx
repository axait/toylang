import { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import PlaygroundTitle from './PlaygroundTitle'
// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setEditorCode } from "../store/appSlice";
import { addConsoleLine } from "../store/appSlice";
import type { RootState } from "../store/store.ts";


const CodeEditor = () => {
    const startCode = `/> Comment\ndeclare x\np(x)\ninput("Enter x: ",x)\np(551+25)\np("hello")\np(x+5)`
    const monaco = useMonaco();

    // to use These redux States.
    const editorCode = useSelector((state: RootState) => state.app.editorCode);
    const dispatch = useDispatch();

    useEffect(() => {
        // To update editorCode:
        dispatch(setEditorCode(startCode));
        dispatch(addConsoleLine({type: "output", text: 'Good!'}));
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
        
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
                className="border-1 p-2 min-h-[300px] w-[80vw] m-auto mx-2"
                defaultLanguage="javascript"
                defaultValue="/> Write Something..."
                value={editorCode}
                onChange={(value) => dispatch(setEditorCode((value || "")))}
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