import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledTable = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  table-layout: auto;
  width: 100%;
`;

const StyledThead = styled.thead`
  border-bottom: solid 1px
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

const StyledTbody = styled.tbody`
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

const StyledTr = styled.tr`
  border-bottom: solid 1px
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  height: 40px;
`;

const StyledThTitle = styled.th`
  padding: 12px 16px;
`;

const StyledThAction = styled.th`
  background-color: ${({ theme }) =>
    theme.color?.surface?.dark?.clear || inube.color.surface.dark.clear};
  width: 80px;
  padding: 12px 0px;
`;

const StyledTd = styled.td`
  padding: 0px 16px;
  text-align: center;
`;

const StyledContainerAction = styled.div`
  padding: 0px 16px;
  text-align: center;
  > svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

export {
  StyledContainerAction,
  StyledTable,
  StyledTbody,
  StyledTd,
  StyledThAction,
  StyledThTitle,
  StyledThead,
  StyledTr,
};
