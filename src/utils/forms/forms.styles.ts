import styled from "styled-components";

interface IStyledInputFormProps {
  $gridColumn: string;
}

const StyledInputForm = styled.div<IStyledInputFormProps>`
  grid-column: ${({ $gridColumn }) => $gridColumn};
`;

export { StyledInputForm };
