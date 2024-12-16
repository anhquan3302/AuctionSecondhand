import { Button, Checkbox, Input } from "@material-tailwind/react";
import { Heading } from "../../components";
import React, { useState } from "react";

export default function RegisterAuction({ isOpen, closeModal }) {
  // State to hold form values
  const [formData, setFormData] = useState({
    deposit: "",
    content: "",
    total: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      deposit: "",
      content: "",
      total: "",
    });
    closeModal(); // Close the modal after submission
  };

  return (
    <div className="flex flex-col items-center">
      {/* Button to open the modal */}
      <Button
        onClick={closeModal} // Close modal when button is clicked
        className="mt-5 rounded-md bg-green-500 text-white font-semibold hover:bg-green-400 transition duration-200 ease-in-out"
      >
        THAM GIA ĐẤU GIÁ
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <div className="mb-4">
              <Heading
                size="headinglg"
                as="h1"
                className="text-xl font-semibold text-gray-900 text-center"
              >
                Đăng ký tham gia đấu giá
              </Heading>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Deposit Field */}
              <div>
                <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">
                  Tiền cọc
                </label>
                <div className="mt-1">
                  <Input
                    id="deposit"
                    name="deposit"
                    type="text"
                    placeholder="Nhập số tiền cọc"
                    value={formData.deposit}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm"
                  />
                </div>
              </div>

              {/* Content Field */}
              <div className="mt-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Nội dung
                </label>
                <div className="mt-1">
                  <Input
                    id="content"
                    name="content"
                    type="text"
                    placeholder="Nội dung đấu giá"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm"
                  />
                </div>
              </div>

              {/* Total Amount Field */}
              <div className="mt-4">
                <label htmlFor="total" className="block text-sm font-medium text-gray-700">
                  Tổng tiền
                </label>
                <div className="mt-1">
                  <Input
                    id="total"
                    name="total"
                    type="text"
                    placeholder="Nhập tổng tiền"
                    value={formData.total}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm"
                  />
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="agreement"
                    className="h-5 w-5"
                  />
                  <span className="text-sm leading-5 text-gray-700">
                    Tôi đã đọc và nghiên cứu đầy đủ các thông tin của hồ sơ tham dự đấu giá. Tôi cam kết thực hiện đúng các quy định trong hồ sơ và quy định pháp luật liên quan.
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  ĐĂNG KÝ THAM GIA ĐẤU GIÁ
                </button>
              </div>
            </form>

            {/* Close Modal Button */}
            <Button
              onClick={closeModal}
              className="mt-4 w-full text-gray-600 hover:text-gray-800"
            >
              Đóng
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
