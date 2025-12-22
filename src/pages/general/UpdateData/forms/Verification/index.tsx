import { Accordion } from "@design/data/Accordion";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, IAssistedStep, Message, Stack } from "@inubekit/inubekit";
import { useEffect, useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { updateDataSteps } from "../../config/assisted";
import { IFormsUpdateData } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";

interface VerificationProps {
  updatedData: IFormsUpdateData;
  steps: Record<string, IAssistedStep>;
  handleStepChange: (stepId: number) => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdateDataVerification(props: VerificationProps) {
  const { updatedData, steps, handleStepChange, onFormValid } = props;

  const [changedSteps, setChangedSteps] = useState<IAssistedStep[]>([]);
  const [changedUpdateData, setChangedUpdateData] =
    useState<IFormsUpdateData>(updatedData);

  const isTablet = useMediaQuery("(max-width: 1224px)");

  const validateChanges = () => {
    const updatedForms: Partial<IFormsUpdateData> = {};
    const changedSteps: IAssistedStep[] = [];

    Object.entries(updatedData).forEach(([key, form]) => {
      const { values } = form as {
        isValid: boolean;
        values: Record<string, unknown>;
      };

      if (!values) return;

      const hasCurrentData = Boolean(values.currentData);
      const hasEntries = Array.isArray(values.entries) && values.entries.length > 0;

      if (!hasCurrentData && !hasEntries) return;

      const changedValues = Object.keys(values).reduce(
        (acc, prop) => {
          if (prop !== "currentData") {
            if (!hasCurrentData) {
              if (prop === "entries" && Array.isArray(values[prop]) && values[prop].length > 0) {
                acc[prop] = values[prop];
              }
            } else if (
              JSON.stringify(values[prop]) !==
              JSON.stringify((values.currentData as Record<string, unknown>)[prop])
            ) {
              acc[prop] = values[prop];
            }
          }
          return acc;
        },
        {} as Record<string, unknown>,
      );

      if (Object.keys(changedValues).length > 0) {
        updatedForms[key as keyof IFormsUpdateData] = {
          ...form,
          values: changedValues,
        };
        if (steps[key]) {
          changedSteps.push(steps[key]);
        }
      }
    });
    setChangedUpdateData(updatedForms as IFormsUpdateData);
    setChangedSteps(changedSteps);

    if (onFormValid) {
      onFormValid(changedSteps.length > 0);
    }
  };

  useEffect(() => {
    validateChanges();
  }, []);

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {changedSteps.length > 0 ? (
        <>
          <Message
            title="Confirma que estos son los cambios que deseas guardar."
            appearance="help"
          />
          {changedSteps
            .filter((step) => step.id !== "verification")
            .map((step) => (
              <Accordion title={step.name} key={`${step.id}-box`}>
                <Stack
                  direction="column"
                  width="100%"
                  alignItems="flex-end"
                  gap={isTablet ? inube.spacing.s150 : inube.spacing.s200}
                >
                  <VerificationBoxes
                    isTablet={isTablet}
                    updatedData={changedUpdateData}
                    stepKey={step.id as keyof typeof updateDataSteps}
                  />

                  <Button
                    iconBefore={<MdOutlineArrowBack />}
                    onClick={() =>
                      handleStepChange(
                        updateDataSteps[step.id as keyof IFormsUpdateData]
                          .number,
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
        </>
      ) : (
        <Message
          title="No has realizado cambios en tus datos. Al enviar la solicitud confirmas que la información sigue siendo cierta."
          appearance="warning"
        />
      )}
    </Stack>
  );
}

export { UpdateDataVerification };
