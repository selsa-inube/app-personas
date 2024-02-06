import { useMemo, useState } from "react";

import { Pagination } from "./Pagination";
import { TableUI } from "./interface";
import { StyledTableContainer } from "./styles";
import { IAction, IBreakpoint, IEntry, ITitle } from "./types";
import { TextAppearanceType } from "@ptypes/color.types";

interface TableProps {
  portalId?: string;
  titles: ITitle[];
  actions?: IAction[];
  entries: IEntry[];
  loading?: boolean;
  filter?: string;
  pageLength?: number;
  breakpoints?: IBreakpoint[];
  modalTitle?: string;
  infoTitle?: string;
  actionsTitle?: string;
  hideMobileResume?: boolean;
  mobileResumeTitle?: string;
  colsSameWidth?: boolean;
  customAppearance?: (titleId: string, entry: IEntry) => TextAppearanceType;
}

const Table = (props: TableProps) => {
  const {
    portalId,
    titles,
    actions,
    entries,
    loading,
    filter = "",
    pageLength = 10,
    breakpoints,
    modalTitle,
    infoTitle,
    actionsTitle,
    hideMobileResume,
    mobileResumeTitle,
    colsSameWidth,
    customAppearance,
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
    filteredEntries.length,
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

  const withActions = !!actions;

  return (
    <StyledTableContainer>
      <TableUI
        portalId={portalId}
        titles={titles}
        actions={actions}
        loading={loading}
        entries={getPageEntries()}
        breakpoints={breakpoints}
        modalTitle={modalTitle}
        infoTitle={infoTitle}
        actionsTitle={actionsTitle}
        hideMobileResume={hideMobileResume}
        mobileResumeTitle={mobileResumeTitle}
        colsSameWidth={colsSameWidth}
        withActions={withActions}
        customAppearance={customAppearance}
      />
      {filteredEntries.length > pageLength && (
        <Pagination
          firstEntryInPage={firstEntryInPage}
          lastEntryInPage={lastEntryInPage}
          totalRecords={filteredEntries.length}
          onStartPage={goToFirstPage}
          onPrevPage={prevPage}
          onNextPage={nextPage}
          onEndPage={goToEndPage}
        />
      )}
    </StyledTableContainer>
  );
};

export { Table };
export type { TableProps };
