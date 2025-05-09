import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid, Stack, Text } from "@inubekit/inubekit";
import { IAttribute } from "src/model/entity/product";
import { ButtonAttribute } from "./ButtonAttribute";
import { StyledBoxAttribute } from "./styles";

interface BoxAttributeProps {
  label?: string;
  value?: number | string | React.ReactNode | IAttribute[];
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
  const isColumnOrIconAfter = direction === "column" || Boolean(iconAfter);

  const renderContent = () => {
    if (withButton) {
      return (
        <ButtonAttribute
          icon={buttonIcon}
          value={buttonValue}
          onClick={onClickButton}
          disabled={buttonDisabled}
        />
      );
    }

    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value === "string" || typeof value === "number") {
      return (
        <Text
          type="body"
          size={isMobile || downloadable ? "small" : "medium"}
          appearance="gray"
          textAlign={isColumnOrIconAfter ? "start" : "end"}
        >
          {value}
        </Text>
      );
    }

    return <>{value}</>;
  };

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
            weight="bold"
          >
            {label}
          </Text>
        )}

        {(withButton || (value !== null && value !== undefined)) && (
          <Stack
            alignItems="center"
            justifyContent={isColumnOrIconAfter ? "flex-start" : "flex-end"}
          >
            {renderContent()}
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
