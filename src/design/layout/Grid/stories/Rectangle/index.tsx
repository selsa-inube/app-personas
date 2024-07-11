import { StyledRectangle } from "./styles";

interface RectangleProps {
  width?: string;
  height?: string;
}

function Rectangle(props: RectangleProps) {
  const { height = "80px", width } = props;
  return <StyledRectangle $height={height} $width={width} />;
}

export { Rectangle };
