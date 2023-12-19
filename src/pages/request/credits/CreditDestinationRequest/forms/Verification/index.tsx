import { Accordion } from "@design/data/Accordion";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdOutlineArrowBack } from "react-icons/md";
import { creditDestinationRequestSteps } from "../../config/assisted";
import { IFormsCreditDestinationRequest } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";
import { creditDestinationRequestBoxTitles } from "./config/box";

interface VerificationProps {
  creditDestinationRequest: IFormsCreditDestinationRequest;
  handleStepChange: (stepId: number) => void;
}

function CreditDestinationRequestVerification(props: VerificationProps) {
  const { creditDestinationRequest, handleStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap="s300">
      {Object.entries(creditDestinationRequestBoxTitles).map(([key, title]) => (
        <Accordion title={title} key={`${key}-box`}>
          <Stack
            direction="column"
            width="100%"
            alignItems="flex-end"
            gap={isTablet ? "s150" : "s200"}
          >
            <VerificationBoxes
              isTablet={isTablet}
              creditDestinationRequest={creditDestinationRequest}
              stepKey={key}
            />

            <Button
              iconBefore={<MdOutlineArrowBack />}
              onClick={() =>
                handleStepChange(
                  creditDestinationRequestSteps[
                    key as keyof IFormsCreditDestinationRequest
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

export { CreditDestinationRequestVerification };
