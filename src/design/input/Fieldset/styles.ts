import { inube } from "@design/tokens";
import { spacing } from "@design/tokens/spacing/spacing";
import styled from "styled-components";

interface IStyledFieldset {
  smallScreen: boolean;
}

const StyledFieldset = styled.fieldset<IStyledFieldset>`
  border-radius: ${spacing.s100};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
  padding: ${({ smallScreen }) =>
    !smallScreen
      ? inube.spacing.s300
      : `${inube.spacing.s250} ${inube.spacing.s200}`};
`;

export { StyledFieldset };
