import { QuickAccess } from "@components/cards/QuickAccess";
import { RecordCard } from "@components/cards/RecordCard";
import { quickLinks } from "@config/quickLinks";
import { Text } from "@design/data/Text";
import { Title } from "@design/data/Title";
import { Button } from "@design/input/Button";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdAdd, MdArrowBack } from "react-icons/md";
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
  onAddRequests: () => void;
  goToRequest: (id: string) => void;
}

function MyRequestsUI(props: MyRequestsUIProps) {
  const { requests, loading, noMoreRequests, onAddRequests, goToRequest } =
    props;

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
        gap="s600"
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s300">
          <Stack direction="column">
            <Text type="title" size="medium">
              Tus solicitudes más recientes
            </Text>
          </Stack>

          {requests.length > 0 ? (
            <>
              <StyledContainer>
                {requests.map((request, index) => (
                  <Stack
                    direction="column"
                    width="100%"
                    key={request.id}
                    gap="s200"
                  >
                    <RecordCard
                      id={request.id}
                      type={EMovementType.RECORD}
                      description={request.title}
                      totalValue={request.value}
                      tag={request.tag}
                      attributes={generateAttributes(request)}
                      withExpandingIcon
                      onClick={() => goToRequest(request.id)}
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
                  load={loading}
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
