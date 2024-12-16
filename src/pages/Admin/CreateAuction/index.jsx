import { Helmet } from "react-helmet";
import AuctionCreationSection from "./AuctionCreationSection";
import AuctionCreationSection1 from "./AuctionCreationSection1";
import ProductDetailsSection from "./ProductDetailsSection";
import React from "react";
import {useParams} from "react-router-dom";
import {useGetItemDetailQuery} from "@/services/item.service.js";

export default function CreateAuction() {
    const { itemId } = useParams();
    const { data: itemDetail, isLoading, isError } = useGetItemDetailQuery({ id: itemId });
    const auctionId = itemDetail?.auction?.auction_id;
  return (
    <>
      <Helmet>
        <title>Create Auction for Vintage Bed - VUA NỆM</title>
        <meta
          name="description"
          content="Initiate an auction for a classic 2025 vintage bed by VUA NỆM. Experience the charm of a once-used bed with a nostalgic and rustic appeal. Join the bidding from 07-10-2024 and own a piece of history."
        />
      </Helmet>
      <div className="w-full bg-white-a700 py-[34px] sm:py-5">
        {/*/!* auction creation section *!/*/}
        <AuctionCreationSection  itemDetail={itemDetail} />

        <AuctionCreationSection1 itemId={itemId}/>
      </div>
    </>
  );
}