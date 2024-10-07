import NotFound from "/404.gif";

const Notfound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-white bg-black">
        <h1 className="text-[220px] uppercase">Error 404</h1>
        <h2 className="text-[80px]">Content Not Found</h2>
      
    </div>
  )
}

export default Notfound
