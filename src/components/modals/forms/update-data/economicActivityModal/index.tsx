import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { IEconomicActivity } from "@mocks/users/economicActivities.mocks";
import { StyledModal, StyledItem, StyledBody } from "./styles";
import { Divider } from "@design/layout/Divider";
import { TextField } from "@design/input/TextField";
import { useState } from "react";

interface ItemProps {
  id: string;
  description: string;
  onClick: () => void;
}

function Item(props: ItemProps) {
  const { id, description, onClick } = props;
  return (
    <StyledItem onClick={onClick}>
      <Stack direction="column" gap="s050">
        <Text type="label" size="medium">
          {id}
        </Text>
        <Text type="body" size="medium">
          {description}
        </Text>
      </Stack>
    </StyledItem>
  );
}

interface EconomicActivityModalProps {
  portalId: string;
  onCloseModal: () => void;
  activities: IEconomicActivity[];
  onSelect: (selectedItem: IEconomicActivity) => void;
}

function EconomicActivityModal(props: EconomicActivityModalProps) {
  const { portalId, onCloseModal, activities, onSelect } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const smallScreen = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const filteredActivities = activities.filter(
    (activity: IEconomicActivity) =>
      activity.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={smallScreen}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="large" appearance="dark">
              Búsqueda
            </Text>

            <Icon
              appearance="dark"
              size="20px"
              spacing="none"
              icon={<MdOutlineClose />}
              onClick={onCloseModal}
              cursorHover
            />
          </Stack>
          <Text type="body" size="medium" appearance="gray">
            Búsqueda actividad económica CIIU
          </Text>
        </Stack>

        <Divider dashed />
        <Stack direction="column" gap="s250">
          <Text type="body" size="medium">
            Digita una palabra clave o código.
          </Text>
          <TextField
            name="searchActivity"
            id="searchActivity"
            placeholder="Digita la palabra clave"
            handleChange={(e) => setSearchTerm(e.target.value)}
            isFullWidth
          />
          {searchTerm !== "" && (
            <StyledBody>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity: IEconomicActivity) => (
                  <Item
                    key={activity.id}
                    id={activity.id}
                    description={activity.description}
                    onClick={() => onSelect(activity)}
                  />
                ))
              ) : (
                <Text type="body" size="small" appearance="gray">
                  No se han encontrado actividades para "{searchTerm}"
                </Text>
              )}
            </StyledBody>
          )}
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}

export { EconomicActivityModal };
