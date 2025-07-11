import { inube } from "@design/tokens";
import { Grid, Icon, Stack, Text } from "@inubekit/inubekit";
import { MdOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IAttribute } from "src/model/entity/product";

function currentConsumptionAttrs(currentConsumption: IAttribute[]) {
  let consumptionDate;
  let currentInterest;
  let capitalPayment;
  let nextPaymentInterest;
  let totalPaymentInterest;
  let totalPaymentCapital;
  let nextPaymentCapital;
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
    if (attr.id === "next_payment_interest") {
      nextPaymentInterest = attr.value;
    }
    if (attr.id === "total_payment_interest") {
      totalPaymentInterest = attr.value;
    }
    if (attr.id === "total_payment_capital") {
      totalPaymentCapital = attr.value;
    }
    if (attr.id === "next_payment_capital") {
      nextPaymentCapital = attr.value;
    }
  });

  return {
    consumptionDate,
    consumptionValue,
    currentInterest,
    capitalPayment,
    nextPaymentInterest,
    totalPaymentCapital,
    totalPaymentInterest,
    nextPaymentCapital,
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
    nextPaymentInterest,
    nextPaymentCapital,
    totalPaymentInterest,
    totalPaymentCapital,
  } = currentConsumptionAttrs(consumptions);

  const navigate = useNavigate();

  const handleDetailsConsumption = () => {
    navigate(navigateToDetails);
  };
  return (
    <Grid
      templateColumns={isTablet ? "1fr" : "4fr 30fr 4fr 4fr 0.5fr"}
      padding={`${inube.spacing.s200} ${inube.spacing.s0}`}
      gap={inube.spacing.s200}
    >
      {isTablet ? (
        <>
          <Stack direction="column" gap={inube.spacing.s150}>
            <Stack direction="column" gap={inube.spacing.s075}>
              <Stack justifyContent="space-between">
                <Text type="label" size="medium" textAlign="center">
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
              <Stack justifyContent="space-between">
                <Text type="label" size="medium" appearance="gray">
                  {consumptionDate}
                </Text>
                <Text type="label" size="medium">
                  {consumptionValue}
                </Text>
              </Stack>
            </Stack>

            <Stack direction="column" gap={inube.spacing.s200}>
              <Stack direction="column" gap={inube.spacing.s100}>
                <Text type="label" size="medium" textAlign="end">
                  Próximo pago
                </Text>
                <Stack direction="column" gap={inube.spacing.s050}>
                  <Stack justifyContent="space-between">
                    <Text type="body" size="small" appearance="gray">
                      Intéres corriente ({currentInterest})
                    </Text>
                    <Text type="body" size="small" appearance="gray">
                      {nextPaymentInterest}
                    </Text>
                  </Stack>
                  <Stack justifyContent="space-between">
                    <Text type="body" size="small" appearance="gray">
                      Abono capital
                    </Text>
                    <Text type="body" size="small" appearance="gray">
                      {nextPaymentCapital}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>

              <Stack direction="column" gap={inube.spacing.s100}>
                <Text type="label" size="medium" textAlign="end">
                  Pago total
                </Text>
                <Stack direction="column" gap={inube.spacing.s050}>
                  <Stack justifyContent="space-between">
                    <Text type="body" size="small" appearance="gray">
                      Intéres corriente ({currentInterest})
                    </Text>
                    <Text type="body" size="small" appearance="gray">
                      {totalPaymentInterest}
                    </Text>
                  </Stack>
                  <Stack justifyContent="space-between">
                    <Text type="body" size="small" appearance="gray">
                      Abono capital ({capitalPayment})
                    </Text>
                    <Text type="body" size="small" appearance="gray">
                      {totalPaymentCapital}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
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

          <Stack direction="column" gap={inube.spacing.s100}>
            <Text type="label" size="medium">
              {`${title} (${consumptionValue})`}
            </Text>
            <Text type="body" size="small" appearance="gray">
              {`Intéres corriente  (${currentInterest})`}
            </Text>
            <Text type="body" size="small" appearance="gray">
              {`Abono capital`}
            </Text>
          </Stack>
          <Stack
            direction="column"
            alignItems="center"
            gap={inube.spacing.s100}
          >
            <Text type="label" size="medium" textAlign="center" ellipsis>
              Próximo pago
            </Text>
            <Text type="body" size="small" appearance="gray">
              {nextPaymentInterest}
            </Text>
            <Text type="body" size="small" appearance="gray">
              {nextPaymentCapital}
            </Text>
          </Stack>
          <Stack
            direction="column"
            alignItems="center"
            gap={inube.spacing.s100}
          >
            <Text type="label" size="medium" textAlign="center" ellipsis>
              Pago total
            </Text>
            <Text type="body" size="small" appearance="gray">
              {totalPaymentInterest}
            </Text>
            <Text type="body" size="small" appearance="gray">
              {totalPaymentCapital}
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
