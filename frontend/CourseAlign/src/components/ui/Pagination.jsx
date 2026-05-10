import {HiChevronLeft, HiChevronRight} from "react-icons/hi";

function Pagination({currentPage, pageCount, onNext, onPrev}) {
  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-2">
      <p className="text-[11px] text-text-secondary-light opacity-60">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{pageCount}</span>
      </p>
      <div className="flex gap-1">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-text-primary-light transition-colors enabled:hover:bg-action-light-6 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <HiChevronLeft size={14} />
          <span>Prev</span>
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === pageCount}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-text-primary-light transition-colors enabled:hover:bg-action-light-6 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Next</span>
          <HiChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
