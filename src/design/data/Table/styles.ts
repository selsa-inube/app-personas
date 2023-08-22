import { inube } from "@design/tokens";
import styled from "styled-components";

const StyledTableContainer = styled.div`
  border-radius: 8px;
  border: solid 1px
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  overflow: hidden;
`;

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

interface IStyledTr {
  isLastTr?: boolean;
}

const StyledTr = styled.tr<IStyledTr>`
  border-bottom: solid 1px
    ${({ isLastTr, theme }) => {
      if (isLastTr) return "transparent";
      return (
        theme.color?.stroke?.divider?.regular ||
        inube.color.stroke.divider.regular
      );
    }};
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

export {
  StyledTable,
  StyledTableContainer,
  StyledTbody,
  StyledTd,
  StyledThAction,
  StyledThTitle,
  StyledThead,
  StyledTr,
};
