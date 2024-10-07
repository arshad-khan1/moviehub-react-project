import React from "react";
import nophoto from "/nophoto.jpg";
import { Link } from "react-router-dom";

const Casts = ({data, title}) => {

  const topFiveCasts = data.filter((element, index) => index < 5);

  return (
    <div className="flex gap-7 ml-7">
      {topFiveCasts.map((c, i) => {
        return <Link to={`/${c.media_type || title}/details/${c.id}`} key={i} className="flex flex-col items-center">
          <img
            className="w-[15vh] bg-zinc-800 rounded-md mb-2 object-contain object-[top_center] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
            src={`https://image.tmdb.org/t/p/original${(c.profile_path) ? (c.profile_path) : nophoto}`}
            alt=""
          />
          <h1 className="text-lg font-semibold">{c.original_name} </h1>
          <h2 className="">{c.known_for_department === "Acting" ? 'Actor' : 'Director'}</h2>
        </Link>;
      })}
    </div>
  );
};

export default Casts;
