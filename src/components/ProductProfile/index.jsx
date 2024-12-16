import {Text, Heading, Img} from "./..";
import React from "react";

export default function ProductProfile({category}) {
    return (
        <div className="flex flex-col items-center">
            <div className="rounded-[74px] bg-gray-100_02 p-5 max-w-[150px] flex justify-center items-center">
                <Img
                    src={category?.categoryImage}
                    alt="Product Image"
                    className="w-full object-cover"
                />
            </div>
            <div className="mt-4 text-center"> {/* Add margin-top and center-align text */}
                <Heading
                    as="p"
                    className="font-jost text-[16px] font-medium text-blue_gray-900_01"
                >
                    {category?.categoryName}
                </Heading>
            </div>
        </div>


    );
}
