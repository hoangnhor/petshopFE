import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextlight } from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imagelogo from "../../assets/images/signIn.webp";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserServices from '../../services/UserServices';
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from '../../components/Message/Message';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlider";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutationHook(
    data => UserServices.loginUser(data)
    
  );
  
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success('Đăng nhập thành công!');
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
      navigate('/');
    } else if (isError || data?.status === 'ERR') {
      message.error(data?.message || 'Đăng nhập thất bại!');
    }
  }, [isSuccess, isError, data, navigate, dispatch]);

  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserServices.getDetailsUser(id, token);
      if (res?.status === 'OK') {
        dispatch(updateUser({ ...res?.data, access_token: token }));
      }
    } catch (error) {
      message.error('Lỗi khi lấy thông tin người dùng!');
    }
  };

  const handleOnchangeEmail = (value) => setEmail(value);
  const handleOnchangePassword = (value) => setPassword(value);

  const handleSignIn = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.error('Email không hợp lệ');
      return;
    }
    mutation.mutate({ email, password });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0,0,0,0.53)', height: '100vh' }}>
      <div style={{ width: '1100px', height: '500px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin Chào</h1>
          <p style={{ fontSize: '18px' }}>Đăng Nhập và tạo tài khoản</p>
          <InputFormComponent
            style={{ marginBottom: '20px' }}
            placeholder='Email'
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px' }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputFormComponent
              placeholder='Mật khẩu'
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={30}
              type="primary"
              danger
              styleButton={{
                height: '45px',
                width: '200px',
                border: 'none',
                borderRadius: '4px',
                margin: '30px 120px 30px',
              }}
              textButton={'Đăng nhập'}
              styleTextButton={{ color: '#fff', fontSize: '17px', fontWeight: '700' }}
            />
          </Loading>
          <WrapperTextlight>Quên mật khẩu?</WrapperTextlight>
          <p style={{ fontSize: '20px' }}>
            Chưa có tài khoản? <WrapperTextlight onClick={() => navigate('/sign-up')}> Tạo tài khoản</WrapperTextlight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imagelogo} preview={false} alt="image-logo" height='203' width='203' />
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;