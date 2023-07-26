import { StyledSquare } from "./styles";

interface SquareProps {
  number: number;
}

function Square(props: SquareProps) {
  const { number } = props;
  return <StyledSquare>{number}</StyledSquare>;
}

export { Square };
