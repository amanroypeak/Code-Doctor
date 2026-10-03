import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthConfig = (token) => {

    if (!token) {
        return {};
    }

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const registerUser = async (userDetails) => {

    const response = await axios.post(`${API_URL}/auth/register`, userDetails);

    return response.data;
};

export const loginUser = async (credentials) => {

    const response = await axios.post(`${API_URL}/auth/login`, credentials);

    return response.data;
};

export const scanProject = async (zipFile, token) => {

    const formData = new FormData();

    formData.append("project", zipFile);

    const config = getAuthConfig(token);

    const response = await axios.post(`${API_URL}/scan`, formData, config);

    return response.data;
};

export const getMyScans = async (token) => {

    const config = getAuthConfig(token);

    const response = await axios.get(`${API_URL}/scans`, config);

    return response.data;
};

export const getScanById = async (scanId, token) => {

    const config = getAuthConfig(token);

    const response = await axios.get(`${API_URL}/scans/${scanId}`, config);

    return response.data;
};