import { Helmet } from "react-helmet";
import ListRegisterAuctionSection from "./ListRegisterAuctionSection";
import React, {useState} from "react";
import { Tabs } from "react-tabs";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import { Breadcrumb, Button, Layout, Modal, theme } from "antd";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";


const { Content, Sider } = Layout;


export default function ListRegisterAuction() {

    const [position, setPosition] = useState("end");
    const [modal2Open, setModal2Open] = useState(false);
    // const apiData = dataApi?.items?.map((item) => ({
    //     key: item.ar_id,
    //     id: item.ar_id,
    //     time: new Date(item.created_at).toLocaleString(), // Chuyển thời gian sang định dạng dễ đọc
    //     transactionType: item.transactionType || "N/A", // Kiểu giao dịch
    //     method: item.method || "N/A", // Ngân hàng hoặc phương thức thanh toán
    //     status: item.status || "Pending", // Trạng thái giao dịch
    //     amount: item.amount || 0, // Số tiền giao dịch
    // })) || [];
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <>
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
                        {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item> */}
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
                            <div className="w-full ">
                                <Tabs
                                    className="mb-1 flex flex-col gap-12"
                                    selectedTabClassName=""
                                    selectedTabPanelClassName="tab-panel--selected"
                                >
                                    <ListRegisterAuctionSection />
                                </Tabs>
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




