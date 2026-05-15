export { removetv } from "../reducers/tvSlice"; //import karke turant export kardo
import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";

//action is to extract data from the api
export const asyncloadtv = (id) => async (dispatch, getState) => {
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
            axios.get(`/tv/${id}`),
            axios.get(`/tv/${id}/external_ids`),
            axios.get(`/tv/${id}/recommendations`),
            axios.get(`/tv/${id}/similar`),
            axios.get(`/tv/${id}/videos`),
            axios.get(`/tv/${id}/watch/providers`),
            axios.get(`/tv/${id}/credits`),
            axios.get(`/tv/${id}/translations`),
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

        dispatch(loadtv(theultimatedetails));
    } catch (error) {
        console.log("Error: ", error);
    }
};

