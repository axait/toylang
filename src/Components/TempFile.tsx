import { useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";


function TempFile(){
    const editorCode = useSelector((state: RootState) => state.app.editorCode);

    return (
        <div>
            {JSON.stringify(editorCode)}
        </div>
    )
}

export default TempFile;
