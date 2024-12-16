import React, { useState, useEffect } from "react";
import FooterBK from '../../../components/FooterBK';
import { Breadcrumb, Layout, theme } from 'antd';
import { Typography, Button, Card, CardHeader, CardBody, Avatar, Input } from "@material-tailwind/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Header from "@/partials/Header.jsx";
import Sidebar from '../../../partials/Sidebar';
import axios from "axios";
import DrawerChat from "@/components/DrawerChat/index.jsx";
import TextEditor from "@/components/TextEditor/index.jsx";
import { useUpdateSellerInformationMutation } from "../../../services/sellerinformation.service";
import { useGetSellerInformationByTokenQuery } from "../../../services/sellerinformation.service";
import { notification } from "antd";


const { Content, Sider } = Layout;

export default function CRUDSellerInfor() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const showDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [userIdSeller, setUserIdSeller] = useState(null);
    const [sellerInforData, setSellerInforData] = useState({
        storeName: '',
        address: '',
        description: '',
        avatar: '',
        backgroundImage: '',
    });

    const [updateSellerInformation, { isLoading, isSuccess, isError, error }] = useUpdateSellerInformationMutation();

    const { data, isLoading: isFetching, error: apiError } = useGetSellerInformationByTokenQuery();


    useEffect(() => {
        const sellerIdFromLocalStorage = localStorage.getItem('userIdseller');
        if (sellerIdFromLocalStorage) {
            setUserIdSeller(parseInt(sellerIdFromLocalStorage, 10));
        }
    }, []);

    useEffect(() => {
        if (userIdSeller && data) {
            // Assuming `data` contains the seller info object
            setSellerInforData({
                storeName: data.storeName || "Cửa hàng ABC",  // Use fetched data or fallback to default
                address: data.address || "123 Đường XYZ",
                description: data.description || "Cửa hàng bán đồ điện tử",
                avatar: data.avatar || "https://via.placeholder.com/150",
                backgroundImage: data.backgroundImage || "https://via.placeholder.com/600x200",
            });
        }
    }, [userIdSeller, data]);

    const handleImageUpload = async (file, setImageState) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dwqq0mx4j/image/upload', formData);
            const imageUrl = response.data.secure_url;
            setImageState(imageUrl);
        } catch (error) {
            console.error("Lỗi khi tải ảnh lên Cloudinary:", error);
        }
    };

    const handleUpdateSellerInformation = async () => {
        const sellerData = {
            ...sellerInforData,
            userId: userIdSeller, // Assuming userIdSeller is the ID for the seller
        };

        try {
            await updateSellerInformation(sellerData).unwrap();
            notification.success({
                message: "Cập nhật thành công",
                description: "Thông tin cửa hàng đã được cập nhật thành công.",
                placement: "topRight",
            });
        } catch (err) {
            console.error("Failed to update seller information", err);
            notification.error({
                message: "Cập nhật thất bại",
                description: "Đã xảy ra lỗi khi cập nhật thông tin cửa hàng. Vui lòng thử lại.",
                placement: "topRight",
            });
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <Content style={{ padding: '0 48px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>

                <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG, flex: 1 }}>
                    <Sider width={300} style={{ background: colorBgContainer }}>
                        <Sidebar />
                    </Sider>

                    <Content style={{ padding: '0 0px', minHeight: 280, flex: 1 }}>
                        <Card className="h-full w-full">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                                    <Typography variant="h5" color="blue-gray">Thông tin cửa hàng</Typography>
                                </div>
                            </CardHeader>

                            <CardBody className="overflow-auto px-10">
                                <div className="flex flex-col gap-5">
                                    <form>
                                        <div className="flex flex-col gap-[22px]">
                                            <div className="w-[50%] flex flex-col items-start gap-2.5">
                                                <Typography variant="h6">Tên cửa hàng</Typography>
                                                <Input
                                                    type="text"
                                                    value={sellerInforData.storeName}
                                                    className="self-stretch border border-solid border-gray-200_01"
                                                    onChange={(e) => setSellerInforData({ ...sellerInforData, storeName: e.target.value })}
                                                />
                                            </div>

                                            <div className="w-[50%] flex flex-col items-start gap-[11px]">
                                                <Typography variant="h6">Địa chỉ</Typography>
                                                <Input
                                                    type="text"
                                                    value={sellerInforData.address}
                                                    className="self-stretch border border-solid border-gray-200_01"
                                                    onChange={(e) => setSellerInforData({ ...sellerInforData, address: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </form>

                                    <div className="relative h-40 w-[600px]">
                                        <img
                                            className="h-full w-full rounded-xl object-cover object-center"
                                            src={sellerInforData.backgroundImage}
                                            alt="Background"
                                        />
                                        <Button
                                            className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md"
                                            ripple={false}
                                            onClick={() => document.getElementById("background-input").click()}
                                        >
                                            <ArrowUpTrayIcon className="h-6 w-6 text-blue-500" />
                                        </Button>
                                        <input
                                            type="file"
                                            id="background-input"
                                            style={{ display: "none" }}
                                            onChange={(e) =>
                                                handleImageUpload(e.target.files[0], (url) =>
                                                    setSellerInforData({ ...sellerInforData, backgroundImage: url })
                                                )
                                            }
                                        />

                                        <div className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                                            <div className="mt-2">
                                                <div className="flex items-center gap-4">
                                                    <Avatar src={sellerInforData.avatar} alt="Avatar" />
                                                    <Button
                                                        className="bg-white p-2 rounded-full shadow-md"
                                                        ripple={false}
                                                        onClick={() => document.getElementById("avatar-input").click()}
                                                    >
                                                        <ArrowUpTrayIcon className="h-6 w-6 text-blue-500" />
                                                    </Button>
                                                    <Typography variant="h6">
                                                        {sellerInforData?.storeName}
                                                    </Typography>
                                                    <Typography variant="small" color="gray" className="font-normal">
                                                        {sellerInforData.address}
                                                    </Typography>
                                                </div>
                                            </div>

                                        </div>

                                        <input
                                            type="file"
                                            id="avatar-input"
                                            style={{ display: "none" }}
                                            onChange={(e) =>
                                                handleImageUpload(e.target.files[0], (url) =>
                                                    setSellerInforData({ ...sellerInforData, avatar: url })
                                                )
                                            }
                                        />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '100%' }}>
                                        {/* TextEditor with margin-bottom to create space */}
                                        <div style={{ width: '100%', marginBottom: '100px' }}>
                                            <TextEditor
                                                value={sellerInforData.description}
                                                onChange={(value) => {
                                                    setSellerInforData((prev) => ({
                                                        ...prev,
                                                        description: value,
                                                    }));
                                                }}
                                                style={{
                                                    height: '900px', // Tăng chiều cao cố định
                                                }}
                                            />
                                        </div>

                                        {/* Update Button */}
                                        <Button
                                            color="blue"
                                            onClick={handleUpdateSellerInformation}
                                            disabled={isLoading}
                                            style={{ width: '20%' }}
                                        >
                                            Cập nhập
                                        </Button>

                                    </div>

                                </div>
                            </CardBody>
                        </Card>
                    </Content>
                </Layout>
            </Content>

            <FooterBK />
        </Layout>
    );
}
