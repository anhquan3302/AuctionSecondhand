import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import {ButtonDH, Heading, TextArea,} from "../../../components";
import React, {useEffect, useRef, useState} from "react";
import {Option, Select} from "@material-tailwind/react";
import {PlusOutlined} from '@ant-design/icons';
import {
    Breadcrumb,
    Checkbox,
    Descriptions,
    Image,
    Input,
    Layout,
    message,
    Space,
    Spin,
    theme,
    Typography,
    Upload
} from 'antd';
import FooterBK from "@/components/FooterBK/index.jsx";
import {useRegisterItemMutation} from "@/services/item.service.js";
import useHookUploadImage from "@/hooks/useHookUploadImage.js";
import {useGetAuctionTypeQuery} from "@/services/auctionType.service.js";
import {useGetCategoriesQuery} from "@/services/category.service.js";
import TextEditor from "@/components/TextEditor/index.jsx";
import {useNavigate} from "react-router-dom";

const {Text, Link} = Typography;
const {Content, Sider} = Layout;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function RegisterProductPage() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [itemName, setItemName] = useState("");
    const [priceBuyNow, setPriceBuyNow] = useState(0);
    const [itemDescription, setItemDescription] = useState("");
    const [itemCondition, setItemCondition] = useState("NEW");
    const [imgItem, setImgItem] = useState([]);

    const [itemNameError, setItemNameError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [scId, setScId] = useState(0);
    const [auctionType, setAuctionType] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);

    // const [spinning, setSpinning] = React.useState(false);
    // const [percent, setPercent] = React.useState(0);
    const [spinning, setSpinning] = React.useState(false);
    const [percent, setPercent] = React.useState(0);
    const [intervalId, setIntervalId] = React.useState(null);
    const [priceError, setPriceError] = useState(""); // Quản lý lỗi

    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const {UploadImage} = useHookUploadImage();
    const {
        data: auctionTypes,
        error: errorAuctionType,
        isLoading: isloadingAuctionType,
    } = useGetAuctionTypeQuery()

    const {
        data: categories,
        error: errorCategories,
        isLoading: isloadingCategories,
    } = useGetCategoriesQuery();
    // console.log("DATA CATEGORIES: ", categories)
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({fileList: newFileList}) => setFileList(newFileList);
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

    const validateItemName = (name) => {
        if (!name) {
            return "Tên sản phẩm không được để trống.";
        }
        if (name.length < 3 || name.length > 50) {
            return "Tên sản phẩm phải có từ 3 đến 50 ký tự.";
        }
        return "";
    };

    const handleItemNameChange = (e) => {
        const name = e.target.value;
        setItemName(name);
        setItemNameError(validateItemName(name)); // Kiểm tra ngay khi nhập
    };



    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (!/^\d*\.?\d+$/.test(value) || parseFloat(value) <= 0) {
            setPriceError("Giá mua ngay phải là số dương hợp lệ.");
        }
        else if (parseFloat(value) > 10000000000) {
            setPriceError("Giá mua ngay không được vượt quá 2 tỷ.");
        }
        else {
            setPriceError("");
        }
        setPriceBuyNow(value);
    };




    const handleDescriptionChange = (value) => {
        setItemDescription(value);
        // Validate: Kiểm tra độ dài mô tả
        if (value.length < 20) {
            setDescriptionError("Mô tả sản phẩm phải ít nhất 20 ký tự.");
        } else if (value.length >= 1000) {
            setDescriptionError("Mô tả sản phẩm không được vượt quá 1000 ký tự.");
        } else {
            setDescriptionError("");
        }
    };
    const handleImgUpload = async () => {
        if (fileList.length === 0) {
            message.warning("No files uploaded.");
            return [];
        }

        const uploadedImages = [];
        for (const file of fileList) {
            if (file.originFileObj) {
                try {
                    const imageUrl = await UploadImage(file.originFileObj); // Upload and get URL
                    uploadedImages.push({image_url: imageUrl});
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


    const handleAuctionTypeChange = (value) => {
        console.log("Selected auction type:", value);
        setAuctionType(value);
    };


    const [registerItem, {isLoading, isSuccess, isError, error}] = useRegisterItemMutation();

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Bật loader ngay từ đầu
        showLoader();

        const uploadedImages = await handleImgUpload(); // Bắt đầu upload hình
        if (uploadedImages.length === 0) {
            message.error("Please upload at least one image.");
            setSpinning(false); // Tắt loader nếu không có ảnh upload thành công
            return;
        }

        const payload = {
            item_name: itemName,
            item_description: itemDescription,
            item_condition: itemCondition,
            price_buy_now: priceBuyNow,
            img_item: uploadedImages,
            sc_id: scId,
            auction_type: auctionType,
        };

        console.log(payload);
        try {
            const userData = await registerItem(payload).unwrap();
            message.success(userData.message);
            navigate("/Dashboard-seller/ListOfSellerProduct");
            // console.log("Kết quả:", userData.message);
        } catch (err) {
            const errorMessage = err?.data?.message || "Lỗi đăng ký sản phẩm";
            message.error(errorMessage);
            //console.log("Kết quả lỗi:", errorMessage);
        } finally {
            setSpinning(false); // Tắt loader sau khi hoàn tất
            setPercent(0);
        }
    };


    useEffect(() => {
        //console.log("Selected Category: ", selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedCategory) {
            setSelectedSubCategory(null); // Reset subcategory khi thay đổi category
            setScId(1); // Reset scId khi thay đổi category
        }
    }, [selectedCategory]);


    // Lọc subcategories dựa trên selectedCategory
    const filteredSubCategories = categories?.find(
        (category) => category.categoryId === selectedCategory
    )?.subCategory || [];

    const showLoader = () => {
        setSpinning(true);
        let ptg = -10;
        const id = setInterval(() => {
            // Nếu cả hai process (upload và gọi API) đã hoàn tất, dừng loader
            if (!isLoading && percent >= 100) {
                clearInterval(id);
                setTimeout(() => {
                    setSpinning(false);
                    setPercent(0);
                }, 500);
                return;
            }
            // Tiến độ loading tăng dần
            ptg += 5;
            setPercent(ptg);
            if (ptg > 100) {
                ptg = 0;
            }
        }, 200);
        setIntervalId(id);
    };

    React.useEffect(() => {
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [intervalId]);
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };


    const items = [
        {
            key: '1',
            label: <label className="font-bold">Tên sản phẩm</label>,
            children:
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                    }}
                >
                    <Input
                        //type="text"
                        placeholder="Nhập tên sản phẩm"
                        value={itemName}
                        onChange={handleItemNameChange}
                        status={itemNameError ? "error" : ""}
                        style={{
                            borderRadius: '8px',
                            border: itemNameError ? '1px solid red' : '1px solid #ccc',
                            padding: '10px',
                        }}
                    />
                    {itemNameError && (
                        <Text type="danger">{itemNameError}</Text>
                    )}
                </Space>
            ,
        },
        {
            key: '2',
            label: <label className="font-bold">Giá mua ngay</label>,
            children: (
                <Space
                    direction="vertical"
                    style={{
                        width: "100%",
                    }}
                >
                    <Input
                        type="text"
                        placeholder="Nhập giá mua ngay"
                        value={priceBuyNow}
                        onChange={handlePriceChange}
                        status={priceError ? "error" : ""}
                        style={{
                            borderRadius: "8px",
                            border: priceError ? "1px solid red" : "1px solid #ccc",
                            padding: "10px",
                        }}
                        suffix="VND" // Hiển thị "VND" bên phải ô nhập liệu
                    />
                    {priceError && (
                        <Text type="danger" style={{ marginTop: "5px" }}>
                            {priceError}
                        </Text>
                    )}
                </Space>
            ),
        },

        {
            key: '3',
            label: <label className="font-bold">Tình trạng</label>,
            children: <div className="w-72 mt-4">
                <Select
                    label="Tình trạng"
                    value={itemCondition} // Truyền giá trị mặc định từ state
                    onChange={(value) => setItemCondition(value)} // Cập nhật state khi thay đổi
                >

                    {/*<Option value="DAMAGED">Hư hỏng</Option>*/}
                    <Option value="LIKE_NEW">Như mới</Option>
                    <Option value="USED_GOOD">Đã qua sử dụng - Tốt</Option>
                    <Option value="USED_FAIR">Đã qua sử dụng - Khá</Option>
                    <Option value="REFURBISHED">Tân trang</Option>
                </Select>
            </div>,
        },

        {
            key: '4',
            label: <label className="font-bold">Loại đấu giá</label>,
            children: <div className="w-72 mt-4">
                <Select
                    label="Loại"
                    value={auctionType}
                    onChange={handleAuctionTypeChange}
                >
                    {isloadingAuctionType ? (
                        <Option disabled>
                            <Spin/> {/* Spinner shown while loading */}
                        </Option>
                    ) : errorAuctionType ? (
                        <Option disabled>Error loading
                            types</Option>
                    ) : (
                        auctionTypes?.map((type) => (
                            <Option key={type.act_id}
                                    value={type.act_id}>
                                {type.auction_typeName}
                            </Option>
                        ))
                    )}
                </Select>
            </div>,
        },
        {
            key: '5',
            label: <label className="font-bold">Danh mục</label>,
            // span: 2,
            children: <div className="w-72 mt-4 text-black">
                <Select
                    value={selectedCategory || undefined}
                    onChange={(value) => {
                        //console.log("Selected Category ID:", value); // Kiểm tra giá trị đã chọn
                        setSelectedCategory(value);
                        setSelectedSubCategory(null);
                    }}
                    placeholder="Chọn danh mục"
                    loading={isloadingCategories}
                    style={{width: "100%"}}
                >
                    {isloadingCategories ? (
                        <Select.Option disabled>
                            <Spin/>
                        </Select.Option>
                    ) : errorCategories ? (
                        <Select.Option disabled>Error loading
                            categories</Select.Option>
                    ) : (
                        categories?.map((category) => (
                            <Select.Option
                                key={category.categoryId}
                                value={category.categoryId}>
                                {category.categoryName}
                            </Select.Option>
                        ))
                    )}
                </Select>
            </div>,
        },
        {
            key: '6',
            label: <label className="font-bold">Danh mục phụ</label>,
            //span: 3,
            children: <div className="w-72 mt-4">
                <Select
                    value={selectedSubCategory || undefined} // Gán giá trị mặc định nếu có
                    onChange={(value) => {
                        setSelectedSubCategory(value);
                    }}
                    placeholder="Chọn danh mục phụ"
                    disabled={!selectedCategory} // Vô hiệu hóa nếu không có danh mục nào được chọn
                    style={{width: "100%"}}
                >
                    {filteredSubCategories.map((subCategory) => (
                        <Option key={subCategory.scId}
                                value={subCategory.scId}>
                            {subCategory.sub_category}
                        </Option>
                    ))}
                </Select>
            </div>,
        },
        {
            key: '7',
            label: <label className="font-bold">Hình ảnh</label>,
            children: <div
                className="mr-1.5 mt-2 flex flex-col items-start gap-5 self-stretch rounded-[20px] bg-blue-200 px-[52px] py-[30px] md:mr-0 md:px-5 sm:p-5">
                <>
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{
                                display: 'none',
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                </>
            </div>,
            span: 4,
        },
        {
            key: '8',
            label: <label className="font-bold">Mô tả sản phẩm</label>,
            children: (
                <Space
                    direction="vertical"
                    style={{
                        width: "100%",
                        marginBottom: "20px", // Khoảng cách giữa 2 form
                    }}
                >
                    <div style={{ display: 'flex', width: '100%' }}>
                        {/* Form mô tả sản phẩm */}
                        <div style={{ width: '80%', marginRight: '10px' }}>
                            <TextEditor
                                value={itemDescription}
                                placeholder="Gợi ý: Xuất xứ, Màu sắc, Kích thước, Tình trạng sản phẩm..."
                                onChange={handleDescriptionChange} // Khi thay đổi, sẽ gọi hàm xử lý
                                style={{
                                    height: "200px", // Tăng chiều cao của TextEditor
                                    fontSize: "16px", // Kích thước chữ lớn hơn
                                    border: "1px solid #ccc", // Viền nhẹ cho TextEditor
                                    borderRadius: "8px", // Bo tròn góc
                                    padding: "10px", // Padding cho TextEditor
                                }}
                            />
                            {descriptionError && (
                                <Text type="danger" style={{ marginTop: "5px" }}>
                                    {descriptionError}
                                </Text>
                            )}
                        </div>

                        {/* Form Gợi ý */}
                        <div style={{ width: '20%', height: 'auto' }}>
                            <TextArea
                                value={`✅ Xuất xứ\n✅ Màu sắc\n✅ Kích thước\n✅ Chất liệu \n✅ Thương hiệu...`}
                                disabled
                                rows={6} // Bạn có thể tăng số dòng hiển thị nếu cần
                                style={{
                                    borderRadius: "8px", // Bo tròn góc cho input
                                    padding: "8px 12px", // Điều chỉnh padding cho input
                                    border: "1px solid #ccc", // Viền nhẹ, dễ nhìn
                                    backgroundColor: "#f5f5f5", // Nền nhạt, dễ nhìn
                                    fontSize: "14px", // Kích thước chữ
                                    color: "#555", // Màu chữ tối để dễ đọc
                                    fontWeight: "500", // Độ đậm của chữ
                                    lineHeight: "1.5", // Khoảng cách giữa các dòng
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // Tạo bóng mờ nhẹ cho input
                                    width: '100%', // Đảm bảo input chiếm toàn bộ chiều rộng của 20%
                                    height: '180px', // Điều chỉnh chiều cao mong muốn
                                }}
                            />
                        </div>


                    </div>
                </Space>
            ),
        }



    ];


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
                            <Sidebar/>
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1, // Để Content bên trong chiếm hết không gian còn lại
                            }}
                        >
                            <div className="">
                                <div className="flex items-start md:flex-col">
                                    {/*start is here*/}
                                    {/*<Spin spinning={spinning} tip="Loading..."/>*/}
                                    <Spin spinning={spinning} percent={percent} fullscreen/>
                                    <div
                                        className="mt-3.5 flex flex-1 flex-col gap-16 self-center md:self-stretch sm:gap-8">
                                        <Heading
                                            size="text2xl"
                                            as="h1"
                                            className="text-[30px] font-medium text-black-900 md:ml-0 md:text-[28px] sm:text-[26px]"
                                        >
                                            Đăng kí sản phẩm
                                        </Heading>
                                        <Descriptions  layout="vertical" bordered
                                                      items={items}/>

                                        <div className=" md:ml-0">
                                            <div className="flex flex-col items-center gap-[62px] sm:gap-[31px]">
                                                <div className="flex flex-col items-center self-stretch">
                                                    <Heading
                                                        size="textxl"
                                                        as="p"
                                                        className="bg-green-a700_01 px-[34px] pt-2 text-[25px] font-medium text-bg-white md:text-[23px] sm:px-5 sm:text-[21px]"
                                                    >
                                                        Chính sách của hệ thống
                                                    </Heading>

                                                    <div
                                                        className="mt-2 flex items-center justify-center gap-3 self-stretch md:flex-col">
                                                        <Checkbox onChange={onChange}>
                                                            Tôi xác nhận rằng tất cả thông tin, hình ảnh và mô tả
                                                            sản
                                                            phẩm mà tôi cung cấp là chính xác, đầy đủ và không gây
                                                            hiểu
                                                            nhầm cho người mua. Tôi sẽ chịu trách nhiệm về tính
                                                            chính
                                                            xác của thông tin này.
                                                        </Checkbox>
                                                    </div>

                                                    <div
                                                        className="mt-2 flex items-center justify-center gap-3 self-stretch md:flex-col">
                                                        <Checkbox onChange={onChange}>
                                                            Tôi xác nhận rằng tất cả thông tin, hình ảnh và mô tả
                                                            sản
                                                            phẩm mà tôi cung cấp là chính xác, đầy đủ và không gây
                                                            hiểu
                                                            nhầm cho người mua. Tôi sẽ chịu trách nhiệm về tính
                                                            chính
                                                            xác của thông tin này.
                                                        </Checkbox>
                                                    </div>

                                                    <div
                                                        className="mt-6 flex items-center justify-center gap-3 self-stretch md:flex-col">
                                                        <Checkbox onChange={onChange}>Tôi cam kết tuân thủ tất cả
                                                            các quy định và điều khoản
                                                            mà hệ
                                                            thống đặt ra, bao gồm nhưng không giới hạn ở quy trình
                                                            đăng
                                                            bán, thẩm định sản phẩm và quy trình giao
                                                            dịch.</Checkbox>
                                                    </div>
                                                </div>
                                                <div className="flex w-[38%] justify-between gap-5 md:w-full">
                                                    <ButtonDH
                                                        size="md"
                                                        className="min-w-[152px] rounded-md bg-green-500 text-white hover:bg-green-600"
                                                        onClick={() => handleSubmit()}
                                                        ///onClick={showLoader}
                                                    >
                                                        Gửi thẩm định
                                                    </ButtonDH>

                                                    {/* Hiển thị trạng thái */}
                                                    {/*{isLoading && <p>Creating item...</p>}*/}
                                                    {/*{isSuccess && <p>Item created successfully!</p>}*/}
                                                    {/*{isError && <p>Error: {error.message}</p>}*/}

                                                    <ButtonDH
                                                        size="md"
                                                        className="min-w-[152px] rounded-md bg-red-500 text-white hover:bg-red-600"
                                                        onClick={() => {
                                                            // Hàm hủy bỏ hoặc reset dữ liệu nếu cần
                                                        }}
                                                    >
                                                        Hủy bỏ
                                                    </ButtonDH>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    {/*end is here*/}
                                </div>
                            </div>
                        </Content>
                    </Layout>
                </Content>
                <FooterBK/>
            </Layout>
        </>
    );
}

export default RegisterProductPage;


