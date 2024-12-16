import {ButtonDH, Img, Slider, Heading} from "../../components";
import ProductDetails31 from "../../components/ProductDetails31";
import React from "react";
import {IconButton} from "@material-tailwind/react";

export default function RecentlyViewedSection() {
    const [sliderState, setSliderState] = React.useState(0);
    const sliderRef = React.useRef(null);

    return (
        <>
            {/* recently viewed section */}
            <div className="mt-8 flex flex-col items-center self-stretch">
                <div className="container-xs flex flex-col gap-[50px] md:px-5">
                    <div className="ml-[310px] mr-80 flex items-center justify-center gap-4 md:mx-0 md:flex-col">
                        <Heading
                            size="text7xl"
                            as="h2"
                            className="text-[28px] font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                        >
                            Các mục đã xem gần đây của bạn
                        </Heading>
                        <div className="flex flex-wrap gap-3 rounded-md bg-green-a700 p-2">
                            <Heading
                                as="h3"
                                className="text-[16px] font-medium text-gray-100_01"
                            >
                                178 :
                            </Heading>
                            <Heading
                                as="h4"
                                className="text-[16px] font-medium text-gray-100_01"
                            >
                                23 :
                            </Heading>
                            <Heading
                                as="h5"
                                className="text-[16px] font-medium text-gray-100_01"
                            >
                                14 :
                            </Heading>
                            <Heading
                                as="h6"
                                className="text-[16px] font-medium text-gray-100_01"
                            >
                                39
                            </Heading>
                        </div>
                    </div>
                    <div className="relative mr-2.5 h-[506px] content-center md:mr-0 md:h-auto">
                        <div className="mx-auto flex w-full gap-[30px] md:flex-col">
                            <Slider
                                autoPlay
                                autoPlayInterval={2000}
                                responsive={{
                                    0: {items: 1},
                                    551: {items: 1},
                                    1051: {items: 4},
                                }}
                                disableDotsControls
                                activeIndex={sliderState}
                                onSlideChanged={(e) => {
                                    setSliderState(e?.item);
                                }}
                                ref={sliderRef}
                                items={[...Array(12)].map(() => (
                                    <React.Fragment key={Math.random()}>
                                        <div className="px-[15px]">
                                            <ProductDetails31/>
                                        </div>
                                    </React.Fragment>
                                ))}
                            />
                        </div>
                        <div
                            className="absolute left-0 right-0 top-[41%] m-auto flex flex-1 justify-between gap-5 px-1">
                            {/*<ButtonDH*/}
                            {/*  onClick={() => {*/}
                            {/*    sliderRef?.current?.slidePrev();*/}
                            {/*  }}*/}
                            {/*  className="w-[44px] rounded-[22px] border border-solid border-gray-200 px-3.5"*/}
                            {/*>*/}
                            {/*  <Img src="images/img_arrow_left_blue_gray_900.svg" />*/}
                            {/*</ButtonDH>*/}
                            <IconButton variant="outlined" className="rounded-full"
                                        onClick={() => {
                                            sliderRef?.current?.slidePrev();
                                        }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                </svg>
                            </IconButton>
                            {/*<ButtonDH*/}
                            {/*    onClick={() => {*/}
                            {/*      sliderRef?.current?.slideNext();*/}
                            {/*    }}*/}
                            {/*    className="w-[44px] rounded-[22px] border border-solid border-blue_gray-900 px-3.5"*/}
                            {/*>*/}
                            {/*  <Img src="images/img_arrow_right_blue_gray_900_1.svg" />*/}
                            {/*</ButtonDH>*/}
                            <IconButton variant="outlined" className="rounded-full"
                                        onClick={() => {
                                            sliderRef?.current?.slideNext();
                                        }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                </svg>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
