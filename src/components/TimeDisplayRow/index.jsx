import { Heading, Img } from "./..";
import React from "react";

export default function TimeDisplayRow({
  thigianbtu = "Thời gian bắt đầu:",
  timeText = "00:00:00 ",
  dateText = "07-10-2024",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex sm:flex-col justify-between items-start gap-5 flex-1`}>
      <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
        {thigianbtu}
      </Heading>
      <div className="flex w-[70%] flex-wrap items-center justify-between gap-5 self-center rounded-[10px] bg-gradient px-11 md:px-5">
        <Img src="images/img_image_159.png" alt="Clock Image" className="h-[28px] rounded-lg object-cover" />
        <Heading as="p" className="text-[20px] font-medium text-white-a700 sm:text-[17px]">
          {timeText}
        </Heading>
        <Heading as="p" className="mr-[34px] text-[20px] font-medium text-white-a700 sm:mr-0 sm:text-[17px]">
          {dateText}
        </Heading>
      </div>
    </div>
  );
}



