import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Stack } from "@design/layout/Stack";
import { currencyFormat } from "src/utils/formats";
import { IFormsCdatRequest } from "../../../types";
import { IInvestmentEntry } from "../../InvestmentForm/types";
import { IInvestmentNameEntry } from "../../InvestmentNameForm/types";
import { IRefundEntry } from "../../RefundForm/types";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";

const renderInvestmentSummary = (
  values: IInvestmentEntry,
  isTablet: boolean
) => (
  <Stack direction="column" gap={isTablet ? "s200" : "s250"} width="100%">
    <BoxAttribute
      label="Valor de la inversión:"
      value={currencyFormat(Number(values.valueInvestment))}
    />
  </Stack>
);

const renderRefundSummary = (values: IRefundEntry) => (
  <Stack direction="column" gap="s100" width="100%">
    <BoxAttribute
      label="Forma de reembolso:"
      value={getValueOfDomain(values.refundMethod, "refundMethod")?.value}
    />
    <BoxAttribute
      label="Cuenta:"
      value={getValueOfDomain(values.account, "refundAccount")?.value}
    />
  </Stack>
);

const renderInvestmentNameSummary = (
  values: IInvestmentNameEntry,
  isTablet: boolean
) => (
  <Stack direction="column" gap={isTablet ? "s200" : "s250"} width="100%">
    <BoxAttribute label="Nombre del producto:" value={values.productName} />
  </Stack>
);

interface SummaryBoxesProps {
  cdatRequest: IFormsCdatRequest;
  stepKey: string;
  isTablet: boolean;
}

function SummaryBoxes(props: SummaryBoxesProps) {
  const { cdatRequest, stepKey, isTablet } = props;
  return (
    <>
      {stepKey === "investment" &&
        renderInvestmentSummary(cdatRequest.investment.values, isTablet)}
      {stepKey === "refund" && renderRefundSummary(cdatRequest.refund.values)}
      {stepKey === "investmentName" &&
        renderInvestmentNameSummary(
          cdatRequest.investmentName.values,
          isTablet
        )}
    </>
  );
}

export { SummaryBoxes };
