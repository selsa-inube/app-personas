import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { DateField, DateFieldProps } from "..";

const DateFieldController = (props: DateFieldProps) => {
  const { value = "" } = props;
  const [date, setDate] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    return;
  };

  const handleFocus = () => {
    action("onFocus event");
  };

  const handleBlur = () => {
    action("onBlur event");
  };

  return (
    <DateField
      {...props}
      value={date}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export { DateFieldController };
