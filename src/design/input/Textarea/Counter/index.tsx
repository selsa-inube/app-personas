import { Text } from "@inubekit/inubekit";
import { CounterAppearence } from "../types";

interface CounterProps {
  maxLength: number;
  appearance: CounterAppearence;
  disabled?: boolean;
  valueLength: number;
}
function Counter(props: CounterProps) {
  const { maxLength, appearance, disabled, valueLength } = props;

  return (
    <Text
      type="body"
      size="small"
      disabled={disabled}
      appearance={appearance}
    >{`${valueLength}/${maxLength}`}</Text>
  );
}

export { Counter };
