// --- Pagination Component ---
type PaginationProps = {
  totalPages: number;
  pageNumber: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handlePageClick: (page: number) => void;
};
const AdvertisementPagination = ({
  totalPages,
  pageNumber,
  handlePrevPage,
  handleNextPage,
  handlePageClick,
}: PaginationProps) =>
  totalPages >= 1 ? (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={handlePrevPage}
        disabled={pageNumber === 1}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
        Předchozí
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx + 1}
          onClick={() => handlePageClick(idx + 1)}
          className={`px-3 py-1 rounded ${
            pageNumber === idx + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}>
          {idx + 1}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={pageNumber === totalPages}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
        Další
      </button>
    </div>
  ) : null;
export default AdvertisementPagination;
