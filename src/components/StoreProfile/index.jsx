import { ButtonDH, Heading, Img, Text } from "./..";
import React from "react";
import {Button} from "@material-tailwind/react";


export default function StoreProfile({
  storeImage = "images/img_beautiful_young.png",
  storeName = "Apple Store",
  sellerReviews = "965 seller reviews",
  storeDescription = (
    <>
      1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
      <br />
      sale@zenmart.com
      <br />
      +3 8493 92 932 021
    </>
  ),
  viewStoreButtonText = "Xem cửa hàng",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center justify-center w-full gap-6 px-6 py-[30px] sm:p-5 border-gray-200 border border-solid bg-bg-white rounded-md`}
    >
      <Img src={storeImage} alt="Store Image" className="h-[210px] w-full rounded-md object-cover" />
      <div className="flex flex-col gap-6 self-stretch">
        <div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <Heading size="textxl" as="p" className="font-jost text-[16px] font-medium text-blue_gray-900_01">
                {storeName}
              </Heading>
              <Text as="p" className="mr-[22px] self-end font-jost text-[14px] font-normal text-blue_gray-900_01">
                {sellerReviews}
              </Text>
            </div>
            <div className="flex gap-1.5">
              <Img src="images/img_star_1_1.svg" alt="Star Rating 1" className="h-[10px]" />
              <Img src="images/img_star_1_1.svg" alt="Star Rating 2" className="h-[10px]" />
              <Img src="images/img_star_1_1.svg" alt="Star Rating 3" className="h-[10px]" />
              <Img src="images/img_star_1_1.svg" alt="Star Rating 4" className="h-[10px]" />
              <Img src="images/img_star_1_1.svg" alt="Star Rating 5" className="h-[10px]" />
            </div>
          </div>
        </div>
        <Heading size="textxl" as="p" className="font-jost text-[16px] font-normal leading-7 text-blue_gray-900_01">
          {storeDescription}
        </Heading>
        {/*<ButtonDH variant="fill" shape="round" className="rounded-md border px-[33px]">*/}
        {/*  {viewStoreButtonText}*/}
        {/*</ButtonDH>*/}
        <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Xem cửa hàng
        </Button>

      </div>
    </div>
  );
}










