import { inube } from "@design/tokens";
import { Radio, SkeletonIcon, SkeletonLine, Stack } from "@inubekit/inubekit";
import { OutlineCard } from "../OutlineCard";
import { StyledCardContainer } from "./styles";

interface AidCardProps {
  id: string;
  title: string;
  loading?: boolean;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

function AidCard(props: AidCardProps) {
  const { id, title, loading, selected, onSelect } = props;

  const handleClick = () => {
    onSelect && onSelect(id);
  }

  if (loading) {
    return (
      <OutlineCard>
        <Stack
          direction="row"
          gap={inube.spacing.s150}
          padding={inube.spacing.s200}
          width="100%"
        >
          <SkeletonIcon size="24px" animated />
          <SkeletonLine width="25%" height="24px" animated />
        </Stack>
      </OutlineCard>
    );
  }

  return (
    <StyledCardContainer onClick={handleClick}>
      <Radio
        id={id}
        onChange={handleClick}
        value={id}
        label={title}
        checked={selected}
      />
    </StyledCardContainer>
  );
}

export { AidCard };
export type { AidCardProps };
