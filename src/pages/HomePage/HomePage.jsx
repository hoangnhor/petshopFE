import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTyperProduct } from "./style";
import SliderComponen from "../../components/SliderComponent/SliderComponen";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductServices from '../../services/ProductServices';
import { useQuery } from "@tanstack/react-query";
import FooterComponent from "../../components/FooterComponent/FooterComponent"; // Import FooterComponent

const HomePage = () => {
    // Hàm lấy tất cả sản phẩm từ API
    const fetchProductAll = async () => {
        const res = await ProductServices.getAllProduct();
        console.log('res', res);
        return res;
    };
    // Sử dụng react-query để quản lý trạng thái dữ liệu
    const { isLoading, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });

    return (
        <>
            {/* Phần thân chính với slider và danh sách sản phẩm */}
            <div className="body" style={{ width: '100%', backgroundColor: '#efefef' }}>
                <div id="container" style={{ height: '100%', width: '1300px', margin: '0 auto' }}>
                    <SliderComponen arrImages={[slider1, slider2, slider3]} />
                    <WrapperProducts>
                        {products?.data?.slice(0, 4).map((product) => (
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
                        ))}
                    </WrapperProducts>
                </div>
                {/* Sử dụng FooterComponent */}
                <FooterComponent />
            </div>
        </>
    );
};

export default HomePage;