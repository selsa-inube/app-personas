import { QuickAccess } from "@components/cards/QuickAccess";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, IOption, Select } from "@inubekit/inubekit";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { EMovementType, IMovement } from "src/model/entity/product";

import { RecordCard } from "@components/cards/RecordCard";
import { useQuickLinks } from "@hooks/useQuickLinks";
import { Breadcrumbs, Divider, Grid, Stack, Text } from "@inubekit/inubekit";
import { generateAttributes } from "./config/attributeRecord";
import { crumbsSavingCommitmentMovements } from "./config/navigation";
import { StyledMovementsContainer } from "./styles";
import { ISelectedCommitmentState } from "./types";

const renderMovements = (movements: IMovement[], indexMovements: number) =>
  movements &&
  movements.slice(0, indexMovements).map((movement, index) => (
    <Stack
      direction="column"
      gap={inube.spacing.s200}
      key={movement.id}
      width="100%"
    >
      {index !== 0 && <Divider dashed />}
      <RecordCard
        id={movement.id}
        type={movement.type || EMovementType.CREDIT}
        description={movement.description}
        value={movement.totalValue || 0}
        attributes={generateAttributes(movement)}
      />
    </Stack>
  ));

interface SavingCommitmentMovementsUIProps {
  commitmentId?: string;
  commitmentsOptions: IOption[];
  selectedCommitment: ISelectedCommitmentState;
  isMobile: boolean;
  indexMovements: number;
  onAddMovements: () => void;
  handleChangeCommitment: (name: string, value: string) => void;
}

function SavingCommitmentMovementsUI(props: SavingCommitmentMovementsUIProps) {
  const {
    commitmentId,
    commitmentsOptions,
    selectedCommitment,
    isMobile,
    indexMovements,
    onAddMovements,
    handleChangeCommitment,
  } = props;
  const quickLinksArray = useQuickLinks();

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsSavingCommitmentMovements(commitmentId)} />
        <Title
          title="Movimientos"
          subtitle="Movimientos recientes que ha tenido el compromiso de ahorro"
          icon={<MdArrowBack />}
          navigatePage={`/my-savings/commitment/${commitmentId}`}
        />
      </Stack>
      <Grid
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack
          direction="column"
          gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
        >
          <Select
            id="savingCommitments"
            name="savingCommitments"
            onChange={handleChangeCommitment}
            label="Selección del compromiso"
            options={commitmentsOptions}
            value={selectedCommitment.option}
            fullwidth
          />

          <Stack
            direction="column"
            gap={inube.spacing.s200}
            alignItems="flex-start"
          >
            {selectedCommitment.commitment.movements &&
            selectedCommitment.commitment.movements.length > 0 ? (
              <Stack direction="column" gap={inube.spacing.s200}>
                <StyledMovementsContainer $isMobile={isMobile}>
                  {renderMovements(
                    selectedCommitment.commitment.movements,
                    indexMovements,
                  )}
                </StyledMovementsContainer>
                <Stack direction="column" alignItems="center">
                  <Button
                    appearance="primary"
                    variant="none"
                    iconBefore={<MdAdd />}
                    onClick={onAddMovements}
                    disabled={
                      selectedCommitment.commitment.movements.length <=
                      indexMovements
                    }
                  >
                    Ver más movimientos
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap={inube.spacing.s100}
                width="100%"
              >
                <Text type="title" size="small" appearance="dark">
                  No tienes movimientos
                </Text>
                <Text
                  type="body"
                  size={isMobile ? "small" : "medium"}
                  appearance="gray"
                >
                  Aun no posees movimientos en este producto.
                </Text>
              </Stack>
            )}
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinksArray} />}
      </Grid>
    </>
  );
}

export { SavingCommitmentMovementsUI };
