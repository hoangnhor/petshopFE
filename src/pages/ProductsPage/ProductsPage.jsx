import React, { Fragment, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import * as ProductServices from "../../services/ProductServices";
import { useQuery } from "@tanstack/react-query";
import FooterComponent from "../../components/FooterComponent/FooterComponent"; // Đã được import

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

                {/* Thêm FooterComponent */}
                <FooterComponent />
            </div>
        </Fragment>
    );
};

export default ProductsPage;