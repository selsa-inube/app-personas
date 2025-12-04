import { inube } from "@design/tokens";
import { Box, Button, Divider, Icon, SkeletonIcon, SkeletonLine, Stack, Text } from "@inubekit/inubekit";
import React from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

interface ButtonsGroupProps {
  actionDelete?: (index: number) => void;
  actionEdit?: (index: number) => void;
  index: number;
  fullwidth?: boolean;
  isMobile?: boolean;
}

function ButtonsGroup({ actionDelete, actionEdit, index, fullwidth, isMobile }: ButtonsGroupProps) {
  return (
    <Stack
      height={isMobile ? 'auto' : inube.spacing.s350}
      gap={inube.spacing.s100}
      width={fullwidth ? '100%' : 'auto'}
      direction={isMobile ? 'column-reverse' : 'initial'}
    >
      <Button
        appearance="danger"
        variant="outlined"
        iconBefore={<MdDeleteOutline />}
        spacing="compact"
        onClick={() => actionDelete && actionDelete(index)}
        fullwidth={fullwidth}
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
            fullwidth={fullwidth}
            onClick={() => actionEdit(index)}
          >
            Editar
          </Button>
        )
      }
    </Stack>
  );
}

function UpdatesCardSkeleton({ numberOfLines = 1 }: { numberOfLines?: number }) {
  return (
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
        {
          Array.from({ length: numberOfLines }).map((_, index) => (
            <SkeletonLine key={index} width="150px" height="16px" animated />
          ))
        }
      </Stack>
    </Box>
  )
}

interface UpdatesCardProps {
  isMobile: boolean;
  loading?: boolean;
  icon: React.ReactNode;
  title?: string;
  actionDelete?: (index: number) => void;
  actionEdit?: (index: number) => void;
  rowsValues: { [key: string]: string }[];
  numberOfLines?: number;
}

function UpdatesCard(props: UpdatesCardProps) {
  const { isMobile, loading, icon, title, actionDelete, actionEdit, rowsValues, numberOfLines } = props;

  if (loading) return <UpdatesCardSkeleton numberOfLines={numberOfLines} />;

  return (
    <Stack direction="column" gap={inube.spacing.s200}>
      <Box padding={inube.spacing.s200}>
        <Stack direction="column" gap={inube.spacing.s200}>
          {rowsValues.map((item, index) => (
            <React.Fragment key={item.id || index}>
              <Stack
                direction="column"
                gap={isMobile ? inube.spacing.s150 : inube.spacing.s100}
              >
                <Stack justifyContent={`${isMobile ? 'initial' : 'space-between'}`}>
                  <Stack gap={inube.spacing.s100} alignItems="center">
                    <Icon
                      icon={icon}
                      appearance="gray"
                      size="16px"
                    />
                    <Text
                      type="label"
                      weight="bold"
                      appearance="dark"
                      size="medium"
                    >
                      {item['title'] || title}
                    </Text>
                  </Stack>
                  {!isMobile && <ButtonsGroup actionDelete={actionDelete} actionEdit={actionEdit} index={index} />}
                </Stack>
                <Stack direction="column" gap={inube.spacing.s050}>
                  {Object.entries(item).map(([key, value]) => (
                    <Stack
                      key={`${key}-${item.id}`}
                      justifyContent={`${isMobile ? 'space-between' : 'initial'}`}
                      gap={inube.spacing.s050}
                    >
                      <Text
                        type="label"
                        weight="bold"
                        appearance="gray"
                        size="medium"
                      >
                        {key}:
                      </Text>
                      <Text
                        type="body"
                        size="small"
                        appearance="dark"
                        weight="normal"
                      >
                        {value || ''}
                      </Text>
                    </Stack>
                  ))}
                </Stack>
                {isMobile && <ButtonsGroup actionDelete={actionDelete} actionEdit={actionEdit} index={index} isMobile={isMobile} fullwidth />}
              </Stack>
              {index < rowsValues.length - 1 && (<Divider dashed />)}
            </React.Fragment>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export { UpdatesCard, UpdatesCardSkeleton };