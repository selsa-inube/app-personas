import { IAction, IEntry } from "@design/data/Table/types";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket, Stack, Text, Textfield } from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { StyledModal } from "./styles";
import { ILabel } from "./types";

interface InteractiveModalProps {
  portalId: string;
  title: string;
  onCloseModal: () => void;
  infoData: IEntry;
  actions?: IAction[];
  labels?: ILabel[];
  infoTitle?: string;
  actionsTitle?: string;
}

const InteractiveModal = (props: InteractiveModalProps) => {
  const {
    portalId,
    title,
    onCloseModal,
    infoData,
    actions,
    labels,
    infoTitle,
    actionsTitle,
  } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");

  const hasActions = actions && actions.length > 0;

  const hasLabels = labels && labels.length > 0;

  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" gap={inube.spacing.s300}>
          <Stack direction="column" gap={inube.spacing.s200}>
            <Stack alignItems="center" justifyContent="space-between">
              <Text type="headline" size="small" appearance="dark">
                {title}
              </Text>
              <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
            </Stack>
            {hasActions && (
              <Text type="title" size="medium" appearance="dark">
                {infoTitle}
              </Text>
            )}
            {hasLabels
              ? labels.map(
                  (field, id) =>
                    infoData[field.id] && (
                      <Textfield
                        key={id}
                        label={field.titleName}
                        name={field.id}
                        id={field.id}
                        placeholder={field.titleName}
                        value={infoData[field.id]}
                        fullwidth={true}
                        size="compact"
                        disabled={true}
                      />
                    ),
                )
              : Object.keys(infoData).map((key, id) => (
                  <Textfield
                    key={id}
                    label={key}
                    name={key}
                    id={key}
                    placeholder={key}
                    value={infoData[key]}
                    fullwidth={true}
                    size="compact"
                    disabled={true}
                  />
                ))}
          </Stack>
          {hasActions && (
            <Stack direction="column" gap={inube.spacing.s200}>
              <Text type="title" size="medium" appearance="dark">
                {actionsTitle}
              </Text>
              {actions.map((action) => (
                <Stack key={action.id} gap="10px">
                  {typeof action.content === "function"
                    ? action.content(infoData)
                    : action.content}
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
};

export { InteractiveModal };
export type { InteractiveModalProps };
