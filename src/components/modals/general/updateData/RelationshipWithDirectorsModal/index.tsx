import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { TextField } from "@design/input/TextField";
import { Blanket } from "@design/layout/Blanket";
import { Divider } from "@design/layout/Divider";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { StyledBody, StyledItem, StyledModal } from "./styles";
import { IDirector } from "src/model/entity/user";

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
  props: RelationshipWithDirectorsModalProps,
) {
  const { portalId, onCloseModal, directors, onSelect } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const isMobile = useMediaQuery("(max-width: 550px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const filteredDirectors = directors.filter((director: IDirector) =>
    director.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={isMobile}>
        <Stack direction="column" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text
              type="title"
              size={isMobile ? "small" : "medium"}
              appearance="dark"
            >
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
          <Text
            type="body"
            size={isMobile ? "small" : "medium"}
            appearance="gray"
          >
            Búsqueda de los directivos de la compañía
          </Text>
        </Stack>

        <Divider dashed />
        <Stack direction="column" gap={isMobile ? "s200" : "s250"}>
          <Text type="body" size={isMobile ? "small" : "medium"}>
            Busca el funcionario por nombre o apellido
          </Text>
          <TextField
            name="searchdirector"
            id="searchdirector"
            placeholder="Digita el nombre o apellido"
            onChange={(e) => setSearchTerm(e.target.value)}
            size="compact"
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
                  No se han encontrado funcionarios con el nombre o apellido:
                  &quot;
                  {searchTerm}&quot;
                </Text>
              )}
            </StyledBody>
          )}
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { RelationshipWithDirectorsModal };
