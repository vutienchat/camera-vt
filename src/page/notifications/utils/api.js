// Giả lập dữ liệu mẫu
const data = Array.from({ length: 33 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
  isRead: index % 3 !== 0,
}));

// Hàm API phân trang
export const getPaginatedData = ({ page, pageSize }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const paginatedData = data.slice(startIndex, endIndex);

      if (paginatedData.length > 0) {
        resolve({
          data: paginatedData,
          currentPage: page,
          totalPages: Math.ceil(data.length / pageSize),
          totalItems: data.length,
        });
      } else {
        reject("No data available for this page.");
      }
    }, 1000); // Mô phỏng thời gian chờ API
  });
};
