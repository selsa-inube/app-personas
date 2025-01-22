import { Accordion } from "@design/data/Accordion";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Stack } from "@inubekit/inubekit";
import { MdOutlineArrowBack } from "react-icons/md";
import { programmedSavingRequestSteps } from "../../config/assisted";
import { IFormsProgrammedSavingRequest } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";

interface VerificationProps {
  programmedSavingRequest: IFormsProgrammedSavingRequest;
  onStepChange: (stepId: number) => void;
}

function ProgrammedSavingRequestVerification(props: VerificationProps) {
  const { programmedSavingRequest, onStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {Object.entries(programmedSavingRequestSteps)
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
                programmedSavingRequest={programmedSavingRequest}
                stepKey={key as keyof IFormsProgrammedSavingRequest}
              />

              <Button
                iconBefore={<MdOutlineArrowBack />}
                onClick={() =>
                  onStepChange(
                    programmedSavingRequestSteps[
                      key as keyof IFormsProgrammedSavingRequest
                    ].number,
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

export { ProgrammedSavingRequestVerification };
