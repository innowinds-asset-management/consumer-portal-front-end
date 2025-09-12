"use client";

import React, { useState } from 'react';
import AmcCmcList from './components/amcCmcList';
import AmcCmcStats, { ServiceContractFilter } from './components/amcCmcStats';

export default function AmcCmcPage() {
  const [filter, setFilter] = useState<ServiceContractFilter>({ type: null, days: null });

  // Handle filter change from stats component
  const handleFilterChange = (newFilter: ServiceContractFilter) => {
    setFilter(newFilter);
  };

  // Clear filter
  const clearFilter = () => {
    setFilter({ type: null, days: null });
  };

  return (
    <div className="container-fluid">
      <AmcCmcStats onFilterChange={handleFilterChange} currentFilter={filter} />
      <AmcCmcList filter={filter} onClearFilter={clearFilter} />
    </div>
  );
}
