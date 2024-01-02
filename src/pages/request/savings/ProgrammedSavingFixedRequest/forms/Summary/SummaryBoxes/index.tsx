import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Stack } from "@design/layout/Stack";
import { currencyFormat } from "src/utils/formats";
import { IFormsProgrammedSavingFixedRequest } from "../../../types";
import { IQuotaEntry } from "../../QuotaForm/types";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { peridiocityDM } from "src/model/domains/general/peridiocity";

const renderQuotaSummary = (
  values: IQuotaEntry,
  isTablet: boolean
) => (
  <Stack direction="column" gap={isTablet ? "s200" : "s250"} width="100%">
    <BoxAttribute
      label="Valor periódico del ahorro:"
      value={currencyFormat(Number(values.periodicValue))}
    />
    <BoxAttribute
      label="Medio de pago:"
      value={getValueOfDomain(values.paymentMethod, "paymentMethod")?.value}
      
    />
    <BoxAttribute
      label="Periodicidad:"
      value={peridiocityDM.valueOf(values.periodicity)?.value}
    />
  </Stack>
);

interface SummaryBoxesProps {
programmedSavingFixedRequest: IFormsProgrammedSavingFixedRequest;
  stepKey: string;
  isTablet: boolean;
}

function SummaryBoxes(props: SummaryBoxesProps) {
  const { programmedSavingFixedRequest, stepKey, isTablet } = props;
  return (
    <>
      {stepKey === "quota" &&
        renderQuotaSummary(programmedSavingFixedRequest.quota.values, isTablet)}
    </>
  );
}

export { SummaryBoxes };
