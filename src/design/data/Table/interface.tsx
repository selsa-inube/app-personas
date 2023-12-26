import { useMemo } from "react";
import { DisplayEntry } from "./DisplayEntry";

import { useMediaQueries } from "@hooks/useMediaQueries";
import { useMediaQuery } from "@hooks/useMediaQuery";

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
  breakpoints: IBreakpoint[],
  media: Record<string, boolean>
) {
  const numColumns = breakpoints[findCurrentMediaQuery(media)].totalColumns;

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
  hideMobileResume?: boolean
) {
  const actionsList =
    hideMobileResume && mediaQuery
      ? actions.filter((title) => title.mobilePriority)
      : actions;

  return mediaQuery && !hideMobileResume
    ? renderActionTitle(mobileResumeTitle ? mobileResumeTitle : "Abrir")
    : actionsList.map((action) =>
        renderActionTitle(action.actionName, `action-${action.id}`)
      );
}

function renderActions(
  portalId: string,
  actions: IAction[],
  entry: IEntry,
  mediaQuery: boolean,
  modalTitle: string,
  titleLabels: ITitle[],
  infoTitle: string,
  actionsTitle: string,
  hideMobileResume?: boolean
) {
  const actionsList =
    hideMobileResume && mediaQuery
      ? actions.filter((action) => action.mobilePriority)
      : actions;

  return mediaQuery && !hideMobileResume ? (
    <StyledTd>
      <DisplayEntry
        portalId={portalId}
        entry={entry}
        title={modalTitle}
        actions={actions}
        titleLabels={titleLabels}
        infoTitle={infoTitle}
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

interface TableUIProps {
  portalId: string;
  titles: ITitle[];
  actions: IAction[];
  entries: IEntry[];
  breakpoints: IBreakpoint[];
  modalTitle: string;
  infoTitle: string;
  actionsTitle: string;
  hideMobileResume?: boolean;
  mobileResumeTitle?: string;
  colsSameWidth?: boolean;
  columActions: boolean;
}

const TableUI = (props: TableUIProps) => {
  const {
    portalId,
    titles,
    actions,
    entries,
    breakpoints,
    modalTitle,
    infoTitle,
    actionsTitle,
    hideMobileResume,
    mobileResumeTitle,
    colsSameWidth,
    columActions,
  } = props;

  const isTablet = useMediaQuery("(max-width: 850px)");

  let TitleColumns = titles;

  if (breakpoints) {
    const queriesArray = useMemo(
      () => breakpoints.map((breakpoint) => breakpoint.breakpoint),
      [breakpoints]
    );
    const media = useMediaQueries(queriesArray);

    TitleColumns = useMemo(
      () => totalTitleColumns(titles, breakpoints, media),
      [titles, breakpoints, media]
    );
  }

  return (
    <StyledTable colsSameWidth={colsSameWidth}>
      <StyledThead>
        <StyledTr>
          {TitleColumns.map((title) => (
            <StyledThTitle
              key={`title-${title.id}`}
              aria-label={title.titleName}
              countColumns={TitleColumns.length}
              colsSameWidth={colsSameWidth}
              columActions={columActions}
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
              hideMobileResume
            )}
        </StyledTr>
      </StyledThead>
      <StyledTbody>
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <StyledTr
              key={`entry-${entry.id}`}
              aria-labelledby={`entry-${entry.id}`}
              isLastTr={index === entries.length - 1}
            >
              {TitleColumns.map((title) => (
                <StyledTd key={`e-${title.id}`} columActions={columActions}>
                  <Text type="body" size="small" appearance="dark" ellipsis>
                    {entry[title.id]}
                  </Text>
                </StyledTd>
              ))}
              {actions &&
                renderActions(
                  portalId,
                  actions,
                  entry,
                  isTablet,
                  modalTitle,
                  titles,
                  infoTitle,
                  actionsTitle,
                  hideMobileResume
                )}
            </StyledTr>
          ))
        ) : (
          <StyledTr aria-labelledby={`no-data`} isLastTr>
            <StyledTd colSpan={TitleColumns.length + 1}>
              <Text type="body" size="small" appearance="dark" ellipsis>
                No se encontró información
              </Text>
            </StyledTd>
          </StyledTr>
        )}
      </StyledTbody>
    </StyledTable>
  );
};

export { TableUI };
export type { TableUIProps };
