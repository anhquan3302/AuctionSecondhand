import { Heading } from "./..";
import React from "react";

export default function UserStatistics({
  starCount = "2 sao",
  percentageText = "1%",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex sm:flex-col justify-center items-start gap-[26px]`}
    >
      <Heading
        as="p"
        className="font-jost text-[16px] font-normal text-blue_gray-900_01"
      >
        {starCount}
      </Heading>
      <div className="flex flex-1 flex-col items-end self-center">
        <Heading
          as="p"
          className="font-jost text-[16px] font-normal text-blue_gray-900_01"
        >
          {percentageText}
        </Heading>
        <div className="relative mt-[-2px] h-[12px] self-stretch rounded-md bg-gray-100">
          <div
            style={{ width: "70%" }}
            className="absolute h-full rounded-md bg-orange-300"
          />
        </div>
      </div>
    </div>
  );
}
