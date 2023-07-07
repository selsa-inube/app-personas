import PropTypes from "prop-types";

import { Text } from "../../../design/data/Text";
import { Stack } from "../../../design/layout/Stack";

import { StyledQuickAccess, StyledContainer, StyledLink } from "./styles";

function QuickAccess(props) {
  const { links } = props;

  return (
    <StyledQuickAccess>
      <Stack direction="column" gap="24px">
        <Text type="label">Accesos rápidos</Text>
        <StyledContainer>
          {links.map((link) => (
            <StyledLink key={link.label} to={link.path}>
              <Stack alignItems="center" gap="24px" padding="8px 16px">
                {link.icon}
                <Text size="medium">{link.label}</Text>
              </Stack>
            </StyledLink>
          ))}
        </StyledContainer>
      </Stack>
    </StyledQuickAccess>
  );
}

QuickAccess.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object.isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

export { QuickAccess };
