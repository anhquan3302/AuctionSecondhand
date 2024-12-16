import {
    Heading,
} from "../../components";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import React, { useEffect, useRef, useState } from "react";
import { TabPanel, Tabs } from "react-tabs";
import { Select, Input, InputNumber, theme, Layout, Breadcrumb, Spin } from "antd";
import { BankOutlined, WalletOutlined } from "@ant-design/icons";
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";
import { useDepositUserMutation } from "@/services/walletCustomerService.js";
import { toast } from "react-toastify";

const dropDownOptions = [
    { label: "VN_PAY", value: "paymentMethod" },

];
const { Content, Sider } = Layout;

export default function DepositMoneyPage() {
    const [paymentMethod, setPaymentMethod] = useState("VN_PAYMENT");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [returnSuccess, setReturnSuccess] = useState("http://localhost:5173/SuccessfullyPayment");
    const [returnError, setReturnError] = useState("http://localhost:5173/FailPayment");

    const userRef = useRef();
    const errRef = useRef();

    const [depositUser, { isLoading: isLoadingDeposit }] = useDepositUserMutation();
    const { TextArea } = Input;



    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || amount <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }

        try {
            const depositData = await depositUser({
                paymentMethod, description, amount, returnSuccess, returnError,
            }).unwrap();

            console.log("Deposit data:", depositData);

            if (depositData.data.paymentUrl) {
                toast.success(depositData.message);
                window.location.href = depositData.data.paymentUrl;
            } else {
                toast.error("Checkout URL not available.");
            }

            // Lưu transactionId vào localStorage
            const transactionId = depositData.data.transactionId;
            if (transactionId) {
                localStorage.setItem("transactionId", transactionId);
            }
        } catch (err) {
            const errorMessage = err?.data?.message || "An error occurred";
            toast.error(errorMessage);
            errRef.current.focus();
        }
    };

    const handleChange = (value) => {
        console.log(`Selected ${value}`);
    };

    const onChange = (value) => {
        setAmount(value);
    };

    const onChangeTextArea = (e) => {
        setDescription(e.target.value);
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header2 />
                <Content
                    style={{
                        padding: '0 60px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Breadcrumb style={{ margin: '20px 0', fontSize: '1.2rem' }}>
                        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item>Hồ sơ</Breadcrumb.Item>
                        <Breadcrumb.Item>Thông tin</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{
                            padding: '30px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1,
                        }}
                    >
                        <Sider
                            style={{
                                background: colorBgContainer,
                                padding: '0 15px',
                            }}
                            width={350}
                        >
                            <SiderUserBK />
                        </Sider>
                        <Content
                            style={{
                                padding: '0 35px',
                                minHeight: 300,
                                flex: 1,
                            }}
                        >
                            <Tabs
                                className="flex flex-1 flex-col items-start gap-9 md:self-stretch md:px-5"
                                selectedTabClassName="!text-gray-900"
                                selectedTabPanelClassName="mx-1.5 md:mx-0 !relative tab-panel--selected"
                            >
                                <Heading
                                    size="heading2xl"
                                    as="h3"
                                    className="text-[34px] font-semibold uppercase text-blue_gray-900_01 md:text-[32px] sm:text-[30px]"
                                >
                                    <WalletOutlined style={{ fontSize: '34px', marginRight: '10px' }} />
                                    Nạp Tiền
                                </Heading>
                                <Spin spinning={isLoadingDeposit} tip="Loading...">
                                    <TabPanel
                                        key={`tab-panel$`}
                                        className="absolute mx-1.5 self-stretch md:mx-0"
                                    >
                                        <div className="w-full self-stretch">
                                            <div>
                                                <div className="flex flex-col items-start justify-center gap-2">
                                                    <Heading
                                                        as="h4"
                                                        className="text-[18px] font-medium text-gray-900_02"
                                                    >
                                                        Phương thức nạp tiền
                                                    </Heading>
                                                    <Select
                                                        defaultValue="Chọn phương thức thanh toán"
                                                        style={{ width: "200%", fontSize: '16px' }}
                                                        allowClear
                                                        options={dropDownOptions}
                                                        placeholder="Chọn phương thức thanh toán"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="mt-8 flex flex-col items-start justify-center gap-2">
                                                    <Heading
                                                        as="h6"
                                                        className="text-[18px] font-medium text-blue_gray-900_01"
                                                    >
                                                        Số tiền nạp
                                                    </Heading>
                                                    <InputNumber
                                                        value={amount}
                                                        formatter={(value) =>
                                                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ" // Thêm đơn vị VNĐ
                                                        }
                                                        parser={(value) => value.replace(/\D/g, "")} // Chuyển về số thực (loại bỏ chữ và ký tự không phải số)
                                                        onChange={(value) => setAmount(value)}
                                                        className="w-[200%] rounded-md border border-gray-300 text-lg"
                                                    />


                                                </div>
                                                <div className="mt-8 flex flex-col items-start justify-center gap-2 w-[200%px]">
                                                    <Heading
                                                        as="p"
                                                        className="text-[18px] w-[200%]  font-medium text-blue_gray-900_01"
                                                    >
                                                        Ghi chú
                                                    </Heading>
                                                    <TextArea
                                                        showCount
                                                        onChange={onChangeTextArea}
                                                        placeholder="Ghi chú nạp tiền"
                                                        style={{ height: 130, resize: "none" }}
                                                        className="w-[200%]  rounded-md border border-gray-300 text-lg"
                                                    />
                                                </div>

                                                <div className="mt-12 flex items-center gap-10">
                                                    <button
                                                        type="button"
                                                        className="text-white bg-gradient-to-br from-green-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-7 py-3 text-center me-2 mb-2"
                                                        onClick={handleSubmit}
                                                    >
                                                        Nạp tiền
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-7 py-3 text-center me-2 mb-2"
                                                    >
                                                        Hủy bỏ
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </Spin>
                            </Tabs>
                        </Content>
                    </Layout>
                </Content>
                <FooterBK
                    className="mt-10 h-[400px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto"
                />
            </Layout>
        </>
    );
}
