// import { Input } from '@material-tailwind/react';
// import React, { useState } from 'react';
// import { Heading } from '../../components';
// import { DatePicker } from 'antd';

// const AddressForm = ({ kycData }) => {
//     const [reason, setReason] = useState(''); // State để quản lý lý do
//     const [createter, setCreater] = useState(''); // State để quản lý người tạo

//     const handleReasonChange = (e) => {
//         setReason(e.target.value); 
//     }; 

//     const handleCreateBy = (e) => {
//         setCreater(e.target.value); 
//     };

//     const handleSubmit = () => {
//         const payload = {
//             verifiedBy: createter, // Gửi người tạo vào payload
//             reason: reason,        // Gửi lý do vào payload
//             // Thêm các trường khác nếu cần
//         };

//         fetch('/api/v1/kyc', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Success:', data);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     };

//     return (
//         <div className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg">
//             <Heading size="textmd" as="h3" className="text-[18px] font-semibold text-blue_gray-900">
//                 Địa chỉ
//             </Heading>
//             <div className="flex gap-6">
//                 {/* Thành Phố */}
//                 <div className="flex flex-col w-[48%]">
//                     <label className="text-[14px] font-medium text-blue_gray-800 mb-1">Thành Phố</label>
//                     <Input readOnly value={kycData.data.address.province_name} />
//                 </div>
//                 {/* Quận/Huyện */}
//                 <div className="flex flex-col w-[48%]">
//                     <label className="text-[14px] font-medium text-blue_gray-800 mb-1">Quận/Huyện</label>
//                     <Input readOnly value={kycData.data.address.district_name} />
//                 </div>
//             </div>
//             <div className="flex gap-6">
//                 {/* Xã */}
//                 <div className="flex flex-col w-[48%]">
//                     <label className="text-[14px] font-medium text-blue_gray-800 mb-1">Xã</label>
//                     <Input readOnly value={kycData.data.address.ward_name} />
//                 </div>
//                 {/* Địa chỉ */}
//                 <div className="flex flex-col w-[48%]">
//                     <label className="text-[14px] font-medium text-blue_gray-800 mb-1">Địa chỉ</label>
//                     <Input readOnly value={kycData.data.address.street_address} />
//                 </div>
//             </div>
//             <div className="flex gap-6">
//                 {/* Ngày tạo */}
//                 <div className="flex flex-col w-[48%]">
//                     <label className="text-[14px] font-medium text-blue_gray-800 mb-1">Ngày tạo</label>
//                     <DatePicker className="self-stretch rounded-md border border-blue_gray-300 h-10" />
//                 </div>
//                 {/* Người tạo */}
//                <div className="flex flex-col w-[48%]">
//                     <label className="text-[14px] font-medium text-blue_gray-800 mb-1">Người tạo</label>
//                     <Input value={createter} onChange={handleCreateBy} />
//                 </div>
//             </div>
//             <div className="flex flex-col mt-4">
//                 <label className="text-[14px] font-medium text-blue_gray-800 mb-1">Lý do</label>
//                 <Input
//                     type="text"
//                     onChange={handleReasonChange} // Xử lý sự kiện khi nhập
//                     className="h-32 resize-none" // Kích thước cao hơn
//                     placeholder="Nhập lý do tại đây..."
//                 />
//             </div>
          
//         </div>
//     );
// };

// export default AddressForm;
