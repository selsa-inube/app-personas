import { inube } from "@design/tokens";
import { Fieldset } from "@inubekit/fieldset";
import { Stack } from "@inubekit/inubekit";
import { IFormsCreateFamilyMember } from "../../types";
import { VerificationFieldsets } from "./VerificationFieldsets";
import { updateDataFieldsetTitles } from "./config/fieldset";

interface VerificationProps {
  updatedData: IFormsCreateFamilyMember;
}

function UpdateDataVerification(props: VerificationProps) {
  const { updatedData } = props;

  return (
    <>
      {Object.entries(updateDataFieldsetTitles).map(([key, title]) => (
        <Fieldset key={key} legend={title} type="title" size="medium">
          <Stack direction="column" gap={inube.spacing.s150} width="100%">
            <VerificationFieldsets updatedData={updatedData} stepKey={key} />
          </Stack>
        </Fieldset>
      ))}
    </>
  );
}

export { UpdateDataVerification };
