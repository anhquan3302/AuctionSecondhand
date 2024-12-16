import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-md",
};
const variants = {
  fill: {
    blue_gray_900_01: "bg-blue_gray-900_01 text-bg-white",
    green_400: "bg-green-400 text-bg-white",
    green_A700: "bg-green-a700 text-bg-white",
    green_50: "bg-green-50 text-green-700",
    bg_white_: "bg-bg-white",
    green_A700_11: "bg-green-a700_11",
  },
  outline: {
    gray_200:
      "border-gray-200 border-2 border-solid shadow-md text-blue_gray-900_01",
    green_A700:
      "border-green-a700 border-2 border-solid shadow-md text-blue_gray-900_01",
  },
};
const sizes = {
  "4xl": "h-[60px] px-[34px] text-[14px]",
  sm: "h-[42px] px-6 text-[15px]",
  "5xl": "h-[78px] px-[34px] text-[16px]",
  md: "h-[44px] px-2.5",
  xs: "h-[30px] px-3.5 text-[13px]",
  "2xl": "h-[52px] px-3",
  "3xl": "h-[56px] px-[34px] text-[14px]",
  xl: "h-[50px] px-[34px] text-[14px]",
  lg: "h-[48px] px-4",
};

const ButtonDH = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "lg",
  color = "bg_white_",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

ButtonDH.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf([
    "4xl",
    "sm",
    "5xl",
    "md",
    "xs",
    "2xl",
    "3xl",
    "xl",
    "lg",
  ]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf([
    "blue_gray_900_01",
    "green_400",
    "green_A700",
    "green_50",
    "bg_white_",
    "green_A700_11",
    "gray_200",
  ]),
};

export { ButtonDH };
