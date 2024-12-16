import StatusOrderSeller from "./StatusOrderSeller";
import OrderManagementSectionSeller from "./OrderManagementSectionSeller";
import { Tabs } from "react-tabs";
import React, {useState} from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../../partials/Sidebar';
import Header2 from "../../../components/Header2";
import Banner from '../../../partials/Banner';
import { Breadcrumb, Layout, Menu, theme} from 'antd';
import FooterBK from "@/components/FooterBK/index.jsx";
import { useGetOrderSellerQuery } from "../../../services/order.service";
import { Header } from "antd/es/layout/layout";
const {Content, Sider} = Layout;

export default function OrderManagementSeller() {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // State cho trang hiện tại
  const { data: dataOrder, error } = useGetOrderSellerQuery({ page: currentPage, limit: 10 });
  console.log(dataOrder?.data);
  if (error) return <div>Error loading orders!</div>;
  if (!dataOrder) return <div>Loading...</div>;

  console.log("Data", dataOrder?.data);
  return (
    <>
      <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
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
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Danh sách</Breadcrumb.Item>
            <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
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
              <Sidebar/>
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
                  {/* <StatusOrderSeller/> */}
                  <OrderManagementSectionSeller orders={dataOrder?.data?.orders || []}/>
                </Tabs>
              </div>
            </Content>
          </Layout>
        </Content>
        <FooterBK/>
      </Layout>
    </>
  );
}



