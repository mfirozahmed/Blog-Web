import Axios from "axios";

export const getProfiles = async () => {
    const res = await Axios.get(`http://127.0.0.1:8000/api/profiles`);
    return res.data;
};

export const getProfile = async (id) => {
    //return id;
    const res = await Axios.get(`http://127.0.0.1:8000/api/profiles/${id}`);
    return res.data;
};

export const updateProfile = async (id, data) => {
    const res = await Axios.put(
        `http://127.0.0.1:8000/api/profiles/${id}`,
        data
    );
    return res.data;
};
