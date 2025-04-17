import React, { useState } from "react";
import { getItem } from "../../utils";
import {ProductOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from "antd";
import HeaderComponent from "../../components/HeaderComponents/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
const AdminPage= ()=>{
    //quanly nguoi dung
    const items=[
        getItem('Người Dùng','user',<UserOutlined /> ),
        //quan ly san pham
        getItem('Sản Phẩm','product',<ProductOutlined /> )
    ];
    const [keySelected,setKeySelected] = useState('')
    //ket noi vs adminuser 
    const renderPage=(key)=>{
        switch(key){
            case 'user':
                return(
                    <AdminUser/>
                )
                case 'product':
                return(
                    <AdminProduct/>
                )
                default:
                    return<></>
        }
       
    }


    const handleOnclick=({key})=>{
        setKeySelected(key)
    }
    console.log('keySelected',keySelected)
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{display:'flex'}}>
                <Menu 
                    mode='inline'
                   
                    style={{
                        width:'300px',
                        height:'100vh',
                        fontSize:20,
                        boxShadow:'1px 1px 2px #ccc'
                    }}
                    items={items}
                    onClick={handleOnclick}
                /> 
                <div style={{flex:1 , padding:'20px'}}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}
export default AdminPage    