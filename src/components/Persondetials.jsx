import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import Dropdown from "./partials/Dropdown";
import HorizontalCards from "./partials/HorizontalCards";
import nophoto from "/nophoto.jpg";

const Persondetials = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  console.log(info);
  console.log(nophoto);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="py-5 px-[15vw] bg-[#1F1E24]">
      {/*pt1: navbar for back button */}
      <div className="Nav h-[10vh] text-zinc-200 text-3xl font-bold pt-7 -ml-20">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line"
        ></Link>
      </div>

      {/* Main div */}
      <div className="main flex gap-20">
        {/* p2: left div for image and short info */}
        <div className="left w-[20%] flex flex-col items-start">
          <img
            className="w-[] rounded-md"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.profile_path ? info.detail.profile_path : { nophoto }
            }`}
            alt=""
          />
          <br className="border-b-2 border-white  py-2 " />
          <div className="socials text-zinc-200 flex gap-6 text-xl ">
            {info.externalid.wikidata_id != null && (
              <a
                target="_blank"
                href={`https://www.wikipedia.com/${info.externalid.wikidata_id}`}
                class="ri-earth-fill"
              ></a>
            )}
            {info.externalid.facebook_id != null && (
              <a
                target="_blank"
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                class="ri-facebook-fill"
              ></a>
            )}
            {info.externalid.instagram_id != null && (
              <a
                target="_blank"
                href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                class="ri-instagram-line"
              ></a>
            )}
            {info.externalid.twitter_id != null && (
              <a
                target="_blank"
                href={`https://twitter.com/${info.externalid.twitter_id}`}
                class="ri-twitter-x-fill"
              ></a>
            )}
          </div>
          <h3 className="text-3xl text-zinc-300 font-bold mt-4">
            Person's Info
          </h3>
          {/* know for */}
          <div className="text-zinc-300 mt-4">
            <h4 className="text-xl tracking-wide font-semibold">Known For</h4>
            <h4 className="text-lg">{info.detail.known_for_department}</h4>
          </div>

          {/* Gender */}
          {info.detail.gender != 0 && (
            <div className="text-zinc-300 mt-4">
              <h4 className="text-xl tracking-wide font-semibold">Gender</h4>
              <h4 className="text-lg">
                {info.detail.gender == 2 ? "Male" : "Female"}
              </h4>
            </div>
          )}

          {/* Birthday */}
          {info.detail.birthday !== null && (
            <div className="text-zinc-300 mt-4">
              <h4 className="text-xl tracking-wide font-semibold">Birthday</h4>
              <h4 className="text-lg">{info.detail.birthday}</h4>
            </div>
          )}

          {/* Deathday */}
          {info.detail.deathday != null && (
            <div className="text-zinc-300 mt-4">
              <h4 className="text-xl tracking-wide font-semibold">Deathday</h4>
              <h4 className="text-lg">{info.detail.deathday}</h4>
            </div>
          )}

          {/* place of birth */}
          {info.detail.place_of_birth != null && (
            <div className="text-zinc-300 mt-4">
              <h4 className="text-xl tracking-wide font-semibold">
                Place of Birth
              </h4>
              <h4 className="text-lg">{info.detail.place_of_birth}</h4>
            </div>
          )}
        </div>

        {/* p3: Right div for name, desc*/}
        <div className="w-[80%] right  text-zinc-300">
          <h1 className=" text-[80px] font-bold capitalize -mt-5">
            {info.detail.name}
          </h1>
          {info.detail.biography.length > 0 && (
            <div>
              <h4 className="text-2xl tracking-wide font-semibold">
                Biography
              </h4>
              <p className="w-[90%] text-lg font-normal mt-3 ">
                {info.detail.biography}
              </p>
            </div>
          )}

          {/* p4: cast in movies and tvshows  */}
          <div className="">
            <div className="flex justify-between items-center mt-5 ">
              <h1 className="text-2xl tracking-wide font-semibold ">
                Known For
              </h1>
              <Dropdown
                title="Select"
                options={["tv", "movie"]}
                func={(e) => setcategory(e.target.value)}
              />
            </div>
            {category === "movie" ? (
              info.movieCredits.cast.length > 0 ? (
                <HorizontalCards
                  data={info.movieCredits.cast}
                  width={"min-w-[22%]"}
                  title="movie"
                />
              ) : (
                <h1 className="text-2xl font-bold mt-20">No Movies</h1>
              )
            ) : info.tvCredits.cast.length > 0 ? (
              <HorizontalCards
                data={info.tvCredits.cast}
                width={"min-w-[22%]"}
                title="tv"
              />
            ) : (
              <h1 className="text-2xl font-bold mt-20">No TV Series</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-white text-4xl font-bold">Loading</h1>
  );
};

export default Persondetials;
