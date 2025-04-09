import React from "react";
import { WrapperContent, WrapperLableText, WrapperTextValue } from "./style";

const NavBarComponent=()=>{
    const renderContent=(type,options)=>{
        switch(type){
            case 'text':
                return options.map((option)=>{
                    return(
                        
                            <WrapperTextValue>{option}</WrapperTextValue>
                        
                    )
                })
            default:
                return{}
        }
    }
    return (
        <div>
            <WrapperLableText> Danh Mục Sản Phẩm </WrapperLableText>
            <WrapperContent>
            {renderContent('text',['Sản Phẩm Chó','Sản Phẩm Mèo','Dịch Vụ'])}
            </WrapperContent>
            
        </div>
    )
}
export default NavBarComponent;