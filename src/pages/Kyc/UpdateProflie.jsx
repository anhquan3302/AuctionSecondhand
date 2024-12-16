import React, { useState, useEffect } from 'react';
import Header2 from '../../components/Header2';
import { SiderUserBK } from '@/components/SiderUser/SiderUserBK.jsx';
import FooterBK from '../../components/FooterBK';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Button, DatePicker, Radio, message, Upload, Image } from 'antd';
import dayjs from 'dayjs';
import { useGetKYCByUserQuery, useUpdateKYCByUserMutation } from '../../services/kyc.service.js';
import useHookUploadImage from "../../hooks/useHookUploadImage.js";
import { useNavigate } from 'react-router-dom';
import {Textarea} from "@material-tailwind/react";

export default function UpdateKYC() {
    const { data, isLoading, isError } = useGetKYCByUserQuery();
    console.log("User",data);
    console.log(data);


   

    const navigate = useNavigate();
    const [updateKyc] = useUpdateKYCByUserMutation();
    const [formData, setFormData] = useState({
        fullName: '',
        permanentAddress: '',
        nationality: '',
        dob: null,
        phoneNumber: '',
        gender: '',
        home:'',
        reason: '',
        cccdNumber: '',
        frontDocumentUrl: '',
        backDocumentUrl: '',
    });
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const { UploadImage } = useHookUploadImage();
    const uploadedUrls = [];

    useEffect(() => {
        if (data?.data) {
            const dob = data.data.dob ? dayjs(data.data.dob) : null;
            setFormData({
                fullName: data.data.fullName || '',
                permanentAddress: data.data.permanentAddress || '',
                nationality: data.data.nationality ,
                dob: dob && dob.isValid() ? dob : null,
                phoneNumber: data.data.phoneNumber || '',
                home: data.data.home ? data.data.home : null,
                reason: data.data.reason ? data.data.reason : null,
                gender: data.data.gender || '',
                cccdNumber: data.data.cccdNumber || '',
                image: data.data.image || '',
            });
        }
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (date) => {
        setFormData((prevData) => ({ ...prevData, dob: date }));
    };

    const handleGenderChange = (e) => {
        setFormData((prevData) => ({ ...prevData, gender: e.target.value }));
    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleChangeImage = async ({ fileList: newFileList }) => {
        if (newFileList.length > 1) {
            message.warning("Bạn chỉ có thể tải lên tối đa 1 ảnh!");
            return;
        }

        setFileList(newFileList);
        const uploadedUrls = [];

        for (const file of newFileList) {
            const fileToUpload = file.originFileObj || file;
            if (fileToUpload) {
                try {
                    const imageUrl = await UploadImage(fileToUpload);
                    uploadedUrls.push(imageUrl);
                } catch (error) {
                    message.error(`Tải lên ảnh ${file.name} thất bại: ${error.message}`);
                }
            } else {
                message.warning("File object không hợp lệ");
            }
        }

        if (uploadedUrls.length === 2) {
            const [frontDocumentUrl, backDocumentUrl] = uploadedUrls;

            setFormData((prevData) => ({
                ...prevData,
                frontDocumentUrl,
                backDocumentUrl,
            }));
        } else {
            message.warning("Không đủ ảnh được tải lên.");
        }
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                ...formData,
                dob: formData.dob ? formData.dob.format('YYYY-MM-DD') : '',
            };
            await updateKyc(payload).unwrap();
            message.success('Cập nhật thông tin KYC thành công! Kết quả sẽ được thông báo trong thời gian sớm nhất');
            navigate('/ProfileDetail')
        } catch (error) {
            const errorMessage = error?.data?.message || 'Đã xảy ra lỗi khi cập nhật. Vui lòng thử lại sau!';
            message.error(errorMessage);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header2 title="Update Profile" />
            <div className="flex flex-1">
                <SiderUserBK className="w-[200px] bg-white shadow-md" />
                <div className="flex-1 ml-8 mt-8 p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Cập nhật thông tin KYC</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Form Fields */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                            <Input
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Nhập họ và tên"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                            <Input
                                name="age"
                                value={formData.permanentAddress}
                                onChange={handleInputChange}
                                placeholder="Tuổi"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quốc gia</label>
                            <Input
                                name="email"
                                value={formData.nationality}
                                onChange={handleInputChange}
                                placeholder="Nhập email"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                            <DatePicker
                                value={formData.dob}
                                onChange={handleDateChange}
                                format="DD/MM/YYYY"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quê quán</label>
                            <Input
                                name="phoneNumber"
                                value={formData?.home}
                                onChange={handleInputChange}
                                placeholder="Nhập số điện thoại"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                            <Radio.Group
                                value={formData.gender}
                                onChange={handleGenderChange}
                                className="w-full mt-2"
                            >
                                <Radio value="MALE">Nam</Radio>
                                <Radio value="FEMALE">Nữ</Radio>
                                <Radio value="OTHER">Khác</Radio>
                            </Radio.Group>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số CCCD</label>
                            <Input
                                name="cccdNumber"
                                value={formData.cccdNumber}
                                onChange={handleInputChange}
                                placeholder="Nhập số CCCD"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Lý do:</label>
                            <Textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleInputChange}
                                placeholder="Nhập lý do"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-700">Hình ảnh</h3>
                        <Upload
                            fileList={fileList}
                            onChange={handleChangeImage}
                            onPreview={handlePreview}
                            listType="picture-card"
                            maxCount={2}
                            showUploadList={{showPreviewIcon: false}}
                            className="w-full mt-4"
                        >
                        <div>
                                <PlusOutlined />
                                <div className="mt-2 text-sm text-blue-500">Chọn ảnh</div>
                            </div>
                        </Upload>
                    </div>

                    <div className="mt-6">
                        <Button
                            type="primary"
                            loading={uploading}
                            onClick={handleUpdate}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </div>
            <FooterBK />
        </div>
    );
}
