"use client";

import React from "react";

import WarrantyStat from "./component/warrantyStat";
import WarrantyList from "./component/warrantyList";

const WarrantyListingPage = () => {
  return (
    <>      
      {/* Warranty Statistics Component */}
      <WarrantyStat />      
      {/* Warranty List Component */}
      <WarrantyList />
    </>
  );
};

export default WarrantyListingPage;


