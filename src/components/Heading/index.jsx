import React from "react";

const sizes = {
  h1: "uppercase text-[48px] font-semibold md:text-[44px] sm:text-[38px]",
  "14_medium": "font-jost text-[14px] font-medium",
  "18_medium": "font-jost text-[18px] font-medium",
  "16_medium": "font-jost text-[16px] font-medium",
  body_bold: "text-[16px] font-semibold",
  textxl: "text-[16px] font-medium",
  text2xl: "text-[18px] font-medium",
  text3xl: "text-[20px] font-medium",
  text4xl: "text-[22px] font-medium",
  text6xl: "text-[26px] font-medium md:text-[24px] sm:text-[22px]",
  text7xl: "text-[28px] font-medium md:text-[26px] sm:text-[24px]",
  text8xl: "text-[60px] font-medium md:text-[52px] sm:text-[46px]",
  headingxs: "text-[8px] font-bold",
  headings: "text-[12px] font-bold",
  headingmd: "text-[14px] font-bold",
  headinglg: "text-[15px] font-bold",
  headingxl: "text-[16px] font-semibold",
  heading2xl: "text-[18px] font-semibold",
  heading3xl: "text-[32px] font-semibold md:text-[30px] sm:text-[28px]",
  heading4xl: "text-[40px] font-semibold md:text-[38px] sm:text-[36px]",
  heading5xl: "text-[48px] font-semibold md:text-[44px] sm:text-[38px]",
};

const Heading = ({
  children,
  className = "",
  size = "textxl",
  as,
  ...restProps
}) => {
  const Component = as || "h6";

  return (
    <Component
      className={`text-blue_gray-900_01 font-bevietnampro ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Heading };
