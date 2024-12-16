import { Text, RatingBar, Img } from "./..";
import React from "react";

export default function ProductDetails5({
  category = "Thời trang",
  productDescription = "Áo tập gym thoáng mát Nike thấm hút mồ hôi",
  reviewCount = "3,014 đánh giá",
  currentPrice,
  originalPrice = "128.000đ",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center border-gray-200 border border-solid bg-bg-white`}
    >
      <div className="self-stretch bg-bg-white px-4 py-6 sm:py-5">
        <Img
          src="images/img_image_30_230x176.png"
          alt="Image Thirty One"
          className="h-[230px] w-full object-cover"
        />
      </div>
      <div className="mx-3 mb-4 flex flex-col items-start gap-2.5 self-stretch">
        <Text className="text-[12px] font-normal text-blue_gray-600_01">
          {category}
        </Text>
        <Text className="w-full text-[16px] font-semibold leading-[150%] text-blue_gray-900_01">
          {productDescription}
        </Text>
        <div className="flex items-start gap-[9px] self-stretch">
          <RatingBar
            value={5}
            isEditable={true}
            color="#f5c34b"
            activeColor="#f5c34b"
            size={10}
            className="flex gap-2.5"
          />
          <Text className="self-center text-[12px] font-normal text-blue_gray-600_01">
            {reviewCount}
          </Text>
        </div>
        <div className="flex flex-wrap items-start gap-2.5 self-stretch">
          <Text className="flex self-center font-bevietnampro text-[18px] font-semibold text-blue_gray-900_01">
            <span>278.000</span>
            <a href="#" className="inline underline">
              đ
            </a>
          </Text>
          <Text className="text-[14px] font-normal capitalize text-blue_gray-600_01 line-through">
            {originalPrice}
          </Text>
        </div>
      </div>
    </div>
  );
}
