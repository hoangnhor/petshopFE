import React, { useEffect, useState } from "react";
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserServices from '../../services/UserServices';
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { Button, Upload } from "antd";
import { updateUser } from "../../redux/slides/userSlider";
import * as message from '../../components/Message/Message';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from "../../utils";

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');

    const mutation = useMutationHook(
        (data) => {
            const { id, access_token, ...rests } = data;
            UserServices.updateUser(id, rests, access_token);
        }
    );

    const dispatch = useDispatch();
    const { data, isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            message.success();
            handleGetDetailsUser(user?.id, user?.access_token);
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserServices.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    const handleOnchangeEmail = (value) => { setEmail(value); };
    const handleOnchangeName = (value) => { setName(value); };
    const handleOnchangePhone = (value) => { setPhone(value); };
    const handleOnchangeAddress = (value) => { setAddress(value); };
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);
    };

    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token });
    };

    return (
        <div style={{ width: '100%', background: '#efefef', marginTop: "0" }}>
            <div style={{ width: '1300px', margin: '0 auto', minHeight: '500px', paddingTop: "10px" }}>
                <WrapperHeader style={{ marginBottom: "0" }}>Thông tin người dùng</WrapperHeader>
                <Loading isPending={isPending}>
                    <WrapperContentProfile style={{ marginTop: "0" }}>
                        <WrapperInput>
                            <WrapperLabel htmlFor="name">Name:</WrapperLabel>
                            <InputFormComponent style={{ width: '300px' }} id="name" value={name} onChange={handleOnchangeName} />
                            <ButtonComponent
                                onClick={handleUpdate}
                                size={30}
                                styleButton={{
                                    height: '45px',
                                    width: 'fit-content',
                                    border: '1px solid #F4C6CF',
                                    borderRadius: '4px',
                                }}
                                textButton={'Cập nhật'}
                                styleTextButton={{ color: 'rgb(236, 11, 109)', fontSize: '17px', fontWeight: '700' }}
                            />
                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="email">Email:</WrapperLabel>
                            <InputFormComponent style={{ width: '300px' }} id="email" value={email} onChange={handleOnchangeEmail} />
                            <ButtonComponent
                                onClick={handleUpdate}
                                size={30}
                                styleButton={{
                                    height: '45px',
                                    width: 'fit-content',
                                    border: '1px solid #F4C6CF',
                                    borderRadius: '4px',
                                }}
                                textButton={'Cập nhật'}
                                styleTextButton={{ color: 'rgb(236, 11, 109)', fontSize: '17px', fontWeight: '700' }}
                            />
                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="phone">Phone:</WrapperLabel>
                            <InputFormComponent style={{ width: '300px' }} id="phone" value={phone} onChange={handleOnchangePhone} />
                            <ButtonComponent
                                onClick={handleUpdate}
                                size={30}
                                styleButton={{
                                    height: '45px',
                                    width: 'fit-content',
                                    border: '1px solid #F4C6CF',
                                    borderRadius: '4px',
                                }}
                                textButton={'Cập nhật'}
                                styleTextButton={{ color: 'rgb(236, 11, 109)', fontSize: '17px', fontWeight: '700' }}
                            />
                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="address">Address:</WrapperLabel>
                            <InputFormComponent style={{ width: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                            <ButtonComponent
                                onClick={handleUpdate}
                                size={30}
                                styleButton={{
                                    height: '45px',
                                    width: 'fit-content',
                                    border: '1px solid #F4C6CF',
                                    borderRadius: '4px',
                                }}
                                textButton={'Cập nhật'}
                                styleTextButton={{ color: 'rgb(236, 11, 109)', fontSize: '17px', fontWeight: '700' }}
                            />
                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="avatar">Avatar:</WrapperLabel>
                            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                <Button icon={<UploadOutlined />}> Chọn file</Button>
                            </WrapperUploadFile>
                            {avatar && (
                                <img src={avatar} style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover' }} alt="avatar" />
                            )}
                            <ButtonComponent
                                onClick={handleUpdate}
                                size={30}
                                styleButton={{
                                    height: '45px',
                                    width: 'fit-content',
                                    border: '1px solid #F4C6CF',
                                    borderRadius: '4px',
                                }}
                                textButton={'Cập nhật'}
                                styleTextButton={{ color: 'rgb(236, 11, 109)', fontSize: '17px', fontWeight: '700' }}
                            />
                        </WrapperInput>
                    </WrapperContentProfile>
                </Loading>
            </div>

            <div style={{ width: "100%", background: "#fff", padding: "20px 0", borderTop: "1px solid #ddd" }}>
                <div style={{ width: "1300px", margin: "0 auto", display: "flex", justifyContent: "space-around", alignItems: "flex-start", gap: "20px" }}>
                    <div>
                        <h3>Sitemap</h3>
                        {['Mua Đồ Cho Chó', 'Mua Đồ Cho Mèo', 'Dịch Vụ', 'Khuyến mãi', 'Tin tức', 'Liên Hệ'].map((item) => (
                            <p key={item}>
                                <a href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: "#333", textDecoration: "none" }}>
                                    {item}
                                </a>
                            </p>
                        ))}
                    </div>
                    <div>
                        <h3>Bản đồ</h3>
                        <iframe
                            title="Pet Store Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.954410426466!2d106.67525181062004!3d10.737997189364297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVHLGsOG7nW5n IMSQ4bqhaS ho4buNYy BDw7RuZy buZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1745177879295!5m2!1svi!2s"
                            width="300"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div>
                        <h3>Liên hệ</h3>
                        <p>Email: <a href="mailto:contact@petstore.com">contact@petstore.com</a></p>
                        <p>Hotline: <a href="tel:+0123456789">0123 456 789</a></p>
                        <p>Facebook: <a href="https://facebook.com/petstore" target="_blank" rel="noopener noreferrer">Pet Store</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;