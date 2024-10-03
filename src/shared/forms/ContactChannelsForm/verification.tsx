import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Stack } from "@inubekit/stack";
import { activeDM } from "src/model/domains/general/activedm";
import { IContactChannelsEntry } from "./types";

const renderContactChannelsVerification = (values: IContactChannelsEntry) => (
  <Stack width="100%" direction="column" gap={inube.spacing.s100}>
    {values.landlinePhone && (
      <BoxAttribute label="Teléfono:" value={values.landlinePhone} />
    )}

    <BoxAttribute label="Celular:" value={values.cellPhone} />
    <BoxAttribute label="Correo:" value={values.email} />
    <BoxAttribute
      label="Autoriza recibir información:"
      value={values.acceptNotifications ? activeDM.Y.value : activeDM.N.value}
    />
  </Stack>
);

export { renderContactChannelsVerification };
