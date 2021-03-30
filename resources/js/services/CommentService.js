import Axios from "axios";

/**
 * Add new comment using the data from the request
 */
export const storeNewComment = async (data) => {
    const res = await Axios.post("http://127.0.0.1:8000/api/comments", data);
    return res.data;
};
