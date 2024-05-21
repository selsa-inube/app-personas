import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Icon } from "@design/data/Icon";
import { Grid } from "@design/layout/Grid";
import { MdOutlineCheckCircle, MdOutlineHighlightOff } from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import { IFormsAidRequest } from "../../../types";
import { IAmountEntry } from "../../AmountForm/types";
import { IBeneficiariesEntry } from "../../BeneficiariesForm/types";
import { IRegulationValidationsEntry } from "../../RegulationValidationsForm/types";
import { aidRequestBoxTitles } from "../config/box";

const renderBeneficiariesVerification = (
  values: IBeneficiariesEntry,
  isTablet: boolean,
) => {
  const selectedBeneficiary = values.beneficiaries.find(
    (beneficiary) => beneficiary.selected,
  );
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      width="100%"
      gap="s100"
    >
      <BoxAttribute label="Nombre:" value={selectedBeneficiary?.name} />
      <BoxAttribute
        label="Identificación:"
        value={`${selectedBeneficiary?.identificationType} ${selectedBeneficiary?.identificationNumber}`}
      />
      <BoxAttribute
        label="Tipo:"
        value={selectedBeneficiary?.relationship.value}
      />
    </Grid>
  );
};

const renderAmountVerification = (values: IAmountEntry) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" width="100%" gap="s100">
      <BoxAttribute
        label="Valor de la solicitud:"
        value={currencyFormat(values.applicationValue)}
      />
    </Grid>
  );
};

const renderDetailsSituationVerification = () => {
  return <></>;
};

const renderRegulationValidationsVerification = (
  values: IRegulationValidationsEntry,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      width="100%"
      gap="s100"
    >
      {values.validations.map((validation) => (
        <BoxAttribute
          key={validation.id}
          value={validation.label}
          iconAfter={
            validation.value === "success" ? (
              <Icon
                appearance="success"
                icon={<MdOutlineCheckCircle />}
                size="20px"
                spacing="none"
              />
            ) : (
              <Icon
                appearance="error"
                icon={<MdOutlineHighlightOff />}
                size="20px"
                spacing="none"
              />
            )
          }
        />
      ))}
    </Grid>
  );
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
  const { stepKey, aidRequest, isTablet } = props;
  return (
    <>
      {stepKey === "beneficiaries" &&
        renderBeneficiariesVerification(
          aidRequest.beneficiaries.values,
          isTablet,
        )}

      {stepKey === "amount" &&
        renderAmountVerification(aidRequest.amount.values)}

      {stepKey === "detailsSituation" && renderDetailsSituationVerification()}

      {stepKey === "regulationValidations" &&
        renderRegulationValidationsVerification(
          aidRequest.regulationValidations.values,
          isTablet,
        )}

      {stepKey === "documentaryRequirements" &&
        renderDocumentaryRequirementsVerification()}

      {stepKey === "disbursement" && renderDisbursementVerification()}
    </>
  );
}

export { VerificationBoxes };
