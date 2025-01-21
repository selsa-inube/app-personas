import { QuickAccess } from "@components/cards/QuickAccess";
import { RecordCard } from "@components/cards/RecordCard";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Divider, Grid, Stack } from "@inubekit/inubekit";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { IPQRS } from "src/model/entity/pqrs";
import { EMovementType } from "src/model/entity/product";
import { generateAttributes } from "./config/attributeRecord";
import { crumbsMyPQRS } from "./config/navigation";
import { EmptyRecords } from "./EmptyRecords";
import { StyledContainer } from "./styles";

interface MyPQRSUIProps {
  pqrsRequests?: IPQRS[];
  loading: boolean;
  totalRecords: number;
  visibleRecordsCount: number;
  onNavigateToDetails: (id: string) => void;
  onLoadMore: () => void;
}

function MyPQRSUI(props: MyPQRSUIProps) {
  const {
    pqrsRequests,
    loading,
    totalRecords,
    visibleRecordsCount,
    onNavigateToDetails,
    onLoadMore,
  } = props;
  const isDesktop = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsMyPQRS} />
        <Title
          title="Mis PQRS"
          subtitle="Realiza seguimiento a las solicitudes de tus productos"
          icon={<MdArrowBack />}
          navigatePage="/"
        />
      </Stack>
      <Grid
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack direction="column" gap={inube.spacing.s300}>
          <Stack
            justifyContent="flex-end"
            alignItems="flex-end"
            gap={inube.spacing.s150}
          >
            <Button
              appearance="primary"
              variant="filled"
              spacing="compact"
              iconBefore={<MdAdd />}
              type="link"
              path="/my-pqrs/create"
            >
              Crear PQRS
            </Button>
          </Stack>
          {loading ? (
            <StyledContainer>
              {Array.from({ length: 4 }).map((_, index) => (
                <Stack
                  direction="column"
                  width="100%"
                  key={`loading-${index}`}
                  gap={inube.spacing.s200}
                >
                  <RecordCard
                    id={`loading-${index}`}
                    type={EMovementType.PQRS}
                    description=""
                    attributes={[]}
                    loading
                  />
                  {index !== 3 && <Divider dashed />}
                </Stack>
              ))}
            </StyledContainer>
          ) : pqrsRequests && pqrsRequests.length > 0 ? (
            <>
              <StyledContainer>
                {pqrsRequests.map((pqrs, index) => (
                  <Stack
                    direction="column"
                    width="100%"
                    key={pqrs.id}
                    gap={inube.spacing.s200}
                  >
                    <RecordCard
                      id={pqrs.id}
                      type={EMovementType.PQRS}
                      description={pqrs.title}
                      tag={pqrs.tag.label !== "" ? pqrs.tag : undefined}
                      attributes={generateAttributes(pqrs)}
                      datesWithTime
                      withExpandingIcon
                      onClick={() => onNavigateToDetails(pqrs.id)}
                    />
                    {index !== pqrsRequests.length - 1 && <Divider dashed />}
                  </Stack>
                ))}
              </StyledContainer>
              <Stack direction="column" alignItems="center">
                <Button
                  appearance="primary"
                  variant="none"
                  iconBefore={<MdAdd />}
                  loading={loading}
                  disabled={visibleRecordsCount >= totalRecords || loading}
                  onClick={onLoadMore}
                >
                  Ver más PQRS
                </Button>
              </Stack>
            </>
          ) : (
            <EmptyRecords />
          )}
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { MyPQRSUI };
