import { Stack } from "@design/layout/Stack";
import { CurrentConsumptionBox } from "./CurrentConsumptionBox";
import { IProduct } from "src/model/entity/product";
import { StyledContainer } from "./styles";
import {
  extractConsumptionAttrs,
  formatCurrentConsumptionAttrs,
} from "@pages/admin/cards/CreditQuota/config/product";
import { Divider } from "@inubekit/divider";

interface CurrentConsumptionProps {
  isTablet: boolean;
  consumptions: IProduct[];
  navigateToDetails: string;
}

function CurrentConsumption(props: CurrentConsumptionProps) {
  const { isTablet, consumptions, navigateToDetails } = props;

  const lastConsumption = consumptions.length - 1;

  return (
    <StyledContainer>
      {consumptions.map((consumption, index) => (
        <Stack direction="column" key={consumption.id}>
          <CurrentConsumptionBox
            isTablet={isTablet}
            title={consumption.title}
            consumptions={formatCurrentConsumptionAttrs(
              extractConsumptionAttrs(consumption),
            )}
            navigateToDetails={`${navigateToDetails}/${consumption.id}`}
          />
          {index !== lastConsumption && <Divider dashed />}
        </Stack>
      ))}
    </StyledContainer>
  );
}
export type { CurrentConsumptionProps };
export { CurrentConsumption };
