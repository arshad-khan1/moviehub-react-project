import axios from "../../utils/axios";
export { removeperson } from "../reducers/personSlice";
import { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getstate) => {
    try {
        const [detail, externalid, combinedCredits, tvCredits, movieCredits] =
            await Promise.all([
                axios.get(`/person/${id}`),
                axios.get(`/person/${id}/external_ids`),
                axios.get(`/person/${id}/combined_credits`),
                axios.get(`/person/${id}/tv_credits`),
                axios.get(`/person/${id}/movie_credits`),
            ]);

        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            combinedCredits: combinedCredits.data,
            movieCredits: movieCredits.data,
            tvCredits: tvCredits.data,
        };

        dispatch(loadperson(theultimatedetails));
    } catch (error) {
        console.log("Error: ", error);
    }
};

