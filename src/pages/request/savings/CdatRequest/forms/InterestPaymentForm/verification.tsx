import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Grid } from "@inubekit/inubekit";
import { IInterestPaymentEntry } from "./types";

const renderInterestPaymentVerification = (
  values: IInterestPaymentEntry,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={inube.spacing.s100}
    width="100%"
  >
    <BoxAttribute
      label="Pago de intereses:"
      value={values.interestPaymentName}
    />
  </Grid>
);

export { renderInterestPaymentVerification };
