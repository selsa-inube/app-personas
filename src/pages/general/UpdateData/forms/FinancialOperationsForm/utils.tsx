import { inube } from "@design/tokens";
import { Box, Message, SkeletonLine, Stack, Text } from "@inubekit/inubekit";

interface FinancialOperationsFormSkeletonProps {
  isMobile: boolean;
}

function FinancialOperationsFormSkeleton(
  props: FinancialOperationsFormSkeletonProps,
) {
  const { isMobile } = props;

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300} width="100%">
        <Message
          appearance="help"
          title="Si posees cuentas o realizas transacciones en moneda extranjera, es importante que las registres en este paso."
        />
        <Stack direction="column" gap={inube.spacing.s250} width="100%">
          <Text
            type="title"
            size={isMobile ? "small" : "medium"}
            appearance="gray"
            weight="bold"
          >
            Operaciones en moneda extranjera
          </Text>
          <Box padding={inube.spacing.s200}>
            {isMobile ? (
              <Stack direction="column" gap={inube.spacing.s200}>
                <Stack gap={inube.spacing.s100} alignItems="center">
                  <SkeletonLine animated width="16px" height="16px" />
                  <SkeletonLine animated width="100%" height="16px" />
                </Stack>

                <Stack direction="column" gap={inube.spacing.s100}>
                  <SkeletonLine animated width="100%" height="16px" />
                  <SkeletonLine animated width="100%" height="16px" />
                  <SkeletonLine animated width="100%" height="16px" />
                  <SkeletonLine animated width="100px" height="16px" />
                </Stack>

                <Stack direction="column" gap={inube.spacing.s100}>
                  <SkeletonLine animated width="100%" height="28px" />
                  <SkeletonLine animated width="100%" height="28px" />
                </Stack>
              </Stack>
            ) : (
              <Stack direction="column" gap={inube.spacing.s200}>
                <Stack justifyContent="space-between" alignItems="center">
                  <Stack gap={inube.spacing.s100} alignItems="center">
                    <SkeletonLine animated width="16px" height="16px" />
                    <SkeletonLine animated width="250px" height="16px" />
                  </Stack>
                  <Stack gap={inube.spacing.s100}>
                    <SkeletonLine animated width="80px" height="28px" />
                    <SkeletonLine animated width="80px" height="28px" />
                  </Stack>
                </Stack>
                <Stack direction="column" gap={inube.spacing.s100}>
                  <SkeletonLine animated width="100%" height="16px" />
                </Stack>
              </Stack>
            )}
          </Box>
        </Stack>
        <Stack direction="column" gap={inube.spacing.s250} width="100%">
          <Text
            type="title"
            size={isMobile ? "small" : "medium"}
            appearance="gray"
            weight="bold"
          >
            Cuentas en moneda extranjera
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
                    <SkeletonLine animated width="250px" height="16px" />
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

export { FinancialOperationsFormSkeleton };
