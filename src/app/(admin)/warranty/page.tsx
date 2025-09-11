"use client";

import React, { useState } from "react";

import WarrantyStat from "./component/warrantyStat";
import WarrantyList from "./component/warrantyList";
import WarrantyFilterForm from "./component/warrantyFilterForm";
import { FILTER_TYPES } from "@/utils/constants";
import CommonAccordionFilter from "@/components/accordianfilter";

// Filter interface for warranty filtering
export interface WarrantyFilter {
  type: typeof FILTER_TYPES.expiring | typeof FILTER_TYPES.expired | null;
  days: number | null;
}

const WarrantyListingPage = () => {
  const [filter, setFilter] = useState<WarrantyFilter>({ type: null, days: null });

  // Handle filter change from stats component
  const handleFilterChange = (newFilter: WarrantyFilter) => {
    setFilter(newFilter);
  };

  // Clear filter
  const clearFilter = () => {
    setFilter({ type: null, days: null });
  };

  return (
    <>      
      {/* Warranty Statistics Component */}
      <WarrantyStat onFilterChange={handleFilterChange} currentFilter={filter} />   
      <CommonAccordionFilter 
        title="Filters" 
        children={
          <WarrantyFilterForm 
            onFilterChange={handleFilterChange} 
            currentFilter={filter} 
          />
        } 
      />
      {/* Warranty List Component */}
      <WarrantyList filter={filter} onClearFilter={clearFilter} />
    </>
  );
};

export default WarrantyListingPage;


