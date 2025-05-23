import { Image } from "antd";
import React from "react";
import { WrapperSliderStyle } from "./style";



//baner
const SliderComponen =({arrImages})=>{
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1500
      };
    return (
        <WrapperSliderStyle {...settings}>
            {arrImages.map((image)=>{
                return (
                    <Image key={image} src={image} alt="silder" preview={false} width="100%" height="500px" />
                )
            })}
        </WrapperSliderStyle>
    )
}
export default SliderComponen;