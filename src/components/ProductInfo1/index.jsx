import { Text, Heading, Img, InputDH,  } from "./..";
import React, { Suspense } from "react";
import {Breadcrumb, Checkbox, Collapse, Layout, Menu, theme} from 'antd';
import ProductDetails21 from "@/components/ProductDetails21/index.jsx";
import Pagination from "@/components/Pagination/index.jsx";

const { Panel } = Collapse;
const {Content, Sider} = Layout;

const brands = [
  { name: "Apple", count: 87 },
  { name: "Asus", count: 92 },
  { name: "Acer", count: 123 },
  { name: "Dell", count: 49 },
  { name: "Lenovo", count: 12 },
];


const fashionItemsGrid = [
  {
      productImage: "images/img_image_30_4.png",
      productTitle: "Thời trang",
      productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
      reviewCount: "3,014 đánh giá",
      originalPrice: "328.000đ",
  },
  {
      productImage: "images/img_image_30_4.png",
      productTitle: "Thời trang",
      productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
      reviewCount: "3,014 đánh giá",
      originalPrice: "328.000đ",
  },
  {
      productImage: "images/img_image_30_4.png",
      productTitle: "Thời trang",
      productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
      reviewCount: "3,014 đánh giá",
      originalPrice: "328.000đ",
  },
  {
      productImage: "images/img_image_30_4.png",
      productTitle: "Thời trang",
      productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
      reviewCount: "3,014 đánh giá",
      originalPrice: "328.000đ",
  },
  {
      productImage: "images/img_image_30_4.png",
      productTitle: "Thời trang",
      productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
      reviewCount: "3,014 đánh giá",
      originalPrice: "328.000đ",
  },
  {
      productImage: "images/img_image_30_4.png",
      productTitle: "Thời trang",
      productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
      reviewCount: "3,014 đánh giá",
      originalPrice: "328.000đ",
  },
  {
      productImage: "images/img_image_30_4.png",
      productTitle: "Thời trang",
      productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
      reviewCount: "3,014 đánh giá",
      originalPrice: "328.000đ",
  },
  {
      productImage: "images/img_image_30_4.png",
      productTitle: "Thời trang",
      productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
      reviewCount: "3,014 đánh giá",
      originalPrice: "328.000đ",
  },
  {
      productImage: "images/img_image_30_4.png",
      productTitle: "Thời trang",
      productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
      reviewCount: "3,014 đánh giá",
      originalPrice: "328.000đ",
  },
  {
      productImage: "images/img_image_30_4.png",
      productTitle: "Thời trang",
      productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
      reviewCount: "3,014 đánh giá",
      originalPrice: "328.000đ",
  },
  {
      productImage: "images/img_image_30_4.png",
      productTitle: "Thời trang",
      productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
      reviewCount: "3,014 đánh giá",
      originalPrice: "328.000đ",
  },

];

export default function ProductInfo1() {

  const {
    token: {colorBgContainer, borderRadiusLG},
} = theme.useToken();

  
  return (
    <Content
    style={{
        padding: '0 48px',
        flex: 1, // Cho phép Content chiếm không gian còn lại
        display: 'flex', // Đặt display là flex để chứa nội dung
        flexDirection: 'column', // Hướng theo chiều dọc
    }}
>
    <Breadcrumb
        style={{
            margin: '16px 0',
        }}
    >
      
    </Breadcrumb>
    <Layout
        style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1, // Để Layout chiếm hết không gian còn lại
        }}
    >
        <Sider
            style={{
                background: colorBgContainer,
            }}
            width={300}
        >
            <div className="flex flex-col items-start gap-6 md:w-full">
                <div className="flex items-center justify-between gap-5 self-stretch">
                    <Heading size="textxl" as="h1"
                             className="text-[18px] font-medium text-blue_gray-900">
                        Danh Mục
                    </Heading>
                    <div className="h-px w-[14px] bg-blue_gray-900"/>
                </div>
                <div className="flex flex-col gap-5 self-stretch">
                    <InputDH
                        shape="round"
                        name="Brand Search"
                        placeholder={`Tìm thương hiệu`}
                        className="rounded-md border px-[18px]"
                    />
                    <div className="flex flex-col gap-2.5">
                        <div className="w-full">
                            <Collapse defaultActiveKey={["1"]} ghost>
                                <Panel
                                    key="3"
                                    header={
                                        <h2 className="text-lg font-semibold">
                                            Brand Filters
                                        </h2>
                                    }
                                >
                                    <div className="flex">
                                        <div className="flex w-[78%] items-center gap-[13px]">
                                            <Text
                                                size="textlg"
                                                as="p"
                                                className="text-[15px] font-normal leading-[30px] text-blue_gray-900_01"
                                            >
                                                {brands.map((brand) => (
                                                    <div
                                                        key={brand.name}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Checkbox/>
                                                        {brand.name}
                                                    </div>
                                                ))}
                                            </Text>
                                        </div>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                </div>
                <div className="h-px w-[82%] bg-gray-200"/>
            </div>
        </Sider>
        <Content
            style={{
                padding: '0 24px',
                minHeight: 280,
                flex: 1, // Để Content bên trong chiếm hết không gian còn lại
            }}
        >
            <div
                className="mx-7 mt-5 grid grid-cols-4 justify-center gap-3.5 self-stretch px-1 md:mx-0 md:grid-cols-2 sm:grid-cols-1 ml-auto">
                {/*<Suspense fallback={<div>Loading feed...</div>}>*/}
                {/*    {fashionItemsGrid.map((item, index) => (*/}
                {/*        <div key={"itemsGrid" + index}*/}
                {/*        >*/}
                {/*            <ProductDetails21 {...item} />*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</Suspense>*/}
            </div>
            <div className="flex justify-center items-center mt-4">
                <Pagination/>
            </div>
        </Content>
    </Layout>
</Content>
  );
}



