import { useState } from "react";
import { Pagination } from "../Pagination/index";
import { TableProps } from "..";

const PaginationController = (props: TableProps) => {
  const { entries, pageLength = 10 } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(entries.length / pageLength);

  const firstEntryInPage = (currentPage - 1) * pageLength;

  const lastEntryInPage = Math.min(
    firstEntryInPage + pageLength,
    entries.length
  );

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function goToEndPage() {
    setCurrentPage(totalPages);
  }

  return (
    <Pagination
      firstEntryInPage={firstEntryInPage}
      lastEntryInPage={lastEntryInPage}
      totalRecords={entries.length}
      handleStartPage={goToFirstPage}
      handlePrevPage={prevPage}
      handleNextPage={nextPage}
      handleEndPage={goToEndPage}
    />
  );
};

export { PaginationController };
