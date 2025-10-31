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
import { IEvaluateAmountsEntry, ESimulationState } from "./types";
import { StyledSimulationResults } from "./styles";
import { IBeneficiary } from "src/model/entity/user";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { AppContext } from "src/context/app";
import { useContext } from "react";

interface EvaluateAmountsFormUIProps {
  formik: FormikProps<IEvaluateAmountsEntry>;
  forAmount: boolean;
  forDays: boolean;
  forPerson: boolean;
  simulateAid: () => void;
  loadingSimulation?: ESimulationState;
  beneficiary?: IBeneficiary;
}

function EvaluateAmountsFormUI(props: EvaluateAmountsFormUIProps) {
  const { formik, forAmount, forDays, forPerson, simulateAid, loadingSimulation, beneficiary } = props;

  const { serviceDomains } = useContext(AppContext);

  const isSimulateButtonDisabled: boolean =
    forAmount
      ? !!formik.errors.aidCost || formik.values.aidCost === 0
      : forDays
        ? !!formik.errors.aidDays || formik.values.aidDays === 0
        : (!beneficiary);

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        {
          (forAmount || forDays) && (
            <Stack direction="column" gap={inube.spacing.s250}>
              <Text padding={`0 ${inube.spacing.s200}`}>Simulador de auxilio</Text>
              <Moneyfield
                label={`${forAmount ? "Costo" : "Cantidad de días"} (${formik.values.aidName})`}
                name={forAmount ? "aidCost" : "aidDays"}
                id={forAmount ? "aidCost" : "aidDays"}
                placeholder={`${forAmount ? "Ingresa el costo del auxilio" : "Digita la cantidad de días de la incapacidad"}`}
                value={validateCurrencyField(forAmount ? "aidCost" : "aidDays", formik, false)}
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
        {forPerson && (
          <Stack direction="column" gap={inube.spacing.s250}>
            <Text padding={`0 ${inube.spacing.s200}`}>Información del beneficiario</Text>
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
          </Stack>
        )}
        {loadingSimulation !== ESimulationState.IDLE && (
          <Stack direction="column" gap={inube.spacing.s250}>
            <Text>Resultado de la simulación</Text>
            {loadingSimulation === ESimulationState.LOADING && (
              <Stack direction="column" gap={inube.spacing.s250}>
                <SkeletonLine height="60px" animated />
                <SkeletonLine height="118px" animated />
              </Stack>
            )}
            {loadingSimulation === ESimulationState.COMPLETED && (
              <>
                <Message
                  appearance={
                    (formik.values.hasUtilization && formik.values.utilizationLimit === 0)
                      ? "danger"
                      : (!formik.values.hasUtilization && formik.values.aidLimit <= 0)
                        ? "danger"
                        : "help"
                  }
                  title={
                    (formik.values.hasUtilization && formik.values.utilizationLimit === 0)
                      ? "Has superado la cantidad máxima de veces que puedes usar el auxilio."
                      : (!formik.values.hasUtilization && formik.values.aidLimit <= 0)
                        ? "En este momento no tienes cupo disponible."
                        : "Los resultados de esta simulación son aproximados. Los valores finales pueden variar y se definirán durante el trámite del auxilio."
                  }
                />
                <Stack direction="column" gap={inube.spacing.s250}>
                  <StyledSimulationResults>
                    {
                      (!formik.values.hasUtilization) ? (
                        <>
                          <Stack direction="row" justifyContent="space-between">
                            <Text>Cupo disponible:</Text>
                            <Text>{currencyFormat(formik.values.aidLimit)}</Text>
                          </Stack>
                          <Stack direction="row" justifyContent="space-between">
                            <Text>Valor de auxilio aproximado:</Text>
                            <Text>-{currencyFormat(formik.values.calculatedAidValue || 0)}</Text>
                          </Stack>
                          <Divider dashed />
                          <Stack direction="row" justifyContent="flex-end" gap={inube.spacing.s100}>
                            <Text>Cupo restante:</Text>
                            <Text>{currencyFormat(formik.values.remainingQuota || 0)}</Text>
                          </Stack>
                        </>
                      ) : (
                        <Stack direction="row" justifyContent="space-between">
                          <Text>Valor de auxilio aproximado:</Text>
                          <Text>{currencyFormat(formik.values.calculatedAidValue || 0)}</Text>
                        </Stack>
                      )
                    }
                  </StyledSimulationResults>
                </Stack>
              </>
            )}
          </Stack>
        )}
        <Stack direction="column" gap={inube.spacing.s250}>
          <Stack width="100%" justifyContent="flex-end">
            <Button
              variant="outlined"
              spacing="compact"
              onClick={simulateAid}
              loading={loadingSimulation === ESimulationState.LOADING}
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
