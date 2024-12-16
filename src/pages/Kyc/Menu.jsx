import React from 'react';
import Header2 from '../../components/Header2';
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";
import { useNavigate } from 'react-router-dom';

export default function MenuKyc() {
    const navigate = useNavigate();
    const handleCreate = () => {
        navigate('/RegisterKYC');
    };

    const handleUpdate = () => {
        navigate('/UpdateKyc');
    };

    return (
        <>
            <Header2 />
            <div className="flex container mx-auto mt-10 p-6">
                {/* Sidebar sát lề trái */}
                <div className="w-1/4 fixed left-0 h-full">
                    <SiderUserBK className="h-full bg-gradient-to-b from-blue-50 to-white shadow-lg rounded-r-lg p-6 border-r border-gray-200" />
                </div>

                {/* Form xác minh danh tính */}
                <div className="flex-1 ml-64 p-10 bg-white rounded-2xl shadow-2xl mt-10">
                    <div className="bg-blue-100 p-6 rounded-2xl border border-blue-200 mb-8 flex items-start shadow-sm">
                        <img
                            src="https://img.freepik.com/free-vector/shield-lock-cartoon-style_78370-1621.jpg"
                            alt="KYC Image"
                            className="w-20 h-20 mr-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                        />
                        <div>
                            <p className="text-blue-600 font-bold text-xl">Xác nhận danh tính</p>
                            <p className="text-gray-700 mt-2 text-base leading-relaxed">
                                Vui lòng hoàn tất xác thực danh tính để đảm bảo an toàn và tin cậy khi đăng bán sản phẩm.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <button onClick={handleCreate} className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-blue-700">
                            Tiếp tục
                        </button>
                        <button onClick={handleUpdate} className="bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-semibold shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200">
                            Bổ sung thông tin
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
