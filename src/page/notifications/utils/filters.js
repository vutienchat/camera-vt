import { useState } from "react";

const useFilters = () => {
  const [filters, setFilters] = useState({
    searchText: "",
    page: 1,
    pageSize: 25,
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

  const onSearch = (params) => {
    setFilters((state) => ({
      ...state,
      ...params,
      pageNumber: 1,
    }));
  };

  return {
    filters,
    onPageChange,
    onPageSizeChange,
    onSearch,
  };
};

export default useFilters;
