import React, { useEffect } from "react";
import {useState} from "react";
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserServices from '../../services/UserServices'
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { Button, Upload } from "antd";
import { updateUser } from "../../redux/slides/userSlider";
import  *  as message from '../../components/Message/Message'
import {UploadOutlined} from '@ant-design/icons'
import { getBase64 } from "../../utils";



const ProfilePage=()=>{

    const user = useSelector(( state) => state.user)
    const [email, setEmail]=useState('')
    const [name, setName]=useState('')
    const [phone, setPhone]=useState('')
    const [address, setAddress]=useState('')
    const [avatar, setAvatar]=useState('')

    const mutation = useMutationHook(
        (data)=>{
            const{id,access_token,...rests}=data
            UserServices.updateUser(id,rests,access_token)
        }
    )
    
    const dispatch = useDispatch()
    const {data , isPending, isSuccess, isError}= mutation;
    



    useEffect(()=>{
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    },[user])

    useEffect(()=>{
        if(isSuccess){
            message.success()
            handleGetDetailsUser(user?.id,user?.access_token)
           }else if(isError){
            message.error()
           }
    },[isSuccess,isError])
    const handleGetDetailsUser= async(id,token)=>{
        const res=await UserServices.getDetailsUser(id,token)
        dispatch(updateUser({...res?.data,access_token:token}))
      }

    

    const handleOnchangeEmmail =(value)=>{  
        setEmail(value)  
    }
    const handleOnchangeName =(value)=>{    
        setName(value)  
    }
    const handleOnchangePhone =(value)=>{    
        setPhone(value)  
    }
    const handleOnchangeAddress =(value)=>{   
        setAddress(value)   
    }
    const handleOnchangeAvatar =async({fileList})=>{    
        const file=fileList[0] 
        if(!file.url && !file.preview){
            file.preview=await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }
    const handleUpdate = ()=>{
        mutation.mutate({ id:user?.id ,email,name,phone,address,avatar,access_token:user?.access_token})
      
    }

    return(
        <div style={{width:'1300px', margin:'0 auto' , height:'500px'}}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Loading isPending={isPending}>
            <WrapperContentProfile>
                <WrapperInput>
                <WrapperLabel htmlFor="name">Name:</WrapperLabel>
                <InputFormComponent style={{width:'300px'}} id="name" value={name} onChange={handleOnchangeName}/>
                <ButtonComponent  
                        
                        onClick={handleUpdate}
                         size={30}
                        styleButton={{
                            height:'45px',
                            width:'fit-content',
                            border:'1px solid #F4C6CF',
                            borderRadius:'4px',
                        }}
                        textButton={'cập nhật  '}
                        styleTextButton={{color :'rgb(236, 11, 109)', fontSize:'17px',fontWeight:'700'}}
                    ></ButtonComponent>
                </WrapperInput >
                <WrapperInput>
                <WrapperLabel htmlFor="email">Email:</WrapperLabel>
                <InputFormComponent style={{width:'300px'}} id="email" value={email} onChange={handleOnchangeEmmail}/>
                <ButtonComponent  
                        
                        onClick={handleUpdate}
                         size={30}
                        styleButton={{
                            height:'45px',
                            width:'fit-content',
                            border:'1px solid #F4C6CF',
                            borderRadius:'4px',
                        }}
                        textButton={'cập nhật  '}
                        styleTextButton={{color :'rgb(236, 11, 109)', fontSize:'17px',fontWeight:'700'}}
                    ></ButtonComponent>
                </WrapperInput >
                <WrapperInput>
                <WrapperLabel htmlFor="phone">Phone:</WrapperLabel>
                <InputFormComponent style={{width:'300px'}} id="phone" value={phone} onChange={handleOnchangePhone}/>
                <ButtonComponent  
                        
                        onClick={handleUpdate}
                         size={30}
                        styleButton={{
                            height:'45px',
                            width:'fit-content',
                            border:'1px solid #F4C6CF',
                            borderRadius:'4px',
                        }}
                        textButton={'cập nhật  '}
                        styleTextButton={{color :'rgb(236, 11, 109)', fontSize:'17px',fontWeight:'700'}}
                    ></ButtonComponent>
                </WrapperInput >
                <WrapperInput>
                <WrapperLabel htmlFor="address">Address:</WrapperLabel>
                <InputFormComponent style={{width:'300px'}} id="address" value={address} onChange={handleOnchangeAddress}/>
                <ButtonComponent  
                        
                        onClick={handleUpdate}
                         size={30}
                        styleButton={{
                            height:'45px',
                            width:'fit-content',
                            border:'1px solid #F4C6CF',
                            borderRadius:'4px',
                        }}
                        textButton={'cập nhật  '}
                        styleTextButton={{color :'rgb(236, 11, 109)', fontSize:'17px',fontWeight:'700'}}
                    ></ButtonComponent>
                </WrapperInput >
                <WrapperInput>
                <WrapperLabel htmlFor="avatar">Avatar:</WrapperLabel>
                <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                        <Button icon={<UploadOutlined/>}> chọn file</Button>
                </WrapperUploadFile>
                {avatar &&(
                    <img src={avatar} style={{
                        height:'60px',
                        width:'60px',
                        borderRadius:'50%',
                        objectFit:'cover'
                    }} alt="avatar"/>
                )}
                {/* <InputFormComponent style={{width:'300px'}} id="avatar" value={avatar} onChange={handleOnchangeAvatar}/> */}
                <ButtonComponent  
                        
                        onClick={handleUpdate}
                         size={30}
                        styleButton={{
                            height:'45px',
                            width:'fit-content',
                            border:'1px solid #F4C6CF',
                            borderRadius:'4px',
                        }}
                        textButton={'cập nhật  '}
                        styleTextButton={{color :'rgb(236, 11, 109)', fontSize:'17px',fontWeight:'700'}}
                    ></ButtonComponent>
                </WrapperInput >
            </WrapperContentProfile>
            </Loading>
        </div>
    )
}
export default ProfilePage