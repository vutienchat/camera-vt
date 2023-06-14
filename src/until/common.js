export const onSearchAddress = (list, textSearch) => {
  if (!textSearch.trim()) return list;
  return list.filter(
    (item) => item.Name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1
  );
};

export const onSearchTypes = (list, textSearch) => {
  if (!textSearch.trim()) return list;
  return list.filter(
    (item) => item.label.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1
  );
};
