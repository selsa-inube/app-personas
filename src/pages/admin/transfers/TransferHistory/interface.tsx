import { QuickAccess } from "@components/cards/QuickAccess";
import { RecordCard } from "@components/cards/RecordCard";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useQuickLinks } from "@hooks/useQuickLinks";
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { EMovementType } from "src/model/entity/product";
import { ITransfer } from "src/model/entity/transfer";
import { EmptyRecords } from "./EmptyRecords";
import { generateAttributes } from "./config/attributeRecord";
import { crumbsTransferHistory } from "./config/navigation";
import { StyledContainer } from "./styles";

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
    onAddTransfers,
  } = props;
  const quickLinksArray = useQuickLinks();

  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 450px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <>
      <Stack
        direction="column"
        gap={
          isMobile
            ? inube.spacing.s300
            : isTablet
              ? inube.spacing.s500
              : inube.spacing.s600
        }
      >
        <Stack direction="column" gap={inube.spacing.s300}>
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
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack direction="column" gap={inube.spacing.s300}>
          <Stack direction="column" gap={inube.spacing.s100}>
            <Text type="title" size="small" weight="bold">
              Movimientos en proceso
            </Text>

            <Text type="body" size="medium" appearance="gray">
              Una vez procesado el pago, los movimientos dentro de los productos
              relacionados pueden tardar unos minutos en aparecer.
            </Text>
          </Stack>

          {transferHistory.length > 0 ? (
            <>
              <StyledContainer>
                {transferHistory.map((transfer, index) => (
                  <Stack
                    direction="column"
                    width="100%"
                    key={transfer.id}
                    gap={inube.spacing.s200}
                  >
                    <RecordCard
                      id={transfer.id}
                      type={EMovementType.RECORD}
                      description={transfer.title}
                      value={transfer.value}
                      tag={transfer.tag.label !== "" ? transfer.tag : undefined}
                      attributes={generateAttributes(transfer)}
                      datesWithTime
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
                  loading={loading}
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
        {isDesktop && <QuickAccess links={quickLinksArray} />}
      </Grid>
    </>
  );
}

export { TransferHistoryUI };
