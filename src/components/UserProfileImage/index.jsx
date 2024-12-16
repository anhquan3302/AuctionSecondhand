import { Img } from "./..";
import React from "react";

export default function UserProfileImage({
  userImage = "images/img_image_75.png",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center px-2 py-2.5 border-solid bg-bg-white flex-1 rounded-md`}
    >
      <Img
        src={userImage}
        alt="Image Content"
        className="h-[70px] w-full object-cover"
      />
    </div>
  );
}
