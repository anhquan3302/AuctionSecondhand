import { Heading, Text, Img } from "./..";
import React from "react";

export default function DashboardAdminOne({
  tngthunhp = "Tổng Thu Nhập",
  // snphmmi = "Sản phẩm mới",
  p59021100,
  p365tr256 = "365TR.256",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} h-[232px] w-[24%] md:w-full py-[38px] sm:py-5 bg-bg-white shadow-xs relative rounded-[16px]`}
    >
      <Heading
        size="headingmd"
        as="h6"
        className="absolute left-[21.31px] top-[17%] m-auto w-[64%] text-[16px] font-semibold uppercase leading-5 text-blue_gray-900"
      >
        {tngthunhp}
      </Heading>
      <div className="mx-auto flex flex-1 flex-col items-end">
        <div className="relative z-[2] mr-[18px] flex flex-col items-center rounded-[16px] bg-gray-100_01 px-2.5 py-5">
          <Img
            src="images/img_wallet.svg"
            alt="Sort Icon"
            className="h-[40px]"
          />
        </div>
        <Text
          size="texts"
          as="p"
          className="relative mt-[-16px] w-[36%] text-[14px] font-normal leading-[17px] text-blue_gray-600"
        >
          {/* {snphmmi} */}
        </Text>
      </div>
      <Text
        size="texts"
        as="p"
        className="absolute bottom-1/4 left-[21.15px] m-auto text-[14px] font-normal text-green-a700"
      >
        {/* <span>59.021.100</span>
        <a href="#" className="inline underline">
          đ
        </a> */}
      </Text>
      <Heading
        size="headinglg"
        as="h5"
        className="absolute bottom-[30%] left-[21.15px] m-auto w-[40%] text-[22px] font-semibold leading-[27px] text-blue_gray-900"
      >
        {p365tr256}
      </Heading>
    </div>
  );
}
