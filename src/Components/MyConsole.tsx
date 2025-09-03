import { useState, useRef, useEffect } from "react";
import { type ConsoleLine } from "../store/types";
// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addConsoleLine, clearConsole, setIsToRunCode } from "../store/appSlice.ts";
import type { RootState } from "../store/store.ts";

const MyConsole = () => {

	const lines = useSelector((state: RootState) => state.app.consoleToDisplayLines);
	const [currentInput, setCurrentInput] = useState("");
	const [waiting, setWaiting] = useState(false);
	const inputResolver = useRef<((value: string) => void) | null>(null);

	const dispatch = useDispatch();
	const isToRun = useSelector((state: RootState) => state.app.isToRunCode);
	const consoleRef = useRef<HTMLDivElement | null>(null);

	// 👇 Function to print text
	const print = (text: string) => {
		dispatch(addConsoleLine({ type: "output", text }));
	};

	// 👇 Function to show error
	const showError = (Text: string) => {
		dispatch(addConsoleLine({ type: "error", text: `Error: ${Text}` }));
	};

	// 👇 Function to ask for input (returns a Promise)
	const readInput = (prompt = ""): Promise<string> => {
		print(prompt);
		setWaiting(true);
		return new Promise((resolve) => {
			inputResolver.current = resolve;
		});
	};

	const consoleLineFormatter = (line: ConsoleLine) => {
		if (line.text.trim() !== "") {

			if (line.type === "input") {
				return <span className="text-white">&gt;&nbsp;{line.text}</span>
			}
			else if (line.type === "output") {
				return <span>&gt;&nbsp;<span className="text-green-400">{line.text}</span></span>
			} else {
				return <span>&gt;&nbsp;<span className="text-red-400">{line.text}</span></span>
			}
		}
	}


	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!waiting) return;

		const value = currentInput.trim();
		dispatch(addConsoleLine({ type: "input", text: value }));

		setCurrentInput("");
		setWaiting(false);

		if (inputResolver.current) {
			inputResolver.current(value);
			inputResolver.current = null;
		}
	};

	useEffect(() => {
		if (!isToRun) return;

		const runProgram = async () => {
			const variableStore: Record<string, unknown> = {};
			print("Enter x:");
			variableStore['x'] = await readInput(); // waits for user
			print(`You entered: ${variableStore['x']}`);
			// showError("Something went wrong!");
		};
		
		// Scroll into view smoothly
		consoleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
		dispatch(clearConsole());
		dispatch(addConsoleLine({ type: "output", text: "Great Work!" }));
		
		runProgram();
		dispatch(setIsToRunCode(false));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isToRun]);


	return (
		<div ref={consoleRef} className="bg-black p-4 font-mono min-h-[200px] overflow-y-auto rounded">
			<h2 className="pb-2 font-bold font-mono" >Output:</h2>
			{lines.map((line, i) => (
				<div key={i}>
					{consoleLineFormatter(line)}
				</div>
			))}

			{waiting && (
				<form onSubmit={handleSubmit} className="flex">
					<span className="mr-2">&gt;</span>
					<input
						className="bg-black text-amber-400 outline-none flex-1"
						placeholder="Waiting for Input..."
						value={currentInput}
						onChange={(e) => setCurrentInput(e.target.value)}
						autoFocus
					/>
				</form>
			)}
		</div>
	);
};

export default MyConsole;

