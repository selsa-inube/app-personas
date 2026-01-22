import { UpdatesCard } from "@components/cards/UpdatesCard";
import { ContactModal } from "@components/modals/general/updateData/ContactModal";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Button,
  Emailfield,
  Grid,
  Message,
  Phonefield,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdAdd, MdPersonOutline } from "react-icons/md";
import { IServiceDomains } from "src/context/app/types";
import { getFieldState, isRequired } from "src/utils/forms/forms";
import * as Yup from "yup";
import { IAddress, IContactDataEntry } from "./types";

interface ContactDataFormUIProps {
  formik: FormikProps<IContactDataEntry>;
  isLoadingAddressData?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  serviceDomains: IServiceDomains;
  modalState: {
    show: boolean;
    editEntry: IAddress | undefined;
  };
  onSelectEdit: (id: string) => void;
  onEditAddress: (address: IAddress) => void;
  onDeleteAddress: (id: string) => void;
  onSaveAddress: (values: IAddress) => void;
  onToggleModal: () => void;
}

function ContactDataFormUI(props: ContactDataFormUIProps) {
  const {
    formik,
    isLoadingAddressData,
    validationSchema,
    serviceDomains,
    modalState,
    onDeleteAddress,
    onSelectEdit,
    onEditAddress,
    onSaveAddress,
    onToggleModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

  const itemsUpdatesCard =
    formik.values?.addresses?.length > 0
      ? formik.values.addresses.map((address) => ({
          title: address.address,
          entries: [
            { name: "País", value: address.countryName || "" },
            {
              name: "Estado / Departamento",
              value: address.departmentName || "",
            },
            { name: "Ciudad", value: address.cityName || "" },
            {
              name: "Código postal",
              value: address.zipCode || "",
            },
          ],
        }))
      : [];

  return (
    <>
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
              <Phonefield
                label="Celular"
                placeholder="Celular"
                name="cellPhone"
                id="cellPhone"
                value={formik.values.cellPhone}
                message={formik.errors.cellPhone}
                status={getFieldState(formik, "cellPhone")}
                disabled={isLoadingAddressData}
                size="compact"
                fullwidth
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(validationSchema, "cellPhone")}
              />

              <Emailfield
                label="Correo electrónico"
                placeholder="Correo electrónico"
                name="email"
                id="email"
                value={formik.values.email}
                message={formik.errors.email}
                status={getFieldState(formik, "email")}
                disabled={isLoadingAddressData}
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(validationSchema, "email")}
              />
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
            {formik.values.addresses?.length === 0 ? (
              <Message
                appearance="help"
                title="Actualmente no tienes ninguna dirección registrada. Haz clic en “Agregar dirección” para empezar."
              />
            ) : (
              formik.values.addresses?.map((address) => (
                <UpdatesCard
                  id={address.id}
                  key={address.id}
                  isMobile={isMobile}
                  loading={isLoadingAddressData}
                  icon={<MdPersonOutline />}
                  items={itemsUpdatesCard}
                  deleteTitle="Eliminar dirección"
                  deleteDescription={`¿Estás seguro que deseas eliminar “${address.address}” como dirección?`}
                  onEdit={(id) => onSelectEdit(id)}
                  onDelete={(id) => onDeleteAddress(id)}
                />
              ))
            )}
            <Stack
              gap={inube.spacing.s100}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Button
                appearance="primary"
                iconBefore={<MdAdd />}
                spacing="compact"
                variant="none"
                disabled={formik.values.addresses?.length === 1}
                onClick={onToggleModal}
              >
                Agregar dirección
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>

      {modalState.show && (
        <ContactModal
          title={
            modalState.editEntry ? "Editar dirección" : "Agregar dirección"
          }
          description={
            modalState.editEntry
              ? "Edita la información de tu dirección."
              : "Agrega una dirección que nos permita ubicarte."
          }
          actionText={modalState.editEntry ? "Editar" : "Agregar"}
          portalId="modals"
          editEntry={modalState.editEntry}
          validationSchema={validationSchema}
          serviceDomains={serviceDomains}
          onCloseModal={onToggleModal}
          onClick={modalState.editEntry ? onEditAddress : onSaveAddress}
        />
      )}
    </>
  );
}

export { ContactDataFormUI };
