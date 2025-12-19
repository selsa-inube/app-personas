import { inube } from "@design/tokens";
import { Box, Divider, Icon, Stack, Text } from "@inubekit/inubekit";
import React from "react";
import { ButtonsGroup, UpdatesCardSkeleton } from "./utils";

interface IEntry {
  name?: string;
  value: string;
}

interface IUpdatesCardItem {
  id?: string;
  title?: string;
  entries: IEntry[];
}

interface UpdatesCardProps {
  isMobile: boolean;
  loading?: boolean;
  icon: React.ReactNode;
  items: IUpdatesCardItem[];
  onEdit?: (item: IUpdatesCardItem) => void;
  onDelete?: (item: IUpdatesCardItem) => void;
}

function UpdatesCard(props: UpdatesCardProps) {
  const { isMobile, loading, icon, items, onEdit, onDelete } = props;

  if (loading)
    return <UpdatesCardSkeleton numberOfLines={items.entries.length ?? 1} />;

  return (
    <Stack direction="column" gap={inube.spacing.s200}>
      <Box padding={inube.spacing.s200}>
        <Stack direction="column" gap={inube.spacing.s200}>
          {items.map((item, itemIndex) => (
            <React.Fragment key={item.id || itemIndex}>
              <Stack
                direction="column"
                gap={isMobile ? inube.spacing.s150 : inube.spacing.s100}
              >
                <Stack
                  justifyContent={`${isMobile ? "initial" : "space-between"}`}
                >
                  <Stack gap={inube.spacing.s100} alignItems="center">
                    <Icon icon={icon} appearance="gray" size="16px" />
                    <Text
                      type="label"
                      weight="bold"
                      appearance="dark"
                      size="medium"
                    >
                      {item.title}
                    </Text>
                  </Stack>
                  {!isMobile && (
                    <ButtonsGroup
                      item={item}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  )}
                </Stack>
                <Stack direction="column" gap={inube.spacing.s050}>
                  {item.entries.map((entry, entryIndex) =>
                    entry.name ? (
                      <Stack
                        key={`${entry.name}-${entryIndex}`}
                        justifyContent={`${isMobile ? "space-between" : "initial"}`}
                        gap={inube.spacing.s050}
                      >
                        <Text
                          type="label"
                          weight="bold"
                          appearance="gray"
                          size="medium"
                        >
                          {entry.name}:
                        </Text>
                        <Text
                          type="body"
                          size="small"
                          appearance="dark"
                          weight="normal"
                        >
                          {entry.value || ""}
                        </Text>
                      </Stack>
                    ) : (
                      <Text
                        key={`description-${entryIndex}`}
                        type="body"
                        size="small"
                        appearance="gray"
                        weight="normal"
                      >
                        {entry.value}
                      </Text>
                    ),
                  )}
                </Stack>
                {isMobile && (
                  <ButtonsGroup
                    item={item}
                    isMobile={isMobile}
                    fullwidth
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                )}
              </Stack>
              {itemIndex < items.length - 1 && <Divider dashed />}
            </React.Fragment>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

export { UpdatesCard, UpdatesCardSkeleton };
export type {  IUpdatesCardItem };
