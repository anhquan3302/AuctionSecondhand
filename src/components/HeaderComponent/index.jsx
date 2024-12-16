import { CloseSVG } from "../InputDH/close.jsx";
import { Text, SelectBox, Img, ButtonDH, InputDH } from "./..";
import React from "react";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function HeaderComponent({
  p118cchmng = "118 Cách Mạng Tháng 8",
  bncntrgip,
  trgip = "Trợ giúp",
  tmcahng = "Tìm cửa hàng",
  yuthchsn,
  ngnhptikho,
  cartItemCount = "2",
  homeMenuItem = "Trang chủ",
  productsMenuItem = "Sản phẩm",
  contactMenuItem = "Liên hệ",
  blogMenuItem = "Bài viết",
  ...props
}) {
  const [searchBarValue1, setSearchBarValue1] = React.useState("");

  return (
    <div
      {...props}
      className={`${props.className} flex flex-col sm:flex-col self-stretch items-center py-2.5`}
    >
      <div className="flex flex-col items-center gap-1 self-stretch">
        <div className="container-sm flex items-start justify-between gap-5 self-stretch md:flex-col md:px-5">
          <div className="flex w-[36%] items-center justify-center md:w-full sm:flex-col">
            <a href="#">
              <Img
                src="images/img_pin_1.svg"
                alt="Pin Image"
                className="h-[24px] sm:w-full"
              />
            </a>
            <Text className="ml-1 self-start text-[13px] font-normal text-blue_gray-900_01 sm:ml-0 sm:self-auto">
              {p118cchmng}
            </Text>
            <div className="ml-4 h-[32px] w-px bg-gray-200 sm:ml-0 sm:h-px sm:w-[32px]" />
            <div className="ml-5 flex flex-1 items-start justify-center gap-1 sm:ml-0 sm:self-stretch">
              <a href="#">
                <Img
                  src="images/img_phone_1.svg"
                  alt="Phone Image"
                  className="h-[24px] self-end"
                />
              </a>
              <Text className="font-bevietnampro text-[13px] font-normal text-blue_gray-900_01">
                <span>Bạn cần trợ giúp? Gọi ngay:&nbsp;</span>
                <span className="font-medium">+84 1800 900</span>
              </Text>
            </div>
          </div>
          <div className="mt-2 flex w-[28%] justify-center self-end p-2 md:w-full md:self-auto">
            <div className="flex w-[86%] items-center justify-center gap-3 md:w-full">
              <div className="flex flex-1 items-center justify-center">
                <div className="flex w-[34%] justify-center gap-[30px]">
                  <div className="flex flex-1">
                    <div className="h-[20px] w-px bg-gray-200" />
                  </div>
                  <div className="h-[20px] w-px bg-gray-200" />
                </div>
                <ul className="relative !ml-[-82px] flex flex-wrap gap-[46px] self-end">
                  <li>
                    <a href="#">
                      <Text className="text-[13px] font-normal text-blue_gray-900_01">
                        {trgip}
                      </Text>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Text className="text-[13px] font-normal text-blue_gray-900_01">
                        {tmcahng}
                      </Text>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="h-[20px] w-px bg-gray-200" />
              <div className="flex items-center gap-4 self-end">
                <Img
                  src="images/img_facebook.svg"
                  alt="Facebook Icon 1"
                  className="h-[12px]"
                />
                <Img
                  src="images/img_facebook.svg"
                  alt="Facebook Icon 2"
                  className="h-[12px]"
                />
                <Img
                  src="images/img_facebook.svg"
                  alt="Facebook Icon 3"
                  className="h-[12px]"
                />
                <Img
                  src="images/img_facebook_blue_gray_900_01_1.png"
                  alt="Facebook Icon 4"
                  className="h-[10px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[1.17px] w-full self-stretch bg-gray-200" />
      </div>
      <div className="container-md mt-5 flex flex-col gap-9 self-stretch md:px-5">
        <div className="ml-[74px] mr-6 flex items-center justify-between gap-5 md:mx-0 md:flex-col">
          <Img
            src="images/img_header_logo.png"
            alt="Header Logo"
            className="h-[32px] w-[92px] self-end object-contain md:self-auto"
          />
          <div className="flex w-[86%] items-center justify-between gap-5 md:w-full md:flex-col">
            <InputDH
              name="Search Field"
              placeholder={`Tìm kiếm`}
              value={searchBarValue1}
              onChange={(e) => setSearchBarValue1(e.target.value)}
              suffix={
                searchBarValue1?.length > 0 ? (
                  <CloseSVG
                    onClick={() => setSearchBarValue1("")}
                    width={22}
                    fillColor="#112137ff"
                  />
                ) : (
                  <Img
                    src="images/img_search.svg"
                    alt="Search"
                    className="h-[20px] w-[22px]"
                  />
                )
              }
              className="mb-1 h-[38px] w-[62%] gap-4 self-end rounded-md border border-solid border-green-a700 px-3.5 text-[14px] text-blue_gray-600_01 md:w-full md:self-auto"
            />
            <div className="mr-4 flex w-[32%] items-end justify-center gap-4 md:mr-0 md:w-full sm:flex-col">
              <div className="flex flex-1 justify-center gap-3.5 sm:self-stretch">
                <div className="flex rounded-md bg-green-a700_11 p-2.5">
                  <a href="#">
                    <Img
                      src="images/img_heart_1.svg"
                      alt="Heart Icon"
                      className="h-[18px]"
                    />
                  </a>
                </div>
                <Text className="font-bevietnampro text-[14px] font-bold leading-[22px] text-blue_gray-900_01">
                  <span className="text-[13px] font-normal">
                    <>
                      Yêu thích
                      <br />
                    </>
                  </span>
                  <span className="text-[16px] font-medium">Sản phẩm</span>
                </Text>
              </div>
              <div className="flex flex-1 items-center justify-center gap-3.5 sm:self-stretch">
                <a href="#">
                  <ButtonDH className="h-[48px] w-[50px] rounded-md bg-green-a700_11 p-2.5">
                    <Img src="images/img_profile_1.svg" />
                  </ButtonDH>
                </a>
                <Text className="font-bevietnampro text-[14px] font-bold leading-[22px] text-blue_gray-900_01">
                  <span className="text-[13px] font-normal">
                    <>
                      Đăng nhập
                      <br />
                    </>
                  </span>
                  <span className="text-[16px] font-medium">Tài khoản</span>
                </Text>
              </div>
              <div className="relative h-[52px] w-[14%] self-center sm:w-full">
                <div className="absolute bottom-[-0.82px] left-0 my-auto ml-auto mr-1 flex flex-1 flex-col items-center rounded-md bg-green-a700 px-3 py-3.5 md:mr-0">
                  <a href="#">
                    <Img
                      src="images/img_shopping_cart_1.svg"
                      alt="Cart Icon"
                      className="h-[18px]"
                    />
                  </a>
                </div>
                <Text className="absolute right-[0.12px] top-0 m-auto rounded-md bg-orange-300 p-0.5 text-[8px] font-bold text-blue_gray-900_02">
                  {cartItemCount}
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[0.67px] bg-gray-200" />
      </div>
      <div className="container-xs mt-1.5 flex flex-col items-start md:px-5">
        <div className="flex w-[62%] items-start justify-between gap-5 md:w-full md:flex-col">
          <SelectBox
            indicator={
              <Img
                src="images/img_vector_bg_white_.svg"
                alt="Vector"
                className="h-[6px] w-[8px]"
              />
            }
            name="Dropdown Categories"
            placeholder={`Danh mục`}
            options={dropDownOptions}
            className="w-[38%] gap-4 self-center bg-green-a700 py-[18px] pl-[22px] pr-8 text-[16px] font-semibold text-bg-white md:w-full sm:px-5"
          />
          <ul className="!mt-3.5 flex flex-wrap gap-[66px] md:gap-5">
            <li>
              <a href="#">
                <Text className="text-[16px] font-medium text-blue_gray-900_01">
                  {homeMenuItem}
                </Text>
              </a>
            </li>
            <li>
              <a href="#">
                <Text className="text-[16px] font-medium text-blue_gray-900_01">
                  {productsMenuItem}
                </Text>
              </a>
            </li>
            <li>
              <a href="#">
                <Text className="text-[16px] font-medium text-blue_gray-900_01">
                  {contactMenuItem}
                </Text>
              </a>
            </li>
            <li>
              <a href="#">
                <Text className="text-[16px] font-medium text-blue_gray-900_01">
                  {blogMenuItem}
                </Text>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
