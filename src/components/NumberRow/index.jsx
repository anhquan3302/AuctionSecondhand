import { Text, Img } from "./..";
import React from "react";

export default function NumberRow({
  numberOneText = "1",
  numberTwoText,
  numberThreeText = "3",
  numberFourText,
  numberFiveText = "5",
  ellipsisText = "...",
  numberTwentyOneText = "20",
  summaryText,
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center gap-[22px] py-2 md:mx-0`}
    >
      <div className="self-stretch">
        <div className="flex flex-col items-center">
          <div className="flex w-[50%] flex-wrap items-center justify-center sm:w-full">
            <Text className="font-jost text-[14px] font-medium text-gray-900_02">
              {numberOneText}
            </Text>
            {!!numberTwoText ? (
              <Text className="ml-[26px] flex h-[40px] w-[40px] items-center justify-center rounded-[20px] border border-solid border-green-a700 bg-green-a700 text-center font-jost text-[14px] font-medium text-gray-100_01 sm:w-[40px]">
                {numberTwoText}
              </Text>
            ) : null}
            <Text className="ml-[26px] font-jost text-[14px] font-medium text-gray-900_02">
              {numberThreeText}
            </Text>
            {!!numberFourText ? (
              <Text className="ml-6 flex h-[40px] w-[40px] items-center justify-center rounded-[20px] border border-solid border-gray-100_01 bg-gray-100_01 text-center font-jost text-[14px] font-medium text-gray-900_02 sm:w-[40px]">
                {numberFourText}
              </Text>
            ) : null}
            <Text className="ml-[26px] font-jost text-[14px] font-medium text-gray-900_02">
              {numberFiveText}
            </Text>
            <Text className="mb-1 ml-[38px] self-end font-jost text-[14px] font-medium text-gray-900_02">
              {ellipsisText}
            </Text>
            <Text className="ml-[34px] font-jost text-[14px] font-medium text-gray-900_02">
              {numberTwentyOneText}
            </Text>
          </div>
          <div className="relative mt-[-40px] flex justify-between gap-5 self-stretch">
            <Img
              src="images/defaultNoData.png"
              alt="Clock"
              className="h-[50px] w-[50px]"
            />
            <Img
              src="images/defaultNoData.png"
              alt="Arrowright"
              className="h-[50px] w-[50px]"
            />
          </div>
        </div>
      </div>
      {!!summaryText ? (
        <Text className="text-[14px] font-normal text-blue_gray-600">
          {summaryText}
        </Text>
      ) : null}
    </div>
  );
}
