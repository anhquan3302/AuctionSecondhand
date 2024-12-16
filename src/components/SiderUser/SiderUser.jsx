import { Heading } from "../Heading/index.jsx";
import { Input } from "../Input/index.jsx";
import { Button } from "../Button/index.jsx";
import { Text } from "../Text/index.jsx";
import React from "react";

const Navbar = () => {
  return (
    <div className="self-stretch">
      <div className="flex flex-col gap-4">
        <div className="mr-1 md:mr-0">
          <div className="flex flex-col items-start gap-1.5 self-end py-7">
            <Heading
              size="headingmd"
              as="h4"
              className="text-[16px] font-semibold text-blue_gray-900_01"
            >
              Thông tin tài khoản{" "}
            </Heading>
            <div className="h-[2px] w-[14%] bg-blue_gray-900_01" />
          </div>
        </div>
        <div>
          <div className="flex items-start gap-6 md:flex-col">
            <div className="flex w-full flex-col gap-4 self-center">
              <div className="flex flex-col items-start justify-center gap-2">
                <Heading
                  as="h5"
                  className="text-[16px] font-medium text-blue_gray-900_01"
                >
                  Tên
                </Heading>
                <Input
                  shape="round"
                  name="Name Field"
                  placeholder={`Nhập tên`}
                  className="self-stretch rounded-md border border-gray-200 px-4"
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-2">
                <Heading
                  as="h6"
                  className="text-[16px] font-medium text-blue_gray-900_01"
                >
                  Email
                </Heading>
                <Input
                  shape="round"
                  type="email"
                  name="Email Field"
                  placeholder={`Nhập email`}
                  className="self-stretch rounded-md border border-gray-200 px-4"
                />
              </div>
              <div className="flex items-center gap-12">
                <Button
                  shape="round"
                  className="min-w-[116px] rounded-md border border-solid border-green-a700 px-[33px] sm:px-5"
                >
                  Lưu
                </Button>
                <Text
                  as="p"
                  className="text-[14px] font-normal text-blue_gray-600"
                >
                  Hủy bỏ
                </Text>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col items-start gap-1.5">
                <Heading
                  as="p"
                  className="mt-1 text-[16px] font-medium text-blue_gray-900_01"
                >
                  Họ
                </Heading>
                <Input
                  shape="round"
                  name="Surname Field"
                  placeholder={`Nhập họ`}
                  className="self-stretch rounded-md border border-gray-200 px-4"
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-1.5">
                <Heading
                  as="p"
                  className="text-[16px] font-medium text-blue_gray-900_01"
                >
                  Số điện thoại
                </Heading>
                <Input
                  shape="round"
                  name="Phone Field"
                  placeholder={`Nhập số điện thoại`}
                  className="self-stretch rounded-md border border-gray-200 px-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mr-1 mt-[88px] md:mr-0">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start justify-center gap-2">
              <Heading
                as="p"
                className="text-[16px] font-medium text-blue_gray-900_01"
              >
                Mật khẩu gần đây
              </Heading>
              <Input
                shape="round"
                type="text"
                name="Current Password Field"
                placeholder={`Your Name`}
                className="w-[50%] rounded-md border border-gray-200 px-4"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <Heading
                as="p"
                className="text-[16px] font-medium text-blue_gray-900_01"
              >
                Mật khẩu mới
              </Heading>
              <Input
                shape="round"
                type="text"
                name="New Password Field"
                placeholder={`Your Name`}
                className="w-[50%] rounded-md border border-gray-200 px-4"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <Heading
                as="p"
                className="text-[16px] font-medium text-blue_gray-900_01"
              >
                Xác nhận mật khẩu mới
              </Heading>
              <Input
                shape="round"
                type="text"
                name="Confirm Password Field"
                placeholder={`Your Name`}
                className="w-[50%] rounded-md border border-gray-200 px-4"
              />
            </div>
          </div>
          <div className="flex items-center gap-[42px]">
            <Button
              size="2xl"
              shape="round"
              className="min-w-[112px] rounded-md border border-solid border-green-a700 px-[33px] sm:px-5"
            >
              Lưu
            </Button>
            <Heading
              as="p"
              className="text-[16px] font-normal text-blue_gray-600"
            >
              Hủy bỏ
            </Heading>
          </div>
        </div>
      </div>
      <div className="mr-1 mt-12 flex flex-col gap-[18px] md:mr-0">
        <div className="flex flex-col items-start gap-5">
          <div className="self-stretch">
            <div className="flex flex-col items-start">
              <Heading
                as="p"
                className="text-[16px] font-medium text-blue_gray-900_01"
              >
                Email
              </Heading>
              <div className="flex items-center justify-between gap-5 self-stretch">
                <Heading
                  as="p"
                  className="self-end text-[16px] font-normal text-blue_gray-900_01"
                >
                  Mã xác thực được gửi đến email của bạn
                </Heading>
              </div>
            </div>
          </div>
          <div className="h-px w-[70%] bg-gray-200" />
        </div>
        <div>
          <div className="flex flex-col items-start">
            <Heading
              as="p"
              className="relative z-[1] text-[16px] font-medium text-blue_gray-900_01"
            >
              Điện thoại
            </Heading>
            <div className="flex items-center justify-between gap-5 self-stretch sm:flex-col">
              <Heading
                as="p"
                className="self-end text-[16px] font-normal text-blue_gray-900_01 sm:self-auto"
              >
                Nhân viên EZShop sẽ gọi điện thoại tới di động của bạn{" "}
              </Heading>
              {/* <Switch value={false} className="mr-[274px] sm:mr-0" /> */}
            </div>
            <div className="mt-5 h-px w-[70%] bg-gray-200" />
          </div>
        </div>
        <div className="mb-[104px] flex items-center gap-14">
          <Button
            size="2xl"
            shape="round"
            className="min-w-[112px] rounded-md border border-solid border-green-a700 px-[33px] sm:px-5"
          >
            Lưu
          </Button>
          <Heading
            as="p"
            className="text-[16px] font-normal text-blue_gray-600"
          >
            Hủy bỏ
          </Heading>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
