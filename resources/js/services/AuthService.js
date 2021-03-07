import Axios from "axios";

/**
 * checkIfAuthenticated()
 *
 * Check if any route is authenticated or not
 */
export const checkIfAuthenticated = () => {
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData != null) {
        const data = JSON.parse(getLoginData);
        if (data.success && data.access_token !== null) {
            return data.user;
        }
        return false;
    }
    return false;
};

/**
 * registerUser()
 *
 * @param {object} data
 */
export const registerUser = async (data) => {
    const res = await Axios.post(
        "http://127.0.0.1:8000/api/auth/register",
        data
    );
    return res.data;
};

/**
 * loginUser()
 *
 * @param {object} data
 */
export const loginUser = async (data) => {
    const res = await Axios.post("http://127.0.0.1:8000/api/auth/login", data);
    return res.data;
};
