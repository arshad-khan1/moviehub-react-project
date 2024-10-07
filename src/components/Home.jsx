import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import Header from "./partials/Header";
import axios from "../utils/axios";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";

const Home = () => {
  document.title = "MovieApp | Home";

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetWallpaper = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      let randomdata = (Math.random() * data.results.length).toFixed();
      setwallpaper(data.results[randomdata]);
    } catch (error) {
      console.log(error);
    }
  };

  // =============This was old with no dropdown=================
  //   const GetTrending = async () => {
  //     try {
  //       const { data } = await axios.get("/trending/all/week");
  //       settrending(data.results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/week`);
      settrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <div className="flex">
      <Sidenav />
      <div className="w-[83vw] h-screen overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        <div className=" flex justify-between items-center p-4 pt-10">
          <h1 className=" text-4xl text-zinc-200  font-bold">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </div>
  ) : (
    <h1 className="text-white text-xl font-bold">Loading</h1>
  );
};

export default Home;
