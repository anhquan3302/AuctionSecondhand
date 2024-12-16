import { Img, Heading } from "../../components";
import React, { Suspense } from "react";
import { Carousel } from "antd";

const partnerLogosList = [
  { firstLogo: "images/img_1.png" },
  { firstLogo: "images/img_2.png" },
  { firstLogo: "images/img_3.png" },
  { firstLogo: "images/img_4.png" },
  { firstLogo: "images/img_5.png" },
  { firstLogo: "images/img_6.png" },
  { firstLogo: "images/img_7.png" },
];

export default function TrustedBrandsSection() {
  return (
    <>
      {/* trusted brands section */}
      <div className="mt-[158px] flex flex-col items-center self-stretch">
        <div className="container-xs flex flex-col items-center gap-6 px-[46px] md:px-5">
          <Heading
            as="h2"
            className="text-[16px] font-normal text-blue_gray-900_01"
          >
            Được tin cậy bởi những Nhãn Hàng Lớn
          </Heading>
          <div className="flex gap-[68px] self-stretch md:flex-col">
            <Suspense fallback={<div>Loading feed...</div>}>
              {partnerLogosList.map((d, index) => (
                <Img
                  key={"partnersLogos" + index}
                  src={d.firstLogo}
                  alt="First Logo"
                  className="h-[48px] w-[14%] object-contain md:w-full"
                />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
