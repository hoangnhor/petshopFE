import { Button, Col,Image, Input, InputNumber, Row} from "antd";
import React, { useState } from "react";
import imageProduct from "../../assets/images/sp.webp";
import imageProductSmall from "../../assets/images/spsmall.webp";
import imageProductSmall1 from "../../assets/images/spsmall1.webp";
import imageProductSmall2 from "../../assets/images/spsmall2.webp";
import imageProductSmall3 from "../../assets/images/spsmall3.webp";
import { PromotionList, QuantityWrapper, WeightWrapper, WrapperFeatureItem, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct } from "./style";
import  {PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const ProductDetailsComponenet=()=>{
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    const onChange =()=>{}
    return (
        <Row style={{padding:'16px',background:'#fff',borderRadius:'4px'}}>
            <Col span={10} style={{ borderRight:'1px solid #e5e5e5', paddingRight:'8px'}}> 
                <Image src={imageProduct} alt="image product" preview={false}/>
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProductSmall}  alt="image small" preview={false}/></WrapperStyleColImage>
                    <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProductSmall3}  alt="image small3" preview={false}/></WrapperStyleColImage>
                    <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProductSmall2}  alt="image small2" preview={false}/></WrapperStyleColImage>
                    <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProductSmall1}  alt="image small1" preview={false}/></WrapperStyleColImage>
                    <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProductSmall1}  alt="image small1" preview={false}/></WrapperStyleColImage>
                    <WrapperStyleColImage span={4}><WrapperStyleImageSmall src={imageProductSmall1}  alt="image small1" preview={false}/></WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14} style={{fontSize: '30px '}}>
                <WrapperStyleNameProduct>Bánh thưởng Catnip cho mèo</WrapperStyleNameProduct>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>29.000đ</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WeightWrapper>
                    <strong >Trọng lượng:</strong>
                    <Input value="40g" style={{ width: "80px", marginLeft: "20px" }} readOnly />
                </WeightWrapper>
                <QuantityWrapper>
                    <strong>Số lượng</strong>
                    <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                        <Button onClick={handleDecrease}>-</Button>
                        <Input
                            value={quantity}
                            style={{
                                width: "40px",
                                textAlign: "center",
                                margin: "0 5px",
                            }}
                            readOnly
                        />
                        <Button onClick={handleIncrease}>+</Button>
                    </div>
                </QuantityWrapper>
                <div style={{ display:'flex',alignItems:'center',gap:'12px'}}>
                    <ButtonComponent  
                        size={30}
                        type="primary" danger
                      
                        styleButton={{
                            height:'45px',
                            width:'180px',
                            border:'none',
                            borderRadius:'4px'
                        }}
                        textButton={'Mua ngay'}
                        styleTextButton={{color :'#fff'}}
                    ></ButtonComponent>
                     <ButtonComponent  
                       type="primary" style={{ backgroundColor: "#f56a00",
                        marginLeft: "10px",
                        
                            height:'45px',
                            width:'180px',
                            border:'none',
                            borderRadius:'4px'
                        
                     }}
                        textButton={'Thêm vào giỏ hàng'}
                        styleTextButton={{color :'#fff'}}
                    ></ButtonComponent>
                </div>
                <PromotionList>
                        <strong style={{fontWeight: '700',fontSize: '25px '}}>Ưu đãi dành riêng cho khách hàng đặt trước Online:</strong>
                    <WrapperFeatureItem> Giữ hàng tại Shop cho khách đặt hàng online</WrapperFeatureItem>
                    <WrapperFeatureItem> Giao hàng toàn quốc</WrapperFeatureItem>
                    <WrapperFeatureItem> Tư vấn miễn phí 24/7</WrapperFeatureItem>
                    <WrapperFeatureItem> Bảo hành nhanh chóng</WrapperFeatureItem>
                </PromotionList>
             </Col>
        </Row>
    )
}
export default ProductDetailsComponenet;