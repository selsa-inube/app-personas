import { IStep } from "./types";
import {
  StyledAssistedContainer,
  StyledCircleId,
  StyledButton,
} from "./styles";
import { Button } from "@design/input/Button";
import { MdArrowBack, MdArrowForward, MdCheckCircle } from "react-icons/md";
import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import { inube } from "@design/tokens";
import { Step } from "./Step";
import { useMediaQuery } from "@hooks/useMediaQuery";

interface AssistedUIProps {
  steps: IStep[];
  currentStep: number;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
  currentStepInfo?: IStep;
  lastStep: number;
}

const renderSteps = (
  steps: IStep[],
  currentStep: number,
  lastStep: number,
  smallScreen: boolean
) => (
  <Stack justifyContent="center" width="100%">
    {steps.map((step) => (
      <Step
        key={step.id}
        stepNumber={step.id}
        lastStep={lastStep}
        currentStep={currentStep}
        smallScreen={smallScreen}
      />
    ))}
  </Stack>
);

function AssistedUI(props: AssistedUIProps) {
  const {
    steps,
    currentStep,
    handlePreviousStep,
    handleNextStep,
    currentStepInfo,
    lastStep,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 744px)");

  return (
    <StyledAssistedContainer smallScreen={smallScreen}>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        height="inherit"
      >
        <StyledButton smallScreen={smallScreen}>
          <Button
            variant="none"
            iconBefore={<MdArrowBack size={18} />}
            handleClick={handlePreviousStep}
            disabled={currentStep === steps[0].id}
          >
            {!smallScreen && "Atrás"}
          </Button>
        </StyledButton>
        <Stack
          direction="column"
          width="100%"
          gap="s150"
          padding={`0 ${smallScreen ? inube.spacing.s150 : inube.spacing.s200}`}
        >
          <Stack gap="s100" alignItems="center">
            <StyledCircleId>
              <Text
                type="label"
                size="medium"
                appearance="information"
                margin="auto"
              >
                {currentStep === lastStep ? (
                  <MdCheckCircle size={17} />
                ) : (
                  currentStep
                )}
              </Text>
            </StyledCircleId>
            <Text type="title" size={smallScreen ? "small" : "medium"}>
              {currentStepInfo?.stepName}
            </Text>
          </Stack>
          {!smallScreen && (
            <>
              <Stack
                justifyContent="space-between"
                alignItems="center"
                gap="s100"
              >
                {renderSteps(steps, currentStep, lastStep, smallScreen)}
                <Text type="label" size="small">
                  {currentStep}/{lastStep}
                </Text>
              </Stack>
              <Text type="label" size="medium" appearance="gray">
                {currentStepInfo?.stepDescription}
              </Text>
            </>
          )}
        </Stack>
        <StyledButton smallScreen={smallScreen}>
          <Button
            variant="none"
            iconAfter={<MdArrowForward size={18} />}
            handleClick={handleNextStep}
          >
            {!smallScreen && "Siguiente"}
          </Button>
        </StyledButton>
      </Stack>
      {smallScreen && (
        <>
          {renderSteps(steps, currentStep, lastStep, smallScreen)}
          <Text type="label" size="small" appearance="gray">
            {currentStepInfo?.stepDescription}
          </Text>
        </>
      )}
    </StyledAssistedContainer>
  );
}

export { AssistedUI };
