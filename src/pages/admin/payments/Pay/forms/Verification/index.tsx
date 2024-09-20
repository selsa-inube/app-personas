import { Accordion } from "@design/data/Accordion";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdOutlineArrowBack } from "react-icons/md";
import { paySteps } from "../../config/assisted";
import { IFormsPay } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";
import { payBoxTitles } from "./config/box";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";
import { Button } from "@inubekit/button";

interface PayVerificationProps {
  pay: IFormsPay;
  handleStepChange: (stepId: number) => void;
}

function PayVerification(props: PayVerificationProps) {
  const { pay, handleStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {Object.entries(payBoxTitles).map(([key, title]) => (
        <Accordion title={title} key={`${key}-box`}>
          <Stack
            direction="column"
            width="100%"
            alignItems="flex-end"
            gap={isTablet ? inube.spacing.s150 : inube.spacing.s200}
          >
            <VerificationBoxes
              isTablet={isTablet}
              pay={pay}
              stepKey={key as keyof typeof payBoxTitles}
            />

            <Button
              iconBefore={<MdOutlineArrowBack />}
              onClick={() =>
                handleStepChange(paySteps[key as keyof IFormsPay].number - 1)
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
