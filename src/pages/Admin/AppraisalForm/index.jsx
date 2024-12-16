import { Helmet } from "react-helmet";
import ProductReviewSection from "./ProductReviewSection";
import StaffAssessmentSection from "./StaffAssessmentSection";

import { useGetItemDetailQuery,useApproveItemAdminMutation, useGetSellerQuery } from "../../../services/item.service";
import { useParams } from "react-router-dom";

export default function ThmnhcaStaffPage() {
    const { itemId } = useParams(); // Khai báo itemId từ URL trước
    // console.log("itemId", itemId);
    const { data: itemDetail, isLoading, isError } = useGetItemDetailQuery({ id: itemId }); // Gọi API với itemId
    const { data: sellerDetail, isLoading: isSellerLoading, isError: isSellerError } = useGetSellerQuery({ id: itemId });
    
    console.log("Data ne", itemDetail);
    // console.log("Data seller", sellerDetail);
    if (isLoading) {
        return <div>Loading...</div>; // Hiển thị loading khi đang tải dữ liệu
    }

    if (isError) {
        return <div>Error loading item details.</div>; // Hiển thị thông báo lỗi nếu có
    }

    return (
        <>
            <Helmet>
                <title>Staff Appraisal for Item {itemId}</title>
                <meta
                    name="description"
                    content="Explore the charm of the item appraised by our staff"
                />
            </Helmet>
            <div className="w-full bg-white-a700 py-[88px] md:py-5">
                <div className="mt-2 flex flex-col items-center">
\                    <ProductReviewSection itemDetail={itemDetail}/>

\                    <StaffAssessmentSection itemId={itemId} />
                </div>
            </div>
        </>
    );
}
