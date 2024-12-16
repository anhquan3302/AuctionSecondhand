import { CloseSVG } from "../Input/close.jsx";
import { Heading, SelectBox, Img, Button, Input, Text } from "./..";
import React from "react";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function Header21({ ...props }) {
  const [searchBarValue2, setSearchBarValue2] = React.useState("");

  return (
    <header
      {...props}
      className={`${props.className} flex self-stretch items-center py-2.5`}
    >
      <div className="flex w-full flex-col items-center gap-1.5">
        <div className="self-stretch">
          <div className="flex flex-col items-center">
            <div className="mx-auto flex w-full max-w-[1344px] items-start justify-between gap-5 self-start md:flex-col md:px-5">
              <div className="mb-1 flex items-start sm:flex-col">
                <div className="flex items-center self-center">
                  <a href="#">
                    <Img
                      src="images/img_pin_1.svg"
                      alt="Location Image"
                      className="h-[24px]"
                    />
                  </a>
                  <Text
                    size="texts"
                    as="p"
                    className="ml-1 self-start text-[13px] font-normal text-blue_gray-900_01"
                  >
                    118 Cách Mạng Tháng 8
                  </Text>
                  <div className="ml-4 h-[32px] w-px bg-gray-200" />
                </div>
                <a href="#">
                  <Img
                    src="images/img_phone_1.svg"
                    alt="Phone Image"
                    className="ml-5 h-[24px] self-end sm:ml-0 sm:w-full sm:self-auto"
                  />
                </a>
                <Text
                  size="texts"
                  as="p"
                  className="ml-1 font-bevietnampro text-[13px] font-normal text-blue_gray-900_01 sm:ml-0"
                >
                  <span>Bạn cần trợ giúp? Gọi ngay:&nbsp;</span>
                  <span className="font-medium">+84 1800 900</span>
                </Text>
              </div>
              <div className="flex w-[24%] justify-center gap-4 self-end md:w-full md:self-auto">
                <div className="h-[20px] w-px bg-gray-200" />
                <div className="relative h-[20px] flex-1">
                  <ul className="absolute bottom-[0.99px] left-0 right-0 !m-auto flex flex-wrap gap-[46px]">
                    <li>
                      <a href="#">
                        <Text
                          size="texts"
                          as="p"
                          className="text-[13px] font-normal text-blue_gray-900_01"
                        >
                          Trợ giúp
                        </Text>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <Text
                          size="texts"
                          as="p"
                          className="text-[13px] font-normal text-blue_gray-900_01"
                        >
                          Tìm cửa hàng
                        </Text>
                      </a>
                    </li>
                  </ul>
                  <div className="absolute bottom-0 left-[45%] top-0 my-auto h-[20px] w-px bg-gray-200" />
                </div>
                <div className="flex w-[36%] items-center justify-center gap-2.5">
                  <div className="h-[20px] w-px bg-gray-200" />
                  <div className="flex flex-1 items-center justify-center gap-4 self-end">
                    <Img
                      src="images/defaultNoData.png"
                      alt="Facebook Icon 1"
                      className="h-[12px]"
                    />
                    <Img
                      src="images/defaultNoData.png"
                      alt="Facebook Icon 2"
                      className="h-[12px]"
                    />
                    <Img
                      src="images/defaultNoData.png"
                      alt="Facebook Icon 3"
                      className="h-[12px]"
                    />
                    <Img
                      src="images/defaultNoData.png"
                      alt="Facebook Icon 4"
                      className="h-[10px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mr-1 mt-3 h-[1.17px] self-stretch bg-gray-200 md:mr-0" />
            <div className="mx-auto mt-5 flex w-full max-w-[1326px] items-center justify-between gap-5 self-stretch md:flex-col md:px-5">
              <Img
                src="images/img_header_logo.png"
                alt="Logo Image"
                className="h-[32px] w-[92px] self-end object-contain md:self-auto"
              />
              <div className="flex w-[86%] items-center justify-between gap-5 md:w-full md:flex-col">
                <Input
                  color="green_A700"
                  size="xs"
                  variant="outline"
                  shape="round"
                  name="Search Bar"
                  placeholder={`Tìm kiếm`}
                  value={searchBarValue2}
                  onChange={(e) => setSearchBarValue2(e.target.value)}
                  suffix={
                    searchBarValue2?.length > 0 ? (
                      <CloseSVG
                        onClick={() => setSearchBarValue2("")}
                        width={22}
                        fillColor="#112137ff"
                      />
                    ) : (
                      <Img
                        src="images/defaultNoData.png"
                        alt="Search"
                        className="h-[20px] w-[22px]"
                      />
                    )
                  }
                  className="mb-1 w-[62%] gap-4 self-end rounded-md !border px-3.5 text-blue_gray-600_01 md:w-full md:self-auto"
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
                    <Heading
                      size="headingmd"
                      as="p"
                      className="font-bevietnampro text-[14px] font-bold leading-[22px] text-blue_gray-900_01"
                    >
                      <span className="text-[13px] font-normal">
                        <>
                          Yêu thích
                          <br />
                        </>
                      </span>
                      <span className="text-[16px] font-medium">Sản phẩm</span>
                    </Heading>
                  </div>
                  <a href="#">
                    <Button
                      color="green_A700_11"
                      shape="round"
                      className="w-[50px] rounded-md px-2.5"
                    >
                      <Img src="images/img_profile_1.svg" />
                    </Button>
                  </a>
                  <Heading
                    size="headingmd"
                    as="p"
                    className="w-[24%] font-bevietnampro text-[14px] font-bold leading-[22px] text-blue_gray-900_01 sm:w-full"
                  >
                    <span className="text-[13px] font-normal">
                      <>
                        Đăng nhập
                        <br />
                      </>
                    </span>
                    <span className="text-[16px] font-medium">Tài khoản</span>
                  </Heading>
                  <a href="#">
                    <Button
                      color="green_A700"
                      size="2xl"
                      shape="round"
                      className="w-[48px] self-center rounded-md px-3"
                    >
                      <Img src="images/img_shopping_cart_1.svg" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="container-md mt-9 h-[0.67px] self-stretch bg-gray-200 md:px-5" />
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[1286px] flex-col items-start md:px-5">
          <div className="flex w-[64%] items-start gap-[46px] md:w-full md:flex-col">
            <SelectBox
              shape="square"
              indicator={
                <Img
                  src="images/img_vector_bg_white_.svg"
                  alt="Vector"
                  className="h-[6px] w-[8px]"
                />
              }
              name="Categories Dropdown"
              placeholder={`Danh mục`}
              options={dropDownOptions}
              className="w-[38%] gap-4 self-center font-semibold text-bg-white md:w-full"
            />
            <div className="mt-3 flex flex-1 justify-center md:self-stretch">
              <ul className="flex flex-wrap gap-[66px] md:gap-5">
                <li>
                  <a href="#">
                    <Heading
                      as="p"
                      className="text-[16px] font-medium text-blue_gray-900_01"
                    >
                      Trang chủ
                    </Heading>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Heading
                      as="p"
                      className="text-[16px] font-medium text-blue_gray-900_01"
                    >
                      Sản phẩm
                    </Heading>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Heading
                      as="p"
                      className="text-[16px] font-medium text-blue_gray-900_01"
                    >
                      Liên hệ
                    </Heading>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <Heading
                      as="p"
                      className="text-[16px] font-medium text-blue_gray-900_01"
                    >
                      Bài viết
                    </Heading>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
