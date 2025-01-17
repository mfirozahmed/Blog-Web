import Axios from "axios";

/**
 * Get all the posts
 */

export const getPostList = async () => {
    const res = await Axios.get("http://127.0.0.1:8000/api/posts");
    return res.data;
};

/**
 * Get a specified post
 */

export const showPost = async (data) => {
    const res = await Axios.get(`http://127.0.0.1:8000/api/posts/${data}`);
    return res;
};

/**
 * Store a new post against a user
 */

export const storeNewPost = async (data) => {
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData != null) {
        const userData = JSON.parse(getLoginData);
        data.user_id = userData.user.id;
    }
    const res = await Axios.post("http://127.0.0.1:8000/api/posts", data);
    return res.data;
};

/**
 * Get all post of a logged in user
 */

export const getMyPostList = async () => {
    const getLoginData = localStorage.getItem("loginData");
    let id = "";
    if (getLoginData != null) {
        const userData = JSON.parse(getLoginData);
        id = userData.user.id;
    }
    //return id;
    const res = await Axios.get(`http://127.0.0.1:8000/api/posts/user/${id}`);
    return res.data;
};

/**
 * Get all post of a specific user
 */

export const getUserPostList = async (id) => {
    const res = await Axios.get(`http://127.0.0.1:8000/api/posts/user/${id}`);
    return res.data;
};

/**
 * Update a specific post
 */

export const updatePost = async (id, data) => {
    const res = await Axios.put(`http://127.0.0.1:8000/api/posts/${id}`, data);
    return res.data;
};

/**
 * Delete a specific post
 */

export const deletePost = async (id) => {
    //console.log("id", id);
    const res = await Axios.delete(`http://127.0.0.1:8000/api/posts/${id}`);
    return res.data;
};
