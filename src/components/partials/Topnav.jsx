import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

const Topnav = ({title}) => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
    //   console.log(data.results);
      setsearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex items-center justify-start gap-3 ml-[20%] z-10">
      <i className="text-zinc-500 ri-search-fill hover:text-zinc-100"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] text-md text-white rounded-lg p-2 border-none outline-none bg-[#343337]"
        type="text"
        placeholder="Search Movie..."
      />

      {query.length > 0 && (
        <i onClick={() => setquery("")} className="text-zinc-500 ri-close-fill cursor-pointer"></i>
      )}

      <div className="absolute w-[70%] max-h-[70vh] top-[90%] left-[-8%] rounded-lg bg-[#262529] overflow-auto">
        {searches.map((s, i) => (
          <Link
            to={`/${title || s.media_type }/details/${s.id}`}
            key={i}
            className="w-full p-6 text-xl text-zinc-300 font-semibold border-b-2 border-zinc-700 flex justify-start items-center gap-10 hover:bg-[#302f33] hover:text-zinc-400 duration-300"
          >
            <img
              className="w-20 object-center object-fill rounded-lg "
              src={
                (s.poster_path || s.profile_path)
                  ? `https://image.tmdb.org/t/p/w185/${
                      s.poster_path || s.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span>{s.title || s.original_title || s.name}</span>
          </Link>
        ))}
        {/* <Link className="w-full p-6 text-xl text-zinc-300 font-semibold border-b-2 border-zinc-700 flex justify-start items-center gap-10 hover:bg-[#302f33] hover:text-zinc-400 duration-300">
          <img
            className="w-32 aspect-[3/2] object-cover rounded-lg "
            src="https://plus.unsplash.com/premium_photo-1682125771198-f7cbed7cb868?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <span>This is Latest Movie</span>
        </Link> */}
      </div>
    </div>
  );
};

export default Topnav;
