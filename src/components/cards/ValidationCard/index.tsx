import { ValidationDetailsModal } from "@components/modals/general/ValidationDetailsModal";
import { inube } from "@design/tokens";
import { SkeletonLine, Stack } from "@inubekit/inubekit";
import { Tag } from "@inubekit/tag";
import { Text } from "@inubekit/text";
import { useState } from "react";
import { IValidation } from "src/model/entity/service";
import { OutlineCard } from "../OutlineCard";

function ValidationCard(props: IValidation) {
  const { label, failDetails, value, pending } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  if (pending) {
    return (
      <OutlineCard height="auto">
        <Stack
          padding={`${inube.spacing.s200} ${inube.spacing.s250}`}
          gap={inube.spacing.s100}
          direction="column"
          width="100%"
        >
          <SkeletonLine width="100%" animated />
          <SkeletonLine width="40px" animated />
        </Stack>
      </OutlineCard>
    );
  }

  return (
    <>
      <OutlineCard height="auto">
        <Stack
          padding={`${inube.spacing.s200} ${inube.spacing.s250}`}
          gap={inube.spacing.s200}
          alignItems="center"
        >
          <Stack direction="column" gap={inube.spacing.s075}>
            <Text type="label" size="large">
              {label}
            </Text>

            <Stack
              wrap="wrap"
              direction="row"
              width="100%"
              gap={inube.spacing.s100}
            >
              {value === "success" ? (
                <Tag label="Cumple" appearance="success" />
              ) : value === "fail" ? (
                <Tag label="No cumple" appearance="danger" />
              ) : (
                <Tag label="Por evaluar" appearance="warning" />
              )}

              {value === "fail" && (
                <Text
                  type="body"
                  size="small"
                  appearance="danger"
                  cursorHover
                  onClick={handleToggleModal}
                >
                  Ver detalles
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
      </OutlineCard>

      {showModal && (
        <ValidationDetailsModal
          label={label}
          description={failDetails}
          portalId="portal"
          onCloseModal={handleToggleModal}
        />
      )}
    </>
  );
}

export { ValidationCard };
