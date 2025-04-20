import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data, {
            withCredentials: true, // Nhận cookie refresh_token
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Lỗi server');
    }
};

export const SignupUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Lỗi server');
    }
};

export const getDetailsUser = async (id, access_token) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`, // Sửa header
            },
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Lỗi server');
    }
};

export const refreshToken = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, null, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Lỗi server');
    }
};

export const logoutUser = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`, null, {
            withCredentials: true, // Xóa cookie
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Lỗi server');
    }
};

export const updateUser = async (id, data, access_token) => {
    try {
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Lỗi server');
    }
};