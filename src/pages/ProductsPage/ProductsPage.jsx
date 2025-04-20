import React, { Fragment, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import * as ProductServices from "../../services/ProductServices";
import { useQuery } from "@tanstack/react-query";

const ProductsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    const fetchProductAll = async () => {
        const res = await ProductServices.getAllProduct();
        return res;
    };

    const { isLoading, data: products } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
    });

    const onChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products?.data?.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = products?.data
        ? Math.ceil(products.data.length / productsPerPage)
        : 0;

    const arr = ['Mua Đồ Cho Chó', 'Mua Đồ Cho Mèo', 'Dịch Vụ', 'Khuyến mãi', 'Tin tức', 'Liên Hệ'];

    return (
        <Fragment>
            <div style={{ width: "100%", background: "#efefef" }}>
                <div style={{ width: "1400px", margin: "0 auto" }}>
                    <Row style={{ flexWrap: "nowrap", paddingTop: "10px" }}>
                        <WrapperNavbar span={4}>
                            <NavBarComponent />
                        </WrapperNavbar>
                        <Col span={20}>
                            <WrapperProducts>
                                {currentProducts?.map((product) => (
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
                            <Pagination
                                current={currentPage}
                                total={totalPages * 10}
                                pageSize={productsPerPage}
                                onChange={onChange}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "10px",
                                    marginBottom: "20px",
                                }}
                            />
                        </Col>
                    </Row>
                </div>

                <div style={{ width: "100%", background: "#fff", padding: "20px 0", borderTop: "1px solid #ddd" }}>
                    <div style={{ width: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-around", alignItems: "flex-start", gap: "20px" }}>
                        <div>
                            <h3>Sitemap</h3>
                            {arr.map((item) => (
                                <p key={item}>
                                    <a href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: "#333", textDecoration: "none" }}>
                                        {item}
                                    </a>
                                </p>
                            ))}
                        </div>
                        <div>
                            <h3>Bản đồ</h3>
                            <iframe
                                title="Pet Store Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.954410426466!2d106.67525181062004!3d10.737997189364297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVHLGsOG7nW5n IMSQ4bqhaS ho4buNYyBDw7RuZy buZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1745177879295!5m2!1svi!2s"
                                width="300"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div>
                            <h3>Liên hệ</h3>
                            <p>Email: <a href="mailto:contact@petstore.com">contact@petstore.com</a></p>
                            <p>Hotline: <a href="tel:+0123456789">0123 456 789</a></p>
                            <p>Facebook: <a href="https://facebook.com/petstore" target="_blank" rel="noopener noreferrer">Pet Store</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductsPage;