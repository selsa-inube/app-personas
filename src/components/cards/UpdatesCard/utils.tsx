import { inube } from "@design/tokens";
import {
  Box,
  Button,
  SkeletonIcon,
  SkeletonLine,
  Stack,
} from "@inubekit/inubekit";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { IUpdatesCardItem } from "./index";

interface ButtonsGroupProps {
  item: IUpdatesCardItem;
  fullwidth?: boolean;
  isMobile?: boolean;
  onEdit?: (item: IUpdatesCardItem) => void;
  onDelete?: (item: IUpdatesCardItem) => void;
}

function ButtonsGroup(props: ButtonsGroupProps) {
  const { item, fullwidth, isMobile, onEdit, onDelete } = props;

  return (
    <Stack
      height={isMobile ? "auto" : inube.spacing.s350}
      gap={inube.spacing.s100}
      width={fullwidth ? "100%" : "auto"}
      direction={isMobile ? "column-reverse" : "initial"}
    >
      <Button
        appearance="danger"
        variant="outlined"
        iconBefore={<MdDeleteOutline />}
        spacing="compact"
        onClick={() => onDelete && onDelete(item)}
        fullwidth={fullwidth}
      >
        Eliminar
      </Button>
      {onEdit && (
        <Button
          appearance="primary"
          variant="outlined"
          iconBefore={<MdOutlineEdit />}
          spacing="compact"
          fullwidth={fullwidth}
          onClick={() => onEdit(item)}
        >
          Editar
        </Button>
      )}
    </Stack>
  );
}

interface UpdatesCardSkeletonProps {
  numberOfLines?: number;
}

function UpdatesCardSkeleton(props: UpdatesCardSkeletonProps) {
  const { numberOfLines = 1 } = props;

  return (
    <Box padding={inube.spacing.s200}>
      <Stack justifyContent="space-between">
        <Stack gap={inube.spacing.s100} alignItems="center">
          <SkeletonIcon animated />
          <SkeletonLine width="250px" height="24px" animated />
        </Stack>
        <Stack height={inube.spacing.s350} gap={inube.spacing.s100}>
          <SkeletonLine width="80px" height="28px" animated />
          <SkeletonLine width="80px" height="28px" animated />
        </Stack>
      </Stack>
      <Stack
        direction="column"
        gap={inube.spacing.s075}
        margin={`${inube.spacing.s100} 0 0 0`}
      >
        {Array.from({ length: numberOfLines }).map((_, index) => (
          <SkeletonLine key={index} width="150px" height="16px" animated />
        ))}
      </Stack>
    </Box>
  );
}

export { ButtonsGroup, UpdatesCardSkeleton };
