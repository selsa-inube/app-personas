import { Text } from "@design/data/Text";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { Icon } from "@inubekit/icon";
import { MdOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IAttribute } from "src/model/entity/product";

function currentConsumptionAttrs(currentConsumption: IAttribute[]) {
  let consumptionDate;
  let currentInterest;
  let capitalPayment;
  let minPaymentQuotaAvailable;
  let totalPaymentQuotaAvailable;
  let totalCapitalPayment;
  let minCapitalPayment;
  let consumptionValue;

  currentConsumption.forEach((attr) => {
    if (attr.id === "consumption_date") {
      consumptionDate = attr.value;
    }
    if (attr.id === "consumption_value") {
      consumptionValue = attr.value;
    }
    if (attr.id === "interest") {
      currentInterest = attr.value;
    }
    if (attr.id === "capital") {
      capitalPayment = attr.value;
    }
    if (attr.id === "min_payment_quota_available") {
      minPaymentQuotaAvailable = attr.value;
    }
    if (attr.id === "total_payment_quota_available") {
      totalPaymentQuotaAvailable = attr.value;
    }
    if (attr.id === "total_capital") {
      totalCapitalPayment = attr.value;
    }
    if (attr.id === "min_capital") {
      minCapitalPayment = attr.value;
    }
  });

  return {
    consumptionDate,
    consumptionValue,
    currentInterest,
    capitalPayment,
    minPaymentQuotaAvailable,
    totalCapitalPayment,
    totalPaymentQuotaAvailable,
    minCapitalPayment,
  };
}

interface CurrentConsumptionProps {
  title: string;
  isTablet: boolean;
  consumptions: IAttribute[];
  navigateToDetails: string;
}

function CurrentConsumptionBox(props: CurrentConsumptionProps) {
  const { title, isTablet, consumptions, navigateToDetails } = props;

  const {
    consumptionDate,
    consumptionValue,
    currentInterest,
    capitalPayment,
    minPaymentQuotaAvailable,
    minCapitalPayment,
    totalPaymentQuotaAvailable,
    totalCapitalPayment,
  } = currentConsumptionAttrs(consumptions);

  const navigate = useNavigate();

  const handleDetailsConsumption = () => {
    navigate(navigateToDetails);
  };
  return (
    <Grid
      templateColumns={isTablet ? "1fr" : "0.6fr 3fr 0.5fr 0.5fr 0.1fr"}
      gap="s075"
      padding={`${inube.spacing.s200} 0px ${inube.spacing.s200} 0px`}
    >
      {isTablet ? (
        <>
          <Stack direction="column">
            <Stack
              gap="s075"
              justifyContent="space-between"
              padding={`0px 0px ${inube.spacing.s075} 0px`}
            >
              <Text type="label" size="medium">
                {title}
              </Text>
              <Icon
                icon={<MdOpenInNew />}
                appearance="primary"
                size="16px"
                cursorHover={true}
                spacing="narrow"
                onClick={handleDetailsConsumption}
              />
            </Stack>
            <Stack
              justifyContent="space-between"
              padding={`0px 0px ${inube.spacing.s150} 0px`}
            >
              <Text type="label" size="medium" appearance="gray">
                {consumptionDate}
              </Text>
              <Text type="label" size="medium">
                {consumptionValue}
              </Text>
            </Stack>

            <Stack
              justifyContent="end"
              gap="s075"
              padding={`0px 0px ${inube.spacing.s075} 0px`}
            >
              <Text type="label" size="medium">
                Próximo pago
              </Text>
            </Stack>

            <Stack
              justifyContent="space-between"
              padding={`0px 0px ${inube.spacing.s050} 0px`}
            >
              <Text type="body" size="small" appearance="gray">
                {`Intéres corriente  (${currentInterest})`}
              </Text>
              <Text type="body" size="small" appearance="gray">
                {minPaymentQuotaAvailable}
              </Text>
            </Stack>
            <Stack
              justifyContent="space-between"
              padding={`0px 0px ${inube.spacing.s200} 0px`}
            >
              <Text type="body" size="small" appearance="gray">
                {`Abono capital (${capitalPayment})`}
              </Text>
              <Text type="body" size="small" appearance="gray">
                {minCapitalPayment}
              </Text>
            </Stack>
            <Stack
              justifyContent="end"
              padding={`0px 0px ${inube.spacing.s075} 0px`}
            >
              <Text type="label" size="medium">
                Próximo total
              </Text>
            </Stack>

            <Stack
              justifyContent="space-between"
              padding={`0px 0px ${inube.spacing.s050} 0px`}
            >
              <Text type="body" size="small" appearance="gray">
                {`Intéres corriente  (${currentInterest})`}
              </Text>
              <Text type="body" size="small" appearance="gray">
                {totalPaymentQuotaAvailable}
              </Text>
            </Stack>
            <Stack
              justifyContent="space-between"
              padding={`0px 0px ${inube.spacing.s200} 0px`}
            >
              <Text type="body" size="small" appearance="gray">
                {`Abono capital (${capitalPayment})`}
              </Text>
              <Text type="body" size="small" appearance="gray">
                {totalCapitalPayment}
              </Text>
            </Stack>
          </Stack>
        </>
      ) : (
        <>
          <Stack>
            <Text type="label" size="medium" appearance="gray">
              {consumptionDate}
            </Text>
          </Stack>

          <Stack direction="column" gap="s100">
            <Text type="label" size="medium">
              {`${title} (${consumptionValue})`}
            </Text>
            <Text type="body" size="small" appearance="gray">
              {`Intéres corriente  (${currentInterest})`}
            </Text>
            <Text type="body" size="small" appearance="gray">
              {`Abono capital (${capitalPayment})`}
            </Text>
          </Stack>
          <Stack direction="column" alignItems="center" gap="s100">
            <Text type="label" size="medium">
              Próximo pago
            </Text>
            <Text type="body" size="small" appearance="gray">
              {minPaymentQuotaAvailable}
            </Text>
            <Text type="body" size="small" appearance="gray">
              {minCapitalPayment}
            </Text>
          </Stack>
          <Stack direction="column" alignItems="center" gap="s100">
            <Text type="label" size="medium">
              Próximo total
            </Text>
            <Text type="body" size="small" appearance="gray">
              {totalPaymentQuotaAvailable}
            </Text>
            <Text type="body" size="small" appearance="gray">
              {totalCapitalPayment}
            </Text>
          </Stack>
          <Stack alignItems="center">
            <Icon
              icon={<MdOpenInNew />}
              appearance="primary"
              size="16px"
              cursorHover={true}
              onClick={handleDetailsConsumption}
            />
          </Stack>
        </>
      )}
    </Grid>
  );
}

export { CurrentConsumptionBox };
