import React from "react";
import { Button } from "antd";

const AccountOptions = () => {
  const options = [
    {
      imgSrc: "images/img_growth_1.svg",
      alt: "Account Info Image",
      text: "Thông tin tài khoản",
      href: "/account-info", // Đường dẫn cho button link
    },
    {
      imgSrc: "images/img_checked_box_1.svg",
      alt: "Favorites Image",
      text: "Xác minh tài khoản",
      href: "/favorites",
    },
    {
      imgSrc: "images/img_location_1.svg",
      alt: "Address Image",
      text: "Quản lý địa chỉ",
      href: "/address-management",
    },
    {
      imgSrc: "images/img_thumbs_up.svg",
      alt: "Thumbs Up Image",
      text: "Đơn hàng",
      href: "/orders",
    },
    {
      imgSrc: "images/img_lichsu.svg",
      alt: "History Image",
      text: "Lịch sử giao dịch",
      href: "/transaction-history",
    },
    {
      imgSrc: "images/img_auction.svg",
      alt: "Auction Image",
      text: "Sản phẩm đã đấu giá",
      href: "/auction-products",
    },
    {
      imgSrc: "images/img_deposit.svg",
      alt: "Deposit Image",
      text: "Nạp tiền",
      href: "/deposit",
    },
    {
      imgSrc: "images/img_logout.svg",
      alt: "Logout Image",
      text: "Đăng xuất",
      href: "/logout",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-[22px]">
      {options.map((option, index) => (
        <Button
          key={index}
          type="link"
          href={option.href} // Link path
          className="flex justify-start items-center gap-[10px] p-0 hover:text-green-a700" // Adjust hover text color
        >
          <img
            src={option.imgSrc}
            alt={option.alt}
            className="h-[20px] w-[20px]"
          />
          <span className="text-[15px] font-normal text-blue_gray-900_01 hover:text-green-a700 hover:font-semibold transition-all duration-200">
            {option.text}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default AccountOptions;
