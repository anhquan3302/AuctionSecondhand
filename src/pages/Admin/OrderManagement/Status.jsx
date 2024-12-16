import { Heading } from "../../../components";
import React from "react";
import { TabList, Tab } from "react-tabs";

export default function Status() {
  return (
    <>
      {/* order management section */}
      <div className="flex flex-col items-start gap-3.5">
        <Heading
          size="headinglg"
          as="h1"
          className="text-[48px] font-semibold uppercase text-gray-900 md:text-[44px] sm:text-[38px]"
        >
          QUẢN LÝ ĐƠN HÀNG
        </Heading>
        <TabList className="flex flex-wrap gap-px rounded-tl-md rounded-tr-md border-b border-solid border-gray-300">
          <Tab className="px-5 py-2.5 text-[16px] font-normal text-blue_gray-600">Chờ xác nhận</Tab>
          <Tab className="px-5 py-2.5 text-[16px] font-normal text-blue_gray-600">Đã xác nhận</Tab>
          <Tab className="px-5 py-2.5 text-[16px] font-normal text-blue_gray-600">Đang xử lý</Tab>
          <Tab className="px-5 py-2.5 text-[16px] font-normal text-blue_gray-600">Đã lấy hàng</Tab>
          <Tab className="px-5 py-2.5 text-[16px] font-normal text-blue_gray-600">Đang vận chuyển</Tab>
          <Tab className="px-5 py-2.5 text-[16px] font-normal text-blue_gray-600">Đã vận chuyển</Tab>
          <Tab className="px-5 py-2.5 text-[16px] font-normal text-blue_gray-600">Đã huỷ</Tab>
        </TabList>
      </div>
    </>
  );
}



