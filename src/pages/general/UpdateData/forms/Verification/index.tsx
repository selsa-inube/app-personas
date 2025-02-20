import { Accordion } from "@design/data/Accordion";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, IAssistedStep, Stack } from "@inubekit/inubekit";
import { MdOutlineArrowBack } from "react-icons/md";
import { updateDataSteps } from "../../config/assisted";
import { IFormsUpdateData } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";

interface VerificationProps {
  updatedData: IFormsUpdateData;
  steps: Record<string, IAssistedStep>;
  handleStepChange: (stepId: number) => void;
}

function UpdateDataVerification(props: VerificationProps) {
  const { updatedData, steps, handleStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {Object.entries(steps)
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
                updatedData={updatedData}
                stepKey={key as keyof typeof updateDataSteps}
              />

              <Button
                iconBefore={<MdOutlineArrowBack />}
                onClick={() =>
                  handleStepChange(
                    updateDataSteps[key as keyof IFormsUpdateData].number,
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

export { UpdateDataVerification };
