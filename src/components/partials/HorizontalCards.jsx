import React from "react";
import { Link } from "react-router-dom";
import nophoto from "/nophoto.jpg";

const HorizontalCards = ({ data, width = "min-w-[14%]", title}) => {
  // console.log(data);
  return (
    <div className="flex gap-7 overflow-y-auto flex-nowrap mb-5 px-4 ">
      {data.map((c, i) => {
        return (
          <Link
            to={`/${c.media_type || title}/details/${c.id}`}
            key={i}
            className={`relative ${width} h-[45vh] bg-gradient-to-b from-zinc-900 to-transparent rounded-md p-1 overflow-hidden overflow-y-auto`}
          >
            <img
              className="h-[80%] w-full bg-no-repeat bg-cover bg-center rounded-md object-cover object-center"
              src={`https://image.tmdb.org/t/p/original/${c.poster_path} ? https://image.tmdb.org/t/p/original/${c.poster_path} :  ${nophoto}`}
              alt=""
            />

            {/* showing date but here 'slice' is giving error due to its undefined value */}
            {/* <span className="absolute text-white top-0 left-[70%] font-bold 0 px-2 py-1 rounded-md shadow-lg ">
                {c.release_date}
              </span> */}

            <div className="text-white p-1 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">
                {(c.title || c.name || c.original_title || c.original_name) ? c.title || c.name || c.original_title || c.original_name : nophoto}
              </h2>
              {/* <h3 className="text-md">{c.genres.map(g => g.name).join(", ")}</h3> */}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default HorizontalCards;
