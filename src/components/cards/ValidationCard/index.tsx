import { ValidationDetailsModal } from "@components/modals/general/ValidationDetailsModal";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Spinner } from "@design/feedback/Spinner";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useState } from "react";
import { MdOutlineCheckCircle, MdOutlineHighlightOff } from "react-icons/md";
import { IValidation } from "src/model/entity/service";
import { OutlineCard } from "../OutlineCard";

function ValidationCard(props: IValidation) {
  const { label, failDetails, value } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <OutlineCard>
        <Stack
          padding={`${inube.spacing.s150} ${inube.spacing.s250}`}
          gap="s200"
          alignItems="center"
        >
          <Stack>
            {value === "success" ? (
              <Icon
                appearance="success"
                icon={<MdOutlineCheckCircle />}
                size="20px"
                spacing="none"
              />
            ) : value === "fail" ? (
              <Icon
                appearance="danger"
                icon={<MdOutlineHighlightOff />}
                size="20px"
                spacing="none"
              />
            ) : (
              <Spinner />
            )}
          </Stack>

          <Stack direction="column" gap="s075">
            <Text type="label" size="large">
              {label}
            </Text>
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
