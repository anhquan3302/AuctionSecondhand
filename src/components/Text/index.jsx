import React from "react";

const sizes = {
  "16_regular": "font-jost text-[16px] font-normal",
  body_1: "text-[16px] font-normal",
  "13_regular": "font-jost text-[13px] font-normal",
  caption: "text-[12px] font-normal",
  textxs: "text-[12px] font-normal not-italic",
  texts: "text-[13px] font-normal not-italic",
  textmd: "text-[14px] font-normal not-italic",
  textlg: "text-[15px] font-normal not-italic",
  text5xl: "text-[25px] font-normal not-italic md:text-[23px] sm:text-[21px]",
};

const Text = ({
  children,
  className = "",
  as,
  size = "textmd",
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-blue_gray-900_01 font-bevietnampro ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
