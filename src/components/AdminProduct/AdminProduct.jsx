import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Modal, Form } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import Loading from "../LoadingComponent/Loading";
import * as ProductServices from '../../services/ProductServices';
import { useMutationHook } from "../../hooks/useMutationHook";
import { getBase64 } from "../../utils";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false); // Modal xác nhận xóa
  const user = useSelector((state) => state?.user);
  const [form] = Form.useForm();

  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    type: '',
    countInStock: '',
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    type: '',
    countInStock: '',
  });

  // Mutation để tạo sản phẩm
  const mutation = useMutationHook((data) => {
    const { name, price, description, image, type, countInStock } = data;
    return ProductServices.createProduct({
      name,
      price: Number(price), // Chuyển thành số
      description,
      image,
      type,
      countInStock: Number(countInStock), // Chuyển thành số
    }, user?.access_token);
  });

  // Mutation để cập nhật sản phẩm
  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    return ProductServices.updateProduct(id, { ...rests, price: Number(rests.price), countInStock: Number(rests.countInStock) }, token);
  });

  // Mutation để xóa sản phẩm
  const mutationDelete = useMutationHook((data) => {
    const { id, token } = data;
    return ProductServices.deleteProduct(id, token);
  });

  // Lấy danh sách sản phẩm
  const getAllProducts = async () => {
    const res = await ProductServices.getAllProduct();
    return res;
  };

  // Lấy chi tiết sản phẩm
  const fetchGetDetailsProduct = async (rowSelected) => {
    setIsPendingUpdate(true);
    const res = await ProductServices.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        image: res?.data?.image,
        type: res?.data?.type?._id || res?.data?.type, // Xử lý type là ObjectId
        countInStock: res?.data?.countInStock,
      });
    }
    setIsPendingUpdate(false);
  };

  // Cập nhật form khi stateProductDetails thay đổi
  useEffect(() => {
    form.setFieldsValue(stateProductDetails);
  }, [form, stateProductDetails]);

  // Gọi API chi tiết sản phẩm khi chọn row
  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);

  // Query để lấy danh sách sản phẩm
  const { isPending: isPendingProducts, data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  // Xử lý thông báo khi tạo sản phẩm
  useEffect(() => {
    if (mutation.isSuccess && mutation.data?.status === 'OK') {
      message.success('Tạo sản phẩm thành công');
      handleCancel();
    } else if (mutation.isError || mutation.data?.status === 'ERR') {
      message.error(mutation.data?.message || 'Có lỗi khi tạo sản phẩm');
    }
  }, [mutation.isSuccess, mutation.isError, mutation.data]);

  // Xử lý thông báo khi cập nhật sản phẩm
  useEffect(() => {
    if (mutationUpdate.isSuccess && mutationUpdate.data?.status === 'OK') {
      message.success('Cập nhật sản phẩm thành công');
      handleCloseDrawer();
    } else if (mutationUpdate.isError || mutationUpdate.data?.status === 'ERR') {
      message.error(mutationUpdate.data?.message || 'Có lỗi khi cập nhật sản phẩm');
    }
  }, [mutationUpdate.isSuccess, mutationUpdate.isError, mutationUpdate.data]);

  // Xử lý thông báo khi xóa sản phẩm
  useEffect(() => {
    if (mutationDelete.isSuccess && mutationDelete.data?.status === 'OK') {
      message.success('Xóa sản phẩm thành công');
      setIsModalDeleteOpen(false);
      setRowSelected(''); // Reset row chọn
    } else if (mutationDelete.isError || mutationDelete.data?.status === 'ERR') {
      message.error(mutationDelete.data?.message || 'Có lỗi khi xóa sản phẩm');
    }
  }, [mutationDelete.isSuccess, mutationDelete.isError, mutationDelete.data]);

  // Xử lý đóng modal tạo sản phẩm
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      price: '',
      description: '',
      image: '',
      type: '',
      countInStock: '',
    });
    form.resetFields();
  };

  // Xử lý đóng drawer chỉnh sửa
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: '',
      price: '',
      description: '',
      image: '',
      type: '',
      countInStock: '',
    });
    form.resetFields();
  };

  // Xử lý submit form tạo sản phẩm
  const onFinish = () => {
    mutation.mutate(stateProduct);
  };

  // Xử lý thay đổi input tạo sản phẩm
  const handleChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  // Xử lý upload ảnh tạo sản phẩm
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  // Xử lý thay đổi input chỉnh sửa sản phẩm
  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Xử lý upload ảnh chỉnh sửa sản phẩm
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };

  // Xử lý submit form cập nhật sản phẩm
  const onUpdateProduct = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails });
  };

  // Xử lý xóa sản phẩm
  const handleDeleteProduct = () => {
    mutationDelete.mutate({ id: rowSelected, token: user?.access_token });
  };

  // Xử lý mở drawer chỉnh sửa
  const handleDetailsProduct = () => {
    if (rowSelected) {
      setIsOpenDrawer(true);
    }
  };

  // Render nút action (chỉnh sửa, xóa)
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }}
          onClick={() => setIsModalDeleteOpen(true)}
        />
        <EditOutlined
          style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }}
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };

  // Cấu hình cột bảng
  const columns = [
    {
      title: <span style={{ fontSize: '23px', fontWeight: 'bold' }}>Tên</span>,
      dataIndex: 'name',
      render: (text) => <a style={{ fontSize: '20px' }}>{text}</a>,
    },
    {
      title: <span style={{ fontSize: '23px', fontWeight: 'bold' }}>Giá</span>,
      dataIndex: 'price',
      render: (text) => <span style={{ fontSize: '20px' }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: '23px', fontWeight: 'bold' }}>Loại Sản Phẩm</span>,
      dataIndex: 'type',
      render: (text) => <span style={{ fontSize: '20px' }}>{text?.name || text}</span>, // Xử lý type là object
    },
    {
      title: <span style={{ fontSize: '23px', fontWeight: 'bold' }}>Action</span>,
      dataIndex: 'action',
      render: renderAction,
    },
  ];

  // Chuẩn bị dữ liệu bảng
  const dataTable = products?.data?.length && products?.data?.map((product) => ({
    ...product,
    key: product._id,
    type: product.type, // Đảm bảo type được truyền đúng
  }));

  return (
    <div>
      <WrapperHeader>Quản Lý Sản Phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button
          style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div>
      <div style={{ marginTop: '30px' }}>
        <TableComponent
          columns={columns}
          isPending={isPendingProducts}
          data={dataTable}
          onRow={(record) => ({
            onClick: () => setRowSelected(record._id),
          })}
        />
      </div>

      {/* Modal tạo sản phẩm */}
      <Modal title="Tạo Sản Phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isPending={mutation.isPending}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Tên:"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
            >
              <InputComponent value={stateProduct.name} onChange={handleChange} name="name" />
            </Form.Item>
            <Form.Item
              label="Loại Sản Phẩm"
              name="type"
              rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm' }]}
            >
              <InputComponent value={stateProduct.type} onChange={handleChange} name="type" />
            </Form.Item>
            <Form.Item
              label="Số Lượng"
              name="countInStock"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng hàng trong kho' }]}
            >
              <InputComponent value={stateProduct.countInStock} onChange={handleChange} name="countInStock" />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
            >
              <InputComponent value={stateProduct.price} onChange={handleChange} name="price" />
            </Form.Item>
            <Form.Item
              label="Miêu Tả"
              name="description"
              rules={[{ required: true, message: 'Vui lòng nhập miêu tả' }]}
            >
              <InputComponent value={stateProduct.description} onChange={handleChange} name="description" />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true, message: 'Vui lòng thêm hình ảnh' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button>Chọn file</Button>
                {stateProduct?.image && (
                  <img
                    src={stateProduct?.image}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px',
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>

      {/* Drawer chỉnh sửa sản phẩm */}
      <DrawerComponent
        title="Chi Tiết Sản Phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="50%"
      >
        <Loading isPending={isPendingUpdate || mutationUpdate.isPending}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onUpdateProduct}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Tên:"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
            >
              <InputComponent value={stateProductDetails.name} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>
            <Form.Item
              label="Loại Sản Phẩm"
              name="type"
              rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm' }]}
            >
              <InputComponent value={stateProductDetails.type} onChange={handleOnchangeDetails} name="type" />
            </Form.Item>
            <Form.Item
              label="Số Lượng"
              name="countInStock"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng hàng trong kho' }]}
            >
              <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
            >
              <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price" />
            </Form.Item>
            <Form.Item
              label="Miêu Tả"
              name="description"
              rules={[{ required: true, message: 'Vui lòng nhập miêu tả' }]}
            >
              <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description" />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true, message: 'Vui lòng thêm hình ảnh' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button>Chọn file</Button>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px',
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      {/* Modal xác nhận xóa sản phẩm */}
      <Modal
        title="Xóa Sản Phẩm"
        open={isModalDeleteOpen}
        onOk={handleDeleteProduct}
        onCancel={() => setIsModalDeleteOpen(false)}
        okText="Xóa"
        cancelText="Hủy"
        confirmLoading={mutationDelete.isPending}
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
      </Modal>
    </div>
  );
};

export default AdminProduct;