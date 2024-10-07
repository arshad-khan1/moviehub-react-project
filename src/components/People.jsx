import React, { useEffect, useState } from "react";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import Cards from "./partials/Cards";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";


const People = () => {
      document.title = "MovieHub | Stars";
    
      const navigate = useNavigate();
      const [people, setpeople] = useState([]);
      const [page, setpage] = useState(1);
      const [hasMore, sethasMore] = useState(true);
    
      const GetPeople = async () => {
        try {
          const { data } = await axios.get(`/person/popular?page=${page}`);
          // setpeople(data.results);
          if(data.results.length > 0) {
            setpeople((prevState) => [...prevState, ...data.results]);
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
        if(people.length === 0){
          GetPeople();
        }else{
          setpage(1);
          setpeople([]);
          GetPeople();
        }
      }
    
      useEffect(() => {
        refreshHandler();
      }, []);
      // console.log(people);

      return people.length > 0 ? (
        <div className="w-screen h-screen text-white pverflow-hidden">
          <div className="people-top w-full h-[10vh] flex items-center mb-6 px-10">
            <div className="w-[30%] text-4xl font-bold flex gap-4 items-center ">
            <i onClick={()=>navigate(-1)} className="text-xl ri-arrow-left-fill hover:text-[#6556CD] hover:cursor-pointer"></i>
              Stars
            </div>
            <div className="w-[70%] -ml-20 flex items-center justify-between gap-2 ">
              <Topnav title='people '/>
            </div>
          </div>
    
          <InfiniteScroll
            dataLength={people.length}
            next={GetPeople}
            hasMore={true}
            loader={
              <h4 className="text-white text-2xl font-semibold">Loading...</h4>
            }
          >
            <div className="">
              {/* Cards */}
              <Cards data={people} title='people'/>
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <h1 className="text-white text-xl font-bold">Loading</h1>
      );
}
export default People;
