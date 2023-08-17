import { useMemo, useState } from "react";

import { Stack } from "@design/layout/Stack";
import { Pagination } from "./Pagination";
import { TableUI } from "./interface";
import { IAction, IBreakpoint, IEntry, ITitle } from "./types";

interface TableProps {
  id: string;
  titles: ITitle[];
  actions: IAction[];
  entries: IEntry[];
  filter?: string;
  pageLength?: number;
  breakpoints?: IBreakpoint[];
  modalTitle?: string;
  infoTitle?: string;
  actionsTitle?: string;
}

const Table = (props: TableProps) => {
  const {
    id,
    titles,
    actions,
    entries,
    filter = "",
    pageLength = 10,
    breakpoints,
    modalTitle,
    infoTitle,
    actionsTitle,
  } = props;

  const filteredEntries = useMemo(() => {
    const titlesId = titles.map((title) => title.id);

    return entries.filter((entry) => {
      for (const attribute in entry) {
        if (
          titlesId.includes(attribute) &&
          entry[attribute]
            .toString()
            .toLowerCase()
            .includes(filter.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
  }, [entries, filter, titles]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredEntries.length / pageLength);

  const firstEntryInPage = (currentPage - 1) * pageLength;

  const lastEntryInPage = Math.min(
    firstEntryInPage + pageLength,
    filteredEntries.length
  );

  function getPageEntries() {
    return filteredEntries.slice(firstEntryInPage, lastEntryInPage);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToEndPage() {
    setCurrentPage(totalPages);
  }

  function nextPage() {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div id={id}>
      <Stack direction="column">
        <TableUI
          portalId={id}
          titles={titles}
          actions={actions}
          entries={getPageEntries()}
          breakpoints={breakpoints!}
          modalTitle={modalTitle!}
          infoTitle={infoTitle!}
          actionsTitle={actionsTitle!}
        />
        {filteredEntries.length > pageLength && (
          <Pagination
            firstEntryInPage={firstEntryInPage}
            lastEntryInPage={lastEntryInPage}
            totalRecords={filteredEntries.length}
            handleStartPage={goToFirstPage}
            handlePrevPage={prevPage}
            handleNextPage={nextPage}
            handleEndPage={goToEndPage}
          />
        )}
      </Stack>
    </div>
  );
};

export { Table };
export type { TableProps };
