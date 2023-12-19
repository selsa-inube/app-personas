import { BoxAttribute } from "@components/cards/BoxAttribute";
import { TextField } from "@design/input/TextField";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { MdAdd, MdDragHandle, MdRemove } from "react-icons/md";
import { activeDM } from "src/model/domains/general/activedm";
import { peridiocityDM } from "src/model/domains/general/peridiocity";
import { genderDM } from "src/model/domains/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/personalInformation/identificationtypedm";
import { currencyFormat } from "src/utils/formats";
import { IFormsCreditSimulationRequest } from "../../../types";
import { ICommentsEntry } from "../../CommentsForm/types";
import { IContactChannelsEntry } from "../../ContactChannelsForm/types";
import { ICreditConditionsEntry } from "../../CreditConditionsForm/types";
import { IDestinationEntry } from "../../DestinationForm/types";
import { IDisbursementEntry } from "../../DisbursementForm/types";
import { IPreliquidationEntry } from "../../PreliquidationForm/types";
import { ITermsAndConditionsEntry } from "../../TermsAndConditionsForm/types";

const renderDestinationVerification = (
  values: IDestinationEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    <BoxAttribute
      label="Destinación:"
      value={
        getValueOfDomain(values.creditDestination, "creditDestination")?.value
      }
    />
    <BoxAttribute
      label="Producto:"
      value={getValueOfDomain(values.product, "creditProductType")?.value}
    />
  </Grid>
);

const renderCreditConditionsVerification = (
  values: ICreditConditionsEntry,
  isTablet: boolean
) => (
  <>
    {values.product === "generateRecommendation" ? (
      <Grid templateColumns="1fr" gap="s100" width="100%">
        <BoxAttribute
          label="¿Cuánto dinero necesitas?"
          value={currencyFormat(Number(values.amount))}
        />
      </Grid>
    ) : (
      <Grid
        templateColumns={isTablet ? "1fr" : "1fr 1fr"}
        gap="s100"
        width="100%"
      >
        <BoxAttribute
          label="Simular con el valor de la cuota:"
          value={
            values.simulationWithQuota ? activeDM.Y.value : activeDM.N.value
          }
        />
        <BoxAttribute
          label="Valor simulado:"
          value={currencyFormat(Number(values.amount))}
        />
        <BoxAttribute
          label="Periodicidad:"
          value={peridiocityDM.valueOf(values.peridiocity)?.value}
        />
        <BoxAttribute label="Plazo:" value={`${values.deadline} Meses`} />
        <BoxAttribute
          label="Cuota mensual:"
          value={currencyFormat(Number(values.quota))}
        />
        <BoxAttribute
          label="Tasa de interés:"
          value={`${values.interestRate} % N.M.V`}
        />
        <BoxAttribute
          label="Intereses de ajuste al ciclo:"
          value={currencyFormat(Number(values.cycleInterest))}
        />
        <BoxAttribute
          label="Valor neto a recibir:"
          value={currencyFormat(Number(values.netValue))}
        />
      </Grid>
    )}
  </>
);

const renderPreliquidationVerification = (
  values: IPreliquidationEntry,
  isTablet: boolean
) => (
  <Stack direction="column" gap={isTablet ? "s200" : "s250"} width="100%">
    <TextField
      label="Monto"
      placeholder="Monto"
      name="amount"
      id="amount"
      value={currencyFormat(values.amount)}
      iconBefore={<MdAdd />}
      size="compact"
      isFullWidth
      readOnly
    />
    <TextField
      label="Intereses anticipados de ajuste al ciclo"
      placeholder="Intereses anticipados de ajuste al ciclo"
      name="interestAdjustmentCycle"
      id="interestAdjustmentCycle"
      value={currencyFormat(values.interestAdjustmentCycle)}
      iconBefore={<MdRemove />}
      size="compact"
      isFullWidth
      readOnly
    />
    <TextField
      label="Cargos y descuentos"
      placeholder="Cargos y descuentos"
      name="chargesAndDiscounts"
      id="chargesAndDiscounts"
      value={currencyFormat(values.chargesAndDiscounts)}
      iconBefore={<MdRemove />}
      size="compact"
      isFullWidth
      readOnly
    />

    <Divider dashed />
    <TextField
      label="Valor neto a girar"
      placeholder="Valor neto a girar"
      name="netValue"
      id="netValue"
      value={currencyFormat(values.netValue)}
      iconBefore={<MdDragHandle />}
      size="compact"
      isFullWidth
      readOnly
    />
  </Stack>
);

const getAccountDescription = (accountId: string) => {
  return savingsMock.find((saving) => saving.id === accountId)?.description;
};

const renderDisbursementVerification = (values: IDisbursementEntry) => (
  <Stack direction="column" gap="s100" width="100%">
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
  values: ITermsAndConditionsEntry
) => (
  <Stack width="100%" direction="column">
    <BoxAttribute
      label="Acepta términos y condiciones:"
      value={values.accept ? activeDM.Y.value : activeDM.N.value}
    />
  </Stack>
);

const renderContactChannelsVerification = (values: IContactChannelsEntry) => (
  <Stack width="100%" direction="column" gap="s100">
    <BoxAttribute label="Teléfono:" value={values.landlinePhone} />
    <BoxAttribute label="Celular:" value={values.cellPhone} />
    <BoxAttribute label="Correo:" value={values.email} />
    <BoxAttribute
      label="Acepta política de tratamiento de datos:"
      value={values.acceptDataPolicy ? activeDM.Y.value : activeDM.N.value}
    />
    <BoxAttribute
      label="Autoriza recibir información:"
      value={values.acceptNotifications ? activeDM.Y.value : activeDM.N.value}
    />
  </Stack>
);

interface VerificationBoxesProps {
  creditSimulationRequest: IFormsCreditSimulationRequest;
  stepKey: string;
  isTablet: boolean;
}

function VerificationBoxes(props: VerificationBoxesProps) {
  const { creditSimulationRequest, stepKey, isTablet } = props;
  return (
    <>
      {stepKey === "destination" &&
        renderDestinationVerification(
          creditSimulationRequest.destination.values,
          isTablet
        )}

      {stepKey === "creditConditions" &&
        renderCreditConditionsVerification(
          creditSimulationRequest.creditConditions.values,
          isTablet
        )}

      {stepKey === "preliquidation" &&
        renderPreliquidationVerification(
          creditSimulationRequest.preliquidation.values,
          isTablet
        )}

      {stepKey === "disbursement" &&
        renderDisbursementVerification(
          creditSimulationRequest.disbursement.values
        )}

      {stepKey === "comments" &&
        renderCommentsVerification(creditSimulationRequest.comments.values)}

      {stepKey === "termsAndConditions" &&
        renderTermsAndConditionsVerification(
          creditSimulationRequest.termsAndConditions.values
        )}

      {stepKey === "contactChannels" &&
        renderContactChannelsVerification(
          creditSimulationRequest.contactChannels.values
        )}
    </>
  );
}

export { VerificationBoxes };
