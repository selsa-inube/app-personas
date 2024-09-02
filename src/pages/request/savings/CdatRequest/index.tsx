import { usersMock } from "@mocks/users/users.mocks";
import { FormikProps } from "formik";
import { useContext, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { mapContactChannels } from "src/shared/forms/ContactChannelsForm/mappers";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { cdatRequestSteps } from "./config/assisted";
import { initalValuesCDAT } from "./config/initialValues";
import { mapSystemValidations } from "./config/mappers";
import { IConditionsEntry } from "./forms/ConditionsForm/types";
import { IInvestmentEntry } from "./forms/InvestmentForm/types";
import { IInvestmentNameEntry } from "./forms/InvestmentNameForm/types";
import { IPaymentMethodEntry } from "./forms/PaymentMethodForm/types";
import { IRefundEntry } from "./forms/RefundForm/types";
import { ISystemValidationsEntry } from "./forms/SystemValidationsForm/types";
import { CdatRequestUI } from "./interface";
import { IFormsCdatRequest, IFormsCdatRequestRefs } from "./types";
import { cdatStepsRules } from "./utils";

function CdatRequest() {
  const [currentStep, setCurrentStep] = useState(
    cdatRequestSteps.investment.id,
  );
  const steps = Object.values(cdatRequestSteps);

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const { getFlag } = useContext(AppContext);

  const [cdatRequest, setCdatRequest] = useState<IFormsCdatRequest>({
    investment: {
      isValid: false,
      values: {},
    },
    conditions: {
      isValid: false,
      values: initalValuesCDAT.conditions,
    },
    paymentMethod: {
      isValid: false,
      values: initalValuesCDAT.paymentMethod,
    },
    refund: {
      isValid: false,
      values: initalValuesCDAT.refund,
    },
    systemValidations: {
      isValid: false,
      values: mapSystemValidations(),
    },
    investmentName: {
      isValid: false,
      values: initalValuesCDAT.investmentName,
    },
    contactChannels: {
      isValid: false,
      values: mapContactChannels(usersMock[0].contact[0]),
    },
    comments: {
      isValid: true,
      values: initalValuesCDAT.comments,
    },
  });

  const investmentRef = useRef<FormikProps<IInvestmentEntry>>(null);
  const conditionsRef = useRef<FormikProps<IConditionsEntry>>(null);
  const paymentMethodRef = useRef<FormikProps<IPaymentMethodEntry>>(null);
  const refundRef = useRef<FormikProps<IRefundEntry>>(null);
  const systemValidationsRef =
    useRef<FormikProps<ISystemValidationsEntry>>(null);
  const investmentNameRef = useRef<FormikProps<IInvestmentNameEntry>>(null);
  const contactChannelsRef = useRef<FormikProps<IContactChannelsEntry>>(null);
  const commentsRef = useRef<FormikProps<ICommentsEntry>>(null);

  const formReferences: IFormsCdatRequestRefs = {
    investment: investmentRef,
    conditions: conditionsRef,
    paymentMethod: paymentMethodRef,
    refund: refundRef,
    systemValidations: systemValidationsRef,
    investmentName: investmentNameRef,
    contactChannels: contactChannelsRef,
    comments: commentsRef,
  };

  const handleStepChange = (stepId: number) => {
    const newCdatRequest = cdatStepsRules(
      currentStep,
      cdatRequest,
      formReferences,
      isCurrentFormValid,
    );
    setCdatRequest(newCdatRequest);

    const changeStepKey = Object.entries(cdatRequestSteps).find(
      ([, config]) => config.id === stepId,
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newCdatRequest[changeStepKey as keyof IFormsCdatRequest]?.isValid ||
        false,
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {
    return true;
  };

  const handleNextStep = () => {
    if (currentStep + 1 <= steps.length) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    console.log("aca");
    console.log(currentStep);
    handleStepChange(currentStep - 1);
  };

  if (!getFlag("admin.savings.savings.request-saving").value) {
    return <Navigate to="/" />;
  }

  return (
    <CdatRequestUI
      currentStep={currentStep}
      steps={steps}
      isCurrentFormValid={isCurrentFormValid}
      cdatRequest={cdatRequest}
      formReferences={formReferences}
      handleFinishAssisted={handleFinishAssisted}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { CdatRequest };
