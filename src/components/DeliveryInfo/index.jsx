import { Heading, Img } from "./..";
import React from "react";

export default function DeliveryInfo({
  deliveryImage = "images/img_fast_delivery_1.svg",
  shippingInfoText = "Miễn phí giao hàng",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex items-start md:w-full mb-10 gap-3`}
    >
      <Img
        src={deliveryImage}
        alt="Delivery Icon"
        className="h-[56px] w-[18%] self-center object-contain"
      />
      <Heading
        as="p"
        className="w-[80%] text-[16px] font-medium leading-7 text-blue_gray-900_01"
      >
        {shippingInfoText}
      </Heading>
    </div>
  );
}
