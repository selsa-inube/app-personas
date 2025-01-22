import { DownloadCard } from "@components/cards/DownloadCard";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs, Grid, Stack } from "@inubekit/inubekit";
import { MdArrowBack } from "react-icons/md";
import { IAid } from "src/model/entity/service";
import { crumbsCertificationsRequest } from "./config/navigation";

interface CertificationRequestUIProps {
  certifications: IAid[];
  onDownloadCertificate: () => void;
}

function CertificationRequestUI(props: CertificationRequestUIProps) {
  const { certifications, onDownloadCertificate } = props;

  const isDesktop = useMediaQuery("(min-width: 1440px)");
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsCertificationsRequest} />
        <Title
          title="Certificaciones"
          subtitle="Genera y descarga de forma inmediata tus certificaciones."
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
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s300}
          >
            {certifications.map((certification) => (
              <DownloadCard
                key={certification.id}
                id={certification.id}
                title={certification.title}
                onclick={onDownloadCertificate}
              />
            ))}
          </Grid>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { CertificationRequestUI };
