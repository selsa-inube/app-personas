import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";

import { Stack } from "@design/layout/Stack";
import { StyledButton } from "./styles";
import { Text } from "@design/data/Text";

export interface IPaginationProps {
  firstEntryInPage: number;
  lastEntryInPage: number;
  totalRecords: number;
  handleStartPage: () => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleEndPage: () => void;
}

const Pagination = (props: IPaginationProps) => {
  const {
    firstEntryInPage,
    lastEntryInPage,
    totalRecords,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
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
        gap="8px"
      >
        <StyledButton
          onClick={handleStartPage}
          aria-label="go to the first page"
        >
          <MdFirstPage />
        </StyledButton>
        <StyledButton onClick={handlePrevPage} aria-label="go to previous page">
          <MdNavigateBefore />
        </StyledButton>
        <StyledButton onClick={handleNextPage} aria-label="go to next page">
          <MdNavigateNext />
        </StyledButton>
        <StyledButton onClick={handleEndPage} aria-label="go to last page">
          <MdLastPage />
        </StyledButton>
      </Stack>
    </Stack>
  );
};

export { Pagination };
