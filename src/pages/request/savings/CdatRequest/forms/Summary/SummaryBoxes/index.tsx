import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Stack } from "@design/layout/Stack";
import { currencyFormat } from "src/utils/formats";
import { IFormsCdatRequest} from "../../../types";
import { IInvestmentEntry } from "../../InvestmentForm/types";
import { IConditionsEntry } from "../../ConditionsForm/types";
import { peridiocityDM } from "src/model/domains/general/peridiocity";


const renderInvestmentSummary = (values: IInvestmentEntry,  isTablet: boolean) =>(
  <Stack direction="column" gap={isTablet ? "s200" : "s250"} width="100%">
    <BoxAttribute
      label="Valor de la inversión:"
      value={currencyFormat(Number(values.valueInvestment))}
    />
    
  </Stack>
);

const renderConditionsSummary = (values: IConditionsEntry,  isTablet: boolean) =>(
  <Stack direction="column" gap={isTablet ? "s200" : "s250"} width="100%">
    <BoxAttribute
      label="Pago de intereses:"
      value={peridiocityDM.valueOf(values.interestPayment)?.value}
    />
    <BoxAttribute
      label="Número de días:"
      value={values.deadlineDays}
    />
    
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
          renderInvestmentSummary(
            cdatRequest.investment.values,
            isTablet
          )}       
          {stepKey === "conditions" &&
          renderConditionsSummary(
            cdatRequest.conditions.values,
            isTablet
          )}  
      </>
    );
  }
  
  export { SummaryBoxes };