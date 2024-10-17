import { Accordion } from "@design/data/Accordion";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { MdOutlineArrowBack } from "react-icons/md";
import { paySteps } from "../../config/assisted";
import { IFormsPay } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";

interface PayVerificationProps {
  pay: IFormsPay;
  handleStepChange: (stepId: number) => void;
}

function PayVerification(props: PayVerificationProps) {
  const { pay, handleStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {Object.entries(paySteps)
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
                pay={pay}
                stepKey={key as keyof typeof paySteps}
              />

              <Button
                iconBefore={<MdOutlineArrowBack />}
                onClick={() =>
                  handleStepChange(paySteps[key as keyof IFormsPay].number)
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

export { PayVerification };
