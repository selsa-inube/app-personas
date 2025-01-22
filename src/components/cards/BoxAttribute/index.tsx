import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid, Stack, Text } from "@inubekit/inubekit";
import { IAttribute } from "src/model/entity/product";
import { ButtonAttribute } from "./ButtonAttribute";
import { StyledBoxAttribute } from "./styles";

interface BoxAttributeProps {
  label?: string;
  value?: number | string | IAttribute[];
  withButton?: boolean;
  buttonIcon?: React.JSX.Element;
  buttonValue?: string | number;
  buttonDisabled?: boolean;
  downloadable?: boolean;
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
    downloadable = false,
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
        autoRows="auto"
      >
        {label && (
          <Text
            type="label"
            size={isMobile || downloadable ? "small" : "medium"}
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
                  size={isMobile || downloadable ? "small" : "medium"}
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
