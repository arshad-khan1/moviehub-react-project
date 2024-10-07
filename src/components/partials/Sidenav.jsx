import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  

  return (
    <div className="w-[17vw] h-screen border-r-2 border-zinc-700 text-zinc-400 p-5">
      <div className="text-[2vw] flex gap-3 font-bold items-center text-white">
        <Link to={"/"} className="ri-tv-2-fill text-[#6556CD]"></Link>
        <Link to={"/"} className="mb-1">MovieHub</Link>
      </div>
      <div className="flex flex-col justify-between h-[85vh] text-[1.1vw]">
        <nav className="flex flex-col gap-2 mt-10">
          <h1 className="text-white  font-semibold mb-3">News Feed</h1>
          <Link to={'/trending'} className="py-2 px-5 hover:scale-105 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg">
            <i className="mr-3 ri-fire-fill"></i>
            Trending
          </Link>
          <Link to={'/popular'} className="py-2 px-5 hover:scale-105 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg">
            <i className="mr-3 ri-bard-fill"></i>
            Popular
          </Link>
          <Link to={'/movie'} className="py-2 px-5 hover:scale-105 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg">
            <i className="mr-3 ri-movie-fill"></i>
            Movies
          </Link>
          <Link to={'/tv'} className="py-2 px-5 hover:scale-105 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg">
            <i className="mr-3 ri-tv-fill"></i>
            TV Shows
          </Link>
          <Link to={'/people'} className="py-2 px-5 hover:scale-105 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg">
            <i className="mr-3 ri-team-fill"></i>
            Stars
          </Link>
        </nav>

        {/* <hr className="border-none h-[1px] bg-zinc-400"/> */}

        <nav className="flex flex-col gap-2 text-[1.1vw]">
          <h1 className="text-white  font-semibold mb-3">
            Website Information
          </h1>
          <Link className="py-2 px-5 hover:scale-105 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg">
            <i className="mr-3 ri-information-fill"></i>
            About MovieHub
          </Link>
          <Link className="py-2 px-5 hover:scale-105 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg">
            <i className="mr-3 ri-phone-fill"></i>
            Contact Us
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidenav;
