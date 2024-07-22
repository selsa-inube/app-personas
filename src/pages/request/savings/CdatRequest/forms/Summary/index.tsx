import { Accordion } from "@design/data/Accordion";
import { Button } from "@design/input/Button";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdOutlineArrowBack } from "react-icons/md";
import { cdatRequestSteps } from "../../config/assisted";
import { IFormsCdatRequest } from "../../types";
import { SummaryBoxes } from "./SummaryBoxes";
import { cdatRequestBoxTitles } from "./config/box";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";

interface SummaryProps {
  cdatRequest: IFormsCdatRequest;
  handleStepChange: (stepId: number) => void;
}

function CdatRequestSummary(props: SummaryProps) {
  const { cdatRequest, handleStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {Object.entries(cdatRequestBoxTitles).map(([key, title]) => (
        <Accordion title={title} key={`${key}-box`}>
          <Stack
            direction="column"
            width="100%"
            alignItems="flex-end"
            gap={isTablet ? inube.spacing.s150 : inube.spacing.s200}
          >
            <SummaryBoxes
              isTablet={isTablet}
              cdatRequest={cdatRequest}
              stepKey={key}
            />

            <Button
              iconBefore={<MdOutlineArrowBack />}
              onClick={() =>
                handleStepChange(
                  cdatRequestSteps[key as keyof IFormsCdatRequest].id,
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

export { CdatRequestSummary };
