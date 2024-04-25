import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack, MdArrowForward, MdCheckCircle } from "react-icons/md";
import { Spinner } from "../Spinner";
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
  showButtonsLabels?: boolean;
  loading?: boolean;
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
    showButtonsLabels = true,
    loading,
    handlePreviousStep,
    handleNextStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 744px)");
  const isTablet = useMediaQuery("(max-width: 1000px)");

  const barWidth = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <StyledAssistedContainer
      smallScreen={isMobile}
      showButtonsLabels={showButtonsLabels}
    >
      <Stack
        justifyContent="space-between"
        alignItems="center"
        height="inherit"
        gap={isTablet ? inube.spacing.s150 : inube.spacing.s200}
      >
        {!isTablet && showButtonsLabels ? (
          <StyledButton>
            <Button
              variant="none"
              iconBefore={<MdArrowBack size={18} />}
              onClick={handlePreviousStep}
              disabled={loading || currentStepIndex === 0}
              spacing="compact"
            >
              Atrás
            </Button>
          </StyledButton>
        ) : (
          <Icon
            variant="none"
            icon={<MdArrowBack />}
            size="20px"
            spacing="none"
            onClick={handlePreviousStep}
            appearance={loading ? "gray" : "primary"}
            disabled={currentStepIndex === 0}
          />
        )}
        <Stack direction="column" width="100%" gap="s150">
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
            <Text
              type="title"
              size={
                !showButtonsLabels ? "small" : isMobile ? "small" : "medium"
              }
            >
              {currentStepInfo?.name}
            </Text>
          </Stack>
          {showButtonsLabels && !isMobile && (
            <>
              <Stack
                justifyContent="space-between"
                alignItems="center"
                gap="s100"
              >
                <StyledBarContainer
                  smallScreen={isMobile}
                  showButtonsLabels={showButtonsLabels}
                >
                  <StyledBar
                    smallScreen={isMobile}
                    width={barWidth}
                    showButtonsLabels={showButtonsLabels}
                  />
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
        {!isTablet && showButtonsLabels ? (
          <StyledButton>
            <Button
              variant="none"
              iconAfter={<MdArrowForward size={18} />}
              onClick={handleNextStep}
              disabled={disableNextStep}
              spacing="compact"
              load={loading}
            >
              {currentStepIndex === steps.length - 1 ? "Enviar" : "Siguiente"}
            </Button>
          </StyledButton>
        ) : loading ? (
          <Spinner track={false} />
        ) : (
          <Icon
            variant="none"
            icon={<MdArrowForward />}
            size="20px"
            spacing="none"
            onClick={handleNextStep}
            disabled={disableNextStep}
          />
        )}
      </Stack>
      {(!showButtonsLabels || (isMobile && showButtonsLabels)) && (
        <>
          <StyledBarContainer
            smallScreen={isMobile}
            showButtonsLabels={showButtonsLabels}
          >
            <StyledBar
              smallScreen={isMobile}
              width={barWidth}
              showButtonsLabels={showButtonsLabels}
            />
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
