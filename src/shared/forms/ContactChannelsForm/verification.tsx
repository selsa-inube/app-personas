import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Grid } from "@inubekit/grid";
import { activeDM } from "src/model/domains/general/activedm";
import { IContactChannelsEntry } from "./types";

const renderContactChannelsVerification = (
  values: IContactChannelsEntry,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    gap={inube.spacing.s100}
    autoRows="auto"
    width="100%"
  >
    {values.landlinePhone && (
      <BoxAttribute label="Teléfono:" value={values.landlinePhone} />
    )}

    <BoxAttribute label="Celular:" value={values.cellPhone} />
    <BoxAttribute label="Correo:" value={values.email} />
    <BoxAttribute
      label="Autoriza recibir información:"
      value={values.acceptNotifications ? activeDM.Y.value : activeDM.N.value}
    />
  </Grid>
);

export { renderContactChannelsVerification };
