import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Grid, Tag } from "@inubekit/inubekit";
import { ISystemValidationsEntry } from "./types";

const renderSystemValidationsVerification = (
  values: ISystemValidationsEntry,
  isTablet: boolean,
) => {
  return (
    <Grid
      templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
      autoRows="auto"
      gap={inube.spacing.s100}
      width="100%"
    >
      {values.validations
        .filter((validation) => validation.required)
        .map((validation) => (
          <BoxAttribute
            key={validation.id}
            value={validation.label}
            iconAfter={
              validation.value === "success" ? (
                <Tag label="Cumple" appearance="success" />
              ) : validation.value === "fail" ? (
                <Tag label="No cumple" appearance="danger" />
              ) : (
                <Tag label="Por evaluar" appearance="warning" />
              )
            }
          />
        ))}
    </Grid>
  );
};

export { renderSystemValidationsVerification };
