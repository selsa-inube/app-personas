import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Tag } from "@inubekit/tag";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { accountTypeDM } from "src/model/domains/general/accountTypeDM";
import { activeDM } from "src/model/domains/general/activedm";
import { bankDM } from "src/model/domains/general/bankDM";
import { disbursementTypeDM } from "src/model/domains/general/disbursementTypeDM";
import { genderDM } from "src/model/domains/general/updateData/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/general/updateData/personalInformation/identificationTypeDM";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { IContactChannelsEntry } from "src/shared/forms/ContactChannelsForm/types";
import { currencyFormat } from "src/utils/currency";
import { truncateFileName } from "src/utils/texts";
import { IFormsCreditDestinationRequest } from "../../../types";
import { ICreditConditionsEntry } from "../../CreditConditionsForm/types";
import { IDestinationEntry } from "../../DestinationForm/types";
import { IDisbursementEntry } from "../../DisbursementForm/types";
import { IDocumentaryRequirementsEntry } from "../../DocumentaryRequirementsForm/types";
import { IPaymentMethodEntry } from "../../PaymentMethodForm/types";
import { ISystemValidationsEntry } from "../../SystemValidationsForm/types";
import { ITermsAndConditionsEntry } from "../../TermsAndConditionsForm/types";
import { creditDestinationRequestBoxTitles } from "../config/box";

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
    <BoxAttribute label="Destino:" value={values.destination?.value} />
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
          value={`${values.rate} % N.A.M.V`}
        />
        <BoxAttribute
          label="Desembolso aproximado:"
          value={currencyFormat(values.netValue)}
        />
      </Grid>
    )}
  </>
);

const renderPaymentMethodVerification = (
  values: IPaymentMethodEntry,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={inube.spacing.s100}
      width="100%"
    >
      <BoxAttribute
        label="Medio de pago:"
        value={
          values.paymentMethods.find(
            (method) => method.id === values.paymentMethodType,
          )?.value
        }
      />
      {values.accountToDebit && (
        <BoxAttribute
          label="Cuenta a debitar:"
          value={
            getValueOfDomain(values.accountToDebit, "accountDebitType")?.value
          }
        />
      )}
      {values.accountSelection && (
        <BoxAttribute
          label="Selección de cuenta:"
          value={
            getValueOfDomain(values.accountSelection, "accountSelectionType")
              ?.value
          }
        />
      )}
      {values.accountNumberSelect && !values.accountSelection && (
        <BoxAttribute
          label="Número de cuenta:"
          value={values.accountNumberSelect}
        />
      )}
      {values.accountNumberTextField && values.accountSelection && (
        <BoxAttribute
          label="Número de cuenta:"
          value={values.accountNumberTextField}
        />
      )}
      {values.accountType && (
        <BoxAttribute
          label="Tipo de cuenta:"
          value={accountTypeDM.valueOf(values.accountType)?.value}
        />
      )}
      {values.bankEntity && (
        <BoxAttribute
          label="Entidad:"
          value={bankDM.valueOf(values.bankEntity)?.value}
        />
      )}
    </Grid>
  );
};

const renderSystemValidationsVerification = (
  values: ISystemValidationsEntry,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={inube.spacing.s100}
      width="100%"
    >
      {values.validations.map((validation) => (
        <BoxAttribute
          key={validation.id}
          value={validation.label}
          iconAfter={
            validation.value === "success" ? (
              <Tag label="Cumple" appearance="success" />
            ) : validation.value === "fail" ? (
              <Tag label="No cumple" appearance="danger" />
            ) : (
              <Tag label="Por evaluar" appearance="warning" />
            )
          }
        />
      ))}
    </Grid>
  );
};

const renderDocumentaryRequirementsVerification = (
  values: IDocumentaryRequirementsEntry,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={inube.spacing.s100}
      width="100%"
    >
      {values.selectedDocuments.map((document) => (
        <BoxAttribute
          key={document.file.name}
          label={truncateFileName(document.file.name, 55)}
        />
      ))}
    </Grid>
  );
};

