import axios from 'axios';

export const axiosJWT = axios.create();

// Interceptor để làm mới token
axiosJWT.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await refreshToken();
                const newAccessToken = res.access_token;
                localStorage.setItem('access_token', newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosJWT(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('access_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data, {
            withCredentials: true,
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
        if (!access_token) {
            throw new Error('Chưa đăng nhập');
        }
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log('Lỗi chi tiết:', error); // Debug
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        }
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
            withCredentials: true,
        });
        localStorage.removeItem('access_token'); // Xóa token khi đăng xuất
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