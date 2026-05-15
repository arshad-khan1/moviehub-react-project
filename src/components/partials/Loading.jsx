import React from "react";
import loading from "/loading.gif";

const Loading = () => {
    return (
        <div className="w-full h-full flex justify-center items-center bg-[#1F1E24]">
            <img className="h-[50%] object-cover" src={loading} alt="Loading..." />
        </div>
    );
};

export default Loading;

