import { UpdatesCard } from "@components/cards/UpdatesCard";
import { DecisionModal } from "@components/modals/general/DecisionModal";
import { ContactModal } from "@components/modals/general/updateData/ContactModal";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Button,
  Emailfield,
  Grid,
  IOption,
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
import { EModalActiveState } from "../../types";
import { IContactDataEntry } from "./types";

interface ContactDataFormUIProps {
  formik: FormikProps<IContactDataEntry>;
  isLoadingAddressData?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  serviceDomains: IServiceDomains;
  departments: {
    loading: boolean;
    list: IOption[];
  };
  cities: {
    loading: boolean;
    list: IOption[];
  };
  modalState: EModalActiveState;
  onSelectCountry: (name: string, value: string) => Promise<void>;
  onSelectDepartment: (name: string, value: string) => Promise<void>;
  onDeleteAddress: () => void;
  onSaveAddress: (values: IContactDataEntry) => void;
  setModalState: React.Dispatch<React.SetStateAction<EModalActiveState>>;
}

function ContactDataFormUI(props: ContactDataFormUIProps) {
  const {
    formik,
    isLoadingAddressData,
    validationSchema,
    serviceDomains,
    departments,
    cities,
    modalState,
    onSelectCountry,
    onSelectDepartment,
    onDeleteAddress,
    onSaveAddress,
    setModalState,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

  const haveAddress = Boolean(
    formik.values.address &&
      formik.values.address.trim() !== "" &&
      formik.values.city &&
      formik.values.city.trim() !== "" &&
      formik.values.department &&
      formik.values.department.trim() !== "" &&
      formik.values.country &&
      formik.values.country.trim() !== "",
  );

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
            {!haveAddress ? (
              <Message
                appearance="help"
                title="Actualmente no tienes ninguna dirección registrada. Haz clic en “Agregar dirección” para empezar."
              />
            ) : (
              <UpdatesCard
                isMobile={isMobile}
                loading={isLoadingAddressData}
                icon={<MdPersonOutline />}
                items={[
                  {
                    title: formik.values.address,
                    entries: [
                      { name: "País", value: formik.values.countryName || "" },
                      {
                        name: "Estado / Departamento",
                        value: formik.values.departmentName || "",
                      },
                      { name: "Ciudad", value: formik.values.cityName || "" },
                      {
                        name: "Código postal",
                        value: formik.values.zipCode || "",
                      },
                    ],
                  },
                ]}
                onEdit={() => setModalState(EModalActiveState.EDIT)}
                onDelete={() => setModalState(EModalActiveState.DELETE)}
              />
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
                onClick={
                  !haveAddress
                    ? () => setModalState(EModalActiveState.CREATE)
                    : undefined
                }
                cursorHover={!haveAddress}
                disabled={haveAddress}
              >
                Agregar dirección
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>

      {(modalState === EModalActiveState.CREATE ||
        modalState === EModalActiveState.EDIT) && (
        <ContactModal
          title={
            modalState === EModalActiveState.CREATE
              ? "Agregar dirección"
              : "Editar dirección"
          }
          description={
            modalState === EModalActiveState.CREATE
              ? "Agrega una dirección que nos permita ubicarte."
              : "Edita la información de tu dirección."
          }
          actionText={
            modalState === EModalActiveState.CREATE ? "Agregar" : "Editar"
          }
          portalId="modals"
          formik={formik}
          validationSchema={validationSchema}
          serviceDomains={serviceDomains}
          departments={departments}
          cities={cities}
          onSelectCountry={onSelectCountry}
          onSelectDepartment={onSelectDepartment}
          onCloseModal={() => setModalState(EModalActiveState.IDLE)}
          onClick={onSaveAddress}
        />
      )}

      {modalState === EModalActiveState.DELETE && (
        <DecisionModal
          title="Eliminar dirección"
          description={`¿Estás seguro que deseas eliminar “${formik.values.address}” como dirección?`}
          onCloseModal={() => setModalState(EModalActiveState.IDLE)}
          actionText="Eliminar"
          appearance="danger"
          onClick={() => onDeleteAddress()}
          portalId="modals"
        />
      )}
    </>
  );
}

export { ContactDataFormUI };
