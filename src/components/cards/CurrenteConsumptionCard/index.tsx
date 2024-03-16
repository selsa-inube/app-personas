import { Divider } from "@design/layout/Divider";
import { CurrenteConsumption } from "./CurrentConsumption";
import { StyledContainer } from "./styles";

interface CurrenteConsumptionCardProps {
    isTablet: boolean;
  attributes: [];
}

function CurrenteConsumptionCard(props: CurrenteConsumptionCardProps) {
    const { isTablet, attributes } = props;
    return (
        <StyledContainer>
<CurrenteConsumption isTablet={isTablet} attributes={attributes}/>
<Divider dashed />
<CurrenteConsumption isTablet={isTablet} attributes={attributes}/>

</StyledContainer>
    )
}

export {CurrenteConsumptionCard}