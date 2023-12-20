import { FormikProps } from "formik";
import { useRef, useState } from "react";
import { cdatRequestSteps, cdatStepsRules } from "./config/assisted";
import { initalValuesCDAT } from "./config/initialValues";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";
import { CdatRequestUI } from "./interface";
import { IFormsCdatRequest, IFormsCdatRequestRefs } from "./types";

function CdatRequest() {
  const [currentStep, setCurrentStep] = useState(
    cdatRequestSteps.investment.id
  );
  const steps = Object.values(cdatRequestSteps);

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const [cdatRequest, setCdatRequest] = useState<IFormsCdatRequest>({
    investment: {
      isValid: false,
      values: initalValuesCDAT.investment,
    },
  });

  const investmentRef = useRef<FormikProps<IInvestmentEntry>>(null);

  const formReferences: IFormsCdatRequestRefs = {
    investment: investmentRef,
  };

  const handleStepChange = (stepId: number) => {
    const newCdatRequest = cdatStepsRules(
      currentStep,
      cdatRequest,
      formReferences,
      isCurrentFormValid
    );
    setCdatRequest(newCdatRequest);

    const changeStepKey = Object.entries(cdatRequestSteps).find(
      ([, config]) => config.id === stepId
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newCdatRequest[changeStepKey as keyof IFormsCdatRequest]?.isValid ||
        false
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {};

  const handleNextStep = () => {
    if (currentStep + 1 <= steps.length) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    handleStepChange(currentStep - 1);
  };

  return (
    <CdatRequestUI
      cdatRequest={cdatRequest}
      currentStep={currentStep}
      formReferences={formReferences}
      handleFinishAssisted={handleFinishAssisted}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleStepChange={handleStepChange}
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { CdatRequest };
