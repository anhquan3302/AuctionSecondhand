import { Heading, Img } from "./..";
import React, { useState } from "react";
import { MenuItem, Menu, Sidebar } from "react-pro-sidebar";

export default function SidebarSeller({ ...props }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleMenuItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Sidebar
      {...props}
      width="276px !important"
      collapsedWidth="80px !important"
      collapsed={collapsed}
      className={`${props.className} flex flex-col h-screen top-0 !sticky overflow-auto`}
    >
      <Menu
        menuItemStyles={{
          button: {
            padding: "18px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            [`&:hover`]: { backgroundColor: "#19b269 !important" },
          },
        }}
        className="w-full self-stretch"
      >
        <MenuItem
          onClick={() => handleMenuItemClick(0)}
          className={`${activeIndex === 0 ? "bg-green-500 text-white" : "text-black"}`}
        >
          <div className="flex items-center">
            <Img
              src="images/img_growth_1.svg"
              alt="Dashboard Icon"
              className="h-[20px] w-[22px]"
            />
            <span className="ml-2">của seller</span>
          </div>
        </MenuItem>

        <MenuItem
          onClick={() => handleMenuItemClick(1)}
          className={`${activeIndex === 1 ? "bg-green-500 text-white" : "text-black"}`}
        >
          <div className="flex items-center">
            <Img
              src="images/img_growth_1.svg"
              alt="Products Icon"
              className="h-[20px] w-[22px]"
            />
            <span className="ml-2">Các sản phẩm</span>
          </div>
        </MenuItem>

        <MenuItem
          onClick={() => handleMenuItemClick(2)}
          className={`${activeIndex === 2 ? "bg-green-500 text-white" : "text-black"}`}
        >
          <div className="flex items-center">
            <Img
              src="images/img_growth_1.svg"
              alt="Orders Icon"
              className="h-[20px] w-[22px]"
            />
            <span className="ml-2">Đặt hàng</span>
          </div>
        </MenuItem>

        <MenuItem
          onClick={() => handleMenuItemClick(3)}
          className={`${activeIndex === 3 ? "bg-green-500 text-white" : "text-black"}`}
        >
          <div className="flex items-center">
            <Img
              src="images/img_growth_1.svg"
              alt="Customers Icon"
              className="h-[20px] w-[22px]"
            />
            <span className="ml-2">Khách hàng</span>
          </div>
        </MenuItem>

        <MenuItem
          onClick={() => handleMenuItemClick(4)}
          className={`${activeIndex === 4 ? "bg-green-500 text-white" : "text-black"}`}
        >
          <div className="flex items-center">
            <Img
              src="images/img_growth_1.svg"
              alt="Categories Icon"
              className="h-[20px] w-[22px]"
            />
            <span className="ml-2">Thể loại</span>
          </div>
        </MenuItem>

        <MenuItem
          onClick={() => handleMenuItemClick(5)}
          className={`${activeIndex === 5 ? "bg-green-500 text-white" : "text-black"}`}
        >
          <div className="flex items-center">
            <Img
              src="images/img_growth_1.svg"
              alt="Settings Icon"
              className="h-[20px] w-[22px]"
            />
            <span className="ml-2">Cài đặt</span>
          </div>
        </MenuItem>

        <MenuItem
          onClick={() => handleMenuItemClick(6)}
          className={`${activeIndex === 6 ? "bg-green-500 text-white" : "text-black"}`}
        >
          <div className="flex items-center">
            <Img
              src="images/img_growth_1.svg"
              alt="Logout Icon"
              className="h-[20px] w-[22px]"
            />
            <span className="ml-2">Đăng xuất</span>
          </div>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
