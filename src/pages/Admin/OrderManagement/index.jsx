import { Helmet } from "react-helmet";
import Status from "./Status";
import OrderManagementSection from "./OrderManagementSection";
import React from "react";
import { Tabs } from "react-tabs";

export default function OrderManagementAdmin() {
  return (
    <>
    
      <div className="w-full ">
        <Tabs
          className="mb-1 flex flex-col gap-12"
          selectedTabClassName=""
          selectedTabPanelClassName="tab-panel--selected"
        >
          {/*<Status />*/}
          <OrderManagementSection />
        </Tabs>
      </div>
    </>
  );
}



