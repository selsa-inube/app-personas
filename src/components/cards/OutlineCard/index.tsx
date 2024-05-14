import { StyledContainerCard } from "./styles";

interface OutlineCardProps {
  children: React.ReactNode;
}

function OutlineCard(props: OutlineCardProps) {
  const { children } = props;

  return <StyledContainerCard>{children}</StyledContainerCard>;
}

export { OutlineCard };
