import { Accordion } from "@design/data/Accordion";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdOutlineArrowBack } from "react-icons/md";
import { creditSimulationRequestSteps } from "../../config/assisted";
import { IFormsCreditSimulationRequest } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";
import { creditSimulationRequestBoxTitles } from "./config/box";

interface VerificationProps {
  creditSimulationRequest: IFormsCreditSimulationRequest;
  handleStepChange: (stepId: number) => void;
}

function CreditSimulationRequestVerification(props: VerificationProps) {
  const { creditSimulationRequest, handleStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap="s300">
      {Object.entries(creditSimulationRequestBoxTitles).map(([key, title]) => (
        <Accordion title={title} key={`${key}-box`}>
          <Stack
            direction="column"
            width="100%"
            alignItems="flex-end"
            gap={isTablet ? "s150" : "s200"}
          >
            <VerificationBoxes
              isTablet={isTablet}
              creditSimulationRequest={creditSimulationRequest}
              stepKey={key}
            />

            <Button
              iconBefore={<MdOutlineArrowBack />}
              onClick={() =>
                handleStepChange(
                  creditSimulationRequestSteps[
                    key as keyof IFormsCreditSimulationRequest
                  ].id
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

export { CreditSimulationRequestVerification };
