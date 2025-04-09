import React, { useEffect, useState } from "react";
import Search from "antd/es/transfer/search";
import { Badge, Button, Col, Popover } from 'antd';
import {WrapperHeader, WrapperTextHeader,WrapperHeaderAccout,WrapperTextHeaderSmail, WrapperContentPopup} from './style'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
}from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserSevices from '../../services/UserSevices'
import { resetUser } from "../../redux/slides/userSlider";
import Loading from "../LoadingComponent/Loading";



// header ten wb va thanh tim kiem , gio hang
const HeaderComponent=({isHiddenSearch=false, isHiddenCart=false})=>{
    const dispatch =useDispatch()
    const [userName,setUserName]=useState('')
    const [userAvatar,setUserAvatar]=useState('')
    const [loading,setLoading]=useState(false)

    const navigate =useNavigate()

    const user = useSelector(( state) => state.user)

    const handleNavigateLogin=()=>{
        navigate('/sign-in')
    }


        const handleLogout = async()=>{
            setLoading(true)
            await UserSevices.logoutUser()
            dispatch(resetUser())
            setLoading(false)
        }

        useEffect(()=>{
            setLoading(true)
            setUserName(user?.name)
            setUserAvatar(user?.avatar)
            setLoading(false)
        },[user?.name, user?.avatar])
    const content =(
        <div>
            
            <WrapperContentPopup onClick={()=>navigate('/profile-user')} >Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={()=>navigate('/system/admin')} >Quản Lý Hệ Thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={handleLogout}>Đăng Xuất</WrapperContentPopup>
            
            
        </div>
    );
        
    



    return (
        <div style={{ width:'100%', background:'#de8ebe',display:'flex',justifyContent:'center'}}>
            <WrapperHeader style={{justifyContent:isHiddenSearch && isHiddenSearch ? 'space-between':'unset'}} >
                <Col span={5}>
                <WrapperTextHeader>Snoop Dogg</WrapperTextHeader>
                </Col>
                {!isHiddenSearch &&(
                        <Col span={13}>
                            <ButtonInputSearch 
                            size="large"
                        
                            placeholder="Tìm kiếm sản phẩm..." 
                            textButton="Tìm Kiếm"
                            
                        // onSearch={onSearch}
                            
                        />
                        </Col>
                )}
                {/*  xử lý tk --------------*/ }
                <Col span={6} style={{display:'flex',gap:'54px' , alignItems:'center'}}>
                <Loading isPending={loading}>
                    <WrapperHeaderAccout>  
                        {userAvatar ?(
                            <img src={userAvatar} alt="avatar" style={{
                                height:'40px',
                                width:'40px',
                                borderRadius:'50%',
                                objectFit:'cover'
                            }}/>
                        ) : (
                            <UserOutlined style={{fontSize:'30px'}}/> 
                        )}                      
                           
                       {user?.access_token ? (
                        <>    
                            <Popover content={content} trigger="click" >
                            <div style={{cursor:'pointer' ,fontSize:'20px'}}>{ userName?.length ?  userName : user?.email  } </div>
                            </Popover>
                        </>
                       ) : (
                        <div onClick={handleNavigateLogin } style={{cursor:'pointer'}}>
                            <WrapperTextHeaderSmail > Đăng Nhập / Đăng Ký</WrapperTextHeaderSmail>
                            <div>
                            <WrapperTextHeaderSmail > Tài Khoản</WrapperTextHeaderSmail>
                             <CaretDownOutlined />
                            </div>
                        </div>
                       )}
                        
                    </WrapperHeaderAccout>
                </Loading>
                {/* xử lý giỏ hàng------------ */}
                {!isHiddenCart &&(
                    <div>
                    <Badge count={4} size="smail">
                        <ShoppingCartOutlined style={{fontSize:'40px',color:'#fff'}}/>
                    </Badge>
               
                    <WrapperTextHeaderSmail>Giỏ Hàng</WrapperTextHeaderSmail>
                    </div>
                )}
                    
                </Col>
            
            </WrapperHeader>
            
      </div>
    )
}
export default HeaderComponent;