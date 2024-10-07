import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import Cards from "./partials/Cards";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";


const Movies = () => {
      document.title = "MovieHub | Movies";
    
      const navigate = useNavigate();
      const [movies, setmovies] = useState([]);
      const [category, setcategory] = useState("top_rated");
      const [page, setpage] = useState(1);
      const [hasMore, sethasMore] = useState(true);
    
      const Getmovies = async () => {
        try {
          const { data } = await axios.get(`/movie/${category}?page=${page}`);
          // setmovies(data.results);
          if(data.results.length > 0) {
            setmovies((prevState) => [...prevState, ...data.results]);
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
        if(movies.length === 0){
          Getmovies();
        }else{
          setpage(1);
          setmovies([]);
          Getmovies();
        }
      }
    
      useEffect(() => {
        refreshHandler();
      }, [category]);
      // console.log(movies);

      return movies.length > 0 ? (
        <div className="w-screen h-screen text-white pverflow-hidden">
          <div className="movies-top w-full h-[10vh] flex items-center mb-6 px-10">
            <div className="w-[20%] text-4xl font-bold flex gap-4 items-center ">
            <Link onClick={()=>navigate(-1)} className="text-xl ri-arrow-left-fill hover:text-[#6556CD] hover:cursor-pointer"></Link>
              Movies -<span className="text-xl mt-2 text-zinc-500">{category.toUpperCase()}</span>
            </div>
            <div className="w-[80%] flex items-center justify-between gap-2 ">
              <Topnav />
              <Dropdown
                title={category.toUpperCase()}
                options={["now_playing", "popular", "upcoming", "top_rated"]}
                func={(e) => setcategory(e.target.value)}
              />
            </div>
          </div>
    
          <InfiniteScroll
            dataLength={movies.length}
            next={Getmovies}
            hasMore={hasMore}
            loader={
              <h4 className="text-white text-2xl font-semibold">Loading...</h4>
            }
          >
            <div className="">
              {/* Cards */}
              <Cards data={movies} title='movie'/>
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <h1 className="text-white text-xl font-bold">Loading</h1>
      );
}
export default Movies;
