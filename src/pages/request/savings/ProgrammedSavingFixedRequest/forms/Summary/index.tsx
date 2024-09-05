import { Accordion } from "@design/data/Accordion";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdOutlineArrowBack } from "react-icons/md";
import { programmedSavingFixedRequestSteps } from "../../config/assisted";
import { IFormsProgrammedSavingFixedRequest } from "../../types";
import { SummaryBoxes } from "./SummaryBoxes";
import { programmedSavingFixedRequestBoxTitles } from "./config/box";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";
import { Button } from "@inubekit/button";

interface SummaryProps {
  programmedSavingFixedRequest: IFormsProgrammedSavingFixedRequest;
  handleStepChange: (stepId: number) => void;
}

function ProgrammedSavingFixedRequestSummary(props: SummaryProps) {
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
              <SummaryBoxes
                isTablet={isTablet}
                programmedSavingFixedRequest={programmedSavingFixedRequest}
                stepKey={key}
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

export { ProgrammedSavingFixedRequestSummary };
