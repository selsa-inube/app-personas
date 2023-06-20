import styled from "styled-components";
import { inube } from "../Tokens";

const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  color: ${(props) =>
    props.theme.content?.color || inube.color.text.light.regular};
`;

StyledButton.defaultProps = {
  theme: {
    color: "green",
  },
};

export { StyledButton };
