import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DefaultComponents from './components/DefaultComponents/DefaultComponents';
import { routes } from './routes';
import { useQuery } from '@tanstack/react-query';
import { Col } from 'antd';
import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserSevices from './services/UserSevices'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/slides/userSlider';
import Loading from './components/LoadingComponent/Loading';


 function App() {
    const dispatch=useDispatch();
    const [isPending ,setIsLoading]=useState(false)
    const user=useSelector((state)=>state.user)

  useEffect(()=>{
    setIsLoading(true)
        const {storageData,decoded} = handleDecoded()
        if(decoded?.id){
            handleGetDetailsUser(decoded?.id,storageData)
          }
          setIsLoading(false)
  },[])

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };
  


  UserSevices.axiosJWT.interceptors.request.use(async (config)=> {
    const currentTime =new Date()
    const {decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime() / 1000){
      const data = await UserSevices.refreshToken()
      config.headers['token'] =`Bearer ${data?.access_token} `
    }
   
    return config;
  }, (err)=> {
    return Promise.reject(err);
  });


  const handleGetDetailsUser= async(id,token)=>{
    const res=await UserSevices.getDetailsUser(id,token)
    dispatch(updateUser({...res?.data,access_token:token}))
   
  }





 return (
    <div>
      <Loading isPending={isPending} >
        <Router>
          <Routes>
            {routes.map((route)=>{
              const Page=route.page
              const ischeckAuth = !route.isPrivate || user.isAdmin 
              const Layout=route.isShowHeader ? DefaultComponents :Fragment
              return(
                <Route 
                key={route.path} 
                path={ischeckAuth ? route.path : undefined} 
                element={
                  <Layout>
                    <Page />
                  </Layout>   
              }
              />
              )
            })}  
          </Routes>
        </Router>
      </Loading>
    </div>
  )
};
export default App;
