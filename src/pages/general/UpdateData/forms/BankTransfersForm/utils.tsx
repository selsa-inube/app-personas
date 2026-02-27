import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Box, SkeletonLine, Stack } from "@inubekit/inubekit";

function BankTransfersFormSkeleton() {
  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s200}>
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
              </Stack>

              <SkeletonLine animated width="100%" height="28px" />
              <SkeletonLine animated width="100%" height="28px" />
            </Stack>
          ) : (
            <Stack direction="column" gap={inube.spacing.s200}>
              <Stack justifyContent="space-between" alignItems="center">
                <Stack gap={inube.spacing.s100} alignItems="center">
                  <SkeletonLine animated width="16px" height="16px" />
                  <SkeletonLine animated width="300px" height="16px" />
                </Stack>
                <Stack gap={inube.spacing.s100}>
                  <SkeletonLine animated width="80px" height="28px" />
                  <SkeletonLine animated width="80px" height="28px" />
                </Stack>
              </Stack>
              <Stack direction="column" gap={inube.spacing.s100}>
                <SkeletonLine animated width="15%" height="16px" />
                <SkeletonLine animated width="15%" height="16px" />
              </Stack>
            </Stack>
          )}
        </Box>
      </Stack>
    </form>
  );
}

export { BankTransfersFormSkeleton };
