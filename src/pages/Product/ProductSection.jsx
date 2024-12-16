import React, {useState, Suspense, useEffect} from "react";
import {Text, SelectBox, Img, Heading} from "../../components";
import Pagination from "../../components/Pagination";
import ProductDetails21 from "../../components/ProductDetails21";
import {Tag, Modal, Button} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";
import RegisterAuction from "../RegisterAuction-Buyer/RegisterAuction";
import {Checkbox, Input} from "@material-tailwind/react";
import {useDispatch, useSelector} from "react-redux";
import {useGetFeatureItemsQuery, useGetItemsFilterQuery} from "../../services/item.service"
import {setFilters} from "@/redux/item/itemSlice.js";





export default function ProductSection({selectedBrands, onTagClose}) {
    const dispatch = useDispatch();
    const filters = useSelector(
        (state) =>
            state.item || {keyword: "", min: 0, max: 1600000000, scIds: []}
    );
    const {data, error,
        isLoading,
        isFetching,
        isSuccess} = useGetItemsFilterQuery(filters);
    if (error) return <p>Error: {error.message}</p>;
    console.log("DATA ITEM: ", data)

    const handleFilterChange = (newFilters) => {
        const updatedFilters = { ...filters, ...newFilters };
        dispatch(setFilters(updatedFilters));
    };
    const handleClose = (brandName) => {
        onTagClose(brandName);
    };
    // console.log("DATA ITEM: ", data)


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <form>
                    <div className="mb-4">
                        <Heading
                            size="headinglg"
                            as="h1"
                            className="text-xl font-semibold text-gray-900 text-center"
                        >
                            Đăng ký tham gia đấu giá
                        </Heading>
                    </div>
                    <div>
                        <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">
                            Tiền cọc
                        </label>
                        <div className="mt-1">
                            <Input
                                id="deposit"
                                name="deposit"
                                type="text"
                                placeholder="Nhập số tiền cọc"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Nội dung
                        </label>
                        <div className="mt-1">
                            <Input
                                id="content"
                                name="content"
                                type="text"
                                placeholder="Nội dung đấu giá"
                                // value={formData.content}
                                // onChange={handleChange}
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Total Amount Field */}
                    <div className="mt-4">
                        <label htmlFor="total" className="block text-sm font-medium text-gray-700">
                            Tổng tiền
                        </label>
                        <div className="mt-1">
                            <Input
                                id="total"
                                name="total"
                                type="text"
                                placeholder="Nhập tổng tiền"
                                // value={formData.total}
                                // onChange={handleChange}
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Agreement Checkbox */}
                    <div className="mt-4">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="agreement"
                                className="h-5 w-5"
                            />
                            <span className="text-sm leading-5 text-gray-700">
                                Tôi đã đọc và nghiên cứu đầy đủ các thông tin của hồ sơ tham dự đấu giá. Tôi cam kết thực hiện đúng các quy định trong hồ sơ và quy định pháp luật liên quan.
                            </span>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-indigo-200 focus:shadow-outline-indigo active:bg-indigo-200 transition duration-150 ease-in-out"
                        >
                            ĐĂNG KÝ THAM GIA ĐẤU GIÁ
                        </button>
                        <Button
                            onClick={handleCancel}
                            className="mt-4 w-full text-gray-600 hover:text-gray-800"
                        >
                            Đóng
                        </Button>
                    </div>
                </form>
            </Modal>
            <div className="mt-10 flex flex-col items-center self-stretch">
                <div className="flex items-center justify-between w-full">
                    <span className="text-blue_gray-900_01">Filter:</span>

                    <div className="flex items-center gap-2 ml-4">
                        {selectedBrands.map((brand) => (
                            <Tag
                                key={brand}
                                closeIcon={<CloseCircleOutlined/>}
                                onClose={() => handleClose(brand)}
                            >
                                {brand}
                            </Tag>
                        ))}
                    </div>

                </div>

                <a href="/auction">
                    <div
                        className="mx-7 mt-5 grid grid-cols-4 justify-center gap-3.5 self-stretch px-1 md:mx-0 md:grid-cols-2 sm:grid-cols-1 ml-auto">

                        {/*<Suspense fallback={<div>Loading feed...</div>}>*/}
                        {/*{data.item && data.item.length > 0 ? (*/}
                        {/*    data.item.map((item, index) => (*/}
                        {/*        <div key={`itemsGrid-${index}`}>*/}
                        {/*            <ProductDetails21 product={item} onBidClick={showModal}/>*/}
                        {/*        </div>*/}
                        {/*    ))*/}
                        {/*) : (*/}
                        {/*    <div>No items found.</div> // Thông báo khi không có sản phẩm*/}
                        {/*)}*/}

                        {/*</Suspense>*/}
                    </div>
                </a>

                <div className="my-10">
                    <Pagination/>
                </div>
            </div>
        </>
    );
}
