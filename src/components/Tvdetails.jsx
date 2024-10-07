import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import HorizontalCards from "./partials/HorizontalCards";
import Casts from "./partials/Casts";
import nophoto from "/nophoto.jpg";

const Tvdetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // data jo aara hai vo route ke zariye aa raha hai to usko useParams se hum le sakte hai
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div className=" text-white bg-[#1F1E24]">
      {/*From nav to available to buy .... created to give background poster of moive */}
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.8), rgba(0,0,0,1)), url(https://image.tmdb.org/t/p/original/${
            info.detail.backdrop_path || info.detail.profile_path
          })`,
          backgroundPosition: "top 10%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="px-32 bg-fixed"
      >
        {/*Top Nav bar */}
        <div className="top h-[15vh] flex items-center gap-12 text-2xl">
          <Link
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line"
          ></Link>

          <a
            target="_blank"
            href={`${info.detail.homepage}`}
            className="ri-external-link-fill"
          >
          </a>
          <a target="_blank" href={``} className="ri-earth-line"></a>
          <a target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}>
            imdb
          </a>
        </div>
        {/* //Middle left part i.e. Poster */}
        <div className="middle relative flex items-start justify-between mx-32  gap-20">
          <div className="middle-left">
            <img
              className="max-w-[40vh] max-h-[90vh] bg-zinc-700 shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] object-cover object-center"
              src={`https://image.tmdb.org/t/p/original/${
                info.detail.poster_path || info.detail.backdrop_path
                  ? info.detail.poster_path || info.detail.backdrop_path
                  : nophoto
              }`}
              alt=""
            />
          </div>

          {/* //Middle right part i.e. Info */}
          <div className="middle-right flex flex-col gap-5 mt-5">
            {/* Ratings Circle on poster top*/}
            {(info.detail.vote_average * 10).toFixed() != 0 && (
              <span>
                <div className="absolute -top-[4%] left-[24%] w-[6.5vh] h-[6.5vh] text-2xl font-semibold rounded-full bg-[#6556CD] border-2 border-[#231e47] p-3 flex items-center justify-center ">
                  {(info.detail.vote_average * 10).toFixed()}
                  <sup className="text-xs">%</sup>
                </div>
              </span>
            )}

            {/* Header pasted */}
            <h1 className="text-white text-6xl font-bold tracking-tight ">
              {info.detail.name ||
                info.detail.title ||
                info.detail.original_title}
            </h1>

            {/* Tagline */}
            <h4 className="text-xl font-thin -mt-2">{info.detail.tagline}</h4>

            {/* Genres */}
            <h3 className="text-2xl text-white font-semibold">
              {info.detail.genres.map((g) => g.name).join(", ")}
            </h3>

            <div className="flex gap-5 items-center text-white text-xl font-semibold">
              {/*Launch Year*/}
              <span className="font-semibold">
                <span className="text-[#6556CD]">Year : </span>{" "}
                {info.detail.first_air_date.slice(0, 4)}
              </span>{" "}
              {/*Seasons*/}
              <span className="font-semibold">
                <span className="text-[#6556CD] ">Seasons : </span>
                {info.detail.seasons.length === 1
                  ? 1
                  : info.detail.seasons.length - 1}
              </span>{" "}
            </div>

            <p className="w-[80%] text-white text-lg font-normal tracking-wide max-h-[18vh] overflow-hidden text-ellipsis">
              {info.detail.overview}
            </p>

            <div className="flex gap-5 mt-1">
              <Link
                to={`/tv/details/${id}/trailer`}
                className="w-fit px-3 py-2 text-md font-semibold text-white border-2 border-[#6556CD] bg-[#6556CD] rounded-lg hover:border-white hover:bg-white hover:text-[#6556CD] duration-600"
              >
                <i className=" mr-1 ri-play-mini-fill"></i>
                Watch Trailer
              </Link>
            </div>
          </div>
        </div>

        {/*CTA Div Bottom Div*/}
        <div className="bottom mt-10 ml-[10%] pb-5">
          {/*Available on Platform*/}
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-10 items-center my-5">
              <h2 className="w-[13%] font-semibold text-lg ">
                Available on Platform
              </h2>
              {info.watchproviders.flatrate.map((f, i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-col gap-1 justify-center items-center"
                  >
                    <img
                      className="w-10 h-10 rounded-md "
                      src={`https://image.tmdb.org/t/p/original/${f.logo_path}`}
                      alt=""
                    />
                    <h3>{f.provider_name}</h3>
                  </div>
                );
              })}
            </div>
          )}

          {/*Available on Rent*/}
          {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-10 items-center my-5">
              <h2 className="w-[13%] font-semibold text-lg ">
                Available on Rent
              </h2>
              {info.watchproviders.rent.map((r) => {
                return (
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <img
                      className="w-10 h-10 rounded-md "
                      src={`https://image.tmdb.org/t/p/original/${r.logo_path}`}
                      alt=""
                    />
                    <h3>{r.provider_name}</h3>
                  </div>
                );
              })}
            </div>
          )}

          {/*Available to Buy*/}
          {info.watchproviders && info.watchproviders.buy && (
            <div className="flex gap-10 items-center my-5">
              <h2 className="w-[13%] font-semibold text-lg ">
                Available to Buy
              </h2>
              {info.watchproviders.buy.map((b) => {
                return (
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <img
                      className="w-10 h-10 rounded-md "
                      src={`https://image.tmdb.org/t/p/original/${b.logo_path}`}
                      alt=""
                    />
                    <h3>{b.provider_name}</h3>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Seasons horizontalcard scroll */}
        {info.detail.seasons.length > 1 && (
          <div className="pb-1">
            <h1 className="text-4xl font-semibold pt-9 pb-5 ml-5">Seasons</h1>
            <HorizontalCards data={info.detail.seasons} width="min-w-[13%]" />
          </div>
        )}
      </div>

      {/* Top Casts Section  */}
      <div className=" px-20 pb-3">
        <h1 className="text-4xl font-semibold pt-9 pb-5 ml-5">Top Casts</h1>
        <div>
          <Casts data={info.credits.cast} title="people" />
        </div>
      </div>

      {/* Recommended tvs === Agar Recommended hai to vo dikhao nhi to similar tvs dikha do*/}

      <div className=" px-20 pb-3">
        <h1 className="text-4xl font-semibold pt-9 pb-5 ml-5">
          Recommended TV Shows
        </h1>
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
          width={"min-w-[14%]"}
        />
      </div>

      <Outlet />
    </div>
  ) : (
    <h1 className="text-white text-4xl font-bold">Loading</h1>
  );
};

export default Tvdetails;
