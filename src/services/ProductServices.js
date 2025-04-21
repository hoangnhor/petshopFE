import axios from "axios"
import { axiosJWT } from "./UserServices"

export const getAllProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/getall`)
    return res.data
}

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/product/create`, data)
    return res.data
}
export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-details/${id}`)
    return res.data
}
export const searchProduct = async (keyword) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/search?keyword=${encodeURIComponent(keyword)}`);
    return res.data;
};
export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}