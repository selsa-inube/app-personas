import { inube } from "@design/tokens";
import { Link } from "react-router";
import styled from "styled-components";

const StyledBox = styled.section`
  padding: ${inube.spacing.s200};
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  border-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

interface IStyledCollapseIcon {
  $collapse: boolean;
}

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(90deg)" : "rotate(-90deg)"};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${inube.spacing.s150};

  & svg {
    padding: ${inube.spacing.s025};
    border-radius: 4px;
  }
`;

export { StyledBox, StyledCollapseIcon, StyledLink };
