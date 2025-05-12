import { Accordion } from "@design/data/Accordion";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Stack } from "@inubekit/inubekit";
import { MdOutlineArrowBack } from "react-icons/md";
import { registerInEventSteps } from "../../config/assisted";
import { IFormsRegisterInEvent } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";

interface VerificationProps {
  registerInEvent: IFormsRegisterInEvent;
  onStepChange: (stepId: number) => void;
}

function RegisterInEventVerification(props: VerificationProps) {
  const { registerInEvent, onStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {Object.entries(registerInEventSteps)
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
                registerInEvent={registerInEvent}
                stepKey={key as keyof typeof registerInEventSteps}
              />

              <Button
                iconBefore={<MdOutlineArrowBack />}
                onClick={() =>
                  onStepChange(
                    registerInEventSteps[
                      key as keyof IFormsRegisterInEvent
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

export { RegisterInEventVerification };
