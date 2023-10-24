import { Text } from "@design/data/Text";
import { CounterAppearence } from "../types";

interface CounterProps {
  maxLength: number;
  appearance: CounterAppearence;
  isDisabled?: boolean;
  valueLength: number;
}
function Counter(props: CounterProps) {
  const { maxLength, appearance, isDisabled, valueLength } = props;

  return (
    <Text
      type="body"
      size="small"
      disabled={isDisabled}
      appearance={appearance}
    >{`${valueLength}/${maxLength}`}</Text>
  );
}

export { Counter };
