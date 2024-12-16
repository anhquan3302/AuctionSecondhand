//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';
import React, {useState, Component} from "react";
import Slider from 'react-slick';
import CartItem from "@/components/CartItem/index.jsx";
import {Empty, Skeleton} from "antd";

export default function SliderItem({ itemDatas, itemLoading, itemError }) {
    const sliderRef = React.useRef(null);
    const itemData = itemDatas?.data?.data || []; // Fallback to an empty array if no data

    // Conditionally set slidesToShow based on item count
    const slidesToShow = itemData.length > 3 ? 4 : itemData.length;

    const sliderSettings = {
        className: "center",
        centerMode: itemData.length > 1, // Center mode only if more than 1 item
        infinite: itemData.length > 1, // Infinite only if more than 1 item
        centerPadding: "10px",
        slidesToShow: slidesToShow,
        speed: 500,
        autoplay: itemData.length > 1, // Autoplay only if more than 1 item
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: Math.min(slidesToShow, 3), centerPadding: "50px" },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: Math.min(slidesToShow, 2), centerPadding: "30px" },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, centerPadding: "10px" },
            },
        ],
    };

    return (
        <div className="w-full">
            <Skeleton loading={itemLoading} active>
                <Slider {...sliderSettings} ref={sliderRef}>
                    {itemData.map((item) => (
                        <div key={item.id}>
                            <CartItem product={item} />
                        </div>
                    ))}
                </Slider>
            </Skeleton>
        </div>
    );
};

