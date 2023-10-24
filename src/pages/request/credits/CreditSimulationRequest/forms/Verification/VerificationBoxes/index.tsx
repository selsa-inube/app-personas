import { BoxAttribute } from "@components/cards/BoxAttribute";
import { TextField } from "@design/input/TextField";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { MdAdd, MdDragHandle, MdRemove } from "react-icons/md";
import { activeDM } from "src/model/domains/general/activedm";
import { currencyFormat } from "src/utils/formats";
import { IFormsCreditSimulationRequest } from "../../../types";
import { ICommentsEntry } from "../../CommentsForm/types";
import { IDestinationEntry } from "../../DestinationForm/types";
import { IDisbursementEntry } from "../../DisbursementForm/types";
import { IPreliquidationEntry } from "../../PreliquidationForm/types";
import { ISimulationEntry } from "../../SimulationForm/types";
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

const renderSimulationVerification = (
  values: ISimulationEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    <BoxAttribute
      label="Simular con el valor de la cuota:"
      value={values.simulationWithQuota ? activeDM.Y.value : activeDM.N.value}
    />
    <BoxAttribute
      label="Valor simulado:"
      value={currencyFormat(Number(values.amount))}
    />
    <BoxAttribute label="Periodicidad:" value={values.peridiocity} />
    <BoxAttribute label="Plazo:" value={values.deadline} />
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
);

const renderPreliquidationVerification = (
  values: IPreliquidationEntry,
  isTablet: boolean
) => (
  <Stack direction="column" gap={isTablet ? "s200" : "s250"}>
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

const renderDisbursementVerification = (
  values: IDisbursementEntry,
  isTablet: boolean
) => (
  <Grid templateColumns={isTablet ? "1fr" : "1fr 1fr"} gap="s100" width="100%">
    <BoxAttribute
      label="Forma de desembolso:"
      value={values.creditDisbursement}
    />
    <BoxAttribute
      label="Cuentas en moneda extranjera:"
      value={values.accountNumber}
    />
  </Grid>
);

const renderCommentsVerification = (
  values: ICommentsEntry,
  isTablet: boolean
) => (
  <Stack width="100%">
    <BoxAttribute
      label="Comentarios adicionales:"
      value={values.comments}
      direction="column"
    />
  </Stack>
);

const renderTermsAndConditionsVerification = (
  values: ITermsAndConditionsEntry,
  isTablet: boolean
) => (
  <Stack width="100%">
    <BoxAttribute
      label="Acepta términos y condiciones:"
      value={values.accept ? activeDM.Y.value : activeDM.N.value}
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

      {stepKey === "simulation" &&
        renderSimulationVerification(
          creditSimulationRequest.simulation.values,
          isTablet
        )}

      {stepKey === "preliquidation" &&
        renderPreliquidationVerification(
          creditSimulationRequest.preliquidation.values,
          isTablet
        )}

      {stepKey === "disbursement" &&
        renderDisbursementVerification(
          creditSimulationRequest.disbursement.values,
          isTablet
        )}

      {stepKey === "comments" &&
        renderCommentsVerification(
          creditSimulationRequest.comments.values,
          isTablet
        )}

      {stepKey === "termsAndConditions" &&
        renderTermsAndConditionsVerification(
          creditSimulationRequest.termsAndConditions.values,
          isTablet
        )}
    </>
  );
}

export { VerificationBoxes };
