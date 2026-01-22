import { CollapseCard } from "@components/cards/CollapseCard";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Emailfield, Phonefield, Stack, Toggle } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdOutlinePerson, MdPhoneAndroid } from "react-icons/md";
import { IContactChannelsEntry } from "./types";
import { getFieldState } from "src/utils/forms/forms";

interface ContactChannelsFormUIProps {
  formik: FormikProps<IContactChannelsEntry>;
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
        <CollapseCard
          title="Datos de contacto"
          subtitle="Resumen productos de ahorro"
          icon={<MdOutlinePerson size={34} />}
          collapsing={{ start: false, allow: false }}
        >
          <Stack
            direction="column"
            gap={isMobile ? inube.spacing.s150 : inube.spacing.s200}
          >
            <Phonefield
              label="Teléfono"
              name="landlinePhone"
              id="landlinePhone"
              placeholder="Digita el numero de teléfono"
              value={formik.values.landlinePhone}
              message={formik.errors.landlinePhone}
              size="compact"
              fullwidth
              status={getFieldState(formik, "landlinePhone")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Phonefield
              label="Celular"
              name="cellPhone"
              id="cellPhone"
              placeholder="Digita el numero de celular"
              value={formik.values.cellPhone}
              type="number"
              message={formik.errors.cellPhone}
              size="compact"
              fullwidth
              iconAfter={<MdPhoneAndroid />}
              status={getFieldState(formik, "cellPhone")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
            />
            <Emailfield
              label="Correo electrónico"
              name="email"
              id="email"
              placeholder="Digita el correo electrónico"
              value={formik.values.email}
              type="email"
              message={formik.errors.email}
              size="compact"
              fullwidth
              status={getFieldState(formik, "email")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
            />
          </Stack>
        </CollapseCard>

        <Stack
          direction="column"
          alignItems="flex-start"
          gap={inube.spacing.s150}
        >
          <Toggle
            id="acceptNotifications"
            name="acceptNotifications"
            size={isMobile ? "small" : "large"}
            onChange={formik.handleChange}
            checked={formik.values.acceptNotifications}
            disabled={loading}
            margin="0"
            padding="0"
          >
            Acepto recibir información mediante WhatsApp, llamadas, mensajes de
            texto y correo electrónico.
          </Toggle>
        </Stack>
      </Stack>
    </form>
  );
}

export { ContactChannelsFormUI };
