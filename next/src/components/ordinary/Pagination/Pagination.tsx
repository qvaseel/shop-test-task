interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const createPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = createPageNumbers();

  return (
    <div className="flex justify-center list-none p-0">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="text-slate-900 border-none my-0 mx-[2px] py-1 px-2 cursor-pointer"
      >
        «
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-slate-900 border-none my-0 mx-[2px] py-1 px-2 cursor-pointer"
      >
        ‹
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${
            page === currentPage ? "bg-slate-200" : ""
          } text-slate-900 border-none my-0 mx-[2px] py-1 px-2 cursor-pointer`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-slate-900 border-none my-0 mx-[2px] py-1 px-2 cursor-pointer"
      >
        ›
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="text-slate-900 border-none my-0 mx-[2px] py-1 px-2 cursor-pointer"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
