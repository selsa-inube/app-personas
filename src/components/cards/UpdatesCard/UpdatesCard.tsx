import { inube } from "@design/tokens";
import { Box, Button, Divider, Icon, SkeletonIcon, SkeletonLine, Stack, Text } from "@inubekit/inubekit";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

const UpdatesCardSkeleton = () => (
  <Box padding={inube.spacing.s200}>
    <Stack justifyContent="space-between">
      <Stack gap={inube.spacing.s100} alignItems="center">
        <SkeletonIcon animated />
        <SkeletonLine width="250px" height="24px" animated />
      </Stack>
      <Stack
        height={inube.spacing.s350}
        gap={inube.spacing.s100}
      >
        <SkeletonLine width="80px" height="28px" animated />
        <SkeletonLine width="80px" height="28px" animated />
      </Stack>
    </Stack>
    <Stack direction="column" gap={inube.spacing.s075} margin={`${inube.spacing.s100} 0 0 0`}>
      <SkeletonLine width="150px" height="16px" animated />
      <SkeletonLine width="150px" height="16px" animated />
      <SkeletonLine width="150px" height="16px" animated />
      <SkeletonLine width="150px" height="16px" animated />
    </Stack>
  </Box>
)

interface UpdatesCardProps {
  loading?: boolean;
  icon: React.ReactNode;
  title?: string;
  actionDelete?: (index: number) => void;
  actionEdit?: (index: number) => void;
  rowsValues: { [key: string]: string }[];
}

function UpdatesCard(props: UpdatesCardProps) {
  const { loading, icon, title, actionDelete, actionEdit, rowsValues } = props;

  if (loading) return <UpdatesCardSkeleton />;

  return (
    <Stack direction="column" gap={inube.spacing.s200}>
      <Box padding={inube.spacing.s200}>
        <Stack direction="column" gap={inube.spacing.s200}>
          {rowsValues.map((item, index) => (
            <>
              <Stack key={index} direction="column" gap={inube.spacing.s100}>
                <Stack justifyContent="space-between">
                  <Stack gap={inube.spacing.s100} alignItems="center">
                    <Icon icon={icon} appearance="gray" />
                    <Text weight="bold" appearance="dark">{item['title'] || title}</Text>
                  </Stack>
                  <Stack
                    height={inube.spacing.s350}
                    gap={inube.spacing.s100}
                  >
                    <Button
                      appearance="danger"
                      variant="outlined"
                      iconBefore={<MdDeleteOutline />}
                      spacing="compact"
                      onClick={() => actionDelete && actionDelete(index)}
                    >
                      Eliminar
                    </Button>
                    {
                      actionEdit && (
                        <Button
                          appearance="primary"
                          variant="outlined"
                          iconBefore={<MdOutlineEdit />}
                          spacing="compact"
                          onClick={() => actionEdit(index)}
                        >
                          Editar
                        </Button>
                      )
                    }
                  </Stack>
                </Stack>
                <Stack direction="column" gap={inube.spacing.s050}>
                  {Object.entries(item).map(([key, value]) => (
                    <Stack key={`${key}-${index}`} gap={inube.spacing.s050}>
                      <Text weight="bold" appearance="gray">{key}:</Text>
                      <Text>{value || ''}</Text>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
              {index < rowsValues.length - 1 && (<Divider dashed />)}
            </>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default UpdatesCard;
export { UpdatesCardSkeleton };