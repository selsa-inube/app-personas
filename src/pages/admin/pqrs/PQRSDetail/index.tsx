import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Stack } from "@inubekit/stack";
import { MdArrowBack } from "react-icons/md";
import { crumbsMyPQRSDetails } from "./config/navigation";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid } from "@inubekit/grid";
import { Text } from "@inubekit/text";
import { Box } from "@components/cards/Box";
import { Tag } from "@inubekit/tag";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { useParams } from "react-router-dom";
import { pqrsHistoryMock } from "@mocks/pqrs/pqrsHistory.mocks";
import { formatPrimaryDate } from "src/utils/dates";
import { FileCard } from "@components/cards/FileCard";
import { RequestNews } from "@components/cards/RequestNews";
import { INew } from "@components/cards/RequestNews/types";

function MyPQRSDetails() {
  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 700px)");
  const id = useParams();

  const pqrs_id = id.pqrs_id;

  const data = pqrsHistoryMock.find((item) => item.id === pqrs_id);

  const news: INew[] = [];

  const renderDetail = (label: string, value: string) => (
    <Stack direction="column" gap={inube.spacing.s050}>
      <Text type="label" size="large" weight="bold" appearance="gray">
        {label}
      </Text>
      <Text type="body" size="medium">
        {value}
      </Text>
    </Stack>
  );

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsMyPQRSDetails()} />
        <Title
          title="Detalles de PQRS"
          subtitle="Explora los detalles de tu solicitud"
          icon={<MdArrowBack />}
          navigatePage="/my-pqrs"
        />
      </Stack>
      <Grid
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 330px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack direction="column" gap={inube.spacing.s300}>
          <Text type="title" size="medium" weight="bold" appearance="gray">
            Características
          </Text>
          <Box
            title={data?.description || ""}
            collapsing={{
              allow: false,
              start: false,
            }}
          >
            <Grid
              templateColumns={isMobile ? "1fr" : "1fr 1fr"}
              gap={inube.spacing.s200}
              autoRows="auto"
            >
              <Stack direction="column" gap={inube.spacing.s075}>
                <Text type="label" size="large" weight="bold" appearance="gray">
                  Estado:
                </Text>
                <Stack>
                  <Tag
                    label={data?.tag.label || ""}
                    appearance={data?.tag.appearance || "primary"}
                  />
                </Stack>
              </Stack>
              {renderDetail("Tipo:", data?.type || "")}
              {renderDetail("Motivo:", data?.motive || "")}
              {renderDetail("Punto de atención:", data?.attentionPlace || "")}
              {renderDetail("Código de seguimiento:", data?.id || "")}
              {renderDetail(
                "Fecha de solicitud:",
                data?.date ? formatPrimaryDate(data.date, true) : "",
              )}
            </Grid>
          </Box>
          <Box
            title={"Descripción"}
            collapsing={{
              allow: true,
              start: false,
            }}
          >
            <BoxAttribute value={data?.details} direction="column" />
          </Box>
          <Box
            title={"Documentos adjuntos"}
            collapsing={{
              allow: true,
              start: false,
            }}
          >
            <Grid
              templateColumns={
                isDesktop ? "1fr 1fr 1fr" : isMobile ? "1fr" : "1fr 1fr"
              }
            >
              <FileCard
                id={data?.file?.id || ""}
                name={data?.file?.name || ""}
                size={data?.file?.size || 0}
              />
            </Grid>
          </Box>
        </Stack>
        <Stack direction="column" gap={inube.spacing.s300}>
          <RequestNews news={news} />
        </Stack>
      </Grid>
    </>
  );
}

export { MyPQRSDetails };
