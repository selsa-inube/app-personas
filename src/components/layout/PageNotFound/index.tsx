import { Stack } from "@design/layout/Stack";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { MdArrowBack } from "react-icons/md";

function PageNotFound() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      direction="column"
      gap="s250"
    >
      <Text size="large" type="title">
        No encontramos este recurso.
      </Text>
      <Button iconBefore={<MdArrowBack />} type="link" path="/">
        Ir al resumen
      </Button>
    </Stack>
  );
}

export { PageNotFound };
