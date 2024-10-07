import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import Cards from "./partials/Cards";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  document.title = "MovieHub | Trending";

  const navigate = useNavigate();
  const [trending, settrending] = useState([]);
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      // settrending(data.results);
      if(data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      }
      else{
        sethasMore(false);
      }
      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    if(trending.length === 0){
      GetTrending();
    }else{
      setpage(1);
      settrending([]);
      GetTrending();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);
  // console.log(trending);

  return trending.length > 0 ? (
    <div className="w-screen h-screen text-white pverflow-hidden">
      <div className="trending-top w-full h-[10vh] flex items-center mb-6 px-10">
        <div className="w-[20%] text-4xl font-bold flex gap-4 items-center ">
        <i onClick={()=>navigate(-1)} className="text-xl ri-arrow-left-fill hover:text-[#6556CD] hover:cursor-pointer"></i>
          Trending
        </div>
        <div className="w-[80%] flex items-center justify-between gap-2 ">
          <Topnav />
          <Dropdown
            title={"Category"}
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <Dropdown
            title={"Duration"}
            options={["day", "week"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={true}
        loader={
          <h4 className="text-white text-2xl font-semibold">Loading...</h4>
        }
      >
        <div className="">
          {/* Cards */}
          <Cards data={trending} title={category}/>
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <h1 className="text-white text-xl font-bold">Loading</h1>
  );
};

export default Trending;
