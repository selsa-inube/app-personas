import { inube } from "@design/tokens";
import { Icon, Stack, Text } from "@inubekit/inubekit";
import { useState } from "react";
import {
  MdOutlineAddCircleOutline,
  MdOutlineDoNotDisturbOn,
} from "react-icons/md";
import { OutlineCard } from "../OutlineCard";

interface EntryCounterCardProps {
  categoryId: string;
  categoyName: string;
  isExceeded?: boolean;
  count?: number;
  onChange: (categoryId: string, count: number) => void;
}

function EntryCounterCard(props: EntryCounterCardProps) {
  const { categoryId, categoyName, isExceeded, count, onChange } = props;

  const [counter, setCounter] = useState(count || 0);

  const handleSubtract = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      onChange(categoryId, counter - 1);
    }
  };

  const handleAdd = () => {
    setCounter(counter + 1);
    onChange(categoryId, counter + 1);
  };

  return (
    <OutlineCard>
      <Stack
        direction="row"
        width="100%"
        gap={inube.spacing.s100}
        padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
        justifyContent="space-between"
      >
        <Text type="label" size="large">
          {categoyName}
        </Text>

        <Stack gap={inube.spacing.s100} direction="row">
          <Icon
            icon={<MdOutlineDoNotDisturbOn />}
            appearance={counter === 0 ? "gray" : "primary"}
            disabled={counter === 0}
            onClick={handleSubtract}
            size="24px"
            cursorHover
          />

          <Text type="title" size="medium">
            {counter}
          </Text>

          <Icon
            icon={<MdOutlineAddCircleOutline />}
            appearance={isExceeded ? "gray" : "primary"}
            disabled={isExceeded}
            onClick={handleAdd}
            size="24px"
            cursorHover
          />
        </Stack>
      </Stack>
    </OutlineCard>
  );
}

export { EntryCounterCard };
export type { EntryCounterCardProps };
