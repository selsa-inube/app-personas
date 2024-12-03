import { Accordion } from "@design/data/Accordion";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { MdOutlineArrowBack } from "react-icons/md";
import { aidRequestSteps } from "../../config/assisted";
import { IFormsAidRequest } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";

interface AidRequestVerificationProps {
  aidRequest: IFormsAidRequest;
  onStepChange: (stepId: number) => void;
}

function AidRequestVerification(props: AidRequestVerificationProps) {
  const { aidRequest, onStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {Object.entries(aidRequestSteps)
        .filter(([key]) => key !== "verification")
        .map(([key, step]) => (
          <Accordion title={step.name} key={`${key}-box`}>
            <Stack
              direction="column"
              width="100%"
              alignItems="flex-end"
              gap={isTablet ? inube.spacing.s150 : inube.spacing.s200}
            >
              <VerificationBoxes
                isTablet={isTablet}
                aidRequest={aidRequest}
                stepKey={key as keyof typeof aidRequestSteps}
              />

              <Button
                iconBefore={<MdOutlineArrowBack />}
                onClick={() =>
                  onStepChange(
                    aidRequestSteps[key as keyof IFormsAidRequest].number,
                  )
                }
                variant="none"
                appearance="dark"
              >
                Regresar a este paso
              </Button>
            </Stack>
          </Accordion>
        ))}
    </Stack>
  );
}

export { AidRequestVerification };
