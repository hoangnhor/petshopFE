import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextlight } from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imagelogo from "../../assets/images/signIn.webp"
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserSevices from '../../services/UserSevices'
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import  *  as message from '../../components/Message/Message'

const SignUpPage=()=>{
    const [isShowPassword,setIsShowPassword] = useState(false);
    const [isShowConFirmPassword,setIsShowConFirmPassword] = useState(false);
    const navigate= useNavigate()
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const handleOnchangeEmmail =(value)=>{
        setEmail(value)
    }
    const handleOnchangePassword =(value)=>{
        setPassword(value)
    }
    const handleOnchangeConfirmPassword =(value)=>{
        setConfirmPassword(value)
    }

    const mutation = useMutationHook(
        data => UserSevices.SignupUser(data)
      )
      const {data, isPending,isSuccess,isError }=mutation  

      useEffect(()=>{
        if(isSuccess){
            message.success()
            handleNavigateSignIn()
        }else if(isError){
            message.error()
        }
      },[isSuccess,isError])

    const handleNavigateSignIn =()=>{
        navigate('/sign-in')
    }

    const handleSignUp =()=>{
        mutation.mutate({email,password,confirmPassword})
    }

    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',background:'rgb(0,0,0,0.53)',height:'100vh'}}>
            <div style={{width:'1100px',height:'500px',borderRadius:'6px',background:'#fff',display:'flex'}}>      
                <WrapperContainerLeft>
                    <h1>Đăng Ký</h1>
                    <p>Vui lòng nhập nội dung bên dưới để tạo tài khoản</p>
                    <InputFormComponent style={{marginBottom:'30px'}} placeholder='Email' value={email} onChange={handleOnchangeEmmail} />
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
                    <InputFormComponent style={{marginBottom:'30px'}} placeholder='Mật khẩu' type={ isShowPassword ? "text":"password"}
                    value={password} onChange={handleOnchangePassword}/>
                    </div>        
                    <div style={{position:'relative'}}>
                        <span
                        onClick={()=>setIsShowConFirmPassword(!isShowConFirmPassword)}
                        style={{
                            zIndex:10,
                            position:'absolute',
                            top:'4px',
                            right:'8px',
                        }}
                        >{
                            isShowConFirmPassword ? (
                                <EyeFilled/>
                            ):(
                                <EyeInvisibleFilled/>
                            )
                        }
                        </span>
                    <InputFormComponent placeholder='Nhập lại mật khẩu' type={ isShowConFirmPassword ? "text":"password"}
                    value={confirmPassword} onChange={handleOnchangeConfirmPassword}/>
                    </div>   
                    {data?.status ==='err' && <span style={{color:'red'}}>{data?.message}</span>}   
                    <Loading isPending={mutation.isPending}>
                    <ButtonComponent  
                        disabled={!email.length || !password.length || !confirmPassword.length}
                        onClick={handleSignUp}
                        size={30}
                        type="primary" danger
                        
                        styleButton={{
                            height:'45px',
                            width:'200px',
                            border:'none',
                            borderRadius:'4px',
                            margin:'30px 120px 30px',
                            
                        }}
                        textButton={'Đăng Ký'}
                        styleTextButton={{color :'#fff', fontSize:'17px',fontWeight:'700'}}
                    ></ButtonComponent>
                    </Loading>
                    <p style={{fontSize:'20px'}}>Bạn đã có tài khoản? <WrapperTextlight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextlight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                   <Image src={imagelogo} preview={false} alt=" image-logo"  height='203' width='203'
                   
                   />
                </WrapperContainerRight>  
            </div>
        </div>
    )
}
export default SignUpPage;
