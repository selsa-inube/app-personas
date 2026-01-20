import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { FileCard } from "@components/cards/FileCard";
import { RequestNews } from "@components/cards/RequestNews";
import { INew } from "@components/cards/RequestNews/types";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs, Grid, Stack, Tag, Text } from "@inubekit/inubekit";
import { MdArrowBack } from "react-icons/md";
import { IPQRS } from "src/model/entity/pqrs";
import { formatPrimaryTimestamp } from "src/utils/dates";
import { crumbsMyPQRSDetails } from "./config/navigation";

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

interface MyPQRSDetailsUIProps {
  pqrsDetails?: IPQRS;
  news: INew[];
}

function MyPQRSDetailsUI(props: MyPQRSDetailsUIProps) {
  const { pqrsDetails, news } = props;
  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 700px)");

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
            title={pqrsDetails?.title || ""}
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
                    label={pqrsDetails?.tag.label || ""}
                    appearance={pqrsDetails?.tag.appearance || "primary"}
                  />
                </Stack>
              </Stack>
              {renderDetail("Tipo:", pqrsDetails?.type || "")}
              {renderDetail("Motivo:", pqrsDetails?.motive || "")}
              {renderDetail(
                "Punto de atención:",
                pqrsDetails?.attentionPlace || "",
              )}
              {pqrsDetails?.code &&
                renderDetail("Código de seguimiento:", pqrsDetails.code)}
              {renderDetail(
                "Fecha de solicitud:",
                pqrsDetails?.date
                  ? formatPrimaryTimestamp(pqrsDetails.date, true)
                  : "",
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
            <BoxAttribute value={pqrsDetails?.details} direction="column" />
          </Box>
          <Box
            title={"Documentos adjuntos"}
            collapsing={{
              allow: true,
              start: false,
            }}
          >
            {pqrsDetails &&
            Array.isArray(pqrsDetails?.file) &&
            pqrsDetails.file.length > 0 ? (
              <Grid
                templateColumns={isMobile ? "1fr" : "1fr 1fr"}
                gap={inube.spacing.s200}
                autoRows="auto"
              >
                {pqrsDetails.file.map((file) => (
                  <FileCard
                    key={file.id}
                    id={file.id}
                    name={file.name}
                    size={file.size}
                  />
                ))}
              </Grid>
            ) : (
              <Text type="body" size="medium" appearance="gray">
                No hay documentos adjuntos.
              </Text>
            )}
          </Box>
        </Stack>
        {isDesktop && (
          <Stack direction="column" gap={inube.spacing.s300}>
            <RequestNews news={news} />
          </Stack>
        )}
      </Grid>
    </>
  );
}

export { MyPQRSDetailsUI };
