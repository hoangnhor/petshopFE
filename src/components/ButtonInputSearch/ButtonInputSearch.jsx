import {Button} from 'antd'
import React from 'react'
import {SearchOutlined} from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
const ButtonInputSearch =(props)=>{
    const{
        size,placeholder,textButton,
        bordered,backgroundColorInput='#fff',
        backgroundColorButton='#ec0b6d',
        colorButton='#fff'
    }=props
   //dieu chinh thanh tim kiem
    return (
        <div style={{display:'flex'}}> 
            <InputComponent 
                size={size} 
                placeholder ={placeholder } 
                
                style={{backgroundColor:backgroundColorInput}}  />
            <ButtonComponent 
                size={size} 
                styleButton={{background:backgroundColorButton, border: ! bordered && 'none'}}
                icon ={< SearchOutlined  style={{color: colorButton}} />} 
                textButton={textButton}
                styleTextButton={{color :colorButton}}
            />
        </div>
    )
}
export default ButtonInputSearch;