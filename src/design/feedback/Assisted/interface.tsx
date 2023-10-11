import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack, MdArrowForward, MdCheckCircle } from "react-icons/md";
import { Step } from "./Step";
import {
  StyledAssistedContainer,
  StyledButton,
  StyledCircleId,
} from "./styles";
import { IStep } from "./types";

const renderSteps = (
  steps: IStep[],
  currentStepIndex: number,
  lastStepIndex: number,
  smallScreen: boolean
) => (
  <Stack justifyContent="center" width="100%">
    {steps.map((step, stepIndex) => (
      <Step
        key={step.id}
        stepNumber={stepIndex}
        lastStepIndex={lastStepIndex}
        currentStepIndex={currentStepIndex}
        smallScreen={smallScreen}
      />
    ))}
  </Stack>
);

interface AssistedUIProps {
  steps: IStep[];
  currentStepIndex: number;
  lastStepIndex: number;
  currentStepInfo?: IStep;
  disableNextStep?: boolean;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

function AssistedUI(props: AssistedUIProps) {
  const {
    steps,
    currentStepIndex,
    lastStepIndex,
    currentStepInfo,
    disableNextStep,
    handlePreviousStep,
    handleNextStep,
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
            disabled={currentStepIndex === 0}
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
                {currentStepIndex === lastStepIndex ? (
                  <MdCheckCircle size={17} />
                ) : (
                  currentStepIndex + 1
                )}
              </Text>
            </StyledCircleId>
            <Text type="title" size={smallScreen ? "small" : "medium"}>
              {currentStepInfo?.name}
            </Text>
          </Stack>
          {!smallScreen && (
            <>
              <Stack
                justifyContent="space-between"
                alignItems="center"
                gap="s100"
              >
                {renderSteps(
                  steps,
                  currentStepIndex,
                  lastStepIndex,
                  smallScreen
                )}
                <Text type="label" size="small">
                  {currentStepIndex + 1}/{steps.length}
                </Text>
              </Stack>
              <Text type="label" size="medium" appearance="gray">
                {currentStepInfo?.description}
              </Text>
            </>
          )}
        </Stack>
        <StyledButton smallScreen={smallScreen}>
          <Button
            variant="none"
            iconAfter={<MdArrowForward size={18} />}
            handleClick={handleNextStep}
            disabled={disableNextStep}
          >
            {!smallScreen && "Siguiente"}
          </Button>
        </StyledButton>
      </Stack>
      {smallScreen && (
        <>
          {renderSteps(steps, currentStepIndex, lastStepIndex, smallScreen)}
          <Text type="label" size="small" appearance="gray">
            {currentStepInfo?.description}
          </Text>
        </>
      )}
    </StyledAssistedContainer>
  );
}

export { AssistedUI };
