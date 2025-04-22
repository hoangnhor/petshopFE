import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultComponents from './components/DefaultComponents/DefaultComponents';
import { routes } from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import * as UserServices from './services/UserServices';
import { updateUser } from './redux/slides/userSlider';
import Loading from './components/LoadingComponent/Loading';
import { isJsonString } from './utils';

function ProtectedRoute({ children, isPrivate, isAdminRoute }) {
  const user = useSelector((state) => state.user);
  const access_token = localStorage.getItem('access_token');
  if (isPrivate && !access_token) {
    return <Navigate to="/login" />;
  }
  if (isAdminRoute && !user.isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  const dispatch = useDispatch();
  const [isPending, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      try {
        storageData = JSON.parse(storageData);
        decoded = jwtDecode(storageData);
        const currentTime = new Date().getTime() / 1000;
        if (decoded.exp < currentTime) {
          return { decoded: null, storageData: null };
        }
      } catch (error) {
        console.error('Token không hợp lệ:', error);
        return { decoded: null, storageData: null };
      }
    }
    return { decoded, storageData };
  };

  const handleGetDetailsUser = async (id, token) => {
    try {
      console.log('Gọi getDetailsUser với:', { id, token });
      const res = await UserServices.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
      console.error('Lỗi lấy thông tin người dùng:', error.message);
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      const { storageData, decoded } = handleDecoded();
      if (decoded?.id && storageData) {
        await handleGetDetailsUser(decoded.id, storageData);
      }
      setIsLoading(false);
    };
    fetchUserDetails();
  }, []);

  UserServices.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        try {
          const data = await UserServices.refreshToken();
          const newAccessToken = data?.access_token;
          localStorage.setItem('access_token', JSON.stringify(newAccessToken));
          config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        } catch (error) {
          console.error('Lỗi làm mới token:', error);
          localStorage.removeItem('access_token');
          window.location.href = '/login';
          throw error;
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  return (
    <div>
      <Loading isPending={isPending}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponents : Fragment;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <ProtectedRoute isPrivate={route.isPrivate} isAdminRoute={route.isAdmin}>
                      <Layout>
                        <Page />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}

export default App;