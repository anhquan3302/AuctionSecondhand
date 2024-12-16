// import { Text, Heading, RatingBar, Img } from "./..";
// import React, { useState, useEffect } from "react";
// import { Button, Input } from "@material-tailwind/react";
// import { Image, Statistic, Col, Row, Checkbox, Modal, message } from 'antd';
// import { useNavigate } from "react-router-dom";
// import { useAuctionRegisterMutation, useGetCheckAuctionRegisterQuery } from "@/services/auctionRegistrations.service.js";
// import { selectIsLoggedIn } from "../../redux/auth/authSlice";
// import { setCredentials } from "@/redux/auth/authSlice.js";
// import { setError, setLoading } from "@/redux/user/userSlice.js";
// import { useGetItemsBySellerQuery } from "../../services/item.service";
// import { useSelector } from "react-redux";

// const SellerItems = ({ userId = 4 }) => {
//     const { data, error, isLoading } = useGetItemsBySellerQuery({ userId });
//     const [isModalOpen, setIsModalOpen] = useState(false);


//     useEffect(() => {
//         if (data) {
//             console.log(data);  // Kiểm tra dữ liệu khi trả về
//         }
//     }, [data]);

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     // Sửa lại việc truy xuất data để lấy danh sách items
//     const items = Array.isArray(data?.data?.data) ? data.data.data : [];


    
//     const showModal = () => {
//         if (!isLoggedIn) {
//             message.warning("Bạn cần đăng nhập để tham gia đấu giá!");
//             navigate("/login");
//         } else {
//             setIsModalOpen(true);
//         }
//     };

//     const handleOk = () => {
//         setIsModalOpen(false);
//     };

//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };

//     return (
//         <>
//             <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
//                 <form>
//                     <div className="mt-4">
//                         <div className="flex items-center gap-2">
//                             <Checkbox
//                                 id="agreement"
//                                 className="h-5 w-5"
//                             />
//                             <span className="text-sm leading-5 text-gray-700">
//                                 Tôi đã đọc và nghiên cứu đầy đủ các thông tin của hồ sơ tham dự đấu giá. Tôi cam kết thực hiện đúng các quy định trong hồ sơ và quy định pháp luật liên quan.
//                             </span>
//                         </div>
//                     </div>
//                     {/* Submit Button */}
//                     <div className="mt-4">
//                         <button
//                             type="submit"
//                             className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-indigo-200 focus:shadow-outline-indigo active:bg-indigo-200 transition duration-150 ease-in-out"
                           
//                         >
//                             ĐĂNG KÝ THAM GIA ĐẤU GIÁ
//                         </button>
//                         <Button
//                             onClick={handleCancel}
//                             className="mt-4 w-full text-gray-600 hover:text-gray-800"
//                         >
//                             Đóng
//                         </Button>
//                     </div>
//                 </form>
//             </Modal>
//             <div

//                 className={`flex flex-col items-center w-full border-gray-200 border border-solid bg-bg-white rounded-lg overflow-hidden`}
//             >
//                 <div className="relative self-stretch bg-bg-white px-3 py-3 sm:py-5">
//                     <div className="w-[230px] h-[300px]">
//                         <Image
//                             // src={product.thumbnail} // Link ảnh từ product data
//                             alt="Fashion Image"
//                             className="w-full h-full object-cover rounded-lg"
//                         />
//                     </div>
//                     <div
//                         className="absolute top-2 right-2 bg-pink-300 bg-opacity-70 text-white px-1.5 py-0.5 rounded-md ">
//                         {/* <Countdown
//                             title="Auction ends in"
//                             value={deadline}
//                             format="D Ngày H giờ m phút s giây"
//                             valueStyle={{ fontWeight: 'normal', fontSize: '15px' }}
//                         /> */}
//                     </div>

//                 </div>


//                 <div className="mx-3.5 mb-6 flex flex-col items-start gap-2.5 self-stretch">
//                     <button
//                         className="text-[12px] font-normal text-blue_gray-600_01 hover:text-blue-500 transition duration-300"
//                     >
//                         {/* {product.scId.sub_category} */}
//                     </button>
//                     <button
//                         className="w-full text-[16px] font-semibold leading-[150%] text-blue_gray-900_01 hover:text-blue-500 transition duration-300"
//                         // onClick={() => handleNavigateToAuction(product.itemId, product.auction.auction_id)}
//                         >
//                         {/* {product.itemName} */}
//                     </button>

//                     <div className="flex items-start gap-2.5 self-stretch">
//                         <div className="flex items-center">
//                             <svg
//                                 className="w-4 h-4 text-yellow-300 me-1"
//                                 aria-hidden="true"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="currentColor"
//                                 viewBox="0 0 22 20"
//                             >
//                                 <path
//                                     d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                             </svg>
//                             <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
//                                 4.95
//                             </p>
//                             <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
//                             <a
//                                 href="#"
//                                 className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
//                             >
//                                 73 reviews
//                             </a>
//                         </div>
//                     </div>
//                     <div className="flex flex-wrap items-center gap-2.5 self-stretch">
//                         <Heading
//                             size="heading2xl"
//                             as="h6"
//                             className="flex text-[18px] font-semibold text-blue_gray-900_01"
//                         >
//                             {/* <span>{product.auction?.start_price}</span> */}
//                             <a href="#" className="inline underline">
//                                 đ
//                             </a>
//                         </Heading>
//                     </div>
//                     {/* {isRegistered ? (
//                         <Button
//                             ripple={false}
//                             fullWidth
//                             className="bg-gray-500 text-white"
//                             disabled
//                         >
//                             Đã tham gia đấu giá
//                         </Button>
//                     ) : (
//                         <Button
//                             ripple={false}
//                             fullWidth
//                             className="bg-blue-gray-900/10 text-blue-gray-900 hover:scale-105"
//                             onClick={showModal}
//                         >
//                             Tham gia đấu giá
//                         </Button>
//                     )} */}
//                 </div>
//             </div>
//         </>
//     );

// };

// export default SellerItems;
