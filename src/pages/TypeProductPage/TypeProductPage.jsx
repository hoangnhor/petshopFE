import React, { Fragment } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import {  Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";

const TypeProductPage=()=>{
    const onChange=()=>{}
    return (   
        <div style={{width:'100%',background:'#efefef',}}>
            <div style={{width:'1400px',margin:'0 auto'}} >
                    <Row style={{flexWrap:'nowrap' ,paddingTop:'10px'}}>
                        <WrapperNavbar span={4}  >
                            <NavBarComponent/>
                        </WrapperNavbar>
                        <Col  span={20} >
                            <WrapperProducts>
                                <CardComponent/>
                                <CardComponent/>
                                <CardComponent/>
                                <CardComponent/>
                                <CardComponent/>
                                <CardComponent/>
                                <CardComponent/>
                            </WrapperProducts>   
                            <Pagination  defaultCurrent={1} total={100} onChange={onChange}  style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}/>
                        </Col>      
                    </Row>
            </div>
        </div>
    )
}
export default TypeProductPage;