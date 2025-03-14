import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Grid } from "@inubekit/inubekit";
import { activeDM } from "src/model/domains/general/activedm";
import { ITermsAndConditionsEntry } from "./types";

const renderTermsAndConditionsVerification = (
  values: ITermsAndConditionsEntry,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={inube.spacing.s100}
    width="100%"
  >
    {values.termsConditions.length > 0 && (
      <BoxAttribute
        label="Acepta términos y condiciones:"
        value={values.accept ? activeDM.Y.value : activeDM.N.value}
      />
    )}

    <BoxAttribute
      label="Acepta política de tratamiento de datos:"
      value={values.acceptDataPolicy ? activeDM.Y.value : activeDM.N.value}
    />
  </Grid>
);

export { renderTermsAndConditionsVerification };
