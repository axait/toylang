import './styles/App.scss'
import Banner from './Components/Banner.tsx'
import CoderEditor from './Components/CodeEditor.tsx'
import MyConsole from './Components/MyConsole.tsx'

function App() {

	return (
		<>
		<Banner/>
		<CoderEditor/>
		<MyConsole output={""}/>
		{/* <br />
		<br />
		<br />
			<div className="h-[100px] hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">ToyLang</h1>
					<p className="py-6">
						A simple programming language interpreter.
					</p>
				</div>
			</div>
			<Coder /> */}
		</>
	)
}

export default App

