import {Heading} from "../../components/index.jsx";
import FooterBK from "../../components/FooterBK/index.jsx";
import Header2 from "../../components/Header2/index.jsx";
import  {useState} from "react";
import {TabPanel, Tabs} from "react-tabs";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import {PlusOutlined} from '@ant-design/icons';
import {useCreateKycMutation} from "@/services/kyc.service.js";
import {Breadcrumb, Button, Layout, Steps, theme, Image, Upload, message, Select} from 'antd';
import {useNavigate} from "react-router-dom";
import useHookUploadImage from "../../hooks/useHookUploadImage.js";
import axios from "axios";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const {Content, Sider} = Layout;

export default function KNCPage() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [current, setCurrent] = useState(0); // state để theo dõi bước hiện tại
    const [formData, setFormData] = useState({
        fullName: '',
        cccdNumber: '',
        dob: '',
        gender: '',
        nationality: '',
        address: '',
        home: '',
        imageUrl: '',
    });

    const [createKyc] = useCreateKycMutation();
    const formatDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    };


    const handleChangeImage = async ({ fileList: newFileList }) => {
        try {
            setFileList(newFileList);

            // Kiểm tra xem có file nào để tải lên không
            if (newFileList.length === 0) {
                message.warning('Vui lòng chọn file để tải lên.');
                return;
            }

            const fileToUpload = newFileList[0]?.originFileObj || newFileList[0];
            if (!fileToUpload) {
                message.warning('Không tìm thấy file hợp lệ để tải lên.');
                return;
            }

            // Tải ảnh lên Firebase
            const { UploadImage } = useHookUploadImage();
            const uploadResult = await UploadImage(fileToUpload);
            const imageUrl = uploadResult; // Giả sử UploadImage trả về URL của ảnh

            // In ra URL của ảnh đã tải lên
            console.log('Ảnh đã tải lên Firebase:', imageUrl);

            // Cập nhật fileList và preview ảnh
            setFileList([{ ...newFileList[0], url: imageUrl }]);
            setPreviewImage(imageUrl);
            setPreviewOpen(true);

            // Gửi ảnh đến FPT API để xử lý
            const formDataApi = new FormData();
            formDataApi.append('image', fileToUpload);

            const response = await axios.post('https://api.fpt.ai/vision/idr/vnm', formDataApi, {
                headers: {
                    'api-key': '6Nlbth5fE4pbNCUOtAbe5E3RSEinn4xC',
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.errorCode === 0) {
                // Xử lý dữ liệu trả về từ API
                const dataFromApi = response.data.data[0];
                message.success('Ảnh đã được tải lên và xử lý thành công!');

                // Định dạng và cập nhật formData
                const formatDate = (dateString) => {
                    const [day, month, year] = dateString.split('/');
                    return `${year}-${month}-${day}`;
                };

                setFormData((prevData) => ({
                    ...prevData,
                    fullName: dataFromApi.name,
                    cccdNumber: dataFromApi.id,
                    dob: formatDate(dataFromApi.dob),
                    gender: dataFromApi.sex === 'NAM' ? 'Nam' : dataFromApi.sex === 'NỮ' ? 'Nữ' : 'Khác',
                    nationality: dataFromApi.nationality,
                    address: dataFromApi.address,
                    home: dataFromApi.home,
                    imageUrl: imageUrl,  // Cập nhật imageUrl từ Firebase
                }));

                console.log('Dữ liệu từ API:', dataFromApi);
            } else {
                // Xử lý lỗi từ API
                message.error(`Lỗi từ API: ${response.data.errorMessage}`);
            }
        } catch (error) {
            console.error('Lỗi khi xử lý ảnh:', error);
            message.error('Đã xảy ra lỗi trong quá trình xử lý.');
        }
    };



    const handleSubmit = async () => {
        try {
            const kycRequest = {
                fullName: formData.fullName,
                cccdNumber: formData.cccdNumber,
                dob: formData.dob,
                gender: formData.gender,
                home: formData.home,
                nationality: formData.nationality,
                permanentAddress: formData.address,
                image: formData.imageUrl,  // Gửi imageUrl
            };

            console.log("KYC Request Data: ", kycRequest); // In ra dữ liệu để kiểm tra

            // Gọi API để tạo KYC
            const backendResponse = await createKyc(kycRequest);

            if (backendResponse?.data) {
                // Thông báo thành công
                message.success('KYC đã được tạo thành công!');
                navigate('/ProfileDetail');  // Thay thế bằng đường dẫn đúng
            } else {
                message.error(backendResponse?.data?.message || 'Thông tin của bạn đã được đăng kí');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            message.error('Đã có lỗi xảy ra khi gửi yêu cầu tạo KYC.');
        }
    };
    const handleChange = (value, field) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };


    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const steps = [
        {
            title: '',
            content: () => (
                <TabPanel>
                    <div className="w-full flex flex-col gap-12">
                        {/* Phần Upload Hình Ảnh */}
                        <div className="w-full">
                            <div
                                className="flex flex-col gap-4 items-center justify-center p-6 bg-white rounded-xl shadow-md">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Hình ảnh CCCD</h3>
                                <Upload
                                    listType="picture-card"
                                    onPreview={handlePreview}
                                    onChange={handleChangeImage}
                                    fileList={fileList}
                                    beforeUpload={() => false} // Ngăn trình duyệt tải ảnh tự động
                                >
                                    {fileList.length < 1 && (
                                        <div className="flex flex-col items-center justify-center">
                                            <PlusOutlined className="text-gray-500 text-3xl"/>
                                            <div className="mt-2 text-gray-500">Chọn ảnh</div>
                                        </div>
                                    )}
                                </Upload>

                                {previewImage && (
                                    <Image
                                        preview={{
                                            visible: previewOpen,
                                            onVisibleChange: (visible) => setPreviewOpen(visible),
                                        }}
                                        src={previewImage}
                                    />
                                )}

                                {fileList.length === 0 && (
                                    <p className="text-sm text-red-500">Vui lòng tải lên ảnh CCCD.</p>
                                )}
                            </div>
                        </div>


                        {/* Phần Form Thông Tin */}
                        <div className="w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                {[
                                    {label: 'Họ và Tên', placeholder: 'Nhập họ và tên', field: 'fullName'},
                                    {label: 'Số CCCD', placeholder: 'Nhập số CCCD', field: 'cccdNumber'},
                                    {label: 'Ngày sinh', placeholder: 'Chọn ngày sinh', type: 'date', field: 'dob'},
                                    {
                                        label: 'Giới tính',
                                        type: 'select',
                                        options: [
                                            {value: 'Nam', label: 'Nam'},
                                            {value: 'Nữ', label: 'Nữ'},
                                            {value: 'other', label: 'Khác'},
                                        ],
                                        field: 'gender',
                                    },
                                    {label: 'Quốc tịch', placeholder: 'Nhập quốc tịch', field: 'nationality'},
                                    {label: 'Địa chỉ thường trú', placeholder: 'Nhập địa chỉ', field: 'address'},
                                    {label: 'Quê quán', placeholder: 'Quê quán', field: 'home'},
                                ].map(({label, placeholder, type, options, field}, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md border border-gray-200"
                                    >
                                        <label className="text-lg font-semibold text-gray-800">{label}</label>
                                        {type === 'select' ? (
                                            <Select
                                                placeholder={placeholder}
                                                value={formData[field]}
                                                onChange={(value) => handleChange(value, field)}
                                                className="rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                            >
                                                {options.map((opt, idx) => (
                                                    <Select.Option key={idx} value={opt.value}>
                                                        {opt.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        ) : (
                                            <input
                                                type={type || 'text'}
                                                placeholder={placeholder}
                                                value={formData[field]}
                                                onChange={(e) => handleChange(e.target.value, field)}
                                                className="rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="mt-4 p-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-indigo-700 hover:scale-105 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            >
                                Đăng kí
                            </button>

                        </div>


                    </div>
                </TabPanel>


            ),
        },
    ];

    return (
        <>
            <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <Header2/>
                <Content
                    style={{
                        padding: '0 48px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item>Hồ sơ</Breadcrumb.Item>
                        <Breadcrumb.Item>Xác thực</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{
                            padding: '24px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1,
                        }}
                    >
                        <Sider style={{background: colorBgContainer}} width={300}>
                            <SiderUserBK/>
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1,
                            }}
                        >
                            <main className="flex flex-1 flex-col gap-6 md:self-stretch">
                                <header className="text-center">
                                    <Heading size="headinglg"
                                             className="text-4xl font-semibold uppercase text-blue_gray-900_01">
                                        xác minh danh tính
                                    </Heading>

                                    <Tabs selectedIndex={0} onSelect={(index) => setCurrent(index)}>

                                        <div style={{width: '90%', margin: '0 auto'}}>
                                            <Steps current={0}>
                                                {steps.map((item) => (
                                                    <Steps.Step key={item.title} title={item.title}/>
                                                ))}
                                            </Steps>
                                            <div className="step-content">
                                                {steps[0].content()}
                                            </div>
                                            <div style={{marginTop: 24}}>
                                                {0 < steps.length - 1 && (
                                                    // eslint-disable-next-line no-undef
                                                    <Button type="primary" onClick={next}>
                                                        Next
                                                    </Button>
                                                )}

                                            </div>
                                        </div>
                                    </Tabs>
                                    <br/>
                                </header>
                            </main>
                        </Content>
                    </Layout>
                </Content>
                <FooterBK
                    className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto"/>
            </Layout>
        </>
    );
}
