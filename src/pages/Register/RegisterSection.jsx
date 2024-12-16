import {useState} from 'react';
import {Input, Button, Modal, Typography, Spin} from 'antd';
import {ButtonDH} from "@/components/index.jsx";

const {Title} = Typography;

export default function RegisterSection({
                                            email,
                                            setEmail,
                                            password,
                                            setPassword,
                                            fullName,
                                            setFullName,
                                            phoneNumber,
                                            setOtp,
                                            setPhoneNumber,
                                            handleSubmit,
                                            isLoadingRegister,
                                            isLoadingVerify,
                                            handleVerify,
                                            otp,
                                        }) {
    const [isOTPStage, setIsOTPStage] = useState(false); // Thêm state để chuyển bước

    const showModal = () => console.log("OTP Verified");

    const onChange = (text) => {
        //console.log('onChange:', text);
        setOtp(text); // Update OTP state
    };
    const sharedProps = {onChange};

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            await handleSubmit(event);
            setIsOTPStage(true);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };


    return (
        <>
            <div className="mt-[134px] flex justify-center">
                <div
                    className="container-xs flex w-full items-stretch justify-between gap-5 px-2.5 md:flex-col md:px-5">
                    <img
                        src="https://c.pxhere.com/photos/3f/aa/watch_3d_graphics_ticker_men_s_watch-386868.jpg!d"
                        alt="Featured Image"
                        className="h-[742px] w-[60%] rounded-[20px] object-cover md:w-full"
                    />
                    <div className="relative w-[60%] md:w-full h-[742px]">
                        <div className="ml-1 flex flex-col items-start gap-[40px]
                            rounded-[20px] bg-blue-gray-200 bg-opacity-90 backdrop-blur-lg py-7
                            pl-10 pr-10 md:ml-0 md:px-5 sm:p-5 shadow-lg h-full"
                        >
                            {isOTPStage ? (
                                /** Giao diện OTP */
                                <div className="mb-[100px] mr-2 self-stretch md:mr-0">
                                    <Title level={5}>Verify Email</Title>
                                    <Input.OTP
                                        value={otp} // Use the OTP state
                                        onChange={onChange} // Use the updated onChange function
                                        formatter={(str) => str.toUpperCase()}
                                    />
                                    <Button
                                        className="mt-4"
                                        onClick={handleVerify}
                                        disabled={isLoadingVerify}
                                    >
                                        Xác nhận OTP
                                    </Button>
                                </div>
                            ) : (
                                /** Giao diện Đăng ký */
                                <Spin spinning={isLoadingRegister} tip="Loading...">
                                    <Title level={1} className="text-[38px] font-semibold uppercase text-blue-gray-800">
                                        Tạo tài khoản
                                    </Title>
                                    <div className="self-stretch">
                                        <Input
                                            placeholder="Tên"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="mt-2 rounded-lg border-2 px-4 py-3"
                                        />
                                        <Input
                                            placeholder="Số điện thoại"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className="mt-5 rounded-lg border-2 px-4 py-3"
                                        />
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="mt-5 rounded-lg border-2 px-4 py-3"
                                        />
                                        <Input
                                            type="password"
                                            placeholder="Mật khẩu"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="mt-5 rounded-lg border-2 px-4 py-3"
                                        />
                                        <ButtonDH
                                            className="mt-5 w-full rounded-full bg-blue-gray-500 text-white px-10 py-3"
                                            onClick={handleRegister}
                                            disabled={isLoadingRegister}
                                        >
                                            Tạo tài khoản
                                        </ButtonDH>
                                    </div>
                                </Spin>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
