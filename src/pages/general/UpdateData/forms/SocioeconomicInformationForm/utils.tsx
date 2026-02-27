import { inube } from "@design/tokens";
import {
  Box,
  Checkbox,
  Grid,
  SkeletonLine,
  Stack,
  Text,
} from "@inubekit/inubekit";

interface SocioeconomicInformationFormSkeletonProps {
  isMobile: boolean;
}

function SocioeconomicInformationFormSkeleton(
  props: SocioeconomicInformationFormSkeletonProps,
) {
  const { isMobile } = props;

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s400}>
        <Grid
          templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={inube.spacing.s200}
        >
          <Stack direction="column" gap={inube.spacing.s100}>
            <SkeletonLine animated width="25%" height="16px" />
            <SkeletonLine animated width="100%" height="40px" />
          </Stack>
          <Stack direction="column" gap={inube.spacing.s100}>
            <SkeletonLine animated width="25%" height="16px" />
            <SkeletonLine animated width="100%" height="40px" />
          </Stack>
          <Stack direction="column" gap={inube.spacing.s100}>
            <SkeletonLine animated width="25%" height="16px" />
            <SkeletonLine animated width="100%" height="40px" />
          </Stack>
        </Grid>
        <Stack direction="column" gap={inube.spacing.s200} width="100%">
          <Text
            type="label"
            size="large"
            weight="bold"
            appearance="gray"
            margin="0px 16px"
          >
            Selecciona las opciones que apliquen a tu situación actual.
          </Text>
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={inube.spacing.s200}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Box
                padding={`${inube.spacing.s100} ${inube.spacing.s200}`}
                key={index}
              >
                <Stack justifyContent="space-between" gap={inube.spacing.s200}>
                  <SkeletonLine animated width="60%" height="16px" />
                  <Checkbox
                    id={`checkbox-skeleton-${index}`}
                    name={`checkbox-skeleton-${index}`}
                    value=""
                    onChange={(e) => e.preventDefault()}
                    disabled
                  />
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </form>
  );
}

export { SocioeconomicInformationFormSkeleton };
