import { QuickAccess } from "@components/cards/QuickAccess";
import { RecordCard } from "@components/cards/RecordCard";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs, Button, Divider, Grid, Stack } from "@inubekit/inubekit";
import { MdAdd, MdArrowBack, MdHistory } from "react-icons/md";
import { EMovementType } from "src/model/entity/product";
import { IRequest } from "src/model/entity/request";
import { EmptyRecords } from "./EmptyRecords";
import { generateAttributes } from "./config/attributeRecord";
import { crumbsMyRequests } from "./config/navigation";
import { StyledContainer } from "./styles";
import { useQuickLinks } from "@hooks/useQuickLinks";

interface MyRequestsUIProps {
  requests: IRequest[];
  loading: boolean;
  noMoreRequests: boolean;
  refreshTime: number;
  onAddRequests: () => void;
  onRefresh: () => void;
  onGoToDetail: (id: string) => void;
}

function MyRequestsUI(props: MyRequestsUIProps) {
  const {
    requests,
    loading,
    noMoreRequests,
    refreshTime,
    onAddRequests,
    onRefresh,
    onGoToDetail,
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
          <Breadcrumbs crumbs={crumbsMyRequests} />
          <Title
            title="Mis solicitudes"
            subtitle="Realiza seguimiento a las solitudes de tus productos"
            icon={<MdArrowBack />}
            navigatePage="/"
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
          <Stack justifyContent="flex-end" alignItems="center">
            <Button
              appearance="primary"
              variant="outlined"
              spacing="compact"
              iconBefore={<MdHistory />}
              onClick={onRefresh}
              loading={loading}
              disabled={!loading && refreshTime !== 0}
            >
              {refreshTime !== 0 ? `${refreshTime} Seg.` : "Refrescar"}
            </Button>
          </Stack>

          {requests.length > 0 ? (
            <>
              <StyledContainer>
                {requests.map((request, index) => (
                  <Stack
                    direction="column"
                    width="100%"
                    key={request.id}
                    gap={inube.spacing.s200}
                  >
                    <RecordCard
                      id={request.id}
                      type={EMovementType.RECORD}
                      description={request.title}
                      value={request.value}
                      tag={request.tag}
                      withExpandingIcon
                      attributes={generateAttributes(request)}
                      datesWithTime
                      label={request.label}
                      onClick={() => onGoToDetail(request.id)}
                    />
                    {index !== requests.length - 1 && <Divider dashed />}
                  </Stack>
                ))}
              </StyledContainer>
              <Stack direction="column" alignItems="center">
                <Button
                  appearance="primary"
                  variant="none"
                  iconBefore={<MdAdd />}
                  loading={loading}
                  onClick={onAddRequests}
                  disabled={noMoreRequests}
                >
                  Ver más solicitudes
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

export { MyRequestsUI };
