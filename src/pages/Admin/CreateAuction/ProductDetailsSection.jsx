import { Heading, Img } from "../../../components";
import React from "react";
import {Avatar, Typography} from "@material-tailwind/react";

export default function ProductDetailsSection() {
  return (
      <>
         product details section
        <div className="mt-[18px] flex flex-col items-center">
          <div className="container-xs flex flex-col items-center gap-6 md:px-5">
            <Heading
                size="textxl"
                as="h2"
                className="bg-green-a700_01 rounded-[12px] rounded-[12px] px-[34px] text-[25px] font-medium md:text-[23px] sm:px-5 sm:text-[21px] mt-[100px]"
            >
              Thông tin chi tiết
            </Heading>
            <div className="flex w-full">
              {/* Khối bên trái - 40% */}
              <div className="flex flex-col items-center bg-blue-100 p-5 rounded-[20px] w-[50%]">
                {/* "Người bán" hiển thị bên ngoài và ở giữa */}
                <Heading size="textxs" as="p" className="text-[20px] font-medium text-black-900 mb-5">
                  Người bán
                </Heading>

                <div className="w-full flex justify-center">
                  <div
                      className="mb-[30px] flex flex-col items-start gap-[18px] bg-white p-5 rounded-[20px] shadow-md">
                    <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                      Màu sắc: Xám
                    </Heading>
                    <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                      Nguồn gốc: Trung quốc
                    </Heading>
                    <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                      Kích thước: 1m5 x 1m9
                    </Heading>
                  </div>
                </div>
              </div>

              <div className="mx-5"></div>

              <div className="flex flex-col items-center bg-blue-100 p-5 rounded-[20px] w-[50%]">
                <Heading size="textxs" as="p" className="text-[20px] font-medium text-black-900 mb-5">
                  Người thẩm định
                </Heading>

                <div className="w-full flex justify-center">
                  <div
                      className="mb-[30px] flex flex-col items-start gap-[18px] bg-white p-5 rounded-[20px] shadow-md">
                    <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                      Định giá: 2 000 000 VND
                    </Heading>
                    <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                      Ngày sản xuất: 19/01/2002
                    </Heading>
                    <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                      Phần trăm: 80%
                    </Heading>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*<div className="flex flex-row w-full justify-between gap-8">*/}
        {/*  /!* Người bán *!/*/}
        {/*  <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">*/}
        {/*    <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người bán</Heading>*/}
        {/*    <div className="w-full flex justify-center">*/}
        {/*      <div*/}
        {/*          className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  /!* max-w-4xl giới hạn chiều rộng của phần tử con *!/*/}
        {/*        <div className="flex items-center gap-4">*/}
        {/*          <Avatar src={seller?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"} alt="avatar"*/}
        {/*                  variant="rounded" className="w-16 h-16"/>*/}
        {/*          <div>*/}
        {/*            <Typography variant="h6"*/}
        {/*                        className="font-medium text-gray-800">{seller?.fullName || 'N/A'}</Typography>*/}
        {/*            <Typography variant="small" color="gray"*/}
        {/*                        className="font-normal">{seller?.role || 'N/A'}</Typography>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Số điện*/}
        {/*          thoại: {seller?.phoneNumber || 'N/A'}</Heading>*/}
        {/*        <Heading size="textxs" as="p"*/}
        {/*                 className="text-sm font-medium text-gray-700">Email: {seller?.email || 'N/A'}</Heading>*/}
        {/*      </div>*/}
        {/*    </div>*/}

        {/*  </div>*/}

        {/*  /!* Người thẩm định *!/*/}
        {/*  <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">*/}
        {/*    <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người thẩm định</Heading>*/}
        {/*    <div className="w-full flex justify-center">*/}
        {/*      <div*/}
        {/*          className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  /!* max-w-4xl sẽ giới hạn chiều rộng tối đa *!/*/}
        {/*        <div className="flex items-center gap-4">*/}
        {/*          <Avatar src={staff?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"} alt="avatar"*/}
        {/*                  variant="rounded" className="w-16 h-16"/>*/}
        {/*          <div>*/}
        {/*            <Typography variant="h6"*/}
        {/*                        className="font-medium text-gray-800">{staff?.fullName || 'N/A'}</Typography>*/}
        {/*            <Typography variant="small" color="gray" className="font-normal">{staff?.role || 'N/A'}</Typography>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Số điện*/}
        {/*          thoại: {staff?.phoneNumber || 'N/A'}</Heading>*/}
        {/*        <Heading size="textxs" as="p"*/}
        {/*                 className="text-sm font-medium text-gray-700">Email: {staff?.email || 'N/A'}</Heading>*/}
        {/*      </div>*/}
        {/*    </div>*/}


        {/*  </div>*/}

        {/*</div>*/}
      </>
  );
}



