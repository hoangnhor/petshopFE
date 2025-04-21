import React, { useEffect, useState } from "react";
import Search from "antd/es/transfer/search";
import { Badge, Button, Col, Popover } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccout, WrapperTextHeaderSmail, WrapperContentPopup } from './style';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserSevices from '../../services/UserServices';
import { resetUser } from "../../redux/slides/userSlider";
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

    const handleLogout = async () => {
        setLoading(true);
        await UserSevices.logoutUser();
        dispatch(resetUser());
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        setUserName(user?.name);
        setUserAvatar(user?.avatar);
        setLoading(false);
    }, [user?.name, user?.avatar]);

    const content = (
        <div>
            <WrapperContentPopup onClick={() => navigate('/profile')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('admin')}>Quản Lý Hệ Thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={handleLogout}>Đăng Xuất</WrapperContentPopup>
        </div>
    );

    // Danh sách các mục điều hướng
    const navItems = [
        { name: "Trang chủ", path: "/" },
        { name: "Sản phẩm", path: "/products" },
        { name: "Dịch Vụ", path: "/services" },
        { name: "Tin tức", path: "/news" },
        { name: "Liên Hệ", path: "/contact" },
    ];

    return (
        <div style={{ width: '100%', background: '#de8ebe', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset', flexDirection: 'column' }}>
                {/* Phần logo, tìm kiếm, giỏ hàng */}
                <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <Col span={5}>
                        <WrapperTextHeader>Snoop Dogg</WrapperTextHeader>
                    </Col>
                    {!isHiddenSearch && (
                        <Col span={13}>
                            <ButtonInputSearch
                                size="large"
                                placeholder="Tìm kiếm sản phẩm..."
                                textButton="Tìm Kiếm"
                            />
                        </Col>
                    )}
                    <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                        <Loading isPending={loading}>
                            <WrapperHeaderAccout>
                                {userAvatar ? (
                                    <img
                                        src={userAvatar}
                                        alt="avatar"
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            borderRadius: '50%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                ) : (
                                    <UserOutlined style={{ fontSize: '30px' }} />
                                )}
                                {user?.access_token ? (
                                    <>
                                        <Popover content={content} trigger="click">
                                            <div style={{ cursor: 'pointer', fontSize: '20px' }}>
                                                {userName?.length ? userName : user?.email}
                                            </div>
                                        </Popover>
                                    </>
                                ) : (
                                    <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                        <WrapperTextHeaderSmail>Đăng Nhập / Đăng Ký</WrapperTextHeaderSmail>
                                        <div>
                                            <WrapperTextHeaderSmail>Tài Khoản</WrapperTextHeaderSmail>
                                            <CaretDownOutlined />
                                        </div>
                                    </div>
                                )}
                            </WrapperHeaderAccout>
                        </Loading>
                        {!isHiddenCart && (
                            <div>
                                <Badge count={4} size="small">
                                    <ShoppingCartOutlined style={{ fontSize: '40px', color: '#fff' }} />
                                </Badge>
                                <WrapperTextHeaderSmail>Giỏ Hàng</WrapperTextHeaderSmail>
                            </div>
                        )}
                    </Col>
                </div>

                {/* Thanh điều hướng nằm trong khu vực màu hồng */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        gap: '20px',
                        padding: '10px 120px',
                        width: '100%',
                        marginTop: '10px'
                    }}
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            style={{
                                color: '#fff', // Chữ màu trắng để nổi trên nền hồng
                                fontSize: '20px',
                                fontWeight: 'bold',
                                padding: '10px 20px',
                                textDecoration: 'none'
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </WrapperHeader>
        </div>
    );
};

export default HeaderComponent;