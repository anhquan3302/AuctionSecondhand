import React from "react";
import { Img, Heading } from "../../components";

const ProfileCard = ({ imageSrc, name, balance }) => {
  return (
    <div className="flex w-[74%] flex-col items-center gap-4 md:w-full">
      <div className="flex items-center justify-center gap-[18px] self-stretch">
        <Img
          src="images/img_image_52x56_1.png"
          alt="Profile Image"
          className="h-[52px] w-[30%] rounded-[26px] object-contain"
        />
        <Heading
          as="h1"
          className="mb-3 self-end text-[16px] font-medium text-blue_gray-900_01"
        >
          Phuong Uyennn
        </Heading>
      </div>
      <Heading
        size="headingxl"
        as="h2"
        className="text-[20px] font-semibold text-red-500"
      >
        Số dư: 20,000,000đ
      </Heading>
    </div>
  );
};

export default ProfileCard;
