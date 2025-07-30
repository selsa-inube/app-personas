import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Button,
  Divider,
  Fieldset,
  Grid,
  IOption,
  Moneyfield,
  Numberfield,
  Select,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdTag } from "react-icons/md";
import {
  currencyFormat,
  parseCurrencyString,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState, isInvalid } from "src/utils/forms/forms";
import { IProgrammedSavingProduct } from "../DestinationForm/types";
import { ISavingConditionsEntry } from "./types";

interface SavingConditionsFormUIProps {
  formik: FormikProps<ISavingConditionsEntry>;
  loading?: boolean;
  loadingSimulation?: boolean;
  periodicityOptions: IOption[];
  product?: IProgrammedSavingProduct;
  simulateSaving: () => void;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onChangePaymentMethod: (name: string, value: string) => void;
  onChangePeriodicity: (name: string, value: string) => void;
}

function SavingConditionsFormUI(props: SavingConditionsFormUIProps) {
  const {
    formik,
    loading,
    loadingSimulation,
    periodicityOptions,
    product,
    simulateSaving,
    customHandleChange,
    onFormValid,
    onChangePaymentMethod,
    onChangePeriodicity,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1200px)");
  const isMobile = useMediaQuery("(max-width: 650px)");

  const handleChangeWithCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);
    formik.setFieldValue(e.target.name, isNaN(parsedValue) ? "" : parsedValue);
    formik.setFieldValue("hasResult", false);
    onFormValid(false);
  };

  const gridCols = isMobile ? 1 : isTablet ? 2 : 2;

  return (
    <>
      <form>
        <Stack direction="column" gap={inube.spacing.s400}>
          <Fieldset legend="Simulador de ahorro">
            <Stack direction="column" gap={inube.spacing.s300} width="100%">
              <Stack direction="column" gap={inube.spacing.s200}>
                <Text type="title" size="small" appearance="gray" weight="bold">
                  Información del ahorro
                </Text>

                <Grid
                  templateColumns={`repeat(${gridCols}, 1fr)`}
                  autoRows="auto"
                  gap={inube.spacing.s200}
                >
                  <BoxAttribute label="Producto" value={product?.title} />

                  <BoxAttribute
                    label="Cuota mínima"
                    value={currencyFormat(product?.minQuota || 0)}
                  />

                  {product?.deadlineType === "Discretional" && (
                    <>
                      <BoxAttribute
                        label="Plazo mínimo"
                        value={`${product?.minDeadline} meses`}
                      />

                      <BoxAttribute
                        label="Plazo máximo"
                        value={`${product?.maxDeadline} meses`}
                      />
                    </>
                  )}
                </Grid>
              </Stack>

              <Stack direction="column" gap={inube.spacing.s200}>
                <Text type="title" size="small" appearance="gray" weight="bold">
                  Valores de la simulación
                </Text>

                <Stack direction="column" gap={inube.spacing.s200}>
                  <Grid
                    templateColumns={`repeat(${gridCols}, 1fr)`}
                    autoRows="auto"
                    gap={inube.spacing.s200}
                  >
                    <Moneyfield
                      label="Cuota"
                      placeholder="Ingresa el valor de la cuota"
                      name="quota"
                      id="quota"
                      value={validateCurrencyField("quota", formik) || ""}
                      type="text"
                      message={formik.errors.quota}
                      disabled={loading}
                      size="compact"
                      fullwidth
                      status={getFieldState(formik, "quota")}
                      onBlur={formik.handleBlur}
                      onChange={handleChangeWithCurrency}
                    />

                    {product?.deadlineType === "Discretional" && (
                      <Numberfield
                        label="¿Cuántas cuotas?"
                        placeholder="Ingresa la cantidad de cuotas"
                        name="deadline"
                        id="deadline"
                        value={formik.values.deadline || ""}
                        type="number"
                        message={formik.errors.deadline}
                        disabled={!formik.values.quota || loading}
                        size="compact"
                        fullwidth
                        status={getFieldState(formik, "deadline")}
                        onBlur={formik.handleBlur}
                        onChange={customHandleChange}
                        iconAfter={<MdTag />}
                      />
                    )}

                    <Select
                      id="paymentMethod"
                      name="paymentMethod"
                      label="Medio de pago"
                      size="compact"
                      value={formik.values.paymentMethod?.id || ""}
                      options={formik.values.paymentMethods || []}
                      message={formik.errors.paymentMethod}
                      onBlur={formik.handleBlur}
                      onChange={onChangePaymentMethod}
                      invalid={isInvalid(formik, "paymentMethod")}
                      fullwidth
                      disabled={formik.values.paymentMethods.length === 1}
                    />
                    <Select
                      label="Periodicidad"
                      name="periodicity"
                      id="periodicity"
                      value={formik.values.periodicity.id}
                      size="compact"
                      fullwidth
                      options={periodicityOptions}
                      onBlur={formik.handleBlur}
                      message={formik.errors.periodicity?.id}
                      disabled={
                        periodicityOptions.length === 1 ||
                        !formik.values.paymentMethod?.value
                      }
                      invalid={isInvalid(formik, "periodicity")}
                      onChange={onChangePeriodicity}
                    />
                  </Grid>

                  <Stack width="100%" justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      spacing="compact"
                      onClick={simulateSaving}
                      loading={loadingSimulation}
                      disabled={
                        !!formik.errors.quota ||
                        (product?.deadlineType === "Discretional" &&
                          !!formik.errors.deadline) ||
                        !!formik.errors.paymentMethod ||
                        !!formik.errors.periodicity ||
                        !formik.values.paymentMethod?.id ||
                        formik.values.periodicity.id === ""
                      }
                    >
                      Simular
                    </Button>
                  </Stack>
                </Stack>
              </Stack>

              {formik.values.hasResult && (
                <>
                  <Divider dashed />

                  <Stack direction="column" gap={inube.spacing.s200}>
                    <Stack direction="column" gap={inube.spacing.s050}>
                      <Text
                        type="title"
                        size="small"
                        appearance="gray"
                        weight="bold"
                      >
                        Resultados de la simulación
                      </Text>
                      <Text type="body" size="medium" appearance="gray">
                        Los resultados de la simulación son aproximados y pueden
                        variar dependiendo de condiciones particulares.
                      </Text>
                    </Stack>

                    <Grid
                      templateColumns={`repeat(${gridCols}, 1fr)`}
                      autoRows="auto"
                      gap={inube.spacing.s100}
                    >
                      <BoxAttribute
                        label="Saldo del ahorro:"
                        value={currencyFormat(formik.values.savingAmount || 0)}
                      />
                      {product?.deadlineType === "Fixed" &&
                        formik.values.numQuotas !== 0 && (
                          <BoxAttribute
                            label="Número de cuotas:"
                            value={formik.values.numQuotas}
                          />
                        )}
                      <BoxAttribute
                        label="Tasa efectiva anual:"
                        value={`${formik.values.annualRate.toFixed(2)} %`}
                      />
                      <BoxAttribute
                        label="Valor de los rendimientos:"
                        value={currencyFormat(formik.values.yields || 0)}
                      />
                      <BoxAttribute
                        label="Retención en la fuente:"
                        value={currencyFormat(
                          formik.values.withholdingTax || 0,
                        )}
                      />
                      <BoxAttribute
                        label="GMF"
                        value={currencyFormat(formik.values.gmf || 0)}
                      />
                      <BoxAttribute
                        label="Valor neto a girar:"
                        value={currencyFormat(formik.values.netValue)}
                      />
                    </Grid>
                  </Stack>
                </>
              )}
            </Stack>
          </Fieldset>
        </Stack>
      </form>
    </>
  );
}

export { SavingConditionsFormUI };
