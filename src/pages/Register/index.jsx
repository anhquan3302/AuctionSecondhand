import {Helmet} from "react-helmet";
import FooterBK from "../../components/FooterBK";
import RegisterSection from "./RegisterSection";
import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useRegisterUserMutation, useVerifyUserMutation} from "../../services/auth.service";
import {setCredentials} from "@/redux/auth/authSlice.js";
import {toast} from 'react-toastify'
import Toast from "@/components/Toast/index.jsx";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const userRef = useRef();
    const errRef = useRef();
    const [registerUser, { isLoading: isLoadingRegister }] = useRegisterUserMutation();
    const [verifyUser, { isLoading: isLoadingVerify }] = useVerifyUserMutation();

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    // useEffect(() => {
    //     setErrMsg("");
    // }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await registerUser({
                email, password, fullName, phoneNumber
            }).unwrap();
            //console.log("Register data: ", userData.message)
            toast.success(userData.message)
        } catch (err) {
            const errorMessage = err?.data?.message;
            toast.error(errorMessage);
            errRef.current.focus();
        }
    };
    const handleVerify = async () => {
        try {
            const response = await verifyUser({ email: email, otp: otp }).unwrap();
            console.log(response);
            toast.success(response.message)
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            const errorMessage = error?.data?.message;
            console.error("Verification failed:", error);
            toast.error(errorMessage);
        }
    };
    return (
        <>
            <Toast/>
            <Helmet>
                <title>Create Your EZShop Account - Register Today</title>
                <meta
                    name="description"
                    content="Sign up for a new EZShop account to start shopping, save your wishlist, and manage your orders with ease. Join us for a seamless shopping experience!"
                />
            </Helmet>
            <div
                className="flex w-full flex-col gap-[100px] bg-gradient-to-b from-blue-gray-900 to-blue-black-900 text-white md:gap-[75px] sm:gap-[50px]"> {/* Gradient background */}
                <RegisterSection
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    fullName={fullName}
                    setFullName={setFullName}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    setOtp={setOtp}
                    handleSubmit={handleSubmit}
                    isLoadingRegister={isLoadingRegister}
                    isLoadingVerify={isLoadingVerify}
                    handleVerify={handleVerify}
                    otp={otp}
                />
            </div>
        </>
    );
}
