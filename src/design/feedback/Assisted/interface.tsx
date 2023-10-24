import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack, MdArrowForward, MdCheckCircle } from "react-icons/md";
import {
  StyledAssistedContainer,
  StyledBar,
  StyledBarContainer,
  StyledButton,
  StyledCircleId,
} from "./styles";
import { IStep } from "./types";

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

  const barWidth = ((currentStepIndex + 1) / steps.length) * 100;

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
                <StyledBarContainer smallScreen={smallScreen}>
                  <StyledBar smallScreen={smallScreen} width={barWidth} />
                </StyledBarContainer>
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
            {!smallScreen && currentStepIndex === steps.length - 1
              ? "Enviar"
              : "Siguiente"}
          </Button>
        </StyledButton>
      </Stack>
      {smallScreen && (
        <>
          <StyledBarContainer smallScreen={smallScreen}>
            <StyledBar smallScreen={smallScreen} width={barWidth} />
          </StyledBarContainer>
          <Text type="label" size="small" appearance="gray">
            {currentStepInfo?.description}
          </Text>
        </>
      )}
    </StyledAssistedContainer>
  );
}

export { AssistedUI };
