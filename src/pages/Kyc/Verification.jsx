import { Button } from "@material-tailwind/react";
import { TextArea, Heading,  CheckBox } from "../../components";
import React from "react";

export default function VerificationSection() {
  return (
    <form>
      {/* verification section */}
      <div className="mt-11">
        <div className="flex flex-col gap-[50px]">
          <div className="mx-1 flex flex-col gap-[104px] md:mx-0 md:gap-[78px] sm:gap-[52px]">
            <div className="flex flex-col items-start">
              <CheckBox
                size="sm"
                name="Name Checkbox"
                label="Xác minh tên, ngày sinh... hợp lệ."
                id="NameCheckbox"
                className="gap-2 text-[25px] text-black-900"
              />
              <CheckBox
                name="ID Checkbox"
                label="Xác minh giấy tờ tùy thân hợp lệ."
                id="IDCheckbox"
                
                className="gap-3 text-[25px] text-black-900"
              />
              <CheckBox
                name="Address Checkbox"
                label="Xác minh địa chỉ hợp lệ"
                id="AddressCheckbox"
                className="mt-1.5 gap-3 text-[25px] text-black-900"
              />
              <CheckBox
                name="Document Checkbox"
                label="Tài liệu xác minh hợp lệ."
                id="DocumentCheckbox"
                className="gap-3 text-[25px] text-black-900"
              />
            </div>
            <div className="mx-[152px] flex md:mx-0 md:flex-col">
              <div className="flex items-center gap-[50px]">
                <Button shape="round" className="min-w-[152px] rounded-md !border px-[33px] font-semibold sm:px-5">
                  Phê Duyệt
                </Button>
                <Button
                  shape="round"
                  className="min-w-[142px] rounded-md !border !bg-gradient2 pl-[33px] pr-[27px] font-jost font-medium !text-blue_gray-900 sm:px-5"
                >
                  YC Bổ Sung
                </Button>
              </div>
              <Button shape="round" className="min-w-[142px] rounded-md !border !bg-gradient1 px-[33px] font-semibold">
                Từ Chối
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <Heading as="p" className="font-jost text-[16px] font-medium text-blue_gray-900">
              Lý do
            </Heading>
            <TextArea
              size="sm"
              shape="round"
              name="Reason Input Textarea"
              placeholder={`Lý do ....`}
              className="w-[82%] rounded-md !border !border-gray-200 px-3.5 font-jost text-blue_gray-600"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
