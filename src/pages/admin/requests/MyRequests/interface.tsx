import { QuickAccess } from "@components/cards/QuickAccess";
import { RecordCard } from "@components/cards/RecordCard";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Divider, Grid, Stack } from "@inubekit/inubekit";
import { MdAdd, MdArrowBack, MdHistory } from "react-icons/md";
import { EMovementType } from "src/model/entity/product";
import { IRequest } from "src/model/entity/request";
import { EmptyRecords } from "./EmptyRecords";
import { generateAttributes } from "./config/attributeRecord";
import { crumbsMyRequests } from "./config/navigation";
import { StyledContainer } from "./styles";

interface MyRequestsUIProps {
  requests: IRequest[];
  loading: boolean;
  noMoreRequests: boolean;
  refreshTime: number;
  onAddRequests: () => void;
  onRefresh: () => void;
}

function MyRequestsUI(props: MyRequestsUIProps) {
  const {
    requests,
    loading,
    noMoreRequests,
    refreshTime,
    onAddRequests,
    onRefresh,
  } = props;

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
                      attributes={generateAttributes(request)}
                      withExpandingIcon
                      path={`/my-requests/${request.id}`}
                      datesWithTime
                      label={request.label}
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
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { MyRequestsUI };
