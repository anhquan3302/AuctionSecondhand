import React, { useEffect } from "react";
import { Button, Result } from 'antd';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetResultVNPayQuery } from "../../services/withdrawRequest.Service";

const SuccessfullyPayment = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Lấy các tham số từ URL
    const vnp_Amount = searchParams.get("vnp_Amount");
    const vnp_BankCode = searchParams.get("vnp_BankCode");
    const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
    const vnp_CardType = searchParams.get("vnp_CardType");
    const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
    const vnp_PayDate = searchParams.get("vnp_PayDate");
    const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
    const vnp_TmnCode = searchParams.get("vnp_TmnCode");
    const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
    const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
    const vnp_TxnRef = searchParams.get("vnp_TxnRef");
    const vnp_SecureHash = searchParams.get("vnp_SecureHash");
    
    // Lấy transactionId từ localStorage
    const transactionId = localStorage.getItem("transactionId");

    // Gọi hook API để kiểm tra thông tin giao dịch
    const { data, error, isLoading } = useGetResultVNPayQuery({
        vnp_Amount,
        vnp_BankCode,
        vnp_BankTranNo,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
        vnp_SecureHash,
        transactionId, 
    });
    console.log("Amount to deposit:", vnp_Amount);

    useEffect(() => {
        if (data) {
            console.log("Transaction Data:", data);
        }

        if (error) {
            console.error("Error fetching transaction:", error);
        }
    }, [data, error]);

    const navigateToTransaction = () => {
        navigate('/');
    };

    return (
        <div>
            {isLoading ? (
                <Result
                    status="info"
                    title="Đang xử lý thông tin giao dịch..."
                />
            ) : (
                <Result
                    status="success"
                    title="Nạp tiền thành công!"
                    subTitle="Thông tin giao dịch đã được cập nhật."
                    extra={[
                        <Button onClick={navigateToTransaction} type="primary" key="console">
                            Xem lai thông tin giao dịch
                        </Button>
                    ]}
                />
            )}
        </div>
    );
};

export default SuccessfullyPayment;
