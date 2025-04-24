import { Button } from 'antd';
import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const {
        size,
        placeholder,
        textButton,
        bordered,
        backgroundColorInput = '#fff',
        backgroundColorButton = '#ec0b6d',
        colorButton = '#fff',
        onSearch, // Callback để gửi keyword lên cha
    } = props;

    const [keyword, setKeyword] = useState('');

    // Xử lý khi người dùng nhập keyword
    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    // Xử lý khi nhấn nút tìm kiếm
    const handleSearch = () => {
        if (keyword.trim() && onSearch) {
            onSearch(keyword);
        }
    };

    // Xử lý khi nhấn Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && keyword.trim() && onSearch) {
            onSearch(keyword);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                value={keyword}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                style={{ backgroundColor: backgroundColorInput }}
            />
            <ButtonComponent
                size={size}
                styleButton={{ background: backgroundColorButton, border: !bordered && 'none' }}
                icon={<SearchOutlined style={{ color: colorButton }} />}
                textButton={textButton}
                styleTextButton={{ color: colorButton }}
                onClick={handleSearch}
            />
        </div>
    );
};

export default ButtonInputSearch;