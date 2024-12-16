import { Img, ButtonDH, Text, Heading } from "../../components";
import React from "react";

export default function FeaturedProductsSection() {
  return (
    <>
<div className="relative h-[400px] self-stretch bg-gradient-to-r from-gray-400 via-blue-gray-300 to-gray-700 rounded-lg shadow-xl">
<div className="absolute bottom-0 right-0 top-0 left-0 m-auto flex items-center justify-between w-[90%] h-[384px] z-10">
          {/* Text and Image side by side */}
          <div className="flex flex-col justify-start gap-4 w-[50%] text-black">
            {/* Văn bản gọn gàng hơn */}
            <Heading
              size="heading5xl"
              as="h2"
              className="text-[36px] font-semibold uppercase leading-[48px] text-black md:text-[32px] sm:text-[28px] tracking-wide"
            >
              SĂN TÌM SẢN PHẨM GIÁ TRỊ
            </Heading>
            <Text
              as="p"
              className="text-[14px] font-light leading-[1.6] opacity-90"
            >
              Khám phá những sản phẩm chất lượng, từ đồng hồ, xe cổ cho đến các tác phẩm nghệ thuật quý hiếm.
            </Text>
          </div>

          {/* Hình ảnh bên phải */}
          <div className="relative w-[40%] flex space-x-2">
            <Img
              src="images/img_model_women.png"
              alt="Model Image"
              className="ml-auto h-[384px] w-[40%] object-contain"
            />
            <div className="absolute bottom-[-1.61px] right-[9%] m-auto h-[172px] w-[12%] rotate-[17deg] rounded-[50%] bg-gray-900_99 blur-[60.00px] backdrop-opacity-[0.5]" />
          </div>
          <Img
            src="images/img_model_men.png"
            alt="Men Model"
            className="absolute bottom-0 right-[1.13px] top-0 my-auto h-[394px] w-[28%] object-contain"
          />


        </div>
      </div >
    </>
  );
}
