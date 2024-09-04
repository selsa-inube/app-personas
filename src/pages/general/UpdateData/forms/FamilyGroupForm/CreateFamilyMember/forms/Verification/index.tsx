import { Fieldset } from "@inubekit/fieldset";
import { IFormsCreateFamilyMember } from "../../types";
import { VerificationFieldsets } from "./VerificationFieldsets";
import { updateDataFieldsetTitles } from "./config/fieldset";
import { inube } from "@design/tokens";
import { Stack } from "@inubekit/stack";

interface VerificationProps {
  updatedData: IFormsCreateFamilyMember;
}

function UpdateDataVerification(props: VerificationProps) {
  const { updatedData } = props;

  return (
    <>
      {Object.entries(updateDataFieldsetTitles).map(([key, title]) => (
        <Fieldset
          key={key}
          legend={title}
          type="title"
          size="medium"
          width="100%"
        >
          <Stack direction="column" gap={inube.spacing.s150} width="100%">
            <VerificationFieldsets updatedData={updatedData} stepKey={key} />
          </Stack>
        </Fieldset>
      ))}
    </>
  );
}

export { UpdateDataVerification };
