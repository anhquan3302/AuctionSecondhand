import { Helmet } from "react-helmet";
import FooterBK from "../../components/FooterBK";
import LoginSection from "./LoginSection";
import React from "react";

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>User Login - Access Your EZShop Account</title>
        <meta
          name="description"
          content="Log in to your EZShop account to access your personal dashboard, track orders, and enjoy a personalized shopping experience. Don't miss out on our exclusive offers!"
        />
      </Helmet>
      <div className="flex w-full flex-col gap-[100px] bg-gradient-to-b from-blue-gray-900 to-blue-black-900 text-white md:gap-[75px] sm:gap-[50px]"> {/* Gradient background */}
        {/* Login Section */}
        <LoginSection />
      </div>
    </>
  );
}
