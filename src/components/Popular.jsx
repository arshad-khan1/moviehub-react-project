import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import Cards from "./partials/Cards";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";


const Popular = () => {
      document.title = "MovieHub | Popular";
    
      const navigate = useNavigate();
      const [popular, setpopular] = useState([]);
      const [category, setcategory] = useState("movie");
      const [page, setpage] = useState(1);
      const [hasMore, sethasMore] = useState(true);
    
      const GetPopular = async () => {
        try {
          const { data } = await axios.get(`/${category}/popular?page=${page}`);
          // setpopular(data.results);
          if(data.results.length > 0) {
            setpopular((prevState) => [...prevState, ...data.results]);
            setpage(page + 1);
          }
          else{
            sethasMore(false);
          }
          // console.log(data);
        } catch (error) {
          console.log("Error: ", error);
        }
      };
    
      const refreshHandler = () => {
        if(popular.length === 0){
          GetPopular();
        }else{
          setpage(1);
          setpopular([]);
          GetPopular();
        }
      }
    
      useEffect(() => {
        refreshHandler();
      }, [category]);
      // console.log(popular);

      return popular.length > 0 ? (
        <div className="w-screen h-screen text-white pverflow-hidden">
          <div className="popular-top w-full h-[10vh] flex items-center mb-6 px-10">
            <div className="w-[20%] text-4xl font-bold flex gap-4 items-center ">
              <i onClick={()=>navigate(-1)} className="text-xl ri-arrow-left-fill hover:text-[#6556CD] hover:cursor-pointer"></i>
              Popular - {category.toUpperCase()}
            </div>
            <div className="w-[80%] flex items-center justify-between gap-2 ">
              <Topnav />
              <Dropdown
                title={"Category"}
                options={["tv", "movie"]}
                func={(e) => setcategory(e.target.value)}
              />
            </div>
          </div>
    
          <InfiniteScroll
            dataLength={popular.length}
            next={GetPopular}
            hasMore={true}
            loader={
              <h4 className="text-white text-2xl font-semibold">Loading...</h4>
            }
          >
            <div className="">
              {/* Cards */}
              <Cards data={popular} title={category}/>
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <h1 className="text-white text-xl font-bold">Loading</h1>
      );
}
export default Popular;
