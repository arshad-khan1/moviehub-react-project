import React from 'react'
import loading from "/loading.gif"

const Loading = () => {
  return (
    <div className='relative w-screen h-screen flex items-center justify-center'>
      <img className='' src={loading} alt="" />
      {/* <h1 className='absolute text-zinc-300 text-[2vw] top-[15%] font-bold '>Your content is Loading</h1> */}
    </div>
  )
}

export default Loading
