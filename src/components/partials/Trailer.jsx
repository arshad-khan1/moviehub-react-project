import { useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loading from "./Loading";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.9)] w-screen h-screen z-[100] flex items-center justify-center">
      <Link
        to=""
        onClick={() => navigate(-1)}
        className="absolute right-[8%] top-[3%] text-3xl ri-close-fill font-bold text-white hover:text-[#6556CD] hover:cursor-pointer z-[110]"
      ></Link>
      
      {ytvideo ? (
        <div className="relative w-[80%] h-[80%] flex items-center justify-center">
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loading />
            </div>
          )}
          <ReactPlayer
            controls
            height="100%"
            width="100%"
            onReady={() => setIsReady(true)}
            url={
              ytvideo.site === "YouTube"
                ? `https://www.youtube.com/watch?v=${ytvideo.key}`
                : `https://vimeo.com/${ytvideo.key}`
            }
            style={{ display: isReady ? "block" : "none" }}
          />
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-4">No Trailer Available</h1>
          <p className="text-zinc-400">Sorry, we couldn&apos;t find a video for this title.</p>
        </div>
      )}
    </div>
  );
};

export default Trailer;
