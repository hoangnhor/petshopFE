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

const HomePage = () => {
    const arr = ['Mua Đồ Cho Chó', 'Mua Đồ Cho Mèo', 'Dịch Vụ', 'Khuyến mãi', 'Tin tức', 'Liên Hệ'];

    const fetchProductAll = async () => {
        const res = await ProductServices.getAllProduct();
        console.log('res', res);
        return res;
    };

    const { isLoading, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });

    return (
        <>
            <div style={{ padding: '0 120px' }}>
                <WrapperTyperProduct>
                    {arr.map((item) => (
                        <TypeProduct name={item} key={item} />
                    ))}
                </WrapperTyperProduct>
            </div>

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

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore
                            textButton="Xem Thêm "
                            type="outline"
                            styleButton={{
                                border: '5px solid',
                                color: '#fff',
                                background: '#de2967',
                                width: '150px',
                                height: '50px',
                                borderRadius: '4px',
                            }}
                            styleTextButton={{ fontWeight: 500 }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        width: "100%",
                        background: "#fff",
                        padding: "20px 0",
                        borderTop: "1px solid #ddd",
                        marginTop: "20px",
                    }}
                >
                    <div
                        style={{
                            width: "1300px",
                            margin: "0 auto",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "flex-start",
                            gap: "20px",
                        }}
                    >
                        {/* Cột Sitemap */}
                        <div>
                            <h3>Sitemap</h3>
                            {arr.map((item) => (
                                <p key={item}>
                                    <a
                                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                        style={{ color: "#333", textDecoration: "none" }}
                                    >
                                        {item}
                                    </a>
                                </p>
                            ))}
                        </div>

                        {/* Cột bản đồ */}
                        <div>
                            <h3>Bản đồ</h3>
                            <iframe
                                title="Pet Store Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.954410426466!2d106.67525181062004!3d10.737997189364297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1745177879295!5m2!1svi!2s"
                                width="300"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        {/* Cột Liên hệ */}
                        <div>
                            <h3>Liên hệ</h3>
                            <p>
                                Email: <a href="mailto:contact@petstore.com">contact@petstore.com</a>
                            </p>
                            <p>
                                Hotline: <a href="tel:+0123456789">0123 456 789</a>
                            </p>
                            <p>
                                Facebook:{" "}
                                <a
                                    href="https://facebook.com/petstore"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Pet Store
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
