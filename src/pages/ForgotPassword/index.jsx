import { Helmet } from "react-helmet";
import FooterBK from "../../components/FooterBK";
import React from "react";
import ForgotPasswordSection from "./ForgotPasswordSection";

export default function ForgotPassword() {
  return (
    <>
      <Helmet>
        <title>Forgot Password - Access Your EZShop Account</title>
        <meta
          name="description"
          content="Reset your password for your EZShop account to access your personal dashboard, track orders, and enjoy a personalized shopping experience."
        />
      </Helmet>
      <div className="flex w-full flex-col gap-[100px] bg-gradient-to-b from-gray-900 to-blue-black-900 text-white md:gap-[75px] sm:gap-[50px"> {/* Thay đổi màu nền */}
        {/* Forgot Password Section */}
        <ForgotPasswordSection />
        <div className="mt-[194px] self-stretch">
          <FooterBK className="mt-[34px] h-[388px] bg-[url(/public/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
        </div>
      </div>
    </>
  );
}
