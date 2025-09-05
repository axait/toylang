import './styles/App.scss'
import "prismjs/themes/prism-tomorrow.css";
import Banner from './Components/Banner.tsx'
import CoderEditor from './Components/CodeEditor.tsx'
import MyConsole from './Components/MyConsole.tsx'
import Docs from './Components/Docs.tsx'
import Footer from './Components/Footer.tsx'
import CustomCursor from './Components/CustomCursor.tsx'
import { useEffect } from 'react';
// import TempFile from './Components/TempFile.tsx'
import Clarity from "@microsoft/clarity";

function App() {
	useEffect(() => {
		// if (process.env.NODE_ENV === "production") {
			Clarity.init("t5zc2cwizx"); // 👈 your Clarity project ID
		// }
	}, []);

	return (
		<>
			<Banner />
			<CoderEditor />
			<MyConsole />
			<Docs />
			<Footer />
			<CustomCursor />
			{/* <TempFile/> */}
		</>
	)
}

export default App

