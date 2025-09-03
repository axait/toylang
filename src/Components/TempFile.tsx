import { useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";


function TempFile(){
    const editorCode = useSelector((state: RootState) => state.app.editorCode);
    const istoruncode = useSelector((state: RootState) => state.app.isToRunCode);

    return (
        <div>
            {JSON.stringify(editorCode)}
            <br />
            {JSON.stringify(istoruncode)}
        </div>
    )
}

export default TempFile;
