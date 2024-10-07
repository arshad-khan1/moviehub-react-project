import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  console.log(data);
  return (
    <Link to={`/${data.media_type}/details/${data.id}`}>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.6), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.profile_path
          })`,
          backgroundPosition: "top 10%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="relative w-[98%] h-[60vh] mx-auto rounded-md overflow-hidden shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute w-full h-full p-3">
          <div className="absolute w-[55%]  top-[10%] left-[7%]  flex flex-col gap-4 pb-4">
            <h1 className="text-white text-6xl font-bold tracking-tight ">
              {data.name || data.original_title}
            </h1>
            <h3 className="text-2xl text-white font-semibold">
              {data.genre_ids}
            </h3>
            <div className="flex gap-5 items-center text-white text-xl font-semibold uppercase">
              <span>{data.release_date.slice(0, 4)}</span>

              {data.media_type === "movie" ? (
                <span>
                  {" "}
                  <i className="ri-movie-line"></i> {data.media_type}
                </span>
              ) : (
                <span>
                  {" "}
                  <i className="ri-tv-line"></i> {data.media_type}
                </span>
              )}

              <span>
                <i className="ri-heart-fill"></i> {data.vote_average}
              </span>
            </div>

            <p className="w-[70%] text-white text-md font-light tracking-normal max-h-[18vh] overflow-hidden text-ellipsis">
              {data.overview.slice(0, 200)}...
              <Link
                to={`/${data.media_type || title}/details/${data.id}`}
                className="text-[#6556CD]"
              >
                {" "}
                more
              </Link>
            </p>
            <div className="flex gap-5 mt-1">
              <Link
                to={`/${data.media_type}/details/${data.id}/trailer`}
                className="w-fit px-3 py-2 text-md font-semibold text-white border-2 border-[#6556CD] bg-[#6556CD] rounded-2xl hover:border-white hover:bg-white hover:text-[#6556CD] duration-600"
              >
                <i className=" mr-1 ri-play-mini-fill"></i>
                Watch Trailer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Header;
