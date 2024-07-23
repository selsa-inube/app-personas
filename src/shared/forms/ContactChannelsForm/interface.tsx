import { Box } from "@components/cards/Box";
import { Text } from "@design/data/Text";
import { Switch } from "@design/input/Switch";
import { TextField } from "@design/input/TextField";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdOutlinePerson } from "react-icons/md";
import { getFieldState } from "src/utils/forms/forms";
import { StyledLinkPolicy } from "./styles";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";

function CustomLabelPolicy() {
  return (
    <Text type="label" size="large">
      Acepto la{" "}
      <StyledLinkPolicy to="about:blank" target="_blank" rel="noreferrer">
        Política de tratamiento de datos
      </StyledLinkPolicy>
    </Text>
  );
}

interface ContactChannelsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
}

function ContactChannelsFormUI(props: ContactChannelsFormUIProps) {
  const { formik, loading } = props;

  const isMobile = useMediaQuery("(max-width: 560px)");

  return (
    <form>
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
      >
        <Box
          title="Datos de contacto"
          subtitle="Resumen productos de ahorro"
          icon={<MdOutlinePerson size={34} />}
          collapsing={{ start: false, allow: false }}
        >
          <Stack
            direction="column"
            gap={isMobile ? inube.spacing.s150 : inube.spacing.s200}
          >
            <TextField
              label="Teléfono"
              name="landlinePhone"
              id="landlinePhone"
              placeholder="Digita el numero de teléfono"
              value={formik.values.landlinePhone}
              type="number"
              errorMessage={formik.errors.landlinePhone}
              size="compact"
              isFullWidth
              state={getFieldState(formik, "landlinePhone")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="El teléfono es válido"
              isRequired
            />
            <TextField
              label="Celular"
              name="cellPhone"
              id="cellPhone"
              placeholder="Digita el numero de celular"
              value={formik.values.cellPhone}
              type="number"
              errorMessage={formik.errors.cellPhone}
              size="compact"
              isFullWidth
              state={getFieldState(formik, "cellPhone")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="El celular es válido"
              isRequired
            />
            <TextField
              label="Correo electrónico"
              name="email"
              id="email"
              placeholder="Digita el correo electrónico"
              value={formik.values.email}
              type="text"
              errorMessage={formik.errors.email}
              size="compact"
              isFullWidth
              state={getFieldState(formik, "email")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="El correo electrónico es válido"
              isRequired
            />
          </Stack>
        </Box>

        <Stack
          direction="column"
          alignItems="flex-start"
          gap={inube.spacing.s150}
        >
          <Switch
            id="acceptDataPolicy"
            name="acceptDataPolicy"
            customLabel={<CustomLabelPolicy />}
            label="Acepto la Política de tratamiento de datos"
            size={isMobile ? "small" : "large"}
            onChange={formik.handleChange}
            checked={formik.values.acceptDataPolicy}
            disabled={loading}
          />
          <Switch
            id="acceptNotifications"
            name="acceptNotifications"
            label="Acepto recibir información mediante WhatsApp, llamadas, mensajes de texto y correo electrónico."
            size={isMobile ? "small" : "large"}
            onChange={formik.handleChange}
            checked={formik.values.acceptNotifications}
            disabled={loading}
          />
        </Stack>
      </Stack>
    </form>
  );
}

export { ContactChannelsFormUI };
