import { inube } from "@design/tokens";
import { Icon, Stack, Text } from "@inubekit/inubekit";
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";

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
    <Stack justifyContent="flex-end" alignItems="center">
      <Text type="body" size="small" padding="16px 0px" appearance="dark">
        {firstEntryInPage + 1} - {lastEntryInPage} of {totalRecords}
      </Text>

      <Stack
        alignItems="center"
        padding="0px 25px 0px"
        margin="0px 0px 0px 16px"
        gap={inube.spacing.s100}
      >
        <Icon
          icon={<MdFirstPage />}
          onClick={onStartPage}
          appearance="dark"
          size="16px"
          cursorHover
        />

        <Icon
          icon={<MdNavigateBefore />}
          onClick={onPrevPage}
          appearance="dark"
          size="16px"
          cursorHover
        />

        <Icon
          icon={<MdNavigateNext />}
          onClick={onNextPage}
          appearance="dark"
          size="16px"
          cursorHover
        />

        <Icon
          icon={<MdLastPage />}
          onClick={onEndPage}
          appearance="dark"
          size="16px"
          cursorHover
        />
      </Stack>
    </Stack>
  );
};

export { Pagination };
export type { PaginationProps };
