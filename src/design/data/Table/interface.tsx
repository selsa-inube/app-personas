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

function showActionTitle(actionTitle: IAction[], mediaQuery: boolean) {
  return !mediaQuery ? (
    actionTitle.map((action) => (
      <StyledThAction key={`action-${action.id}`}>
        <Text type="label" size="medium" textAlign="center" appearance="dark">
          {action.actionName}
        </Text>
      </StyledThAction>
    ))
  ) : (
    <StyledThAction>
      <Text type="label" size="medium" textAlign="center" appearance="dark">
        Open
      </Text>
    </StyledThAction>
  );
}

function ShowAction(
  portalId: string,
  actionContent: IAction[],
  entry: IEntry,
  mediaQuery: boolean,
  modalTitle: string,
  titleLabels: ITitle[],
  infoTitle: string,
  actionsTitle: string
) {
  return !mediaQuery ? (
    <>
      {actionContent.map((action) => (
        <StyledTd key={`${entry.id}-${action.id}`}>
          {action.content(entry)}
        </StyledTd>
      ))}
    </>
  ) : (
    <StyledTd>
      <DisplayEntry
        portalId={portalId}
        entry={entry}
        title={modalTitle}
        actions={actionContent}
        titleLabels={titleLabels}
        infoTitle={infoTitle}
        actionsTitle={actionsTitle}
      />
    </StyledTd>
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
  } = props;

  const mediaActionOpen = useMediaQuery("(max-width: 850px)");

  const queriesArray = useMemo(
    () => breakpoints.map((breakpoint) => breakpoint.breakpoint),
    [breakpoints]
  );

  const media = useMediaQueries(queriesArray);

  const TitleColumns = useMemo(
    () => totalTitleColumns(titles, breakpoints, media),
    [titles, breakpoints, media]
  );

  return (
    <StyledTable>
      <StyledThead>
        <StyledTr>
          {TitleColumns.map((title) => (
            <StyledThTitle
              key={`title-${title.id}`}
              aria-label={title.titleName}
            >
              <Text type="label" size="medium" appearance="dark">
                {title.titleName}
              </Text>
            </StyledThTitle>
          ))}
          {showActionTitle(actions, mediaActionOpen)}
        </StyledTr>
      </StyledThead>
      <StyledTbody>
        {entries.map((entry) => (
          <StyledTr
            key={`entry-${entry.id}`}
            aria-labelledby={`entry-${entry.id}`}
          >
            {TitleColumns.map((title) => (
              <StyledTd key={`e-${entry[title.id]}`}>
                <Text type="body" size="small" appearance="dark">
                  {entry[title.id]}
                </Text>
              </StyledTd>
            ))}
            {ShowAction(
              portalId,
              actions,
              entry,
              mediaActionOpen,
              modalTitle,
              titles,
              infoTitle,
              actionsTitle
            )}
          </StyledTr>
        ))}
      </StyledTbody>
    </StyledTable>
  );
};

export { TableUI };
export type { TableUIProps };
