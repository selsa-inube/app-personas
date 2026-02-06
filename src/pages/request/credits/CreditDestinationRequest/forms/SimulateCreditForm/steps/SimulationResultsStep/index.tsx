import { InfoCard } from "@components/cards/InfoCard";
import { CreditDisbursementModal } from "@components/modals/credit/CreditDisbursementModal";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Divider, Grid, Message, Stack, Text } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdOpenInNew } from "react-icons/md";
import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { currencyFormat } from "src/utils/currency";
import { ISimulateCreditEntry } from "../../types";

interface ISimulationResultsStepProps {
  formik: FormikProps<ISimulateCreditEntry>;
  showDisbursementModal: boolean;
  onToggleDisbursementModal: () => void;
}

function SimulationResultsStep(props: ISimulationResultsStepProps) {
  const { formik, showDisbursementModal, onToggleDisbursementModal } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  if (!formik.values.hasResult) {
    return null;
  }

  return (
    <>
      <Divider dashed />

      <Stack direction="column" gap={inube.spacing.s200}>
        <Text type="title" size="medium" appearance="gray" weight="bold">
          Resultados de la simulación
        </Text>

        <Message
          title="Los resultados de esta simulación son aproximados. Los valores finales pueden variar y se definirán durante el trámite del crédito."
          size={isMobile ? "medium" : "large"}
          appearance="help"
        />

        <Grid
          templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={inube.spacing.s100}
        >
          <InfoCard
            label="Cuota:"
            value={`${currencyFormat(formik.values.quota || 0)} / ${periodicityDM.valueOf(formik.values.periodicity.id)?.value}`}
          />
          <InfoCard
            label="Numero de cuotas:"
            value={formik.values.deadline?.toString() || ""}
          />
          <InfoCard
            label="Periodicidad"
            value={
              periodicityDM.valueOf(formik.values.periodicity.id)?.value || ""
            }
          />
          <InfoCard
            label="Tasa de interés:"
            value={`${formik.values.rate.toFixed(2)} % N.A.M.V`}
          />
          {formik.values.extraordinaryQuotas.quotas > 0 && (
            <>
              <InfoCard
                label="Cantidad de cuotas extraordinarias:"
                value={formik.values.extraordinaryQuotas.quotas.toString()}
              />
              <InfoCard
                label="Valor por cuota extraordinaria:"
                value={currencyFormat(
                  formik.values.extraordinaryQuotas.valuePerQuota,
                )}
              />
            </>
          )}
          <InfoCard
            label="Desembolso aproximado:"
            buttonIcon={<MdOpenInNew />}
            buttonValue={currencyFormat(formik.values.netValue)}
            buttonDisabled={formik.values.netValue === 0}
            onClickButton={onToggleDisbursementModal}
            withButton
          />
        </Grid>
      </Stack>

      {showDisbursementModal && (
        <CreditDisbursementModal
          approximateValue={formik.values.netValue}
          portalId="modals"
          spec={{
            amount: formik.values.amount || 0,
            anticipatedInterest: formik.values.anticipatedInterest,
            discounts: formik.values.discounts,
            charges: formik.values.charges,
          }}
          onCloseModal={onToggleDisbursementModal}
        />
      )}
    </>
  );
}

export { SimulationResultsStep };
export type { ISimulationResultsStepProps };
