import { axiosJWT } from "./UserServices";

export const getAllProduct = async () => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/product/getall`);
    return res.data;
};

export const createProduct = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const getDetailsProduct = async (id) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`);
    return res.data;
};

export const searchProduct = async (keyword) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/product/search?keyword=${encodeURIComponent(keyword)}`);
    return res.data;
};

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};