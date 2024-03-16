import { Text } from "@design/data/Text";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { MdOpenInNew } from "react-icons/md";

interface CurrenteConsumptionProps {
  isTablet: boolean;
  attributes: [];
}

function CurrenteConsumption(props: CurrenteConsumptionProps) {
  const { isTablet, attributes } = props;

  return (
    <>
      {isTablet ? (
        <>
          <Stack direction="column" gap="s150">
            <Stack direction="column">
              <Stack
                justifyContent="space-between"
                margin={`0px  0px ${inube.spacing.s075} 0px`}
              >
                <Text type="label" size="medium">
                  {`Compra RESTAURANTE YANUBA `}
                </Text>
                <Stack alignItems="center">
                  <MdOpenInNew />
                </Stack>
              </Stack>
              <Stack justifyContent="space-between">
                <Text type="label" size="medium" appearance="gray">
                  {`21/Feb/2024`}
                </Text>
                <Text type="label" size="medium">
                  {`${attributes}`}
                </Text>
              </Stack>
            </Stack>

            <Stack direction="column">
              <Stack justifyContent="flex-end" margin={`0px  0px ${inube.spacing.s100} 0px`}>
                <Text type="label" size="medium">
                  Pago min.
                </Text>
              </Stack>
              <Stack justifyContent="space-between" margin={`0px  0px ${inube.spacing.s050} 0px`}>
                <Text type="body" size="small" appearance="gray">
                  {`Intéres corriente  (cantidad % MV)`}
                </Text>
                <Text type="body" size="small" appearance="gray">
                  {`$50.000`}
                </Text>
              </Stack>
              <Stack justifyContent="space-between">
                <Text type="body" size="small" appearance="gray">
                  {`Abono capital (cantidad)`}
                </Text>
                <Text type="body" size="small" appearance="gray">
                  {`$25.000`}
                </Text>
              </Stack>
            </Stack>

            <Stack direction="column">
              <Stack justifyContent="flex-end" margin={`0px  0px ${inube.spacing.s100} 0px`}>
                <Text type="label" size="medium">
                  Pago tot.
                </Text>
              </Stack>
              <Stack justifyContent="space-between" margin={`0px  0px ${inube.spacing.s050} 0px`}>
                <Text type="body" size="small" appearance="gray">
                  {`Intéres corriente  (cantidad % MV)`}
                </Text>
                <Text type="body" size="small" appearance="gray">
                  {`$50.000`}
                </Text>
              </Stack>
              <Stack justifyContent="space-between">
                <Text type="body" size="small" appearance="gray">
                  {`Abono capital (cantidad)`}
                </Text>
                <Text type="body" size="small" appearance="gray">
                  {`$80.000`}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </>
      ) : (
        <Grid
          // autoFlow="column"
          templateColumns={"1fr  4fr 1fr 1fr 0.5fr"}
          margin="s200"
        >
          <Stack>
            <Text type="label" size="medium" appearance="gray" >
              {`21/Feb/2024`}
            </Text>
          </Stack>

          <Stack direction="column" gap="s100">
            <Text type="label" size="medium">
              {`Compra RESTAURANTE YANUBA ($250.000)`}
            </Text>
            <Text type="body" size="small" appearance="gray">
              {`Intéres corriente  (cantidad % MV)`}
            </Text>
            <Text type="body" size="small" appearance="gray">
              {`Abono capital (cantidad)`}
            </Text>
          </Stack>
          <Stack direction="column" alignItems="center" gap="s100">
            <Text type="label" size="medium">
              Pago min.
            </Text>
            <Text type="body" size="small" appearance="gray">
              {`$50.000`}
            </Text>
            <Text type="body" size="small" appearance="gray">
              {`$50.000`}
            </Text>
          </Stack>
          <Stack direction="column" alignItems="center" gap="s100">
            <Text type="label" size="medium">
              Pago tot.
            </Text>
            <Text type="body" size="small" appearance="gray">
              {`$50.000`}
            </Text>
            <Text type="body" size="small" appearance="gray">
              {`$50.000`}
            </Text>
          </Stack>
          <Stack alignItems="center">
            <MdOpenInNew />
          </Stack>
        </Grid>
      )}
    </>
  );
}

export { CurrenteConsumption };
