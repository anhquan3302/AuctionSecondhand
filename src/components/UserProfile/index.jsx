import { Heading } from "./..";
import React from "react";

export default function UserProfile({
  saoCounterText = "3 sao",
  threePercentText = "3%",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex sm:flex-col justify-center items-start gap-7 flex-1`}
    >
      <Heading
        as="p"
        className="font-jost text-[16px] font-normal text-blue_gray-900_01"
      >
        {saoCounterText}
      </Heading>
      <div className="flex flex-1 flex-col items-end self-center">
        <Heading
          as="p"
          className="font-jost text-[16px] font-normal text-blue_gray-900_01"
        >
          {threePercentText}
        </Heading>
        <div className="relative mt-[-2px] flex self-stretch rounded-md bg-gray-100">
          <div className="h-[12px] w-[70%] rounded-md bg-orange-300" />
        </div>
      </div>
    </div>
  );
}
