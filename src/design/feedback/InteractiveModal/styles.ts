import { inube } from "@design/tokens";
import styled from "styled-components";

interface IStyledModal {
  smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  background-color: ${({ theme }) =>
    theme.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
  min-width: ${(props) => (props.smallScreen ? "100%" : "450px")};
  min-height: ${(props) => (props.smallScreen ? "100vh" : "auto")};
  height: auto;
  border-radius: ${(props) => (props.smallScreen ? "0" : "8px")};

  & > div {
    padding: ${(props) => (props.smallScreen ? "24px" : "32px")};
  }
`;

export { StyledModal };
