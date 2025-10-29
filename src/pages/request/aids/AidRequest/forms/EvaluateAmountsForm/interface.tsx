import { inube } from "@design/tokens";
import {
  Button,
  Divider,
  Message,
  Moneyfield,
  SkeletonLine,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdAttachMoney, MdOutlineTag } from "react-icons/md";
import {
  currencyFormat,
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { capitalizeEachWord } from "src/utils/texts";
import { IEvaluateAmountsEntry, SimulationState } from "./types";
import { StyledSimulationResults } from "./styles";
import { IBeneficiary } from "src/model/entity/user";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { AppContext } from "src/context/app";
import { useContext } from "react";

interface EvaluateAmountsFormUIProps {
  formik: FormikProps<IEvaluateAmountsEntry>;
  forAmount: boolean;
  simulateAid: () => void;
  loadingSimulation?: SimulationState;
  beneficiary?: IBeneficiary;
}

function EvaluateAmountsFormUI(props: EvaluateAmountsFormUIProps) {
  const { formik, forAmount, simulateAid, loadingSimulation, beneficiary } = props;

  const { serviceDomains } = useContext(AppContext);

  const calculateRemainingQuota = (): string => {
    const aidLimit = formik.values.aidLimit || 0;
    const cost = formik.values[forAmount ? "aidCost" : "aidDays"] || 0;
    const remainingQuota = aidLimit - cost;

    if (remainingQuota < 0) {
      return `-${validateCurrencyField("total", { values: { total: Math.abs(remainingQuota) } })}`;
    }

    return validateCurrencyField("total", { values: { total: remainingQuota } });
  };

  const isSimulateButtonDisabled: boolean = forAmount ? (!!formik.errors.aidCost || formik.values.aidCost === 0) : !beneficiary;

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Text padding={`0 ${inube.spacing.s200}`}>Simulador de auxilio</Text>
        {
          forAmount && (
            <Stack direction="column" gap={inube.spacing.s250}>
              <Moneyfield
                label={`${forAmount ? "Costo" : "Cantidad de días"} (${formik.values.aidName})`}
                name={forAmount ? "costAid" : "daysAid"}
                id={forAmount ? "costAid" : "daysAid"}
                placeholder={`${forAmount ? "Ingresa el costo del auxilio" : "Digita la cantidad de días de la incapacidad"}`}
                value={validateCurrencyField("aidCost", formik, false)}
                type="text"
                message={forAmount ? formik.errors.aidCost : formik.errors.aidDays}
                size="compact"
                fullwidth
                status={getFieldState(formik, forAmount ? "aidCost" : "aidDays")}
                onBlur={formik.handleBlur}
                onChange={(e) => handleChangeWithCurrency(formik, e)}
                required
                iconAfter={forAmount ? <MdAttachMoney size={18} /> : <MdOutlineTag size={18} />}
              />
            </Stack>
          )
        }
        {forAmount && loadingSimulation !== 'idle' && (
          <Stack direction="column" gap={inube.spacing.s250}>
            <Text>Resultado de la simulación</Text>
            <Message
              appearance="help"
              title="Los resultados de esta simulación son aproximados. Los valores finales pueden variar y se definirán durante el trámite del auxilio."
            />
            {loadingSimulation === 'loading' && (
              <Stack direction="column" gap={inube.spacing.s250}>
                <SkeletonLine height="60px" animated />
                <SkeletonLine height="118px" animated />
              </Stack>
            )}
            {loadingSimulation === 'completed' && (
              <Stack direction="column" gap={inube.spacing.s250}>
                <StyledSimulationResults>
                  <Stack direction="row" justifyContent="space-between">
                    <Text>Cupo disponible:</Text>
                    <Text>{validateCurrencyField("aidLimit", formik)}</Text>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Text>Límite del auxilio:</Text>
                    <Text>-{validateCurrencyField(forAmount ? "costAid" : "daysAid", formik)}</Text>
                  </Stack>
                  <Divider dashed />
                  <Stack direction="row" justifyContent="flex-end" gap={inube.spacing.s100}>
                    <Text>Cupo restante:</Text>
                    <Text>{calculateRemainingQuota()}</Text>
                  </Stack>
                </StyledSimulationResults>
              </Stack>
            )}
          </Stack>
        )}
        {!forAmount && (
          <>
            <Stack
              direction="column"
              gap={inube.spacing.s150}
              width="100%"
            >
              <BoxAttribute
                label="Beneficiario:"
                value={capitalizeEachWord(beneficiary?.name || "")}
                labelTextSize="large"
              />
              <BoxAttribute
                label="Identificación:"
                value={currencyFormat(Number(beneficiary?.identificationNumber) || 0, false)}
                labelTextSize="large"
              />
              <BoxAttribute
                label="Parentezco:"
                value={
                  serviceDomains.valueOf(
                    beneficiary?.relationshipCode || "",
                    "relationshiptheowner"
                  )?.label
                }
                labelTextSize="large"
              />
            </Stack>
          </>
        )}
        <Stack direction="column" gap={inube.spacing.s250}>
          <Stack width="100%" justifyContent="flex-end">
            <Button
              variant="outlined"
              spacing="compact"
              onClick={simulateAid}
              loading={loadingSimulation === 'loading'}
              disabled={isSimulateButtonDisabled}
            >
              Simular
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </form >
  );
}

export { EvaluateAmountsFormUI };
export type { EvaluateAmountsFormUIProps };
