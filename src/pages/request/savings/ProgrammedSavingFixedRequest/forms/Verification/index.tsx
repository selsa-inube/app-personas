import { Accordion } from "@design/data/Accordion";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { MdOutlineArrowBack } from "react-icons/md";
import { programmedSavingFixedRequestSteps } from "../../config/assisted";
import { IFormsProgrammedSavingFixedRequest } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";
import { programmedSavingFixedRequestBoxTitles } from "./config/box";

interface VerificationProps {
  programmedSavingFixedRequest: IFormsProgrammedSavingFixedRequest;
  handleStepChange: (stepId: number) => void;
}

function ProgrammedSavingFixedRequestVerification(props: VerificationProps) {
  const { programmedSavingFixedRequest, handleStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {Object.entries(programmedSavingFixedRequestBoxTitles).map(
        ([key, title]) => (
          <Accordion title={title} key={`${key}-box`}>
            <Stack
              direction="column"
              width="100%"
              alignItems="flex-end"
              gap={isTablet ? inube.spacing.s150 : inube.spacing.s200}
            >
              <VerificationBoxes
                isTablet={isTablet}
                programmedSavingFixedRequest={programmedSavingFixedRequest}
                stepKey={key as keyof IFormsProgrammedSavingFixedRequest}
              />

              <Button
                iconBefore={<MdOutlineArrowBack />}
                onClick={() =>
                  handleStepChange(
                    programmedSavingFixedRequestSteps[
                      key as keyof IFormsProgrammedSavingFixedRequest
                    ].id,
                  )
                }
                variant="none"
                appearance="dark"
              >
                Regresar a este paso
              </Button>
            </Stack>
          </Accordion>
        ),
      )}
    </Stack>
  );
}

export { ProgrammedSavingFixedRequestVerification };
