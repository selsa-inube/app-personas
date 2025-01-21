import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";

import { inube } from "@design/tokens";
import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { StyledButton } from "./styles";

interface PaginationProps {
  firstEntryInPage: number;
  lastEntryInPage: number;
  totalRecords: number;
  onStartPage: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onEndPage: () => void;
}

const Pagination = (props: PaginationProps) => {
  const {
    firstEntryInPage,
    lastEntryInPage,
    totalRecords,
    onStartPage,
    onPrevPage,
    onNextPage,
    onEndPage,
  } = props;

  return (
    <Stack
      justifyContent="flex-end"
      alignItems="center"
      aria-label="Pagination"
    >
      <Text type="body" size="small" padding="16px 0px" appearance="dark">
        {firstEntryInPage + 1} - {lastEntryInPage} of {totalRecords}
      </Text>

      <Stack
        alignItems="center"
        padding="0px 25px 0px"
        margin="0px 0px 0px 16px"
        gap={inube.spacing.s100}
      >
        <StyledButton onClick={onStartPage} aria-label="go to the first page">
          <MdFirstPage />
        </StyledButton>
        <StyledButton onClick={onPrevPage} aria-label="go to previous page">
          <MdNavigateBefore />
        </StyledButton>
        <StyledButton onClick={onNextPage} aria-label="go to next page">
          <MdNavigateNext />
        </StyledButton>
        <StyledButton onClick={onEndPage} aria-label="go to last page">
          <MdLastPage />
        </StyledButton>
      </Stack>
    </Stack>
  );
};

export { Pagination };
export type { PaginationProps };
