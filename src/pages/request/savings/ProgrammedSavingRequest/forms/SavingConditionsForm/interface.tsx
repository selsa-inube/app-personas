import { BoxAttribute } from "@components/cards/BoxAttribute";
import { OutlineCard } from "@components/cards/OutlineCard";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Fieldset } from "@inubekit/fieldset";
import { Divider, Grid, Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { FormikProps } from "formik";
import { MdAttachMoney, MdTag } from "react-icons/md";
import {
  currencyFormat,
  parseCurrencyString,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { IProgrammedSavingProduct } from "../DestinationForm/types";
import { ISavingConditionsEntry } from "./types";

interface SavingConditionsFormUIProps {
  formik: FormikProps<ISavingConditionsEntry>;
  loading?: boolean;
  loadingSimulation?: boolean;
  periodicityOptions: ISelectOption[];
  product?: IProgrammedSavingProduct;
  simulateSaving: () => void;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onChangePaymentMethod: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangePeriodicity: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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

  const gridCols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <>
      <form>
        <Stack direction="column" gap={inube.spacing.s400}>
          <Fieldset
            legend="Simulador de ahorro"
            type={isMobile ? "label" : "title"}
            size={isMobile ? "medium" : "small"}
          >
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
                  <OutlineCard>
                    <Stack
                      direction="column"
                      padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
                      gap={inube.spacing.s025}
                    >
                      <Text type="label" size="medium" weight="bold">
                        Cuota mínima:
                      </Text>
                      <Text type="body" size="medium" appearance="gray">
                        {currencyFormat(product?.minQuota || 0)}
                      </Text>
                    </Stack>
                  </OutlineCard>

                  <OutlineCard>
                    <Stack
                      direction="column"
                      padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
                      gap={inube.spacing.s025}
                    >
                      <Text type="label" size="medium" weight="bold">
                        Plazo mínimo:
                      </Text>
                      <Text type="body" size="medium" appearance="gray">
                        {product?.minDeadline} meses
                      </Text>
                    </Stack>
                  </OutlineCard>

                  <OutlineCard>
                    <Stack
                      direction="column"
                      padding={`${inube.spacing.s150} ${inube.spacing.s200}`}
                      gap={inube.spacing.s025}
                    >
                      <Text type="label" size="medium" weight="bold">
                        Plazo máximo:
                      </Text>
                      <Text type="body" size="medium" appearance="gray">
                        {product?.maxDeadline} meses
                      </Text>
                    </Stack>
                  </OutlineCard>
                </Grid>
              </Stack>

              <Divider dashed />

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
                    <TextField
                      label="Cuota"
                      placeholder="Ingresa el valor de la cuota"
                      name="quota"
                      id="quota"
                      value={validateCurrencyField("quota", formik) || ""}
                      type="text"
                      errorMessage={formik.errors.quota}
                      isDisabled={loading}
                      size="compact"
                      isFullWidth
                      state={getFieldState(formik, "quota")}
                      onBlur={formik.handleBlur}
                      onChange={handleChangeWithCurrency}
                      iconAfter={<MdAttachMoney />}
                    />

                    <TextField
                      label="¿Cuántas cuotas?"
                      placeholder="Ingresa la cantidad de cuotas"
                      name="deadline"
                      id="deadline"
                      value={formik.values.deadline || ""}
                      type="number"
                      errorMessage={formik.errors.deadline}
                      isDisabled={!formik.values.quota || loading}
                      size="compact"
                      isFullWidth
                      state={getFieldState(formik, "deadline")}
                      onBlur={formik.handleBlur}
                      onChange={customHandleChange}
                      iconAfter={<MdTag />}
                    />

                    <Select
                      id="paymentMethod"
                      name="paymentMethod"
                      label="Medio de pago"
                      size="compact"
                      value={formik.values.paymentMethod?.id || ""}
                      options={formik.values.paymentMethods || []}
                      errorMessage={formik.errors.paymentMethod}
                      onBlur={formik.handleBlur}
                      onChange={onChangePaymentMethod}
                      state={getFieldState(formik, "paymentMethod")}
                      isFullWidth
                      readOnly={formik.values.paymentMethods.length === 1}
                    />
                    <Select
                      label="Periodicidad"
                      name="periodicity"
                      id="periodicity"
                      value={formik.values.periodicity.id}
                      size="compact"
                      isFullWidth
                      options={periodicityOptions}
                      onBlur={formik.handleBlur}
                      errorMessage={formik.errors.periodicity?.id}
                      isDisabled={!formik.values.paymentMethod?.value}
                      state={getFieldState(formik, "periodicity")}
                      onChange={onChangePeriodicity}
                      readOnly={periodicityOptions.length === 1}
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
                        !!formik.errors.deadline ||
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
                        label="Desembolso aproximado:"
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
