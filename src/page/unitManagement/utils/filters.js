import { useState } from "react";

const useFilters = () => {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 15,
  });

  const onPageChange = (page) => {
    setFilters((state) => ({
      ...state,
      page,
    }));
  };

  const onPageSizeChange = (pageSize) => {
    setFilters((state) => ({
      ...state,
      pageSize,
    }));
  };

  return {
    filters,
    onPageChange,
    onPageSizeChange,
  };
};

export default useFilters;
