import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { ButtonAttribute } from "./ButtonAttribute";
import { StyledBoxAttribute } from "./styles";
import { IAttribute } from "@ptypes/pages/product.types";

interface BoxAttributeProps {
  label: string;
  value?: number | string | IAttribute[];
  withButton?: boolean;
  buttonIcon?: React.JSX.Element;
  buttonValue?: string | number;
  onClickButton?: () => void;
}

function BoxAttribute(props: BoxAttributeProps) {
  const { label, value, withButton, buttonIcon, buttonValue, onClickButton } =
    props;

  const smallScreen = useMediaQuery("(max-width: 750px)");

  return (
    <StyledBoxAttribute smallScreen={smallScreen}>
      <Stack justifyContent="space-between" alignItems="center">
        <Text
          type="label"
          size={smallScreen ? "small" : "medium"}
          appearance="dark"
        >
          {label}
        </Text>

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
          >
            {String(value)}
          </Text>
        )}
      </Stack>
    </StyledBoxAttribute>
  );
}

export { BoxAttribute };
export type { BoxAttributeProps };
