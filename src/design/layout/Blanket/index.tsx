import { useMediaQuery } from "@hooks/useMediaQuery";
import { Stack } from "../Stack";
import { StyledBlanket } from "./styles";

interface BlanketProps {
  children?: React.ReactNode;
}

const Blanket = (props: BlanketProps) => {
  const { children } = props;
  const isMobile = useMediaQuery("(max-width: 580px)");

  return (
    <StyledBlanket smallScreen={!isMobile}>
      <Stack alignItems="center" justifyContent="center">
        {children}
      </Stack>
    </StyledBlanket>
  );
};

export { Blanket };
export type { BlanketProps };