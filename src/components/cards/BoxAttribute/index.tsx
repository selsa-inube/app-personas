import { Text } from "@design/data/Text";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { IAttribute } from "src/model/entity/product";
import { ButtonAttribute } from "./ButtonAttribute";
import { StyledBoxAttribute } from "./styles";

interface BoxAttributeProps {
  label: string;
  value?: number | string | IAttribute[];
  withButton?: boolean;
  buttonIcon?: React.JSX.Element;
  buttonValue?: string | number;
  direction?: "row" | "column";
  onClickButton?: () => void;
}

function BoxAttribute(props: BoxAttributeProps) {
  const {
    label,
    value,
    withButton,
    buttonIcon,
    buttonValue,
    direction,
    onClickButton,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 750px)");

  return (
    <StyledBoxAttribute smallScreen={smallScreen}>
      <Grid
        templateColumns={direction === "column" ? "1fr" : "auto 1fr"}
        width="100%"
        gap="s100"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text
          type="label"
          size={smallScreen ? "small" : "medium"}
          appearance="dark"
        >
          {label}
        </Text>

        <Stack alignItems="center" justifyContent="flex-end">
          {withButton ? (
            <ButtonAttribute
              icon={buttonIcon}
              value={buttonValue}
              onClick={onClickButton}
            />
          ) : (
            <Text
              type="body"
              size={smallScreen ? "small" : "medium"}
              appearance="gray"
              textAlign={direction === "column" ? "start" : "end"}
            >
              {String(value)}
            </Text>
          )}
        </Stack>
      </Grid>
    </StyledBoxAttribute>
  );
}

export { BoxAttribute };
export type { BoxAttributeProps };
