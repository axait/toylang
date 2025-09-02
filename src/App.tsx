import './styles/App.scss'
import Banner from './Components/Banner.tsx'
import CoderEditor from './Components/CodeEditor.tsx'
import MyConsole from './Components/MyConsole.tsx'
import CustomCursor from './Components/CustomCursor.tsx'

function App() {

	return (
		<>
		<Banner/>
		<CoderEditor/>
		<MyConsole output={""}/>
		<CustomCursor/>
		</>
	)
}

export default App

