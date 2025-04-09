import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle=styled(Card)`
    width:200px;
    & img{
        height:300px;
        width:200px;
    }

`
export const StyledNameProduct =styled.div`
   margin: 0;
    height: 35px;
    overflow: hidden;
    margin-bottom: 5px;
    font-size: 16px;
    color: #333333;
    line-height: 1.2;
    font-weight:400px;
`

export const WrapperPriceText=styled.div`
    font-size: 25px;
    color: #ef4c9b;
    font-weight: bold;
    display: inline-block;
    margin-right: 5px;
    font-weight:500px
    margin:6px 0 4px;
`
export const WrapperDiscountText=styled.span`
    color:#858585;
    font-size:15px;
    font-weight:500px;
    
`