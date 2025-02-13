import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Grid } from "@inubekit/inubekit";
import { truncateFileName } from "src/utils/texts";
import { IDocumentaryRequirementsEntry } from "./types";

const renderDocumentaryRequirementsVerification = (
  values: IDocumentaryRequirementsEntry,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={inube.spacing.s100}
      width="100%"
    >
      {values.selectedDocuments.map((document) => (
        <BoxAttribute
          key={document.file.name}
          label={truncateFileName(document.file.name, 55)}
        />
      ))}
    </Grid>
  );
};

export { renderDocumentaryRequirementsVerification };
