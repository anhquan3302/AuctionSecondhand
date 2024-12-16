import React from 'react';

const Modal = ({ isOpen, onClose, onCancel, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded shadow-lg w-11/12 md:w-1/3 p-5">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600"
                    aria-label="Đóng"
                >
                    &times;
                </button>

                {children}

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onCancel} // Thêm sự kiện cho nút Hủy
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Hủy Đăng Ký
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
