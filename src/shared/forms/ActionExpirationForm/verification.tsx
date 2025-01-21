import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Grid } from "@inubekit/inubekit";
import { IActionExpirationEntry } from "./types";

const renderActionExpirationVerification = (
  values: IActionExpirationEntry,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={inube.spacing.s100}
    width="100%"
  >
    <BoxAttribute
      label="Renovar producto al vencimiento:"
      value={values.actionExpirationName}
    />
  </Grid>
);

export { renderActionExpirationVerification };
