import { useState, useEffect } from "react";
import { Tab, ITabProps } from "../index";

const TabController = (props: ITabProps) => {
  const { isDisabled = false } = props;
  const [tabSelected, setTabSelected] = useState(false);

  useEffect(() => {
    if (isDisabled) {
      setTabSelected(false);
    }
  }, [isDisabled]);

  const onClickTab = () => {
    if (!isDisabled) {
      setTabSelected(!tabSelected);
    }
  };

  return (
    <div onClick={onClickTab} tabIndex={0}>
      <Tab {...props} isSelected={tabSelected} />
    </div>
  );
};

export { TabController };
