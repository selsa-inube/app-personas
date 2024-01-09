import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Stack } from "@design/layout/Stack";
import { IFormsProgrammedSavingFixedRequest } from "../../../types";
import { IGoalEntry } from "../../GoalForm/types";

const renderGoalSummary = (values: IGoalEntry, isTablet: boolean) => (
  <Stack direction="column" gap={isTablet ? "s200" : "s250"} width="100%">
    {values.daysNumber !== "" && (
      <BoxAttribute
        label="Reembolso en número de días:"
        value={values.daysNumber}
      />
    )}

    {values.refundDate !== "" && (
      <BoxAttribute label="Reembolso en fecha:" value={values.refundDate} />
    )}
  </Stack>
);

interface SummaryBoxesProps {
  programmedSavingFixedRequest: IFormsProgrammedSavingFixedRequest;
  stepKey: string;
  isTablet: boolean;
}

function SummaryBoxes(props: SummaryBoxesProps) {
  const { programmedSavingFixedRequest, stepKey, isTablet } = props;
  return (
    <>
      {stepKey === "goal" &&
        renderGoalSummary(programmedSavingFixedRequest.goal.values, isTablet)}
    </>
  );
}

export { SummaryBoxes };
