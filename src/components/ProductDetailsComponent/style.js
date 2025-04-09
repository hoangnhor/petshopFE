import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall =styled(Image)`
    height:64px;
    width:64px
`
export const WrapperStyleColImage =styled(Col)`
    flex-basics: unset;
    display:flex;
 `
 export const WrapperStyleNameProduct =styled.h1`
    color: #333;
  font-size: 28px; 
  font-weight: 500;
  margin: 10px 0; 
  text-transform: uppercase;
 `
 export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius:4px;
`
export const WeightWrapper = styled.div`
     display: flex;
  align-items: center;
  gap: 15px; 
  margin: 20px 0;
  font-size: 18px; 
`
 export const WrapperPriceTextProduct = styled.div`
    color: #ef4c9b;
  font-size: 28px; /* Đồng nhất với tên */
  font-weight: 600;
  margin: 10px 0;
  padding: 10px;
 `
export const PromotionList = styled.div`
      margin-top: 20px;
        padding-left: 20px;
  `
export const WrapperFeatureItem = styled.div`
    margin: 10px 0; /* Tăng khoảng cách giữa các mục */
  font-size: 18px;
  color: #333;
  &:before {
    content: "✓ ";
    color: #28a745; /* Icon màu xanh */
    font-weight: bold;
  }
`
export const QuantityWrapper = styled.div`
     display: flex;
  align-items: center;
  gap: 10px; 
  margin: 20px 0;
  font-size: 18px;
`