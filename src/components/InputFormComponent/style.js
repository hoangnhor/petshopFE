import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle=styled(Input)`
    border-top:none;
    border-right:none;
    border-left:none;
    font-size: 20px;
    outline:none;
    &:focus{
    background-color:rgb(232,240,254);
        }

    `