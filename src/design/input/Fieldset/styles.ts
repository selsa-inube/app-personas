import { inube } from "@design/tokens";
import { spacing } from "@design/tokens/spacing/spacing";
import styled from "styled-components";

interface IStyledFieldset {
  isMobile: boolean;
  width: string;
  height: string;
}

const StyledFieldset = styled.fieldset<IStyledFieldset>`
  border-radius: ${spacing.s100};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
  padding: ${({ isMobile }) =>
    isMobile
      ? `${inube.spacing.s100} ${inube.spacing.s150} ${inube.spacing.s200}`
      : `${inube.spacing.s150} ${inube.spacing.s250} ${inube.spacing.s300}`};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;

export { StyledFieldset };
