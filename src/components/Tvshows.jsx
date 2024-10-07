import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import Cards from "./partials/Cards";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";


const Tvshows = () => {
      document.title = "MovieHub | Tv Shows";
    
      const navigate = useNavigate();
      const [tvshows, settvshows] = useState([]);
      const [category, setcategory] = useState("airing_today");
      const [page, setpage] = useState(1);
      const [hasMore, sethasMore] = useState(true);
    
      const GetTvshows = async () => {
        try {
          const { data } = await axios.get(`/tv/${category}?page=${page}`);
          // settvshows(data.results);
          if(data.results.length > 0) {
            settvshows((prevState) => [...prevState, ...data.results]);
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
        if(tvshows.length === 0){
          GetTvshows();
        }else{
          setpage(1);
          settvshows([]);
          GetTvshows();
        }
      }
    
      useEffect(() => {
        refreshHandler();
      }, [category]);
      // console.log(tvshows);

      return tvshows.length > 0 ? (
        <div className="w-screen h-screen text-white pverflow-hidden">
          <div className="tvshows-top w-full h-[10vh] flex items-center mb-6 px-10">
            <div className="w-[30%] text-4xl font-bold flex gap-4 items-center ">
            <i onClick={()=>navigate(-1)} className="text-xl ri-arrow-left-fill hover:text-[#6556CD] hover:cursor-pointer"></i>
              TV Shows -<span className="text-xl mt-2 text-zinc-500">{category.toUpperCase()}</span>
            </div>
            <div className="w-[70%] flex items-center justify-between gap-2 ">
              <Topnav />
              <Dropdown
                title={category.toUpperCase()}
                options={["now_playing", "popular", "upcoming", "top_rated"]}
                func={(e) => setcategory(e.target.value)}
              />
            </div>
          </div>
    
          <InfiniteScroll
            dataLength={tvshows.length}
            next={GetTvshows}
            hasMore={true}
            loader={
              <h4 className="text-white text-2xl font-semibold">Loading...</h4>
            }
          >
            <div className="">
              {/* Cards */}
              <Cards data={tvshows} title='tv'/>
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <h1 className="text-white text-xl font-bold">Loading</h1>
      );
}
export default Tvshows;
