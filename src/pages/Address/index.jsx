import { InputDH, Img, Heading, ButtonDH } from "../../components";
import { CloseSVG } from "../../components/InputDH/close.jsx";
import Header2 from "../../components/Header2";
import React, { Suspense, useState } from "react";
import { Button, Modal, message, Popconfirm, Radio, Layout, Breadcrumb, Menu, theme } from "antd";
import FooterBK from "../../components/FooterBK/index.jsx";
import { FormAddAddress } from "./FormAddAddress.jsx";
import { FormUpdateAddress } from "./FormUpdateAddress.jsx";
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";
import { useAddress } from "./hook/useAddress.js";
import { useFetchUserAddresses } from "./hook/useFetchUserAddresses";
import { useDeleteAddressMutation, useSetStatusMutation } from "../../services/address.service.js";
import axios from 'axios';


const { Content, Sider } = Layout;


export default function AddressPage() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [searchBarValue1, setSearchBarValue1] = React.useState("");
    const [open, setOpen] = useState(false);
    const [updateAddress, setUpdateAddress] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("Content of the modal");
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { addAddress } = useAddress();
    const { addresses , isRefetchAddress} = useFetchUserAddresses();
    const [setStatus] = useSetStatusMutation();
    


    const showModal = () => {
        setOpen(true);
    };
    const showUpdateAddress = () => {
        setUpdateAddress(true);
    };

    const handleOk = () => {
        setModalText("The modal will be closed after two seconds");
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 500);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
    };

    const handleUpdateAddress = () => {
        setModalText("The modal will be closed after two seconds");
        setConfirmLoading(true);
        setTimeout(() => {
            setUpdateAddress(false);
            setConfirmLoading(false);
        }, 500);
    };

    const handleCancelUpdateAddress = () => {
        console.log("Clicked cancel button");
        setUpdateAddress(false);
    };
    const handleRadioChange = (index) => {
        setSelectedAddress(index);
    };

    const confirm = (e) => {
        console.log(e);
        message.success("Click on Yes");
    };
    const cancel = (e) => {
        console.log(e);
        message.error("Click on No");
    };

    //api
    const handleFormSubmit = async (formData) => {
        const result = await addAddress(formData);
        if (result.success) {
            isRefetchAddress();
            message.success("Địa chỉ đã được thêm thành công!");
            isRefetchAddress();

            handleCancel();
        } else {
            message.error(`Lỗi: ${result.error}`);
        }
    };
    const [deleteAddress] = useDeleteAddressMutation();

    const handleDeleteAddress = async (addressId) => {
        try {
            await deleteAddress(addressId).unwrap();
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete address: ', error);
        }
    };



    const handleStatusChange = async (addressId) => {
        console.log("Updating status for addressId: ", addressId); // Log giá trị addressId
        try {
            await setStatus(addressId).unwrap(); // Gọi hàm setStatus với addressId
            message.success("Trạng thái đã được cập nhật thành công!");
        } catch (error) {
            message.error("Cập nhật trạng thái không thành công!");
            console.error("Error updating status: ", error);
        }
    };





    return (
        <>
            {/*New Address*/}
            <Modal
                title="Thêm Địa Chỉ Mới"
                open={open}
                onCancel={handleCancel}
                footer={null}
            >
                <FormAddAddress onClose={handleCancel} onSubmit={handleFormSubmit} />
            </Modal>

            {/*Update Address*/}
            <Modal
                title="Update Address"
                open={updateAddress}
                onOk={handleUpdateAddress}
                confirmLoading={confirmLoading}
                onCancel={handleCancelUpdateAddress}
            >
                <FormUpdateAddress />
            </Modal>

            <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header2 />
                <Content
                    style={{
                        padding: '0 48px',
                        flex: 1, // Cho phép Content chiếm không gian còn lại
                        display: 'flex', // Đặt display là flex để chứa nội dung
                        flexDirection: 'column', // Hướng theo chiều dọc
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{
                            padding: '24px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1, // Để Layout chiếm hết không gian còn lại
                        }}
                    >
                        <Sider
                            style={{
                                background: colorBgContainer,
                            }}
                            width={300}
                        >
                            <SiderUserBK />
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1, // Để Content bên trong chiếm hết không gian còn lại
                            }}
                        >
                            <div className="relative flex flex-col h-full"> {/* Thay đổi layout thành flex column */}
                                <Heading
                                    size="text3xl"
                                    as="h1"
                                    className="text-[28px] font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px] "
                                >
                                    Quản Lý Địa Chỉ
                                </Heading>
                                <div className="mb-4 mt-[20px] flex items-center justify-between">
                                    <InputDH
                                        shape="round"
                                        name="Search Field"
                                        placeholder={`Tìm kiếm`}
                                        value={searchBarValue1}
                                        onChange={(e) => setSearchBarValue1(e.target.value)}
                                        suffix={
                                            searchBarValue1?.length > 0 ? (
                                                <CloseSVG
                                                    onClick={() => setSearchBarValue1("")}
                                                    height={18}
                                                    width={26}
                                                    fillColor="#041e42ff"
                                                />
                                            ) : (
                                                <Img
                                                    src="images/img_search.svg"
                                                    alt="Search 1"
                                                    className="h-[18px] w-[26px]"
                                                />
                                            )
                                        }
                                        className="w-[58%] gap-4 rounded-md border px-3.5 md:w-full"
                                    />
                                    <Button
                                        type="primary"
                                        onClick={showModal}
                                        className="ml-2 text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50"
                                    >
                                        <svg
                                            className="w-6 h-6 text-gray-800 dark:text-white me-2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Thêm Địa Chỉ
                                    </Button>
                                </div>


                                <div className="flex flex-1 overflow-y-auto"> {/* Thêm overflow để cuộn nếu cần */}
                                    <div className="mx-3 mb-[418px] md:mx-0 flex-1"> {/* Đảm bảo container địa chỉ chiếm không gian còn lại */}
                                        <div className="relative z-[2] mr-5 flex flex-wrap gap-6 md:mr-0">
                                            <Suspense fallback={<div>Loading feed...</div>}>
                                                {addresses.map((d, index) => (
                                                    <div
                                                        className={`${d.status ? "bg-green-200" : "bg-white"
                                                            } hover:bg-green-400 transition-colors duration-300 rounded-lg shadow-md border border-gray-300 p-5 flex-1 min-w-[250px] max-w-[300px] flex flex-col relative`}
                                                        key={`addressesList${index}`}
                                                    >
                                                        {d.status && (
                                                            <div className="absolute top-2 right-2 text-sm text-green-800 font-semibold">
                                                                Địa chỉ mặc định
                                                            </div>
                                                        )}
                                                        <div className="flex items-center">
                                                            <Popconfirm
                                                                title="Chọn địa chỉ mặc định?"
                                                                onConfirm={() => handleStatusChange(d.addressId)}
                                                                onCancel={() => message.info("Hủy bỏ")}
                                                                okText="Chọn"
                                                                cancelText="Không"
                                                            >
                                                                <Radio checked={d.status} />
                                                            </Popconfirm>
                                                        </div>
                                                        <div className="text-gray-600">
                                                            {d.street_address}, {d.ward_name}
                                                        </div>
                                                        <div className="text-gray-600">
                                                            {d.district_name}, {d.province_name}
                                                        </div>
                                                        <div className="flex justify-between mt-2">
                                                            <Popconfirm
                                                                title="Xóa địa chỉ?"
                                                                description="Bạn có chắc chắn xóa địa chỉ này?"
                                                                onConfirm={() => handleDeleteAddress(d.addressId)}
                                                                onCancel={cancel}
                                                                okText="Xóa"
                                                                cancelText="Không"
                                                            >
                                                                <button className="text-red-500">
                                                                    Xóa địa chỉ
                                                                </button>
                                                            </Popconfirm>
                                                        </div>
                                                    </div>
                                                ))}
                                            </Suspense>

                                        </div>
                                        <div className="relative mt-[-2px] h-px bg-gray-100" />
                                    </div>
                                </div>
                            </div>






                        </Content>
                    </Layout>
                </Content>
                <FooterBK
                    className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
            </Layout>


        </>
    );
}
