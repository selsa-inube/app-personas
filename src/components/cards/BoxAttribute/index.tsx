import { Text } from "@design/data/Text";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { IAttribute } from "src/model/entity/product";
import { ButtonAttribute } from "./ButtonAttribute";
import { StyledBoxAttribute } from "./styles";
import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { inube } from "@design/tokens";

interface BoxAttributeProps {
  label?: string;
  value?: number | string | IAttribute[];
  withButton?: boolean;
  buttonIcon?: React.JSX.Element;
  buttonValue?: string | number;
  buttonDisabled?: boolean;
  direction?: "row" | "column";
  iconAfter?: React.JSX.Element;
  onClickButton?: () => void;
}

function BoxAttribute(props: BoxAttributeProps) {
  const {
    label,
    value,
    withButton,
    buttonIcon,
    buttonValue,
    buttonDisabled,
    direction,
    iconAfter,

    onClickButton,
  } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <StyledBoxAttribute $smallScreen={isMobile}>
      <Grid
        width="100%"
        alignItems="center"
        gap={inube.spacing.s100}
        justifyContent="space-between"
        templateColumns={direction === "column" ? "1fr" : "auto 1fr"}
      >
        {label && (
          <Text
            type="label"
            size={isMobile ? "small" : "medium"}
            appearance="dark"
          >
            {label}
          </Text>
        )}

        {(withButton || String(value)) && (
          <Stack
            alignItems="center"
            justifyContent={
              direction === "column" || iconAfter ? "flex-start" : "flex-end"
            }
          >
            {withButton ? (
              <ButtonAttribute
                icon={buttonIcon}
                value={buttonValue}
                onClick={onClickButton}
                disabled={buttonDisabled}
              />
            ) : (
              value && (
                <Text
                  type="body"
                  size={isMobile ? "small" : "medium"}
                  appearance="gray"
                  textAlign={
                    direction === "column" || iconAfter ? "start" : "end"
                  }
                >
                  {String(value)}
                </Text>
              )
            )}
          </Stack>
        )}

        {iconAfter && (
          <Stack alignItems="center" justifyContent="flex-end">
            {iconAfter}
          </Stack>
        )}
      </Grid>
    </StyledBoxAttribute>
  );
}

export { BoxAttribute };
export type { BoxAttributeProps };
