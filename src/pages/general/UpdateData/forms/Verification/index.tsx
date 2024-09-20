import { Accordion } from "@design/data/Accordion";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdOutlineArrowBack } from "react-icons/md";
import { updateDataSteps } from "../../config/assisted";
import { IFormsUpdateData } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";
import { updateDataBoxTitles } from "./config/box";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";
import { Button } from "@inubekit/button";

interface VerificationProps {
  updatedData: IFormsUpdateData;
  handleStepChange: (stepId: number) => void;
}

function UpdateDataVerification(props: VerificationProps) {
  const { updatedData, handleStepChange } = props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {Object.entries(updateDataBoxTitles).map(([key, title]) => (
        <Accordion title={title} key={`${key}-box`}>
          <Stack
            direction="column"
            width="100%"
            alignItems="flex-end"
            gap={isTablet ? inube.spacing.s150 : inube.spacing.s200}
          >
            <VerificationBoxes
              isTablet={isTablet}
              updatedData={updatedData}
              stepKey={key}
            />

            <Button
              iconBefore={<MdOutlineArrowBack />}
              onClick={() =>
                handleStepChange(
                  updateDataSteps[key as keyof IFormsUpdateData].number - 1,
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

export { UpdateDataVerification };
