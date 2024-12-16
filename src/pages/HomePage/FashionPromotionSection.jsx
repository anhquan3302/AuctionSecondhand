import { ButtonDH, InputDH, Heading, Img } from "../../components";
import React from "react";

export default function FashionPromotionSection() {
  return (
    <>
      {/* fashion promotion section */}
      <div className="mt-[54px] flex justify-center self-stretch">
        <div className="container-xs flex justify-center md:px-5">
          <div className="relative h-[608px] w-full rounded-md bg-gray-100_01 px-3.5 py-2">
            <Img
              src="images/img_fashion_3_1.png"
              alt="Fashion Image"
              className="absolute bottom-[9px] right-[15px] m-auto h-[342px] w-[42%] rounded-md object-contain"
            />
            <div className="absolute left-0 right-0 top-[19%] mx-9 my-auto flex-1 md:mx-0">
              <div>
                <div className="relative z-[4] h-[272px]">
                  <Heading
                    size="heading3xl"
                    as="h2"
                    className="absolute bottom-0 left-[0.06px] top-0 my-auto h-max w-[58%] text-[32px] font-semibold uppercase leading-[140%] text-blue_gray-900_01 md:text-[30px] sm:text-[28px]"
                  >
                    <>
                      Ở nhà và nhận hàng ngày của bạn
                      <br />
                      nhu cầu từ cửa hàng của chúng tôi
                    </>
                  </Heading>
                  <Heading
                    as="h3"
                    className="absolute bottom-[39%] left-0 m-auto text-[16px] font-normal text-blue_gray-900_01"
                  >
                    Bắt đầu mua sắm hàng ngày của bạn với EZShop
                  </Heading>
                </div>
                <div className="relative mt-[-28px] flex gap-2.5 sm:flex-col">
                  <InputDH
                    size="lg"
                    shape="round"
                    type="email"
                    name="Email Input"
                    placeholder={`Địa chỉ Email của bạn`}
                    className="w-[38%] rounded-md px-[22px] sm:w-full sm:px-5"
                  />
                  <ButtonDH
                    color="green_400"
                    size="4xl"
                    shape="round"
                    className="min-w-[130px] rounded-md border border-solid border-green-400 px-[33px] sm:px-5"
                  >
                    Gửi ngay
                  </ButtonDH>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
