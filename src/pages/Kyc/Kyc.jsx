import React, {useState, useEffect} from 'react';
import {TextArea, Heading} from "../../components";
import FooterBK from "../../components/FooterBK/index.jsx";
import {ButtonDH} from "../../components/index.jsx";
import {useGetKYCByIdQuery, useGetKYCItemsQuery, useUpdateKycMutation} from "../../services/kyc.service.js";
import {useParams} from 'react-router-dom';
import {Input, message, Spin, Descriptions, Image,} from 'antd';
import { format } from 'date-fns';  // Cài đặt date-fns nếu chưa có
import {useNavigate} from 'react-router-dom';

export default function KiemduyetStaffPage() {
    const {id} = useParams();
    const {data: kycData, error, isLoading} = useGetKYCByIdQuery(id);
    console.log(kycData);
    const [updateKyc, {isLoading: isLoadingKyc}] = useUpdateKycMutation();
    const [status, setStatus] = useState(kycData?.data?.kycStatus);
    const [reason, setReason] = useState("");
    const navigate = useNavigate();
    const {data: dataManageKyc, refetch: isRefetchManageKyc} = useGetKYCItemsQuery({page: 0, limit: 10});
    const formatDate = (date) => {
        return date ? format(new Date(date), 'dd/MM/yyyy') : "Chưa có";
    };
    const kyc = kycData?.data;
    //if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading KYC details: {error.message}</div>;

    const handleUpdateKyc = async (newStatus) => {
        console.log("New Status:", newStatus);
        if (!newStatus) {
            //alert("Status cannot be null!");
            message.error("Status cannot be null!")
            return;
        }

        try {
            if (!kycData || !kycData.data || !id) {
                //throw new Error("KYC data is not defined.");
                message.error("KYC data is not defined.")
            }

            const kycUpdateData = {
                kycId: id,
                kycData: {...kycData.data, status: newStatus, reason},
            };
            //console.log("Data to be sent to API:", kycUpdateData);
            //message.error("Data to be sent to API")

            const response = await updateKyc(kycUpdateData).unwrap();
            console.log("API response:", response);
            setStatus(newStatus);
            //alert("KYC updated successfully!");
            message.success(response?.message);

            navigate('/dashboard/managementKYC');
            isRefetchManageKyc();
        } catch (error) {
            //console.error("Error updating KYC:", error);
            //alert("Failed to update KYC: " + error.message);
            message.success(error?.data.message);
        }
    };
    const items = [
        {
            key: '1',
            label: 'Họ tên đầy đủ',
            children: kyc?.fullName || 'Chưa có',
        },
        {
            key: '2',
            label: 'Giới tính',
            children: kyc?.gender || 'Không xác định',
        },
        {
            key: '3',
            label: 'Quốc gia',
            children: kyc?.nationality || 'Chưa có',
        },
        {
            key: '4',
            label: 'Ngày tạo',
            children: formatDate(kyc?.submitted) || 'Chưa có',
        },
        {
            key: '5',
            label: 'Ngày sinh',
            children: formatDate(kyc?.dob) || 'Chưa có',
        },
        {
            key: '6',
            label: 'CCCD',
            children: kyc?.cccdNumber || 'Chưa có',
        },
        {
            key: '7',
            label: 'Quê quán',
            children: kyc?.home || 'Chưa có',
            // span: 2, // Gộp hàng
        },
        {
            key: '8',
            label: 'Địa chỉ thường trú',
            children: kyc?.permanentAddress || 'Chưa có',
            span: 2, // Gộp hàng
        },
        // {
        //     key: '9',
        //     label: 'Địa chỉ thường trú',
        //     children: kyc?.imageUrl ? <img src={kyc?.imageUrl} alt="Địa chỉ thường trú" style={{ width: '100px', height: 'auto' }} /> : 'Chưa có',
        //     span: 2, // Gộp hàng
        // }

    ];

    return (
        <div className="w-full bg-white-a700">
            <div className="flex flex-col items-center gap-10 bg-white-a700">
                <div className="mx-auto mt-5 w-full  flex gap-5 px-5">
                    <div className="flex-grow">
                        <Heading size="textlg" as="h2" className="text-[54px] font-bold text-blue_gray-900 text-center">
                            Thẩm định KYC
                        </Heading>
                        {isLoading ? (
                            <Spin size="large" tip="Đang tải thông tin..."/>
                        ) : (
                            <>
                                {/*<VerificationSection kycData={kycData}/>*/}
                                <Descriptions title="Thông tin" items={items}/>
                                <br/>
                                <Input.TextArea
                                    rows={4}
                                    value={kyc?.reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Nhập lý do (nếu có)"
                                />
                                <div className="flex justify-center pt-6">
                                    <Spin spinning={isLoadingKyc} size="large" tip="Đang xử lý...">
                                        <div className="flex gap-5">
                                            <ButtonDH
                                                shape="round"
                                                className="w-36 py-2 font-semibold bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                                                onClick={() => handleUpdateKyc('APPROVED')}
                                            >
                <span className="flex items-center justify-center">
                    Phê Duyệt
                </span>
                                            </ButtonDH>
                                            <ButtonDH
                                                shape="round"
                                                className="w-36 py-2 font-medium bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition duration-300"
                                                onClick={() => handleUpdateKyc('PENDING')}
                                            >
                <span className="flex items-center justify-center">
                     Bổ Sung
                </span>
                                            </ButtonDH>
                                            <ButtonDH
                                                shape="round"
                                                className="w-36 py-2 font-medium bg-red-500 text-white hover:bg-red-600 transition duration-300"
                                                onClick={() => handleUpdateKyc('REJECTED')}
                                            >
                <span className="flex items-center justify-center">
                    Từ Chối
                </span>
                                            </ButtonDH>
                                        </div>
                                    </Spin>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="w-full h-px bg-gray-200 my-5"/>
            </div>
        </div>
    );
}


