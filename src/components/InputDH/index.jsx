import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-md",
};

const variants = {
  fill: {
    bg_white_: "bg-bg-white text-blue_gray-600_01",
  },
  outline: {
    green_A700: "border-green-a700 border border-solid",
  },
};

const sizes = {
  lg: "h-[60px] px-[22px] text-[16px]",
  xl: "h-[74px] px-3.5 text-[15px]",
  sm: "h-[44px] px-3.5 text-[14px]",
  xs: "h-[38px] px-3.5 text-[14px]",
  md: "h-[54px] px-3.5 text-[14px]",
};

const InputDH = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "md",
      color = "bg_white_",
      ...restProps
    },
    ref,
  ) => {
    return (
      <label
        className={`${className} flex items-center justify-center cursor-text rounded-md ${shape && shapes[shape]} ${variant && (variants[variant]?.[color] || variants[variant])} ${size && sizes[size]}`}
      >
        {!!label && <span>{label}</span>}
        {!!prefix && prefix}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="border-none outline-none focus:outline-none focus:ring-0 focus:shadow-none flex-grow"
          {...restProps}
        />
        {!!suffix && suffix}
      </label>
    );
  },
);

InputDH.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["lg", "xl", "sm", "xs", "md"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf(["bg_white_", "green_A700"]),
};

export { InputDH };
