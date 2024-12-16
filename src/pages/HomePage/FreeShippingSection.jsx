import { Text } from "../../components";
import DeliveryInfo from "../../components/DeliveryInfo";
import React from "react";

export default function FreeShippingSection() {
  return (
    <>
      {/* free shipping section */}
      <div className="mt-5 flex justify-center self-stretch">
        <div className="container-xs flex justify-center md:px-5">
          <div className="w-full rounded-md border border-solid border-gray-200 px-[26px] py-[30px] sm:p-5">
            <div className="mb-1 ml-3.5 flex md:ml-0 ">
              <DeliveryInfo className="w-[10%]" />
              <Text
                size="textlg"
                as="p"
                className="mt-[52px] w-[18%] text-[15px] font-normal leading-[22px] text-blue_gray-600_01 md:w-full"
              >
                Miễn phí cho đơn hàng trên 200K
              </Text>
              <DeliveryInfo className="w-[14%]" />
              <Text
                size="textlg"
                as="p"
                className="mt-[52px] w-[14%] text-[15px] font-normal leading-[22px] text-blue_gray-600_01 md:w-full"
              >
                Đổi trả trong vòng 30 ngày
              </Text>
              <DeliveryInfo className="w-[14%]" />
              <Text
                size="textlg"
                as="p"
                className="mt-[52px] w-[18%] text-[15px] font-normal leading-[22px] text-blue_gray-600_01 md:w-full"
              >
                24 giờ một ngày, 7 ngày một tuần
              </Text>
              <DeliveryInfo className="w-[16%]" />
              <Text
                size="textlg"
                as="p"
                className="mt-[52px] w-[16%] text-[15px] font-normal leading-[22px] text-blue_gray-600_01 md:w-full"
              >
                Thanh toán bằng thẻ tín dụng
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
