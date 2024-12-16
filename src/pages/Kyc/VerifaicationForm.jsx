// import { Input } from "@material-tailwind/react";
// import { Heading, Radio, RadioGroup } from "../../components";
// import React from "react";

// export default function StaffVerificationSection({kycData}) {
//   return (
//     <div className="flex flex-col gap-14 sm:gap-7">
//       {/* Staff verification section */}
//       <div className="grid grid-cols-2 gap-6">
//         <div className="flex flex-col items-start justify-center gap-1.5">
//           <Heading size="textmd" as="h3" className="text-[16px] font-medium text-blue_gray-900">
//             Họ tên đầy đủ
//           </Heading>
//           <Input
//             shape="round"
//             name="fullName"
//             placeholder="Nguyễn Văn A"
//             value={kyc.data.fullName}
//             className="self-stretch rounded-md border px-4"
//           />
//         </div>
//         <div className="flex flex-col items-start justify-center gap-2">
//           <Heading size="textmd" as="h4" className="text-[16px] font-medium text-blue_gray-900">
//             Giới tính
//           </Heading>
//           <RadioGroup name="gender" className="flex flex-wrap gap-3">
//             <Radio value="nam" label="Nam" className="text-[15px] text-blue_gray-600" />
//             <Radio value="nu" label="Nữ" className="text-[15px] text-blue_gray-600" />
//             <Radio value="khac" label="Khác" className="text-[15px] text-blue_gray-600" />
//           </RadioGroup>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-6">
//         <div className="flex flex-col items-start justify-center gap-1.5">
//           <Heading size="textmd" as="h5" className="text-[16px] font-medium text-blue_gray-900">
//             Email
//           </Heading>
//           <Input
//             shape="round"
//             type="email"
//             name="email"
//             placeholder="Nhập email"
//             className="self-stretch rounded-md border px-4"
//           />
//         </div>
//         <div className="flex flex-col items-start justify-center gap-1.5">
//           <Heading size="textmd" as="h6" className="text-[16px] font-medium text-blue_gray-900">
//             Số điện thoại
//           </Heading>
//           <Input
//             shape="round"
//             type="tel" // Corrected input type to 'tel' for phone number
//             name="phone"
//             placeholder="Nhập số điện thoại"
//             className="self-stretch rounded-md border px-4"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-6">
//         <div className="flex flex-col items-start justify-center gap-1.5">
//           <Heading size="textmd" as="p" className="text-[16px] font-medium text-blue_gray-900">
//             Nghề nghiệp
//           </Heading>
//           <Input
//             shape="round"
//             name="occupation"
//             placeholder="Giáo viên"
//             className="self-stretch rounded-md border px-4"
//           />
//         </div>
//         <div className="flex flex-col items-start justify-center gap-1.5">
//           <Heading size="textmd" as="p" className="text-[16px] font-medium text-blue_gray-900">
//             Độ tuổi
//           </Heading>
//           <Input
//             shape="round"
//             name="age"
//             placeholder="26 tuổi"
//             className="self-stretch rounded-md border px-4"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
