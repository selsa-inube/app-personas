import { StyledContainerCard } from "./styles";

interface OutlineCardProps {
  height?: string;
  children: React.ReactNode;
}

function OutlineCard(props: OutlineCardProps) {
  const { height = "fit-content", children } = props;

  return <StyledContainerCard $height={height}>{children}</StyledContainerCard>;
}

export { OutlineCard };
