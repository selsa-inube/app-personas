import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Stack } from "@inubekit/stack";
import { ICommentsEntry } from "./types";

const renderCommentsVerification = (values: ICommentsEntry) => (
  <Stack width="100%" direction="column">
    <BoxAttribute
      label="Comentarios adicionales:"
      value={values.comments}
      direction="column"
    />
  </Stack>
);

export { renderCommentsVerification };
