import { Text, Heading, Img } from "./..";
import React from "react";

export default function ProductInfo({
  productImage = "images/img_image_30_1.png",
  productCategory = "Thời trang",
  productDescription = "Áo nỉ chần bông màu xám có dây Nike",
  productPrice,
  productOriginalPrice = "328.000đ",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col items-center w-[32%] md:w-full`}>
      <div className="self-stretch bg-bg-white px-5 py-6 sm:py-5">
        <Img src={productImage} alt="Fashion Image" className="h-[230px] w-[230px] object-cover" />
      </div>
      <div className="mx-3.5 mb-6 flex flex-col items-start self-stretch">
        <Text as="p" className="text-[12px] font-normal text-blue_gray-600">
          {productCategory}
        </Text>
        <Heading
          size="headingxs"
          as="h6"
          className="mt-3 w-full text-[16px] font-semibold leading-[150%] text-blue_gray-900"
        >
          {productDescription}
        </Heading>
        <div className="mt-9 flex flex-wrap items-center gap-2.5 self-stretch">
          <Heading as="h6" className="flex text-[18px] font-semibold text-blue_gray-900">
            <span>278.000</span>
            <a href="#" className="inline underline">
              đ
            </a>
          </Heading>
          <Text
            size="textmd"
            as="p"
            className="self-start text-[14px] font-normal capitalize text-blue_gray-600 line-through"
          >
            {productOriginalPrice}
          </Text>
        </div>
      </div>
    </div>
  );
}



