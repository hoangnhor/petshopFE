import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Descriptions,  Modal } from "antd";
import {PlusOutlined, DeleteOutlined,EditOutlined} from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { Form } from "antd";
import * as ProductServices from '../../services/ProductServices'
import { useMutationHook } from "../../hooks/useMutationHook";
import { getBase64 } from "../../utils";
import { WrapperUploadFile } from "./style";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../../DrawerComponent/DrawerComponent";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";

const AdminProduct=()=>{
  
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [rowselected,setRowSelected]=useState('')
    const [isOpenDrawer,setIsOpenDrawer]=useState(false)
    const [isPendingUpdate, setIsPendingUpdate]=useState(false)
    const user =useSelector((state)=>state?.user)

    const [stateProduct, setStateProduct] = useState({
        name:'',
        price:'',
        description:'',
        image:'',
        type:'',
        countInStock:'',
    })
    ///update
    const [stateProductDetails, setStateProductDetails] = useState({
        name:'',
        price:'',
        description:'',
        image:'',
        type:'',
        countInStock:'',
    })
    const [form]=Form.useForm();

    const mutation = useMutationHook(
        (data)=>{
            const{ name, price, description, image, type, countInStock}=data

           const res= ProductServices.createProduct({name, price,description,image,type,countInStock})
           return res
        }
    )

    ///update
    const mutationUpdate = useMutationHook(
        (data)=>{
            console.log('data',data)
            const{ id, token,...rests}=data

           const res= ProductServices.updateProduct(id, token,rests)
           return res
        }
    )
    const  getAllProducts =async()=>{
        const res= await ProductServices.getAllProduct()
        return res
    }


    //update

    const fetchGetDetailsProduct = async(rowselected)=>{
        const res=await ProductServices.getDetailsProduct(rowselected)
        if(res?.data){
            setStateProductDetails({
                name:res?.data?.name,
                price:res?.data?.price,
                description:res?.data?.description,
                image:res?.data?.image,
                type:res?.data?.type,
                countInStock:res?.data?.countInStock
            })
        }
        setIsPendingUpdate(false)
    }

  


    //update
    useEffect(()=>{
       form.setFieldsValue(stateProductDetails)
    },[form, stateProductDetails])

    useEffect(()=>{
        if(rowselected){
            fetchGetDetailsProduct(rowselected)
        }
    },[rowselected])


    console.log('stateProduct',stateProductDetails)
    const handleDetailsProduct=()=>{
        if(rowselected){
            setIsPendingUpdate(true)
            fetchGetDetailsProduct()
            
        }
        setIsOpenDrawer(true)
    }


    const {data , isPending,isSuccess,isError} = mutation
    const {data:dataUpdated , isPending:isPendingUpdated,isSuccess:isSuccessUpdated,isError:isErrorUpdated} = mutationUpdate
    console.log('dataUpdated',dataUpdated)

    const {isPending:isPendingProducts, data: products} = useQuery({queryKey:['products'],queryFn:getAllProducts})
    const renderAction=()=>{
        return (
            <div>
                <DeleteOutlined style={{color:'red',fontSize:'30px' , cursor:'pointer'}}/>
                <EditOutlined style={{color:'orange',fontSize:'30px',cursor:'pointer'}} onClick={handleDetailsProduct}/>
            </div>
        )
    }
    //san pham
    const columns=[
        {
            title: <span style={{ fontSize: '23px', fontWeight: 'bold' }}>Tên</span>,
            dataIndex:'name',
            render:(text)=> <a style={{ fontSize: '20px' }}> {text}</a>
        },
        {
            title: <span style={{ fontSize: '23px', fontWeight: 'bold' }}>Giá</span>,
            dataIndex:'price',
            render: (text) => <span style={{ fontSize: '20px' }}>{text}</span>
        },
        {
            title: <span style={{ fontSize: '23px', fontWeight: 'bold' }}>Loại Sản Phẩm</span>,
            dataIndex:'type',
            render: (text) => <span style={{ fontSize: '20px' }}>{text}</span>
        },
        {
            title: <span style={{ fontSize: '23px', fontWeight: 'bold' }}>Action</span>,
            dataIndex:'action',
            render: renderAction
        },
    ];
    const dataTable=products?.data?.length && products?.data?.map ((product)=>{
        return {...product,key:product._id}
    })


    useEffect(()=>{
        if(isSuccess && data?.status ==='OK'){
            message.success()
            handleCancel()
        }else if (isError){
            message.error()
        }
    },[isSuccess])

    const handleCloserDrawer=()=>{
        setIsOpenDrawer(false);
        setStateProductDetails({
            name:'',
            price:'',
            description:'',
            image:'',
            type:'',
            countInStock:''
        })
        form.resetFields()
    }

    useEffect(()=>{
        if(isSuccessUpdated && dataUpdated?.status ==='OK'){
            message.success()
            handleCloserDrawer()
        }else if (isErrorUpdated){
            message.error()
        }
    },[isSuccessUpdated])
    
    const handleCancel=()=>{
        setIsModalOpen(false);
        setStateProduct({
            name:'',
            price:'',
            description:'',
            image:'',
            type:'',
            countInStock:''
        })
        form.resetFields()
    }
    const onFinish=()=>{
        mutation.mutate(stateProduct)

    }
    const handlechange=(e)=>{
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }
    const handleOnchangeAvatar =async({fileList})=>{    
        const file=fileList[0] 
        if(!file.url && !file.preview){
            file.preview=await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image:file.preview
        })
    }

     ///update
     const handleOnchangeDetails=(e)=>{
        console.log('check',e.target.name,e.target.value)
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }

    console.log('user',user)
    const onUpdateProduct=()=>{
        mutationUpdate.mutate({id: rowselected,token: user?.access_token , ...stateProductDetails})
    }

    const handleOnchangeAvatarDetails =async({fileList})=>{    
        const file=fileList[0] 
        if(!file.url && !file.preview){
            file.preview=await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image:file.preview
        })
    }






    return(
        <div>
            <WrapperHeader>Quản Lý Sản Phẩm</WrapperHeader>
            <div style={{marginTop:'10px'}}>
            <Button style={{height:'150px', width:'150px',borderRadius:'6px',borderStyle:'dashed'}} onClick={()=>setIsModalOpen(true)}><PlusOutlined style={{fontSize:'60px'}} /></Button>
            </div>
            <div style={{marginTop:'30px'}}>
            <TableComponent columns={columns} isPending={isPendingProducts} data={dataTable} onRow={(record, rowIndex)=>{
                return {
                    onClick: event =>{
                        setRowSelected(record._id)
                    }
                };
            }} />
            </div>

    
            <Modal title="Tạo Sản Phẩm" open={isModalOpen } onCancel={handleCancel} footer={null} >
            <Loading isPending={isPending}>
                <Form 
                    name ="basic"
                    labelCol={{span:6}}
                    wrapperCol = {{ span:18 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item 
                        label="Tên:"
                        name="name"
                        rules={[{required: true, message:'vui lòng nhập tên của bạn'}]}
                    >
                        <InputComponent value={stateProduct.name} onChange={handlechange} name="name" />
                    </Form.Item>

                    <Form.Item 
                        label="Loại Sản Phẩm"
                        name="type"
                        rules={[{required: true, message:'vui lòng nhập loại sản phẩm của bạn'}]}
                    >
                        <InputComponent value={stateProduct.type} onChange={handlechange} name="type" />
                    </Form.Item>

                    <Form.Item 
                        label="Số Lượng"
                        name="countInStock"
                        rules={[{required: true, message:'vui lòng nhập số lượng hàng trong kho'}]}
                    >
                        <InputComponent value={stateProduct.countInStock} onChange={handlechange} name="countInStock" />
                    </Form.Item>

                    <Form.Item 
                        label="Giá"
                        name="price"
                        rules={[{required: true, message:'vui lòng nhập giá'}]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handlechange} name="price"/>
                    </Form.Item>

                    <Form.Item 
                        label="Miêu Tả"
                        name="description"
                        rules={[{required: true, message:'vui lòng nhập miêu tả'}]}
                    >
                        <InputComponent value={stateProduct.description} onChange={handlechange} name="description" />
                    </Form.Item>

                    <Form.Item 
                        label="Hình ảnh"
                        name="image"
                        rules={[{required: true, message:'vui lòng thêm hình ảnh'}]}
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                <Button > chọn file</Button>
                                {stateProduct?.image &&(
                                    <img src={stateProduct?.image} style={{
                                        height:'60px',
                                        width:'60px',
                                        borderRadius:'50%',
                                        objectFit:'cover',
                                        marginLeft:'10px'
                                    }} alt="avatar"/>
                                )}
                        </WrapperUploadFile>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset:20,span:16}} >
                        <Button type='primary' htmlType="submit">
                            submit
                        </Button>
                    </Form.Item>
                </Form>
            </Loading>
            </Modal>



        {/* uppdate san pham */}
            <DrawerComponent title="Chi Tiết Sản Phẩm" isOpen={isOpenDrawer} onClose={()=>setIsOpenDrawer(false)} width='50%'>
            <Loading isPending={isPendingUpdate || isPendingUpdated}>
                <Form 
                    name ="basic"
                    labelCol={{span:6}}
                    wrapperCol = {{ span:18 }}
                    onFinish={onUpdateProduct}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item 
                        label="Tên:"
                        name="name"
                        rules={[{required: true, message:'vui lòng nhập tên của bạn'}]}
                    >
                        <InputComponent value={stateProductDetails.name} onChange={handleOnchangeDetails} name="name" />
                    </Form.Item>

                    <Form.Item 
                        label="Loại Sản Phẩm"
                        name="type"
                        rules={[{required: true, message:'vui lòng nhập loại sản phẩm của bạn'}]}
                    >
                        <InputComponent value={stateProductDetails.type} onChange={handleOnchangeDetails} name="type" />
                    </Form.Item>

                    <Form.Item 
                        label="Số Lượng"
                        name="countInStock"
                        rules={[{required: true, message:'vui lòng nhập số lượng hàng trong kho'}]}
                    >
                        <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
                    </Form.Item>

                    <Form.Item 
                        label="Giá"
                        name="price"
                        rules={[{required: true, message:'vui lòng nhập giá'}]}
                    >
                        <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price"/>
                    </Form.Item>

                    <Form.Item 
                        label="Miêu Tả"
                        name="description"
                        rules={[{required: true, message:'vui lòng nhập miêu tả'}]}
                    >
                        <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description" />
                    </Form.Item>

                    <Form.Item 
                        label="Hình ảnh"
                        name="image"
                        rules={[{required: true, message:'vui lòng thêm hình ảnh'}]}
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button > chọn file</Button>
                                {stateProductDetails?.image &&(
                                    <img src={stateProductDetails?.image} style={{
                                        height:'60px',
                                        width:'60px',
                                        borderRadius:'50%',
                                        objectFit:'cover',
                                        marginLeft:'10px'
                                    }} alt="avatar"/>
                                )}
                        </WrapperUploadFile>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset:20,span:16}} >
                        <Button type='primary' htmlType="submit">
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
            </Loading>
            </DrawerComponent>

            
        </div>
    )
}
export default AdminProduct

