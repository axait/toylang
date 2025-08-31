import React from 'react'

const Coder = () => {
    const [code, setCode] = React.useState("")
    const [output, setOutput] = React.useState("")
    return (
        <>
            <div
                className="flex flex-col
            ">
                <textarea
                    className="border-2 p-2 h-[400px] w-[100vw] max-w-[500px]"
                    value={code}
                    onChange={({ target: { value } }) => setCode(value)}
                />

                <button 
                className="
                mt-2
                btn btn-outline btn-error
                ">Run</button>
                <div
                    className="border-2 p-2 mt-2 min-h-[300px] w-[100vw] max-w-[500px] overflow-y-scroll"
                >
                    {output}
                </div>
            </div>

        </>
    )
}

export default Coder
