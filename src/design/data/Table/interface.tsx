import { useMemo } from "react";
import { DisplayEntry } from "./DisplayEntry";

import { useMediaQueries } from "@hooks/useMediaQueries";
import { useMediaQuery } from "@hooks/useMediaQuery";

import { SkeletonLine } from "@inube/design-system";
import { TextAppearanceType } from "@ptypes/color.types";
import { Text } from "../Text";
import {
  StyledTable,
  StyledTbody,
  StyledTd,
  StyledThAction,
  StyledThTitle,
  StyledThead,
  StyledTr,
} from "./styles";
import { IAction, IBreakpoint, IEntry, ITitle } from "./types";

function findCurrentMediaQuery(currentMediaQuery: Record<string, boolean>) {
  const lastIndexMedia = Object.values(currentMediaQuery).lastIndexOf(true);
  return lastIndexMedia !== -1 ? lastIndexMedia : 0;
}

function priorityColumns(titles: ITitle[], numColumns: number) {
  const maxPriorityToDisplay = numColumns - 1;
  return titles.filter((title) => title.priority <= maxPriorityToDisplay);
}

function totalTitleColumns(
  titles: ITitle[],
  breakpoints?: IBreakpoint[],
  media?: Record<string, boolean>,
) {
  const numColumns = breakpoints
    ? breakpoints[findCurrentMediaQuery(media ? media : {})].totalColumns
    : titles.length;

  if (numColumns >= titles.length) return titles;

  return priorityColumns(titles, numColumns);
}

const renderActionTitle = (actionName: string, key?: React.Key) => (
  <StyledThAction key={key}>
    <Text type="label" size="medium" textAlign="center" appearance="dark">
      {actionName}
    </Text>
  </StyledThAction>
);

function renderActionsTitles(
  actions: IAction[],
  mediaQuery: boolean,
  mobileResumeTitle?: string,
  hideMobileResume?: boolean,
) {
  const actionsList =
    hideMobileResume && mediaQuery
      ? actions.filter((title) => title.mobilePriority)
      : actions;

  return mediaQuery && !hideMobileResume
    ? renderActionTitle(mobileResumeTitle ? mobileResumeTitle : "Abrir")
    : actionsList.map((action) =>
        renderActionTitle(action.actionName, `action-${action.id}`),
      );
}

function renderActions(
  actions: IAction[],
  entry: IEntry,
  mediaQuery: boolean,
  portalId?: string,
  modalTitle?: string,
  titleLabels?: ITitle[],
  infoTitle?: string,
  actionsTitle?: string,
  hideMobileResume?: boolean,
) {
  const actionsList =
    hideMobileResume && mediaQuery
      ? actions.filter((action) => action.mobilePriority)
      : actions;

  return mediaQuery && portalId && !hideMobileResume ? (
    <StyledTd>
      <DisplayEntry
        portalId={portalId}
        entry={entry}
        title={modalTitle || ""}
        actions={actions}
        titleLabels={titleLabels || []}
        infoTitle={infoTitle || ""}
        actionsTitle={actionsTitle}
      />
    </StyledTd>
  ) : (
    actionsList.map((action) => (
      <StyledTd key={`${entry.id}-${action.id}`}>
        {action.content(entry)}
      </StyledTd>
    ))
  );
}

const actionsLoading = (numberActions: number) => {
  const cellsOfActionsLoading = [];
  for (let cellAction = 0; cellAction < numberActions; cellAction++) {
    cellsOfActionsLoading.push(
      <StyledTd key={cellAction}>
        <SkeletonLine animated />
      </StyledTd>,
    );
  }
  return cellsOfActionsLoading;
};

const dataLoading = (titleColumns: ITitle[], numberActions: number) => {
  const rowsLoading = [];
  for (let rows = 0; rows < 4; rows++) {
    rowsLoading.push(
      <StyledTr key={rows}>
        {titleColumns.map((title) => (
          <StyledTd key={`e-${title.id}`}>
            <SkeletonLine animated />
          </StyledTd>
        ))}
        {actionsLoading(numberActions)}
      </StyledTr>,
    );
  }
  return rowsLoading;
};

interface TableUIProps {
  portalId?: string;
  titles: ITitle[];
  actions?: IAction[];
  entries: IEntry[];
  loading?: boolean;
  breakpoints?: IBreakpoint[];
  modalTitle?: string;
  infoTitle?: string;
  actionsTitle?: string;
  hideMobileResume?: boolean;
  mobileResumeTitle?: string;
  colsSameWidth?: boolean;
  withActions: boolean;
  customAppearance?: (titleId: string, entry: IEntry) => TextAppearanceType;
}

const TableUI = (props: TableUIProps) => {
  const {
    portalId,
    titles,
    actions,
    entries,
    loading,
    breakpoints,
    modalTitle,
    infoTitle,
    actionsTitle,
    hideMobileResume,
    mobileResumeTitle,
    colsSameWidth,
    withActions,
    customAppearance,
  } = props;

  const isTablet = useMediaQuery("(max-width: 850px)");

  const queriesArray = useMemo(
    () => breakpoints && breakpoints.map((breakpoint) => breakpoint.breakpoint),
    [breakpoints],
  );

  const media = useMediaQueries(queriesArray || []);

  const titleColumns = useMemo(
    () => totalTitleColumns(titles, breakpoints, media),
    [titles, breakpoints, media],
  );

  const numberActions = actions ? actions.length : 0;

  return (
    <StyledTable $colsSameWidth={colsSameWidth}>
      <StyledThead>
        <StyledTr>
          {titleColumns.map((title) => (
            <StyledThTitle
              key={`title-${title.id}`}
              aria-label={title.titleName}
              $countColumns={titleColumns.length}
              $colsSameWidth={colsSameWidth}
              $withActions={withActions}
            >
              <Text type="label" size="medium" appearance="dark">
                {title.titleName}
              </Text>
            </StyledThTitle>
          ))}
          {actions &&
            renderActionsTitles(
              actions,
              isTablet,
              mobileResumeTitle,
              hideMobileResume,
            )}
        </StyledTr>
      </StyledThead>
      <StyledTbody>
        {loading ? (
          dataLoading(titleColumns, numberActions)
        ) : (
          <>
            {entries.length > 0 ? (
              entries.map((entry, index) => (
                <StyledTr
                  key={`entry-${entry.id}`}
                  aria-labelledby={`entry-${entry.id}`}
                  $isLastTr={index === entries.length - 1}
                >
                  {titleColumns.map((title) => (
                    <StyledTd key={`e-${title.id}`} $withActions={withActions}>
                      <Text
                        type="body"
                        size="small"
                        appearance={
                          customAppearance
                            ? customAppearance(title.id, entry)
                            : "dark"
                        }
                        ellipsis
                      >
                        {entry[title.id]}
                      </Text>
                    </StyledTd>
                  ))}
                  {actions &&
                    renderActions(
                      actions,
                      entry,
                      isTablet,
                      portalId,
                      modalTitle,
                      titles,
                      infoTitle,
                      actionsTitle,
                      hideMobileResume,
                    )}
                </StyledTr>
              ))
            ) : (
              <StyledTr aria-labelledby={`no-data`} $isLastTr>
                <StyledTd colSpan={titleColumns.length + 1}>
                  <Text type="body" size="small" appearance="dark" ellipsis>
                    No se encontró información
                  </Text>
                </StyledTd>
              </StyledTr>
            )}
          </>
        )}
      </StyledTbody>
    </StyledTable>
  );
};

export { TableUI };
export type { TableUIProps };
