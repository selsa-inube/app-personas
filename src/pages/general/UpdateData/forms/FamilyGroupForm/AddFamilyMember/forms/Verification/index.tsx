import { Fieldset } from "@design/input/Fieldset";
import { IFormsAddFamilyMember } from "../../types";
import { VerificationFieldsets } from "./VerificationFieldsets";
import { updateDataFieldsetTitles } from "./config/fieldset";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";

interface VerificationProps {
  updatedData: IFormsAddFamilyMember;
}

function UpdateDataVerification(props: VerificationProps) {
  const { updatedData } = props;

  return (
    <>
      {Object.entries(updateDataFieldsetTitles).map(([key, title]) => (
        <Fieldset key={key} title={title}>
          <Stack direction="column" gap={inube.spacing.s150}>
            <VerificationFieldsets updatedData={updatedData} stepKey={key} />
          </Stack>
        </Fieldset>
      ))}
    </>
  );
}

export { UpdateDataVerification };
