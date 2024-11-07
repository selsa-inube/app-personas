import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Grid } from "@inubekit/grid";
import { IShareMaturityEntry } from "./types";

const renderShareMaturityVerification = (
  values: IShareMaturityEntry,
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
      value={values.shareMaturityName}
    />
  </Grid>
);

export { renderShareMaturityVerification };
