import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTyperProduct=styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    border-bottom: 1px solid red;
    height:60px;
`

export const WrapperButtonMore=styled(ButtonComponent)`
    &:hover{
        color:#de2967;
        backgroud: #fff;
        span{
        color:#fff;
        }
    }
    width:100%;
    text-align:center;
`
export const WrapperProducts=styled.div`
    display:flex; 
    gap:    32px;
    margin-top:30px;
    flex-wrap:wrap;

`