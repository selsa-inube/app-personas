import { Accordion } from "@design/data/Accordion";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { MdOutlineArrowBack } from "react-icons/md";
import { cdatRequestSteps } from "../../config/assisted";
import { IFormsCdatRequest } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";

interface VerificationProps {
  cdatRequest: IFormsCdatRequest;
  handleStepChange: (stepId: number) => void;
}

function CdatRequestVerification(props: VerificationProps) {
  const { cdatRequest, handleStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {Object.entries(cdatRequestSteps)
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
                cdatRequest={cdatRequest}
                stepKey={key as keyof typeof cdatRequestSteps}
              />

              <Button
                iconBefore={<MdOutlineArrowBack />}
                onClick={() =>
                  handleStepChange(
                    cdatRequestSteps[key as keyof IFormsCdatRequest].number,
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

export { CdatRequestVerification };
