import {Row} from "antd";
import styled from "styled-components"

export const WrapperHeader = styled(Row)`
   
    background-color:#de8ebe;
    align-items: center;
    gap:16px;
    flex-wrap:nowrap;
    width:1740px;
    padding:20px 0;
`
export const WrapperTextHeader =styled.span`
    font-size:40px;
    color:#fff;
    font-weight:bold,
    text-align:left;
`
export const WrapperHeaderAccout= styled.div`
    display:flex;
    align-items:center;
    color:#fff;
    gap: 20px;
`
export const WrapperTextHeaderSmail =styled.span`
    font-size:20px;
    color:#fff;
    white-space:nowrap;
`
export const WrapperContentPopup = styled.p`
    font-size:17px;
    cursor:pointer;
    &:hover{
        
        color:#de8ebe;
    }
`

