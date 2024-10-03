import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledCard = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 100px;
  padding: ${inube.spacing.s250};
  border-radius: ${inube.spacing.s050};
  box-shadow: 0px 2px 3px 0px #091e4221;
  gap: ${inube.spacing.s200};
  background-color: ${({ theme }) =>
    theme.palette?.purple?.p50 || inube.color.palette.purple.P50};
`;

export { StyledCard };
