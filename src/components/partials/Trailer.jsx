import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Notfound from "../Notfound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="absolute  top-0 left-0 bg-[rgba(0,0,0,0.9)] w-screen h-screen z-[100] flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute right-[8%] top-[3%] text-3xl ri-close-fill font-bold hover:text-[#6556CD] hover:cursor-pointer"
      ></Link>
      {ytvideo ? (
        <ReactPlayer
          controls
          height={800}
          width={1500}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Trailer;
