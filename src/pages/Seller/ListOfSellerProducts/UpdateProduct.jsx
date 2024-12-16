import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import FooterBK from "@/components/FooterBK/index.jsx";
import {Button, Image, Layout, message, Upload} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';
import {useGetItemDetailQuery, useGetUpdateItemMutation} from "@/services/item.service.js";
import React, {useState, useEffect} from "react";
import useHookUploadImage from "@/hooks/useHookUploadImage.js";
import {Textarea} from "@material-tailwind/react";
import { PlusOutlined} from "@ant-design/icons";


const {Content, Sider} = Layout;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function UpdateProduct() {
    const {id} = useParams();
    const {data, error,loading} = useGetItemDetailQuery({id}); // Ensure `id` is a number
    const [updateItem] = useGetUpdateItemMutation();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [spinning, setSpinning] = React.useState(false);
    const [intervalId, setIntervalId] = React.useState(null);
    // const [itemName, setItemName] = useState(data?.itemName);
    // const [priceBuyNow, setPriceBuyNow] = useState(data?.priceBuyNow);
    // const [itemDescription, setItemDescription] = useState(data?.itemDescription);
    // const [itemCondition, setItemCondition] = useState(data?.itemCondition);

    // const [imgItem, setImgItem] = useState([]);
    // const [itemId, setItemId] = useState({id});
    // const [scId, setScId] = useState(1);
    // const [auctionType, setAuctionType] = useState(1);
    const [percent, setPercent] = React.useState(0);
    const [updatedData, setUpdatedData] = useState({
        itemName: "",
        itemDescription: "",
        priceBuyNow: "",
        itemCondition: "",
        itemStatus: data?.itemStatus,
        images: [],
        sc_id: data?.scId?.sub_category_id || 1,
        auction_type: data?.auctionType?.act_id || "",
    });

    useEffect(() => {
        if (data) {
            setUpdatedData({
                itemName: data?.itemName || "",
                itemDescription: data?.itemDescription || "",
                priceBuyNow: data?.priceBuyNow || "",
                itemCondition: data?.itemCondition || "",
                itemStatus: data?.itemStatus || "",
                images: data?.images || [],
                sub_category: updatedData?.scId?.sub_category_id || "",
                auction_type: data?.auctionType?.act_id || "",
                thumbnail: data?.thumbnail,
            });

            // Cập nhật fileList với hình ảnh cũ (nếu có)
            const oldImages = data.images.map((image) => ({
                uid: image.idImage, // Sử dụng ID làm UID duy nhất
                name: `image_${image.idImage}`,
                status: 'done',
                url: image.image, // URL của ảnh
            }));
            setFileList(oldImages);
        }
    }, [data]);
    const {UploadImage} = useHookUploadImage();

    const handleChangeImage = ({ fileList: newFileList }) => {
        setFileList(newFileList); // Cập nhật UI

        setUpdatedData((prevData) => {
            const updatedImages = newFileList.map((file) => {
                // Kiểm tra nếu URL hợp lệ
                const imageUrl = file.url || file.response?.url;
                if (!imageUrl) {
                    console.error('No image URL found for file', file);
                    return null; // Tránh lưu ảnh không có URL
                }

                if (file.idImage) {
                    return {
                        idImage: file.idImage,
                        image: imageUrl, // Giữ URL hoặc nhận URL mới
                    };
                }

                return {
                    idImage: null, // Mặc định cho ảnh mới
                    image: imageUrl,
                };
            }).filter(Boolean); // Loại bỏ các phần tử null nếu không có URL

            return {
                ...prevData,
                images: updatedImages, // Cập nhật danh sách ảnh
            };
        });
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined/>
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    const navigate = useNavigate();
    const handleImgUpload = async () => {
        if (fileList.length === 0) {
            message.warning("No files uploaded.");
            return [];
        }

        const uploadedImages = [];
        for (const file of fileList) {
            if (file.originFileObj) { // Đảm bảo file.originFileObj tồn tại
                try {
                    const imageUrl = await UploadImage(file.originFileObj); // Upload và lấy URL
                    console.log("Uploaded Image URL:", imageUrl); // In ra URL để kiểm tra
                    uploadedImages.push({ image_url: imageUrl });
                } catch (err) {
                    console.error("Error uploading image:", err);
                    message.error("Error uploading an image.");
                }
            } else {
                console.error("File is missing originFileObj:", file);
                message.warning("File is missing originFileObj.");
            }
        }

        if (uploadedImages.length === 0) {
            message.error("No images were uploaded successfully.");
        }

        return uploadedImages;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUpdatedData((prevData) => {
            // Handle special cases for scId and auctionType
            if (name === "sub_category") {
                return {
                    ...prevData,
                    scId: parseInt(value), // Update scId as a plain integer
                };
            }

            if (name === "auction_type") {
                return {
                    ...prevData,
                    auctionType: parseInt(value), // Update auctionType as a plain integer
                };
            }

            // Default case for other fields
            return {
                ...prevData,
                [name]: value,
            };
        });
    };




    const handleUpdate = async (e) => {
        if (e) e.preventDefault();

        const uploadedImages = await handleImgUpload(); // Start image upload
        if (uploadedImages.length === 0) {
            message.error("Please upload at least one image.");
            setSpinning(false); // Stop loader if no images uploaded successfully
            return;
        }

        // Lấy các giá trị từ trạng thái (updatedData)
        const {
            itemName,
            itemDescription,
            itemCondition,
            priceBuyNow,
            scId,
            auctionType,
        } = updatedData;

        // Ensure priceBuyNow is a valid number
        const parsedPrice = parseFloat(priceBuyNow);
        if (isNaN(parsedPrice)) {
            message.error("Please provide a valid number for price.");
            setSpinning(false); // Stop loader if price is invalid
            return;
        }

        // Prepare payload with form data
        const payload = {
            item_id: id,
            item_name: itemName,
            item_description: itemDescription,
            item_condition: itemCondition,
            price_buy_now: parsedPrice, // Ensure it's a valid number
            images: uploadedImages,
            sc_id: scId,
            auction_type: auctionType,
        };

        console.log(payload); // Ensure this matches the backend structure

        try {
            // Make the API call to update the item
            const response = await updateItem({ id, body: payload }).unwrap();

            // Show success message
            message.success(response.message);

            // Navigate to the product list page
            navigate("/Dashboard-seller/ListOfSellerProduct");
            console.log("Response", response);
        } catch (err) {
            // Handle errors and display a message to the user
            const errorMessage = err?.data?.message || "An error occurred during the update.";
            console.log("Response", errorMessage);
            message.error(errorMessage);
        } finally {
            // Stop the loader regardless of the result
            setSpinning(false);
            setPercent(0); // Reset progress percentage
        }
    };

    const handleRemove = (file) => {
        setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid)); // Cập nhật danh sách UI

        setUpdatedData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((img) => img.image !== file.url), // Xóa ảnh trong state
        }));
    };



    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(prevState => !prevState);
    };






    if (loading) {

        return <div>Loading...</div>;
    }

    if (error) {
        console.error(error); // Log the error for debugging
        return <div>Error fetching auction data</div>;
    }
    if (!data) {
        return <div>No data available for this product</div>;
    }

    return (
        <>
            <Header/>
            <Layout className="min-h-screen bg-gray-50 p-10">
                <Sider width={250} className="bg-gray-200">
                    <Sidebar/>
                </Sider>

                <Layout className="flex-1 p-6 bg-gray-50">
                    <Content className="bg-white p-8 w-[800px] mx-auto shadow-lg border-4 border-gray-800 rounded-lg">
                        <h1 className="text-3xl font-semibold text-center text-gray-800 mt-12 mb-6">
                            Kết quả thẩm định sản phẩm
                        </h1>

                        {/* Display reason based on status */}
                        {data?.itemStatus === "PENDING" && (
                            <div className="mb-6 bg-yellow-100 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lý do chờ xử lý:</h2>
                                <p className="text-lg text-gray-600">{data?.reason}</p>
                            </div>
                        )}

                        {data?.itemStatus === "PENDING_AUCTION" && (
                            <div className="mb-6 bg-yellow-100 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lý do chờ đấu giá:</h2>
                                <p className="text-lg text-gray-600">{data?.reason}</p>
                            </div>
                        )}

                        {data?.itemStatus === "ACCEPTED" && (
                            <div className="mb-6 bg-green-100 p-6 rounded-lg shadow-md border-l-4 border-green-500">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lý do đồng ý:</h2>
                                <p className="text-lg text-gray-600">{data?.reason}</p>
                            </div>
                        )}

                        {data?.itemStatus === "REJECTED" && (
                            <div className="mb-6 bg-red-100 p-6 rounded-lg shadow-md border-l-4 border-red-500">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lý do từ chối:</h2>
                                <p className="text-lg text-gray-600">{data?.reason || "Không có lý do từ chối được cung cấp."}</p>
                            </div>
                        )}

                        {/* Product Information */}
                        <div className="mt-6 space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thông tin sản phẩm</h2>

                            {/* Flexbox for two-column layout */}
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Left Column: itemName, Price, Description */}
                                <div className="flex-1 space-y-4">
                                    {/* Product Name Input */}
                                    <div>
                                        <label htmlFor="itemName" className="block text-lg font-semibold text-gray-600">
                                            Tên sản phẩm
                                        </label>
                                        <input
                                            type="text"
                                            id="itemName"
                                            name="itemName" // Thêm thuộc tính `name`
                                            value={updatedData.itemName}
                                            onChange={handleChange} // Gọi hàm `handleChange`
                                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Product Condition Select */}
                                    <div>
                                        <label htmlFor="itemCondition"
                                               className="block text-lg font-semibold text-gray-600">
                                            Tình trạng sản phẩm
                                        </label>
                                        <select
                                            id="itemCondition"
                                            name="itemCondition"
                                            value={updatedData?.itemCondition}
                                            onChange={handleChange}
                                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="LIKE_NEW">Như mới</option>
                                            <option value="USED_GOOD">Đã qua sử dụng-Tốt</option>
                                            <option value="USED_FAIR">Đã qua sử dụng-Chấp nhận</option>
                                            <option value="REFURBISHED">Hàng tân trang</option>
                                        </select>
                                    </div>

                                    {/* Price Input */}
                                    <div>
                                        <label htmlFor="priceBuyNow"
                                               className="block text-lg font-semibold text-gray-600">
                                            Giá mong muốn
                                        </label>
                                        <input
                                            type="text"
                                            id="priceBuyNow"
                                            name="priceBuyNow"
                                            value={updatedData.priceBuyNow || ""} // Giá trị định dạng
                                            onChange={handleChange}  // Gọi hàm xử lý
                                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Nhập giá tiền"
                                        />
                                    </div>

                                    {/* Description Textarea */}
                                    <div className="space-y-4">
                                        <label htmlFor="itemDescription"
                                               className="block text-lg font-semibold text-gray-700 mb-2">Mô tả</label>
                                        <button
                                            onClick={toggleDescription}
                                            className="px-6 py-2 text-blue-600 font-semibold text-lg rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                                        >
                                            {showDescription ? 'Ẩn mô tả' : 'Hiển thị mô tả'}
                                        </button>

                                        {showDescription && (
                                            <div className="mt-4">
                                                <Textarea
                                                    id="itemDescription"
                                                    name="itemDescription"
                                                    value={updatedData.itemDescription}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out h-[500px]"
                                                    placeholder="Nhập mô tả ở đây..."
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column: Product Images and Category */}
                                <div className="w-full">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Hình ảnh sản phẩm</h3>
                                    <Upload
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" // Đường dẫn upload
                                        listType="picture-card"
                                        fileList={fileList} // Liên kết với danh sách file
                                        onPreview={handlePreview} // Hiển thị xem trước ảnh
                                        onChange={handleChangeImage} // Thêm logic thay đổi
                                        onRemove={handleRemove} // Logic xóa ảnh
                                    >
                                        {fileList.length >= 8 ? null : uploadButton}
                                    </Upload>


                                    {previewImage && (
                                        <Image
                                            wrapperStyle={{
                                                display: "none",
                                            }}
                                            preview={{
                                                visible: previewOpen,
                                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                                afterOpenChange: (visible) => !visible && setPreviewImage(""),
                                            }}
                                            src={previewImage}
                                        />
                                    )}
                                </div>

                                {/* Category and Auction Type */}
                                <div>
                                    <label htmlFor="sub_category" className="block text-lg font-semibold text-gray-600">
                                        Subcategory
                                    </label>
                                    <select
                                        id="sub_category"
                                        name="sub_category"
                                        value={updatedData.scId || ""}
                                        onChange={handleChange}
                                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Subcategory</option>
                                        <option value="1">Điện thoại</option>
                                        <option value="2">Máy tính</option>
                                        {/* Add other options here */}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="auction_type" className="block text-lg font-semibold text-gray-600">
                                        Auction Type
                                    </label>
                                    <select
                                        id="auction_type"
                                        name="auction_type"
                                        value={updatedData.auctionType || ""}
                                        onChange={handleChange}
                                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Auction Type</option>
                                        <option value="1">TRADITIONAL</option>
                                        <option value="2">ANONYMOUS</option>
                                        {/* Add other options here */}
                                    </select>
                                </div>


                            </div>
                        </div>


                        <div className="flex justify-center space-x-3 mt-8 w-full">
                            {/* Resubmit Button */}
                            <Button
                                className="flex-1 px-6 py-3 bg-gradient-to-b from-[#45ADA8] to-[#9DE0AD] text-gray-700 font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
                                onClick={handleUpdate} // Gọi hàm update khi nhấn nút
                            >
                                Đăng lại sản phẩm
                            </Button>
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <FooterBK/>
        </>
    )
        ;
}
