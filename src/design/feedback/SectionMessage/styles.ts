import styled from "styled-components";
import { inube } from "@design/tokens";
import { MessageAppearanceType } from "./types";

interface IStyledSectionMessage {
  isMessageResponsive: boolean;
  appearance: MessageAppearanceType;
}

const StyledSectionMessage = styled.div<IStyledSectionMessage>`
  position: fixed;
  right: ${inube.spacing.s800};
  bottom: ${inube.spacing.s400};
  background-color: ${({ theme, appearance }) => {
    return (
      theme?.color?.surface?.[appearance!]?.clear ||
      inube.color.surface[appearance!].clear
    );
  }};
  width: ${(props) => (props.isMessageResponsive ? "auto" : "400px")};
  height: auto;
  border-radius: ${inube.spacing.s050};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  overflow-wrap: anywhere;
`;

export { StyledSectionMessage };
