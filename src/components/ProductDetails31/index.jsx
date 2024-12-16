import { Text, Img } from "./..";
import React from "react";
//import { Button, Flex } from 'antd';

export default function ProductDetails31({
  productImage = "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/item_3.jpg?alt=media&token=c9954697-106d-4dc9-84c3-72851179e794",
  productCategory = "Thời trang",
  productDescription = <>Faker is mundo?</>,
  reviewCount = "3,014 đánh giá",
  currentPrice,
  originalPrice = "328.000đ",
  discount = "Giảm 20%",
  soldCount = "Đã bán 56",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center gap-0.5 border-gray-200 border border-solid bg-bg-white rounded-lg`}
    >
      <div className="self-stretch bg-bg-white px-2 py-2 sm:py-5 rounded-t-lg">
        <Img
          src={productImage}
          alt="Product Image"
          className="h-[300px] w-full object-cover rounded-t-lg"
        />{" "}
        {/* Tăng kích thước ảnh */}
      </div>
      <div className="mb-[22px] ml-3.5 mr-4 flex flex-col gap-5 self-stretch rounded-b-lg">
        <div className="flex flex-col items-start">
          <button className="text-[14px] font-normal text-blue_gray-600_01">
            {productCategory}
          </button>
          <button className="mt-2 w-full text-left text-[16px] font-semibold leading-[150%] text-blue_gray-900_01">
            {productDescription}
          </button>

          <div className="mt-[18px] flex items-start gap-[11px] self-stretch">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                4.95
              </p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <a
                href="#"
                className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
              >
                73 reviews
              </a>
            </div>
          </div>
          <div className="mt-2.5 flex flex-wrap items-center justify-center self-stretch">
            <Text className="flex text-[18px] font-semibold text-blue_gray-900_01">
              <span>278.000</span>
              <a href="#" className="inline underline">
                đ
              </a>
            </Text>
            <Text className="ml-2.5 self-start text-[14px] font-normal capitalize text-blue_gray-600_01 line-through">
              {originalPrice}
            </Text>
            <Text className="ml-2.5 text-[12px] font-normal text-deep_purple-800">
              {discount}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
