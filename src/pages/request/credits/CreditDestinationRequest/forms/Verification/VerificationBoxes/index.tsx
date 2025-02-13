import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { renderCommentsVerification } from "@forms/CommentsForm/verification";
import { renderContactChannelsVerification } from "@forms/ContactChannelsForm/verification";
import { renderDisbursementVerification } from "@forms/DisbursementForm/verification";
import { renderDocumentaryRequirementsVerification } from "@forms/DocumentaryRequirementsForm/verification";
import { renderPaymentMethodVerification } from "@forms/PaymentMethodForm/verification";
import { renderSystemValidationsVerification } from "@forms/SystemValidationsForm/verification";
import { renderTermsAndConditionsVerification } from "@forms/TermsAndConditionsForm/verification";
import { Grid } from "@inubekit/inubekit";
import { currencyFormat } from "src/utils/currency";
import { creditDestinationRequestSteps } from "../../../config/assisted";
import { IFormsCreditDestinationRequest } from "../../../types";
import { ICreditConditionsEntry } from "../../CreditConditionsForm/types";
import { IDestinationEntry } from "../../DestinationForm/types";

const renderDestinationVerification = (
  values: IDestinationEntry,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={inube.spacing.s100}
    width="100%"
  >
    <BoxAttribute label="Destino:" value={values.destination?.label} />
    <BoxAttribute label="Producto:" value={values.product?.title} />
  </Grid>
);

const renderCreditConditionsVerification = (
  values: ICreditConditionsEntry,
  isTablet: boolean,
) => (
  <>
    {values.product.id === "generateRecommendation" ? (
      <Grid templateColumns="1fr" gap={inube.spacing.s100} width="100%">
        <BoxAttribute
          label="¿Cuánto dinero necesitas?"
          value={currencyFormat(Number(values.amount))}
        />
      </Grid>
    ) : (
      <Grid
        templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
        autoRows="auto"
        gap={inube.spacing.s100}
        width="100%"
      >
        <BoxAttribute
          label="Cuota:"
          value={`${currencyFormat(values.quota || 0)} / Mensual`}
        />
        <BoxAttribute label="Numero de cuotas:" value={values.deadline} />
        <BoxAttribute
          label="Tasa de interés:"
          value={`${values.rate.toFixed(2)} % N.A.M.V`}
        />
        <BoxAttribute
          label="Desembolso aproximado:"
          value={currencyFormat(values.netValue)}
        />
      </Grid>
    )}
  </>
);

interface VerificationBoxesProps {
  creditDestinationRequest: IFormsCreditDestinationRequest;
  stepKey: keyof typeof creditDestinationRequestSteps;
  isTablet: boolean;
}

function VerificationBoxes(props: VerificationBoxesProps) {
  const { creditDestinationRequest, stepKey, isTablet } = props;
  return (
    <>
      {stepKey === "destination" &&
        renderDestinationVerification(
          creditDestinationRequest.destination.values,
          isTablet,
        )}

      {stepKey === "creditConditions" &&
        renderCreditConditionsVerification(
          creditDestinationRequest.creditConditions.values,
          isTablet,
        )}

      {stepKey === "paymentMethod" &&
        renderPaymentMethodVerification(
          creditDestinationRequest.paymentMethod.values,
          isTablet,
        )}

      {stepKey === "systemValidations" &&
        renderSystemValidationsVerification(
          creditDestinationRequest.systemValidations.values,
          isTablet,
        )}

      {stepKey === "disbursement" &&
        renderDisbursementVerification(
          creditDestinationRequest.disbursement.values,
          isTablet,
        )}

      {stepKey === "documentaryRequirements" &&
        renderDocumentaryRequirementsVerification(
          creditDestinationRequest.documentaryRequirements.values,
          isTablet,
        )}

      {stepKey === "comments" &&
        renderCommentsVerification(creditDestinationRequest.comments.values)}

      {stepKey === "termsAndConditions" &&
        renderTermsAndConditionsVerification(
          creditDestinationRequest.termsAndConditions.values,
          isTablet,
        )}

      {stepKey === "contactChannels" &&
        renderContactChannelsVerification(
          creditDestinationRequest.contactChannels.values,
          isTablet,
        )}
    </>
  );
}

export { VerificationBoxes };
