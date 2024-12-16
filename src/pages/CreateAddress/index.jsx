import { Helmet } from "react-helmet";
import {
  Img,
  Text,
  ButtonDH,
  TextArea,
  Heading,
  SelectBox,
} from "../../components";
import React from "react";
import ProfileCard from "../../components/ProfileCard";
import AccountOptions from "../../components/AccountOption";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function CreateAddressPage() {
  return (
    <>
      <Helmet>
        <title>Add Address - Manage Your Shipping Details</title>
        <meta
          name="description"
          content="Easily add a new address to your account for a seamless shopping experience. Manage your shipping details, including city, district, and detailed address, to ensure accurate delivery of your favorite auctioned products."
        />
      </Helmet>
      <div className="w-full bg-bg-white">
        <div className="mt-6 flex flex-col items-center gap-[82px] md:gap-[61px] sm:gap-[41px]">
          <div className="mx-auto flex w-full max-w-[1286px] flex-col gap-7 md:px-5">
            <Header2 />
            <div>
              <div className="flex items-start md:flex-col">
                <div className="relative z-[2] flex w-[24%] flex-col gap-[46px] md:w-full">
                  <div className="flex flex-col items-start gap-1.5">
                    <div className="ml-3 flex w-[70%] flex-col items-center gap-4 md:ml-0 md:w-full">
                      <div className="flex items-center justify-center gap-[18px] self-stretch">
                        <ProfileCard />
                      </div>
                    </div>
                    <div className="h-[1.84px] w-[95%] self-stretch bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex flex-col gap-[38px]">
                      <AccountOptions />
                    </div>
                  </div>
                </div>
                <div className="relative ml-[-6px] h-[926px] flex-1 self-center md:ml-0 md:w-full md:flex-none md:self-stretch ">
                  <Heading
                    size="textlg"
                    as="h3"
                    className="mb-[808px] text-[28px] font-medium text-blue_gray-900 md:text-[26px] sm:text-[24px]"
                  >
                    Thêm địa chỉ
                  </Heading>

                  <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max flex-1 flex-col items-center justify-center rounded-[14px] bg-bg-white px-1 py-[66px] shadow-xs md:py-5">
                    <div className="flex flex-col items-start justify-center gap-2.5 self-stretch">
                      <Heading
                        as="h4"
                        className="text-[16px] font-semibold text-blue_gray-900"
                      >
                        Tỉnh
                      </Heading>
                      <SelectBox
                        shape="round"
                        indicator={
                          <Img
                            src="images/img_vector_bg_black_.svg"
                            alt="Arrow Down"
                          />
                        }
                        name="Province Dropdown"
                        placeholder={`Chọn`}
                        options={dropDownOptions}
                        className="w-[55%] gap-4 rounded-md border border-solid border-gray-200 px-4 bg-transparent"
                      />
                    </div>

                    <div className="mt-[26px] flex flex-col items-start justify-center gap-2 self-stretch">
                      <Heading
                        as="h5"
                        className="text-[16px] font-semibold text-blue_gray-900"
                      >
                        Thành phố/Huyện
                      </Heading>
                      <SelectBox
                        shape="round"
                        indicator={
                          <Img
                            src="images/img_vector_bg_black_.svg"
                            alt="Arrow Down"
                          />
                        }
                        name="District Dropdown"
                        placeholder={`Chọn`}
                        options={dropDownOptions}
                        className="w-[55%] gap-4 rounded-md border border-solid border-gray-200 px-4 bg-transparent"
                      />
                    </div>
                    <div className="mt-3.5 flex flex-col items-start justify-center gap-2 self-stretch">
                      <Heading
                        as="h6"
                        className="text-[16px] font-semibold text-blue_gray-900"
                      >
                        Xã
                      </Heading>
                      <SelectBox
                        shape="round"
                        indicator={
                          <Img
                            src="images/img_vector_bg_black_.svg"
                            alt="Arrow Down"
                          />
                        }
                        name="District Dropdown"
                        placeholder={`Chọn`}
                        options={dropDownOptions}
                        className="w-[55%] gap-4 rounded-md border border-solid border-gray-200 px-4 bg-transparent"
                      />
                    </div>
                    <Heading
                      as="h6"
                      className="mt-9 self-start text-[16px] font-semibold text-black-900"
                    >
                      Địa chỉ chi tiết
                    </Heading>
                    <TextArea
                      shape="round"
                      name="Detailed Address TextArea"
                      placeholder={`Nhập tiêu đề`}
                      className="relative z-[1] mr-6 mt-1.5 self-stretch rounded-md !border !border-gray-300 px-4 text-gray-600 md:mr-0 sm:py-5"
                    />
                    <div className="relative mx-[22px] mt-[-80px] h-px self-stretch bg-gray-100 md:mx-0" />
                    <ButtonDH
                      shape="round"
                      className="mb-3.5 mt-[168px] min-w-[172px] bg-green-500 rounded-md border border-solid border-green-a700 px-[33px] font-medium sm:px-5"
                    >
                      Lưu{" "}
                    </ButtonDH>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[194px] self-stretch">
            <FooterBK className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
