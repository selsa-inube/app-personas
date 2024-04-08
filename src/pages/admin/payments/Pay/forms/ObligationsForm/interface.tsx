import { PaymentCard } from "@components/cards/PaymentCard";
import { IApplyPayOption } from "@components/modals/payments/CustomValueModal";
import { IPaymentFilters } from "@components/modals/payments/PaymentFilterModal";
import { Tag } from "@design/data/Tag";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Fieldset } from "@design/input/Fieldset";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdCheckBox, MdFilterAlt } from "react-icons/md";
import { IPayment } from "src/model/entity/payment";
import { currencyFormat } from "src/utils/currency";
import { paymentFilters, paymentInitialFilters } from "./config/filters";
import { StyledTotalPayment } from "./styles";

const renderFilters = (filters: IPaymentFilters) => {
  return Object.entries(filters).map(([key, id]) => {
    const filterInitialId =
      paymentInitialFilters[key as keyof typeof paymentInitialFilters];

    const filterLabel = paymentFilters[key as keyof typeof paymentFilters].find(
      (option) => option.id === id,
    )?.value;

    return (
      id !== filterInitialId &&
      filterLabel && (
        <Tag
          key={key}
          label={filterLabel}
          appearance="gray"
          modifier="clear"
          textAppearance="gray"
          removable
        />
      )
    );
  });
};

interface ObligationsFormUIProps {
  formik: FormikValues;
  onApplyPayOption: (payId: string, option: IApplyPayOption) => void;
  onChangePaymentValue: (payId: string, valueToPay: number) => void;
}

function ObligationsFormUI(props: ObligationsFormUIProps) {
  const { formik, onApplyPayOption, onChangePaymentValue } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 550px)");

  return (
    <>
      <form>
        <Stack direction="column" gap={isMobile ? "s300" : "s400"}>
          <Stack direction="column" gap="s200">
            <Stack
              gap="s150"
              alignItems="center"
              justifyContent="flex-end"
              width="100%"
            >
              <Button
                spacing="compact"
                variant="outlined"
                iconBefore={<MdCheckBox />}
              >
                Ayudas
              </Button>
              <Button spacing="compact" iconBefore={<MdFilterAlt />}>
                Filtros
              </Button>
            </Stack>

            <Fieldset title="Filtros aplicados">
              <Stack direction="row" gap="s150">
                {renderFilters(formik.values.filters)}
              </Stack>
            </Fieldset>
          </Stack>

          <Stack direction="column" gap="s300">
            <Grid
              templateColumns={isTablet ? "1fr" : "1fr 1fr"}
              gap={isMobile ? "s200" : "s300"}
            >
              {formik.values.payments.map((payment: IPayment) => (
                <PaymentCard
                  key={payment.id}
                  id={payment.id}
                  title={payment.title}
                  options={payment.options}
                  tags={payment.tags}
                  allowCustomValue={formik.values.allowCustomValue}
                  onApplyPayOption={onApplyPayOption}
                  onChangePaymentValue={onChangePaymentValue}
                />
              ))}
            </Grid>

            <Divider dashed />

            <Stack justifyContent="flex-end" width="100%">
              <StyledTotalPayment isMobile={isMobile}>
                <Text type="title" size="small">
                  Total a pagar hoy:
                </Text>
                <Text type="body" size="medium">
                  {currencyFormat(formik.values.totalPayment)}
                </Text>
              </StyledTotalPayment>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </>
  );
}

export { ObligationsFormUI };