const getAccountDescription = (accountId: string) => {
  return `Ahorros ${accountId}`;
};

const renderDisbursementVerification = (values: IDisbursementEntry) => (
  <Stack direction="column" gap={inube.spacing.s100} width="100%">
    <BoxAttribute
      label="Forma de desembolso:"
      value={disbursementTypeDM.valueOf(values.disbursement || "")?.value}
    />
    {values.accountType && (
      <BoxAttribute
        label="Tipo de cuenta:"
        value={accountTypeDM.valueOf(values.accountType)?.value}
      />
    )}
    {values.accountNumber && (
      <BoxAttribute
        label="Numero de cuenta:"
        value={getAccountDescription(values.accountNumber)}
      />
    )}
    {values.writeAccountNumber && (
      <BoxAttribute
        label="Numero de cuenta:"
        value={values.writeAccountNumber}
      />
    )}
    {values.observations && (
      <BoxAttribute
        label="Observaciones:"
        value={values.observations}
        direction="column"
      />
    )}
    {values.supplier && (
      <BoxAttribute
        label="Proveedor:"
        value={getValueOfDomain(values.supplier, "suppliersType")?.value}
      />
    )}
    {values.identificationType && (
      <BoxAttribute
        label="Tipo de identificación:"
        value={identificationTypeDM.valueOf(values.identificationType)?.value}
      />
    )}
    {values.identification && (
      <BoxAttribute label="Identificación:" value={values.identification} />
    )}
    {values.socialReason && (
      <BoxAttribute label="Razón social:" value={values.socialReason} />
    )}
    {values.firstName && (
      <BoxAttribute label="Primer nombre:" value={values.firstName} />
    )}
    {values.secondName && (
      <BoxAttribute label="Segundo nombre:" value={values.secondName} />
    )}
    {values.firstLastName && (
      <BoxAttribute label="Primer apellido:" value={values.firstLastName} />
    )}
    {values.secondLastName && (
      <BoxAttribute label="Segundo apellido:" value={values.secondLastName} />
    )}
    {values.gender && (
      <BoxAttribute
        label="Género:"
        value={genderDM.valueOf(values.gender)?.value}
      />
    )}
    {values.others && <BoxAttribute label="Otros:" value={values.others} />}
    {values.entity && (
      <BoxAttribute
        label="Entidad:"
        value={bankDM.valueOf(values.entity)?.value}
      />
    )}
  </Stack>
);

const renderCommentsVerification = (values: ICommentsEntry) => (
  <Stack width="100%" direction="column">
    <BoxAttribute
      label="Comentarios adicionales:"
      value={values.comments}
      direction="column"
    />
  </Stack>
);

const renderTermsAndConditionsVerification = (
  values: ITermsAndConditionsEntry,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={inube.spacing.s100}
    width="100%"
  >
    <BoxAttribute
      label="Acepta términos y condiciones:"
      value={values.accept ? activeDM.Y.value : activeDM.N.value}
    />
    <BoxAttribute
      label="Acepta política de tratamiento de datos:"
      value={values.acceptDataPolicy ? activeDM.Y.value : activeDM.N.value}
    />
  </Grid>
);

const renderContactChannelsVerification = (values: IContactChannelsEntry) => (
  <Stack width="100%" direction="column" gap={inube.spacing.s100}>
    {values.landlinePhone && (
      <BoxAttribute label="Teléfono:" value={values.landlinePhone} />
    )}

    <BoxAttribute label="Celular:" value={values.cellPhone} />
    <BoxAttribute label="Correo:" value={values.email} />
    <BoxAttribute
      label="Autoriza recibir información:"
      value={values.acceptNotifications ? activeDM.Y.value : activeDM.N.value}
    />
  </Stack>
);

interface VerificationBoxesProps {
  creditDestinationRequest: IFormsCreditDestinationRequest;
  stepKey: keyof typeof creditDestinationRequestBoxTitles;
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
        )}
    </>
  );
}

export { VerificationBoxes };
