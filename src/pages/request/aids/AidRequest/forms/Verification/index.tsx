import { Accordion } from "@design/data/Accordion";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdOutlineArrowBack } from "react-icons/md";
import { aidRequestSteps } from "../../config/assisted";
import { IFormsAidRequest } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";
import { aidRequestBoxTitles } from "./config/box";

interface AidRequestVerificationProps {
  aidRequest: IFormsAidRequest;
  handleStepChange: (stepId: number) => void;
}

function AidRequestVerification(props: AidRequestVerificationProps) {
  const { aidRequest, handleStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap="s300">
      {Object.entries(aidRequestBoxTitles).map(([key, title]) => (
        <Accordion title={title} key={`${key}-box`}>
          <Stack
            direction="column"
            width="100%"
            alignItems="flex-end"
            gap={isTablet ? "s150" : "s200"}
          >
            <VerificationBoxes
              isTablet={isTablet}
              aidRequest={aidRequest}
              stepKey={key as keyof typeof aidRequestBoxTitles}
            />

            <Button
              iconBefore={<MdOutlineArrowBack />}
              onClick={() =>
                handleStepChange(
                  aidRequestSteps[key as keyof IFormsAidRequest].id,
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
