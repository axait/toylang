import React from 'react'

const PlaygroundTitle = () => {
  return (
    <div
    className='
      flex flex-row
      justify-between
      pl-2 pr-5
    '
    >
      <h2
      className='
      md:mt-5
      text-[0.9rem] font-mono
      font-bold
      pt-2
      '
      >Playground:</h2>
      <div
      className='
      md:mt-5
      text-[0.9rem] font-mono
      font-bold
      '
      >
        <button className="btn btn-error font-mono h-[35px]">Run</button>
        <button className="btn btn-soft btn-error random-code-btn ml-2 h-[35px]">Random</button>
      </div>
      
    </div>
  )
}

export default PlaygroundTitle
