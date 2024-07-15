import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledQuotaDetailBox = styled.section`
  padding: ${inube.spacing.s200} ${inube.spacing.s250};
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  border-color: ${({ theme }) =>
    theme.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${inube.spacing.s250};
`;

export { StyledQuotaDetailBox };
