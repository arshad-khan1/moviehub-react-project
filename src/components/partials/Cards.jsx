import React from "react";
import nophoto from "/nophoto.jpg";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  return (
    <div className="w-full h-full flex flex-wrap items-center justify-center gap-12 bg-[#1F1E24] px-10 pt-5 ">
      {data.map((c, i) => {
        return (
          <Link
            to={`/${c.media_type || title}/details/${c.id}`}
            key={i}
            className="relative w-[25vh] h-[40vh] mb-10 "
          >
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] bg-no-repeat bg-cover bg-center rounded-md"
              src={`https://image.tmdb.org/t/p/original/${
                c.poster_path || c.backdrop_path || c.profile_path
                  ? c.poster_path || c.backdrop_path || c.profile_path
                  : {nophoto}
              }`}
              alt=""
            />
            <h1 className="text-xl font-semibold">
              {c.title || c.name || c.original_title || c.original_name}
            </h1>

            {/* Average Votes Circle Div */}
            {c.vote_average && (
              <div className="absolute top-[70%] left-[91%] w-[6vh] h-[6vh] text-xl font-semibold rounded-full bg-[#6556CD] border-2 border-[#231e47] p-3 flex items-center justify-center ">
                {(c.vote_average * 10).toFixed()}
                <sup>%</sup>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Cards;
