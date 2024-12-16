import { ButtonDH, Text, Heading, Img } from "./..";
import React from "react";

export default function UserAddressProfile({
  userImage = "images/img_contrast.svg",
  userTitle = "Home",
  userAddress = (
    <>
      {" "}
      90/2/2 đường 11
      <br /> Linh xuân
      <br /> Thành phố Thủ Đức
    </>
  ),
  editButtonLabel = "Sửa",
  deleteButtonLabel = "Xóa",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center justify-center w-[32%] md:w-full p-3.5 bg-gradient1 rounded-[20px]`}
    >
      <div className="mr-2 w-[88%]">
        <div className="flex items-center">
          <Img
            src={userImage}
            alt="Contrastimage"
            className="h-[24px] w-[24px]"
          />
          <Heading
            as="p"
            className="ml-1 text-[20px] font-medium text-bg-white"
          >
            {userTitle}
          </Heading>
        </div>
        <Text
          as="p"
          className="mr-3.5 mt-9 text-center text-[15px] font-medium leading-[22px] text-bg-white"
        >
          {userAddress}
        </Text>
        <div className="mt-[52px] flex justify-between gap-5">
          <ButtonDH
            variant="outline"
            shape="round"
            color="undefined_undefined"
            className="min-w-[72px] rounded-md !border px-[23px] sm:px-5"
          >
            {editButtonLabel}
          </ButtonDH>
          <ButtonDH
            variant="outline"
            shape="round"
            color="undefined_undefined"
            className="min-w-[72px] rounded-md !border !bg-gradient2 px-[23px] sm:px-5"
          >
            {deleteButtonLabel}
          </ButtonDH>
        </div>
      </div>
    </div>
  );
}
