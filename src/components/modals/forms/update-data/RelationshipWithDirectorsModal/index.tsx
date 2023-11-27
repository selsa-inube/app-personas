import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { StyledModal, StyledItem, StyledBody } from "./styles";
import { Divider } from "@design/layout/Divider";
import { TextField } from "@design/input/TextField";
import { useState } from "react";
import { IDirector } from "@mocks/directors/directors.mocks";

interface ItemProps {
  description: string;
  onClick: () => void;
}

function Item(props: ItemProps) {
  const { description, onClick } = props;
  return (
    <StyledItem onClick={onClick}>
      <Stack direction="column" gap="s050">
        <Text type="body" size="medium">
          {description}
        </Text>
      </Stack>
    </StyledItem>
  );
}

interface RelationshipWithDirectorsModalProps {
  portalId: string;
  onCloseModal: () => void;
  directors: IDirector[];
  onSelect: (selectedItem: IDirector) => void;
}

function RelationshipWithDirectorsModal(
  props: RelationshipWithDirectorsModalProps
) {
  const { portalId, onCloseModal, directors, onSelect } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const smallScreen = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const filteredDirectors = directors.filter((director: IDirector) =>
    director.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            Búsqueda de los directivos de la compañía
          </Text>
        </Stack>

        <Divider dashed />
        <Stack direction="column" gap="s250">
          <Text type="body" size="medium">
            Busca el funcionario por nombre o apellido
          </Text>
          <TextField
            name="searchdirector"
            id="searchdirector"
            placeholder="Digita el nombre o apellido"
            handleChange={(e) => setSearchTerm(e.target.value)}
            isFullWidth
          />
          {searchTerm !== "" && (
            <StyledBody>
              {filteredDirectors.length > 0 ? (
                filteredDirectors.map((director: IDirector) => (
                  <Item
                    key={director.id}
                    description={director.name}
                    onClick={() => onSelect(director)}
                  />
                ))
              ) : (
                <Text type="body" size="small" appearance="gray">
                  No se han encontrado funcionarios con el nombre o apellido: "
                  {searchTerm}"
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

export { RelationshipWithDirectorsModal };
