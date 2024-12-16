import React from "react";
import { Button } from "../Button/index.jsx";
import { Heading } from "../Heading/index.jsx";

const AccountOptions = () => {
  return (
    <div className="mt-14 flex items-center gap-[33px]">
      <Button
        size="lg"
        shape="round"
        className="min-w-[114px] rounded-md border border-solid border-green-a700 px-[23px] sm:px-5 bg-green-500 text-white"
      >
        Nạp tiền
      </Button>

      <Heading as="p" className="text-[16px] font-normal text-blue_gray-600">
        Hủy bỏ
      </Heading>
    </div>
  );
};
export default AccountOptions;
