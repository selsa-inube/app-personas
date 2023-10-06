import { useState } from "react";
import { Switch, SwitchProps } from "..";

const SwitchController = (
  props: SwitchProps & {
    onSwitchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
) => {
  const { checked = false, onSwitchChange } = props;
  const [switchChecked, setSwitchChecked] = useState(checked);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchChecked(e.target.checked);
    onSwitchChange && onSwitchChange(e);
  };

  return <Switch {...props} checked={switchChecked} onChange={onChange} />;
};

export { SwitchController };