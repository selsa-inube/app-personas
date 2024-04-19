import { useMediaQuery } from "@hooks/useMediaQuery";
import { Stack } from "../Stack";
import { StyledBlanket } from "./styles";
import { JustifyContentType } from "../Stack/types";
import { SpacingTokensType } from "@ptypes/spacing.types";

interface BlanketProps {
  children?: React.ReactNode;
  justifyContent?: JustifyContentType;
  padding?: SpacingTokensType;
}

const Blanket = (props: BlanketProps) => {
  const { children, justifyContent = "center", padding = "s0" } = props;
  const isMobile = useMediaQuery("(max-width: 580px)");

  return (
    <StyledBlanket
      smallScreen={!isMobile}
      justifyContent={justifyContent}
      padding={padding}
    >
      <Stack alignItems="center" justifyContent="center">
        {children}
      </Stack>
    </StyledBlanket>
  );
};

export { Blanket };
export type { BlanketProps };
