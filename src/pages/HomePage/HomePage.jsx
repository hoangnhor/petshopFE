import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTyperProduct } from "./style";
import SliderComponen from "../../components/SliderComponent/SliderComponen";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductServices from '../../services/ProductServices'
import { useQuery } from "@tanstack/react-query";
const HomePage=()=>{
    const arr=['Mua Đồ Cho Chó','Mua Đồ Cho Mèo','Dịch Vụ', 'Khuyễn mãi','Tin tức','Liên Hệ']
    
    const fetchProductAll =async()=>{
       const res= await ProductServices.getAllProduct() 
       console.log('res',res)
       return res
    }
    const { isLoading, data:products } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
      });
    console.log('data',products)
    return (
        <>
            <div style={{padding:'0 120px'}}>
              < WrapperTyperProduct>
                  {arr.map((item)=>{
                          return(
                                <TypeProduct name={item} key={item}/>
                              ) 
                         })}
                 </WrapperTyperProduct>
            </div>
            <div className="body" style={{ width:'100%',backgroundColor:'#efefef'}}>
                <div id="container" style={{  height:'100%', width:'1300px' ,margin:'0 auto'}} >
                    
                    <SliderComponen   arrImages={[slider1,slider2,slider3]}/>

                    <WrapperProducts>
                        
                         {products?.data?.map((product)=>{
                            return(
                                <CardComponent 
                                key={product._id} 
                                countInStock={product.countInStock}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                description={product.description}
                                type={product.type}
                                discount={product.discount}
                                selled={product.selled}
                                />
                            )
                         })}
                        
                    </WrapperProducts>
                    <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'10px'}}>
                    <WrapperButtonMore textButton="Xem Thêm " type="outline" styleButton={{
                    border:'5px solid    ' ,color: '#fff',background: '#de2967',
                    width:'150px',height:'50px',boderRadius:'4px',
                    }}
                    styleTextButton={{fontWeight:500}}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomePage;