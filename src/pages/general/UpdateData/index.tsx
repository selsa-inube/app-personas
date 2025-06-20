import { mapComments } from "@forms/CommentsForm/mappers";
import { useAuth } from "@inube/auth";
import { useFlag } from "@inubekit/inubekit";
import { usersMock } from "@mocks/users/users.mocks";
import { FormikProps } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useBlocker, useNavigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { updateDataSteps } from "./config/assisted";
import {
  mapBankTransfers,
  mapContactData,
  mapEconomicActivity,
  mapExpenses,
  mapFamilyGroups,
  mapFinancialOperations,
  mapIncomes,
  mapPersonalInformation,
  mapPersonalResidence,
  mapRelationshipWithDirectors,
  mapSocioeconomicInformation,
} from "./config/mappers";
import { IBankTransfersEntry } from "./forms/BankTransfersForm/types";
import { IBeneficiariesEntry } from "./forms/BeneficiariesForm/types";
import { IContactDataEntry } from "./forms/ContactDataForm/types";
import { IEconomicActivityEntry } from "./forms/EconomicActivityForm/types";
import { IExpensesEntry } from "./forms/ExpensesForm/types";
import { IFamilyGroupEntries } from "./forms/FamilyGroupForm/types";
import { IFinancialOperationsEntry } from "./forms/FinancialOperationsForm/types";
import { IIncomesEntry } from "./forms/IncomesForm/types";
import { IPersonalAssetEntries } from "./forms/PersonalAssetsForm/types";
import { IPersonalDebtEntries } from "./forms/PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";
import { IPersonalReferenceEntries } from "./forms/PersonalReferencesForm/types";
import { IPersonalResidenceEntry } from "./forms/PersonalResidenceForm/types";
import { IRelationshipWithDirectorsEntry } from "./forms/RelationshipWithDirectorsForm/types";
import { ISocioeconomicInformationEntry } from "./forms/SocioeconomicInformationForm/types";
import { UpdateDataUI } from "./interface";
import { IFormsUpdateData, IFormsUpdateDataRefs } from "./types";
import { sendUpdateDataRequest, updateDataStepsRules } from "./utils";

