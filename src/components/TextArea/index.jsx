import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-md",
};
const variants = {
  tarOutlineGray200: "!border-gray-200 border border-solid bg-bg-white",
  tarOutlineGreenA700:
    "!border-green-a700 border border-solid bg-bg-white shadow-lg",
};
const sizes = {
  sm: "h-[198px] p-5 text-[15px]",
  xs: "h-[74px] p-3.5 text-[15px]",
};

const TextArea = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      shape,
      size = "sm",
      variant = "tarOutlineGray200",
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <textarea
        ref={ref}
        className={`${className} ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]}`}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        {...restProps}
      />
    );
  },
);

TextArea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["sm", "xs"]),
  variant: PropTypes.oneOf(["tarOutlineGray200", "tarOutlineGreenA700"]),
};

export { TextArea };
