import React from "react";
import HeaderComponent from "../HeaderComponents/HeaderComponent";

const DefaultComponents=({children})=>{
    return (
        <div>
            <HeaderComponent/>
            {children}
        </div>
    )
}
export default DefaultComponents;