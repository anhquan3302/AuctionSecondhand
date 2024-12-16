import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../../redux/auth/authSlice";
import {useLoginMutation} from "../../../services/auth.service";
import {message} from "antd";

const useHook = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, {isLoading}] = useLoginMutation();

    //   useEffect(() => {
    //     userRef.current.focus();
    //   }, []);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    const handleUserInput = (e) => {
        const value = e.target.value;
        setEmail(value);
        // Kiểm tra định dạng email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức chính quy cho email
        if (!emailPattern.test(value)) {
            setEmailError("Địa chỉ email không hợp lệ");
        } else {
            setEmailError(""); // Xóa thông báo lỗi nếu hợp lệ
        }
    };

    const handlePwdInput = (e) => {
        const value = e.target.value;
        setPassword(value);
        // Kiểm tra độ dài mật khẩu
        if (value.length < 6) {
            setPasswordError("Mật khẩu phải ít nhất 6 ký tự");
        } else {
            setPasswordError(""); // Xóa thông báo lỗi nếu hợp lệ
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError || passwordError) {
            return; // Ngừng nếu có lỗi
        }
        try {
            const userData = await login({email, password}).unwrap();
            dispatch(setCredentials(userData));
            setEmail("");
            setPassword("");
            const userRole = userData?.data?.user?.role; // Kiểm tra vai trò
            if (userRole === "ADMIN" || userRole === "STAFF") {
                navigate("/dashboard/home");
            } else if (userRole === "SELLER") {
                navigate("/Dashboard-Seller");
            } else {
                navigate("/");
            }
        } catch (err) {
            //console.log(err.data.message)
            message.error(err.data.message)
        }
    };

    // const handleUserInput = (e) => setEmail(e.target.value);
    // const handlePwdInput = (e) => setPassword(e.target.value);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    return {
        email,
        password,
        emailError,
        passwordError,
        errMsg,
        isLoading,
        userRef,
        errRef,
        handleUserInput,
        handlePwdInput,
        handleSubmit,
    };
};

export default useHook;
