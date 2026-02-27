import { inube } from "@design/tokens";
import { Box, Grid, SkeletonLine, Stack, Text } from "@inubekit/inubekit";

interface ContactDataFormSkeletonProps {
  isMobile: boolean;
  isTablet: boolean;
}

function ContactDataFormSkeleton(props: ContactDataFormSkeletonProps) {
  const { isMobile, isTablet } = props;

  return (
    <form>
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s300 : inube.spacing.s400}
      >
        <Stack direction="column" gap={inube.spacing.s250}>
          <Text
            type="title"
            size={isMobile ? "small" : "medium"}
            appearance="gray"
            weight="bold"
          >
            Contacto
          </Text>
          <Grid
            templateColumns={`repeat(${isMobile || isTablet ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={isMobile ? inube.spacing.s150 : inube.spacing.s200}
            width="100%"
          >
            <Stack direction="column" gap={inube.spacing.s100}>
              <SkeletonLine animated width="20%" height="16px" />
              <SkeletonLine animated width="100%" height="40px" />
            </Stack>
            <Stack direction="column" gap={inube.spacing.s100}>
              <SkeletonLine animated width="20%" height="16px" />
              <SkeletonLine animated width="100%" height="40px" />
            </Stack>
          </Grid>
        </Stack>

        <Stack direction="column" gap={inube.spacing.s250}>
          <Text
            type="title"
            size={isMobile ? "small" : "medium"}
            appearance="gray"
            weight="bold"
          >
            Dirección
          </Text>

          <Box padding={inube.spacing.s200}>
            {isMobile ? (
              <Stack direction="column" gap={inube.spacing.s200}>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={inube.spacing.s150}
                >
                  <SkeletonLine animated width="16px" height="16px" />
                  <SkeletonLine animated width="100%" height="16px" />
                </Stack>

                <Stack direction="column" gap={inube.spacing.s150}>
                  <Stack justifyContent="space-between">
                    <SkeletonLine animated width="100px" height="16px" />
                    <SkeletonLine animated width="100px" height="16px" />
                  </Stack>
                  <Stack justifyContent="space-between">
                    <SkeletonLine animated width="100px" height="16px" />
                    <SkeletonLine animated width="100px" height="16px" />
                  </Stack>
                  <Stack justifyContent="space-between">
                    <SkeletonLine animated width="100px" height="16px" />
                    <SkeletonLine animated width="100px" height="16px" />
                  </Stack>
                </Stack>

                <SkeletonLine animated width="100%" height="28px" />
                <SkeletonLine animated width="100%" height="28px" />
              </Stack>
            ) : (
              <Stack direction="column" gap={inube.spacing.s200}>
                <Stack justifyContent="space-between" alignItems="center">
                  <Stack gap={inube.spacing.s150} width="100%">
                    <SkeletonLine animated width="16px" height="16px" />
                    <SkeletonLine animated width="30%" height="16px" />
                  </Stack>
                  <Stack gap={inube.spacing.s100}>
                    <SkeletonLine animated width="80px" height="28px" />
                    <SkeletonLine animated width="80px" height="28px" />
                  </Stack>
                </Stack>

                <Stack direction="column" gap={inube.spacing.s100}>
                  <SkeletonLine animated width="15%" height="16px" />
                  <SkeletonLine animated width="15%" height="16px" />
                  <SkeletonLine animated width="15%" height="16px" />
                  <SkeletonLine animated width="15%" height="16px" />
                </Stack>
              </Stack>
            )}
          </Box>
        </Stack>
      </Stack>
    </form>
  );
}

export { ContactDataFormSkeleton };
