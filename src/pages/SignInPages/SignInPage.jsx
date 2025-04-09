import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextlight } from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imagelogo from "../../assets/images/signIn.webp"
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import {  useFetcher, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as UserSevices from '../../services/UserSevices'
import { useMutationHook } from "../../hooks/useMutationHook";
import  *  as message from '../../components/Message/Message'
import Loading from "../../components/LoadingComponent/Loading";

import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlider";


const SignInPage=()=>{
    
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const dispatch =useDispatch();
    
    const navigate= useNavigate()


    const mutation = useMutationHook(
        data => UserSevices.loginUser(data)
      )
      const {data, isPending ,isSuccess}=mutation  
    
      useEffect(()=>{
        if(isSuccess){
             navigate('/')
            localStorage.setItem('access_token',JSON.stringify(data?.access_token))
            if(data?.access_token){
                const decoded= jwtDecode(data?.access_token)
                console.log('decode',decoded)
                if(decoded?.id){
                    handleGetDetailsUser(decoded?.id,data?.access_token)
                }
            }
        }
      },[isSuccess])

      const handleGetDetailsUser= async(id,token)=>{
        const res=await UserSevices.getDetailsUser(id,token)
        dispatch(updateUser({...res?.data,access_token:token}))
      }


        console.log('mutation',mutation)

    const handleNavigateSignUp =()=>{
        navigate('/sign-up')
    }
    const handleOnchangeEmmail =(value)=>{
        setEmail(value)
    }
    const handleOnchangePassword =(value)=>{
        setPassword(value)
    }
    const handleSignIn =()=>{
        mutation.mutate({
            email,
            password
        })

    }
    return (
       <div style={{display:'flex',alignItems:'center',justifyContent:'center',background:'rgb(0,0,0,0.53)',height:'100vh'}}>
            <div style={{width:'1100px',height:'500px',borderRadius:'6px',background:'#fff',display:'flex'}}>      
                <WrapperContainerLeft>
                    <h1>Xin Chào</h1>
                    <p style={{fontSize:'18px'}}>Đăng Nhâp và tạo tài khoản</p>
                    <InputFormComponent style={{marginBottom:'30px'}} placeholder='Email' 
                    value={email} onChange={handleOnchangeEmmail}/>
                    <div style={{position:'relative'}}>

                        <span 
                        onClick={()=>setIsShowPassword(!isShowPassword)}
                        style={{
                            
                            zIndex:10,
                            position:'absolute',
                            top:'4px',
                            right:'8px',
                        }}
                        >{
                            isShowPassword ? (
                                <EyeFilled/>
                            ):(
                                <EyeInvisibleFilled/>
                            )
                        }
                        </span>
                    <InputFormComponent placeholder='Mật khẩu' type={ isShowPassword ? "text":"password"} 
                    value={password} onChange={handleOnchangePassword}/>
                    </div>  
                
                    {data?.status ==='err' && <span style={{color:'red'}}>{data?.message}</span>}  
                    <Loading isPending ={mutation.isPending  }>       
                    <ButtonComponent  
                         disabled={!email.length || !password.length}
                        onClick={handleSignIn}
                         size={30}
                        type="primary" danger
                        
                        styleButton={{
                            height:'45px',
                            width:'200px',
                            border:'none',
                            borderRadius:'4px',
                            margin:'30px 120px 30px',
                            
                        }}
                        textButton={'Đăng nhập'}
                        styleTextButton={{color :'#fff', fontSize:'17px',fontWeight:'700'}}
                    ></ButtonComponent>
                </Loading>
                    <WrapperTextlight>Quên mật khẩu?</WrapperTextlight>
                    <p style={{fontSize:'20px'}}>Chưa có tài khoản? <WrapperTextlight onClick={handleNavigateSignUp}> Tạo tài khoản</WrapperTextlight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                   <Image src={imagelogo} preview={false} alt=" image-logo"  height='203' width='203'
                   
                   />
                </WrapperContainerRight>  
            </div>
        </div>
    )
}
export default SignInPage;