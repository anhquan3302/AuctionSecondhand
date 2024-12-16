import React from 'react';

const VerifyAccount = () => {
    return (
        <div className="flex min-h-screen">
            <div className="w-1/3 flex flex-col justify-center items-center bg-gradient-to-b from-blue-gray-900 to-blue-black-900  y-200 p-10"> {/* Width cho form */}
                <h2 className="text-white text-2xl mb-4">Verify Your Account</h2>
                <form className="flex flex-col items-center space-y-4 w-full">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm"> {/* Wrapper cho form nhỏ */}
                        <h2 className="text-blue-gray-800 text-lg font-semibold text-center mb-4">Enter OTP and Email</h2> {/* Tiêu đề form */}
                        <div className="flex space-x-2 justify-center mb-4">
                            {/* OTP Input Fields */}
                            {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="0"
                                />
                            ))}
                        </div>
                        {/* Email Input Field */}
                        <input
                            type="email"
                            className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                            placeholder="Enter your email"
                        />
                        <button
                            type="submit"
                            className="bg-blue-gray-400 text-white rounded h-12 hover:bg-blue-gray-400 transition duration-200 w-full" // Chiều rộng nút 100%
                        >
                            Verify
                        </button>
                    </div>
                </form>

            </div>
            <div className="w-2/3 relative"> {/* Đảm bảo div chứa hình ảnh có vị trí tương đối */}
                <img
                    src="https://ontop.vn/wp-content/uploads/2023/05/image-86.webp"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover" // Thiết lập để hình ảnh chiếm toàn bộ khung
                />
            </div>
        </div>
    );
};

export default VerifyAccount;