function UpdateData() {
  const [currentStep, setCurrentStep] = useState(
    updateDataSteps.personalInformation.number,
  );

  const filteredSteps = Object.fromEntries(
    Object.entries(updateDataSteps)
      .filter(([, value]) => value.show)
      .sort((a, b) => a[1].number - b[1].number)
      .map(([key, value], index) => [key, { ...value, number: index + 1 }]),
  );

  const steps = Object.values(filteredSteps);

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
  const { user, getFlag } = useContext(AppContext);
  const { serviceDomains, loadServiceDomains } = useContext(AppContext);
  const { accessToken } = useAuth();
  const [loadingSend, setLoadingSend] = useState(false);
  const [redirectModal, setRedirectModal] = useState(false);
  const navigate = useNavigate();
  const { addFlag } = useFlag();

  const [updateData, setUpdateData] = useState<IFormsUpdateData>({
    personalInformation: {
      isValid: true,
      values: mapPersonalInformation(user),
    },
    contactData: {
      isValid: true,
      values: mapContactData(user),
    },
    bankTransfers: {
      isValid: true,
      values: mapBankTransfers(user),
    },
    financialOperations: {
      isValid: true,
      values: mapFinancialOperations(user),
    },
    familyGroup: {
      isValid: true,
      values: { entries: mapFamilyGroups(usersMock[0].familyGroup || []) },
    },
    beneficiaries: {
      isValid: true,
      values: {
        beneficiaries: [],
        totalPercentage: 0,
      },
    },
    personalAssets: { isValid: true, values: { entries: [] } },
    personalDebts: { isValid: true, values: { entries: [] } },
    personalReferences: { isValid: true, values: { entries: [] } },
    personalResidence: {
      isValid: true,
      values: mapPersonalResidence(usersMock[0].personalData.residence),
    },
    socioeconomicInformation: {
      isValid: true,
      values: mapSocioeconomicInformation(),
    },
    economicActivity: {
      isValid: true,
      values: mapEconomicActivity(usersMock[0].economicActivity),
    },
    income: {
      isValid: true,
      values: mapIncomes(),
    },
    expenses: { isValid: true, values: mapExpenses() },
    relationshipWithDirectors: {
      isValid: true,
      values: mapRelationshipWithDirectors(
        usersMock[0].relationshipWithDirectors,
      ),
    },
    comments: { isValid: true, values: mapComments() },
  });

  const personalInfoRef = useRef<FormikProps<IPersonalInformationEntry>>(null);
  const contactDataRef = useRef<FormikProps<IContactDataEntry>>(null);
  const familyGroupRef = useRef<FormikProps<IFamilyGroupEntries>>(null);
  const beneficiariesRef = useRef<FormikProps<IBeneficiariesEntry>>(null);
  const bankTransfersRef = useRef<FormikProps<IBankTransfersEntry>>(null);
  const personalAssetsRef = useRef<FormikProps<IPersonalAssetEntries>>(null);
  const personalDebtsRef = useRef<FormikProps<IPersonalDebtEntries>>(null);
  const personalReferencesRef =
    useRef<FormikProps<IPersonalReferenceEntries>>(null);
  const financialOperationsRef =
    useRef<FormikProps<IFinancialOperationsEntry>>(null);
  const personalResidenceRef =
    useRef<FormikProps<IPersonalResidenceEntry>>(null);
  const socioeconomicsRef =
    useRef<FormikProps<ISocioeconomicInformationEntry>>(null);
  const economicActivityRef = useRef<FormikProps<IEconomicActivityEntry>>(null);
  const incomeRef = useRef<FormikProps<IIncomesEntry>>(null);
  const expensesRef = useRef<FormikProps<IExpensesEntry>>(null);
  const relationshipWithDirectorsRef =
    useRef<FormikProps<IRelationshipWithDirectorsEntry>>(null);
  const commentsRef = useRef<FormikProps<ICommentsEntry>>(null);

  const formReferences: IFormsUpdateDataRefs = {
    personalInformation: personalInfoRef,
    contactData: contactDataRef,
    familyGroup: familyGroupRef,
    beneficiaries: beneficiariesRef,
    bankTransfers: bankTransfersRef,
    personalAssets: personalAssetsRef,
    personalDebts: personalDebtsRef,
    personalReferences: personalReferencesRef,
    financialOperations: financialOperationsRef,
    personalResidence: personalResidenceRef,
    socioeconomicInformation: socioeconomicsRef,
    economicActivity: economicActivityRef,
    income: incomeRef,
    expenses: expensesRef,
    relationshipWithDirectors: relationshipWithDirectorsRef,
    comments: commentsRef,
  };

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname &&
      !nextLocation.search.includes("?success_request=true"),
  );

  const validateEnums = async () => {
    if (!accessToken) return;

    if (serviceDomains.integratedbanks.length > 0) return;

    loadServiceDomains(
      [
        "integratedbanks",
        "identificationtype",
        "gender",
        "civilstatus",
        "countries",
        "departments",
        "cities",
        "rhfactor",
      ],
      accessToken,
    );
  };

  useEffect(() => {
    validateEnums();
  }, [accessToken]);

  const handleStepChange = (stepId: number) => {
    const newUpdateData = updateDataStepsRules(
      currentStep,
      updateData,
      formReferences,
      isCurrentFormValid,
    );

    setUpdateData(newUpdateData);

    const changeStepKey = Object.entries(updateDataSteps).find(
      ([, config]) => config.number === stepId,
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;
    setIsCurrentFormValid(
      changeIsVerification ||
        newUpdateData[changeStepKey as keyof IFormsUpdateData]?.isValid ||
        false,
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleFinishAssisted = () => {
    if (!accessToken || !user) return;

    setLoadingSend(true);
    sendUpdateDataRequest(user, updateData, serviceDomains, accessToken)
      .then(() => {
        setLoadingSend(false);
        setRedirectModal(true);
      })
      .catch(() => {
        addFlag({
          title: "Ups, algo ha salido mal!",
          description:
            "Hemos presentado problemas procesando tu solicitud en este momento. Por favor, intenta nuevamente.",
          appearance: "danger",
          duration: 5000,
        });

        setLoadingSend(false);
      });
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      handleStepChange(currentStep + 1);
      return;
    }
    handleFinishAssisted();
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
  };

  const handleRedirectToHome = () => {
    navigate("/?success_request=true");
  };

  const handleRedirectToRequests = () => {
    navigate("/my-requests?success_request=true");
  };

  if (!getFlag("general.links.update-data.update-data-with-assisted").value) {
    return <Navigate to="/" />;
  }

  return (
    <UpdateDataUI
      currentStep={currentStep}
      formReferences={formReferences}
      updateData={updateData}
      steps={steps}
      filteredSteps={filteredSteps}
      isCurrentFormValid={isCurrentFormValid}
      blocker={blocker}
      loadingSend={loadingSend}
      redirectModal={redirectModal}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
      handleStepChange={handleStepChange}
      setIsCurrentFormValid={setIsCurrentFormValid}
      onRedirectToHome={handleRedirectToHome}
      onRedirectToRequests={handleRedirectToRequests}
    />
  );
}

export { UpdateData };
