import styled from "styled-components";
import { inube } from "../../tokens";

interface IStyledFileDrop {
  isDragOver: boolean;
}

const StyledFileDrop = styled.div<IStyledFileDrop>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px dashed
    ${({ isDragOver, theme }) =>
      isDragOver
        ? theme?.color?.stroke?.primary?.hover ||
          inube.color.stroke.primary.hover
        : theme?.color?.stroke?.dark?.regular ||
          inube.color.stroke.dark.regular};
  border-radius: ${inube.spacing.s100};
  transition: border-color 0.3s ease;
  padding: ${inube.spacing.s300};
  gap: ${inube.spacing.s200};
  user-select: none;
`;

export { StyledFileDrop };
