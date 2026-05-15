export { removemovie } from "../reducers/movieSlice"; //import karke turant export kardo
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";

//action is to extract data from the api
export const asyncloadmovie = (id) => async (dispatch, getState) => {
    try {
        const [
            detail,
            externalid,
            recommendations,
            similar,
            videos,
            watchproviders,
            credits,
            translations,
        ] = await Promise.all([
            axios.get(`/movie/${id}`),
            axios.get(`/movie/${id}/external_ids`),
            axios.get(`/movie/${id}/recommendations`),
            axios.get(`/movie/${id}/similar`),
            axios.get(`/movie/${id}/videos`),
            axios.get(`/movie/${id}/watch/providers`),
            axios.get(`/movie/${id}/credits`),
            axios.get(`/movie/${id}/translations`),
        ]);

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
    } catch (error) {
        console.log("Error: ", error);
    }
};

