import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { StyledNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from "./style";
import {StarFilled}from '@ant-design/icons'
const CardComponent=(props)=>{
    const {countInStock,image,name,price,description,type,selled,discount}=props
    
    return (
        <WrapperCardStyle
        hoverable
        style={{ width: 300 }}
        bodyStyle={{ padding: "20px" }}
        cover={
            <img 
                alt={name || "Product"} 
                src={image || "https://via.placeholder.com/300"} 
                style={{
                    width: "100%",
                    height: "280px",
                    objectFit: "cover",
                    borderRadius: "6px",
                }}
            />
        }
    >
        <StyledNameProduct>{name}</StyledNameProduct>
         <WrapperPriceText>
            <span style={{marginRight:'20px'}}>{price}</span>
        <WrapperDiscountText>{discount || 5} %</WrapperDiscountText>
         </WrapperPriceText>
         
    </WrapperCardStyle>
    
    )
}
export default CardComponent;