import { Accordion } from "@design/data/Accordion";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { MdOutlineArrowBack } from "react-icons/md";
import { creditDestinationRequestSteps } from "../../config/assisted";
import { IFormsCreditDestinationRequest } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";

interface VerificationProps {
  creditDestinationRequest: IFormsCreditDestinationRequest;
  onStepChange: (stepId: number) => void;
}

function CreditDestinationRequestVerification(props: VerificationProps) {
  const { creditDestinationRequest, onStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {Object.entries(creditDestinationRequestSteps)
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
                creditDestinationRequest={creditDestinationRequest}
                stepKey={key as keyof typeof creditDestinationRequestSteps}
              />

              <Button
                iconBefore={<MdOutlineArrowBack />}
                onClick={() =>
                  onStepChange(
                    creditDestinationRequestSteps[
                      key as keyof IFormsCreditDestinationRequest
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

export { CreditDestinationRequestVerification };
