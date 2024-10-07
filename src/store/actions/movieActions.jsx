export { removemovie } from "../reducers/movieSlice"; //import karke turant export kardo
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";

//action is to extract data from the api
export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
    const credits = await axios.get(`/movie/${id}/credits`);
    const translations = await axios.get(`/movie/${id}/translations`);
    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
      credits: credits.data,
      translations: translations.data,
    };

    dispatch(loadmovie(theultimatedetails));
    // console.log(theultimatedetails);
  } catch (error) {
    console.log("Error: ", error);
  }
};
