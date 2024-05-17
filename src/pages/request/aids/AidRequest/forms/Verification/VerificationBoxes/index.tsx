import { IFormsAidRequest } from "../../../types";
import { aidRequestBoxTitles } from "../config/box";

const renderBeneficiariesVerification = () => {
  return <></>;
};

const renderAmountVerification = () => {
  return <></>;
};

const renderDetailsSituationVerification = () => {
  return <></>;
};

const renderRegulationValidationsVerification = () => {
  return <></>;
};

const renderDocumentaryRequirementsVerification = () => {
  return <></>;
};

const renderDisbursementVerification = () => {
  return <></>;
};

interface VerificationBoxesProps {
  aidRequest: IFormsAidRequest;
  stepKey: keyof typeof aidRequestBoxTitles;
  isTablet: boolean;
}

function VerificationBoxes(props: VerificationBoxesProps) {
  const { stepKey } = props;
  return (
    <>
      {stepKey === "beneficiaries" && renderBeneficiariesVerification()}

      {stepKey === "amount" && renderAmountVerification()}

      {stepKey === "detailsSituation" && renderDetailsSituationVerification()}

      {stepKey === "regulationValidations" &&
        renderRegulationValidationsVerification()}

      {stepKey === "documentaryRequirements" &&
        renderDocumentaryRequirementsVerification()}

      {stepKey === "disbursement" && renderDisbursementVerification()}
    </>
  );
}

export { VerificationBoxes };
