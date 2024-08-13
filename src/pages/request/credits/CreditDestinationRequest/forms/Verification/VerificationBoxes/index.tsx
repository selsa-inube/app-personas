import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Grid } from "@inubekit/grid";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { MdOutlineCheckCircle, MdOutlineHighlightOff } from "react-icons/md";
import { activeDM } from "src/model/domains/general/activedm";
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
    <BoxAttribute label="Destino:" value={values.creditDestination?.value} />
    <BoxAttribute label="Producto:" value={values.selectedProduct?.title} />
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
        <BoxAttribute
          label="Plazo en meses:"
          value={`${values.deadline} Meses`}
        />
        <BoxAttribute
          label="Tasa de interés:"
          value={`${values.product.maxRate} % N.A.M.V`}
        />
        <BoxAttribute
          label="Desembolso aproximado:"
          value={currencyFormat(values.netValue)}
        />
      </Grid>
    )}
  </>
);

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
              <Icon
                appearance="success"
                icon={<MdOutlineCheckCircle />}
                size="20px"
                spacing="narrow"
              />
            ) : (
              <Icon
                appearance="danger"
                icon={<MdOutlineHighlightOff />}
                size="20px"
                spacing="narrow"
              />
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
  return savingsMock.find((saving) => saving.id === accountId)?.description;
};

const renderDisbursementVerification = (values: IDisbursementEntry) => (
  <Stack direction="column" gap={inube.spacing.s100} width="100%">
    <BoxAttribute
      label="Forma de desembolso:"
      value={
        getValueOfDomain(values.disbursementType, "disbursementType")?.value
      }
    />
    {values.accountType && (
      <BoxAttribute
        label="Tipo de cuenta:"
        value={getValueOfDomain(values.accountType, "accountType")?.value}
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
        value={getValueOfDomain(values.entity, "bank")?.value}
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
) => (
  <Stack width="100%" direction="column">
    <BoxAttribute
      label="Acepta términos y condiciones:"
      value={values.accept ? activeDM.Y.value : activeDM.N.value}
    />
    <BoxAttribute
      label="Acepta política de tratamiento de datos:"
      value={values.acceptDataPolicy ? activeDM.Y.value : activeDM.N.value}
    />
  </Stack>
);

const renderContactChannelsVerification = (values: IContactChannelsEntry) => (
  <Stack width="100%" direction="column" gap={inube.spacing.s100}>
    <BoxAttribute label="Teléfono:" value={values.landlinePhone} />
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
        )}

      {stepKey === "contactChannels" &&
        renderContactChannelsVerification(
          creditDestinationRequest.contactChannels.values,
        )}
    </>
  );
}

export { VerificationBoxes };
