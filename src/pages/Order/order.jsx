import React, {useState, useEffect} from 'react';
import Header2 from '../../components/Header2'
import FooterBK from '../../components/FooterBK'
import {useNavigate, useParams} from 'react-router-dom';
import {message, Button, Spin} from 'antd';
import {useCreateOrderMutation, useGetOrderQuery} from '../../services/order.service';
import {useGetAuctionByIdQuery} from '../../services/auction.service';
import {useGetAddressOrderQuery} from '../../services/address.service';
import apiGhn from "@/services/apiGhn.service.js";
import {useGetBalanceQuery} from "@/services/walletCustomerService.js";


export default function OrderForm() {
    const {id} = useParams();
    const [orderDetails, setOrderDetails] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        shippingMethod: 'Free ship',
        note: '',
        auctionId: id,
        paymentMethod: '',
        orderCode: '',
    });
    const [spinning, setSpinning] = React.useState(false);
    const [percent, setPercent] = React.useState(0);
    const [intervalId, setIntervalId] = React.useState(null);
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(amount);
    };
    const {data: auctionData, error: auctionError, isLoading: auctionLoading} = useGetAuctionByIdQuery(id);
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    const [createOrder, {isLoading}] = useCreateOrderMutation();
    const {data: addressData, error: addressError, isLoading: addressLoading} = useGetAddressOrderQuery(userId);
    const auctionAmount = auctionData?.data?.amount || 0; // Nếu không có amount, đặt giá trị mặc định là 0
    const commission = auctionAmount * 0.05; // Hoa hồng là 5% của giá đấu
    const totalAmount = auctionAmount + commission;
    const {refetch} = useGetOrderQuery({page: 0, limit: 10});
    const navigate = useNavigate();
    //console.log("auctionData", auctionData)
    const {isLoading: isLoadingBalance} = useGetBalanceQuery();
    const fetchFee = async () => {
        const data = {
            payment_type_id: 2,
            note: orderDetails.note,
            required_note: "KHONGCHOXEMHANG",
            return_district_id: null,
            return_ward_code: "",
            client_order_code: "",
            to_name: orderDetails?.fullName,
            to_phone: orderDetails?.phoneNumber,
            to_address: "DIA O DAU TU TIM",
            to_ward_name: addressData?.ward_name,
            to_district_name: addressData?.district_name,
            to_province_name: addressData?.province_name,
            cod_amount: 0,
            weight: 5,
            length: 3,
            width: 10,
            height: 5,
            cod_failed_amount: 2000,
            pick_station_id: 1444,
            deliver_station_id: null,
            insurance_value: 1000000,
            service_id: 0,
            service_type_id: 2,
            pick_shift: [2],
            items: [
                {
                    name: auctionData?.data.itemName,
                    quantity: 1,
                    price: auctionData?.data.amount,
                },
            ],
        };

        try {
            const res = await apiGhn.create_order_service(data);
            message.success(res.message_display);
            //console.log("Response from GHN:", res);
            return res?.data?.data;
        } catch (error) {
            message.error(error.message_display || "Failed to fetch shipping fee.");
            throw error;
        }
    };
    const showLoader = () => {
        setSpinning(true);
        let ptg = -10;
        const id = setInterval(() => {
            if (!isLoading && percent >= 100) {
                clearInterval(id);
                setTimeout(() => {
                    setSpinning(false);
                    setPercent(0);
                }, 500);
                return;
            }
            ptg += 5;
            setPercent(ptg);
            if (ptg > 100) ptg = 0;
        }, 200);
        setIntervalId(id);
    };
    //console.log("auctionData?.itemName", orderDetails?.fullName)
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     showLoader();
    //
    //     try {
    //         const result = await createOrder(orderDetails).unwrap();
    //         message.success('Đơn hàng đã được tạo thành công!');
    //         const createOrderResult = await fetchFee();
    //         message.success(result.message)
    //         //message.success(createOrderResult.message_display)
    //         navigate('/OrderManagementBuyer');
    //         refetch();
    //     } catch (error) {
    //         console.error("Create order error:", error);
    //         const errorMessage = error?.data?.message + " Vui lòng kiểm tra lại thông tin ở danh sách đơn hàng" || "An error occurred while creating the order";
    //         message.error(errorMessage);
    //     } finally {
    //         setSpinning(false);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        showLoader();

        try {
            const createOrderResult = await fetchFee();
            const orderCode = createOrderResult?.order_code; //

            // Cập nhật orderDetails với orderCode
            const updatedOrderDetails = {...orderDetails, orderCode};
            //console.log("orderCode ", orderCode)
            const result = await createOrder(updatedOrderDetails).unwrap();
            message.success('Đơn hàng đã được tạo thành công!');
            message.success(result.message);
            navigate('/OrderManagementBuyer');
            isLoadingBalance();
            refetch();
        } catch (error) {
            console.error("Create order error:", error);
            const errorMessage = error?.data?.message + " Vui lòng kiểm tra lại thông tin ở danh sách đơn hàng" || "An error occurred while creating the order";
            message.error(errorMessage);
        } finally {
            setSpinning(false);
        }
    };
    React.useEffect(() => {
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [intervalId]);
    return (
        <>
            <Header2/>
            <Spin spinning={spinning} percent={percent} fullscreen/>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                            <span
                                className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                Checkout
                            </span>
                        </li>
                    </ol>
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Thông tin đơn
                                    hàng</h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="your_name"
                                               className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Họ
                                            và Tên </label>
                                        <input type="text"
                                               id="your_name"
                                               value={orderDetails.fullName}
                                               onChange={(e) => setOrderDetails({
                                                   ...orderDetails,
                                                   fullName: e.target.value
                                               })}
                                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                               placeholder="Bonnie Green" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="phone-input-3"
                                               className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Số
                                            điện thoại* </label>
                                        <div className="flex items-center">
                                            <button
                                                id="dropdown-phone-button-3"
                                                data-dropdown-toggle="dropdown-phone-3"
                                                className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                                type="button"
                                            >
                                                {/* Icon cờ Việt Nam */}
                                                <svg fill="none" aria-hidden="true" className="me-2 h-4 w-4"
                                                     viewBox="0 0 20 15">
                                                    <rect width="19.6" height={14} y=".5" fill="#D02F44" rx={2}/>
                                                    <path fill="#FFDA44"
                                                          d="M9.8 4.2l1.18 3.63h3.82l-3.1 2.25 1.18 3.63L9.8 10.46l-3.1 2.25 1.18-3.63-3.1-2.25h3.82L9.8 4.2z"/>
                                                </svg>
                                                +84
                                                {/* Mũi tên dropdown */}
                                                <svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true"
                                                     xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                                                     fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round"
                                                          strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7"/>
                                                </svg>
                                            </button>
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    id="phone-input"
                                                    className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                                                    pattern="(0|\+84)[3|5|7|8|9][0-9]{8}"
                                                    placeholder="0123-456-789"
                                                    required
                                                    value={orderDetails.phoneNumber}
                                                    onChange={(e) => setOrderDetails({
                                                        ...orderDetails,
                                                        phoneNumber: e.target.value
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email"
                                               className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Email </label>
                                        <input type="email"
                                               id="email"
                                               value={orderDetails.email}
                                               onChange={(e) => setOrderDetails({
                                                   ...orderDetails,
                                                   email: e.target.value
                                               })}
                                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                               placeholder="name@flowbite.com" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="company_name"
                                               className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Ghi
                                            chú </label>
                                        <input type="text"

                                               value={orderDetails.note}
                                               onChange={(e) => setOrderDetails({
                                                   ...orderDetails,
                                                   note: e.target.value
                                               })}
                                               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                               placeholder="Ghi chú" required/>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label htmlFor="select-city-input-3"
                                               className="block text-sm font-medium text-gray-900 dark:text-white"> Tỉnh/Thành
                                            phố* </label>
                                    </div>
                                    <input
                                        type="text"

                                        value={addressData?.province_name || ""}
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        required/>
                                </div>
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label htmlFor="select-city-input-3"
                                               className="block text-sm font-medium text-gray-900 dark:text-white"> Huyện/Quận </label>
                                    </div>
                                    <input type="text"
                                           value={addressData?.district_name || ""}
                                           className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                           required/>

                                </div>
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label htmlFor="select-city-input-3"
                                               className="block text-sm font-medium text-gray-900 dark:text-white"> Phường/Xã </label>
                                    </div>
                                    <input type="text"
                                           value={addressData?.ward_name || ""}
                                           className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                           required/>

                                </div>
                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label htmlFor="select-city-input-3"
                                               className="block text-sm font-medium text-gray-900 dark:text-white"> Địa
                                            chỉ </label>
                                    </div>
                                    <input type="text" value={addressData?.address_name || ""}
                                           className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                           required/>

                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Phương thức thanh
                                    toán</h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">


                                    {/* Phương thức thanh toán Ví hệ thống */}
                                    <div
                                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-start">
                                            <div className="ms-4 text-sm">
                                                <input
                                                    id="wallet-payment"
                                                    type="radio"
                                                    name="payment-method"
                                                    value="WALLET_PAYMENT"
                                                    onChange={(e) => setOrderDetails({
                                                        ...orderDetails,
                                                        paymentMethod: e.target.value
                                                    })}

                                                    className="h-4 w-4"
                                                />
                                                <label htmlFor="wallet-payment"
                                                       className="ms-2 font-medium text-gray-900 dark:text-white">
                                                    Ví hệ thống
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Phương thức giao
                                    hàng</h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                                    <div
                                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    id="fedex"
                                                    aria-describedby="fedex-text"
                                                    type="radio"
                                                    name="delivery-method"
                                                    value="Free ship"  // Set a specific value for this radio button
                                                    onChange={(e) => setOrderDetails({
                                                        ...orderDetails,
                                                        shippingMethod: e.target.value
                                                    })}
                                                    checked={orderDetails.shippingMethod === "Free ship"}  // Ensure the correct radio is selected
                                                    className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                                />
                                            </div>
                                            <div className="ms-4 text-sm">
                                                <label htmlFor="fedex"
                                                       className="font-medium leading-none text-gray-900 dark:text-white"> Free
                                                    ship </label>
                                                <p id="fedex-text"
                                                   className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Free
                                                    ship toàn quốc</p>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <div className="flow-root">
                                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                    <div
                                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thông
                                            tin sản phẩm</h3>
                                        <img className="rounded-t-lg w-full object-cover h-56"
                                             src={auctionData?.data.thumbnail || "/docs/images/blog/image-1.jpg"}
                                             alt={auctionData?.data.itemName || "Image"}/>
                                        <div className="p-5">
                                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{auctionData?.data.itemName}</h4>
                                            <p className="text-base text-gray-700 dark:text-gray-400 mb-5 leading-relaxed">
                                                {auctionData?.data.description}
                                            </p>
                                            <p className="text-lg text-gray-800 font-semibold mb-3">
                                                Người bán: <span
                                                className="text-blue-600">{auctionData?.data.seller}</span>
                                            </p>
                                            <p className="text-xl text-red-600 font-semibold mb-5">
                                                {formatCurrency(auctionAmount)}
                                            </p>
                                        </div>
                                    </div>
                                    <dl className="flex items-center justify-between gap-4 py-3 mt-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">Tổng tiền</dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">{formatCurrency(totalAmount)}</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    //type="submit"

                                    // onClick={() => {
                                    //     showLoader(); // Show loader before submitting
                                    //     handleSubmit(); // Submit form
                                    // }}
                                    onClick={handleSubmit}
                                    // onClick={showLoader}
                                    // disabled={isLoading || auctionLoading}
                                    className={`flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-medium 
                                    text-black bg-gradient-to-t from-blue-400 to-blue-600 
                                     hover:from-blue-500 hover:to-blue-700
                                     active:from-blue-gray-600 active:to-blue-800
                                     focus:outline-none focus:ring-4 focus:ring-blue-300 
                                     transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95`}>
                                    Thanh toán
                                    {/*{isLoading || auctionLoading ? (*/}
                                    {/*    <>*/}
                                    {/*        Đang xử lý...*/}
                                    {/*    </>*/}
                                    {/*) : (*/}
                                    {/*    'Thanh toán'*/}
                                    {/*)}*/}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            <FooterBK/>
        </>
    )
}