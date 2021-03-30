import Axios from "axios";

/**
 * Get all the profiles
 */

export const getProfiles = async () => {
    const res = await Axios.get(`http://127.0.0.1:8000/api/profiles`);
    return res.data;
};

/**
 * Get a specific profile
 */

export const getProfile = async (id) => {
    //return id;
    const res = await Axios.get(`http://127.0.0.1:8000/api/profiles/${id}`);
    return res.data;
};

/**
 * Update a specific profile
 */

export const updateProfile = async (id, data) => {
    const res = await Axios.put(
        `http://127.0.0.1:8000/api/profiles/${id}`,
        data
    );
    return res.data;
};

/**
 * Get all the profiles but customized
 */

export const customizedProfile = async (data) => {
    const res = await Axios.post(
        "http://127.0.0.1:8000/api/profiles/all",
        data
    );
    return res.data;
};
