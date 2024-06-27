import { QuickAccess } from "@components/cards/QuickAccess";
import { RecordCard } from "@components/cards/RecordCard";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Button } from "@design/input/Button";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdAdd, MdArrowBack, MdHistory } from "react-icons/md";
import { EMovementType } from "src/model/entity/product";
import { ITransfer } from "src/model/entity/transfer";
import { EmptyRecords } from "./EmptyRecords";
import { crumbsTransferHistory } from "./config/navigation";
import { StyledContainer } from "./styles";
import { generateAttributes } from "./config/attributeRecord";

interface TransferHistoryUIProps {
  transferHistory: ITransfer[];
  loading: boolean;
  noMoreTransfers: boolean;
  refreshTime: number;
  onAddTransfers: () => void;
  onRefreshHistory: () => void;
}

function TransferHistoryUI(props: TransferHistoryUIProps) {
  const {
    transferHistory,
    loading,
    noMoreTransfers,
    refreshTime,
    onAddTransfers,
    onRefreshHistory,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <>
      <Stack
        direction="column"
        gap={isMobile ? "s300" : isTablet ? "s500" : "s600"}
      >
        <Stack direction="column" gap="s300">
          <Breadcrumbs crumbs={crumbsTransferHistory} />
          <Title
            title="Histórico de transferencias"
            subtitle="Últimas transferencias realizadas"
            icon={<MdArrowBack />}
            navigatePage="/transfers"
          />
        </Stack>
      </Stack>
      <Grid
        gap="s600"
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s300">
          <Stack direction="column" alignItems="flex-end">
            <Button
              appearance="primary"
              variant="outlined"
              spacing="compact"
              iconBefore={<MdHistory />}
              onClick={onRefreshHistory}
              load={loading}
              disabled={!loading && refreshTime !== 0}
            >
              {refreshTime !== 0 ? `${refreshTime} Seg.` : "Refrescar"}
            </Button>
          </Stack>

          {transferHistory.length > 0 ? (
            <>
              <StyledContainer>
                {transferHistory.map((transfer, index) => (
                  <Stack
                    direction="column"
                    width="100%"
                    key={transfer.id}
                    gap="s200"
                  >
                    <RecordCard
                      type={EMovementType.RECORD}
                      description={transfer.title}
                      totalValue={transfer.value}
                      tag={transfer.tag}
                      attributes={generateAttributes(transfer)}
                    />
                    {index !== transferHistory.length - 1 && <Divider dashed />}
                  </Stack>
                ))}
              </StyledContainer>
              <Stack direction="column" alignItems="center">
                <Button
                  appearance="primary"
                  variant="none"
                  iconBefore={<MdAdd />}
                  load={loading}
                  onClick={onAddTransfers}
                  disabled={noMoreTransfers}
                >
                  Ver más transferencias
                </Button>
              </Stack>
            </>
          ) : (
            !loading && <EmptyRecords />
          )}
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { TransferHistoryUI };
