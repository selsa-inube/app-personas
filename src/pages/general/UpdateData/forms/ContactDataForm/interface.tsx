import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Emailfield,
  Grid,
  Icon,
  IOption,
  Message,
  Phonefield,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdAdd, MdPersonOutline } from "react-icons/md";
import { IServiceDomains } from "src/context/app/types";
import {
  getFieldState,
  isRequired,
} from "src/utils/forms/forms";
import * as Yup from "yup";
import { EModalActiveState, IContactDataEntry } from "./types";
import { ContactModal } from "@components/modals/general/updateData/ContactModal";
import { DecisionModal } from "@components/modals/general/DecisionModal";
import UpdatesCard from "@components/cards/UpdatesCard/UpdatesCard";
import { useState } from "react";

interface ContactDataFormUIProps {
  formik: FormikProps<IContactDataEntry>;
  loading?: boolean;
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
  onSelectCountry: (name: string, value: string) => Promise<void>;
  onSelectDepartment: (name: string, value: string) => Promise<void>;
}

function ContactDataFormUI(props: ContactDataFormUIProps) {
  const {
    formik,
    loading,
    validationSchema,
    serviceDomains,
    departments,
    cities,
    onSelectCountry,
    onSelectDepartment,
  } = props;

  const [modalOpen, setModalOpen] = useState<EModalActiveState>(EModalActiveState.IDLE);

  const isMobile = useMediaQuery("(max-width: 700px)");

  const haveAddress = Boolean(formik.values.address !== '' && formik.values.city !== '' && formik.values.department !== '' && formik.values.country !== '');

  const getDataDisplay = () => {
    return {
      country: formik.values.countryName || serviceDomains.countries.find(c => c.id === formik.values.country)?.label || '',
      department: formik.values.departmentName || '',
      city: formik.values.cityName || '',
      zipCode: formik.values.zipCode || ''
    };
  }

  const handleDeleteAddress = (formik: FormikProps<IContactDataEntry>) => {
    formik.setValues({
      ...formik.values,
      address: '',
      country: '',
      countryName: '',
      department: '',
      departmentName: '',
      city: '',
      cityName: '',
      zipCode: '',
    })
    setModalOpen(EModalActiveState.IDLE);
  };

  const handleSaveAddress = (values: IContactDataEntry) => {
    formik.setValues({
      ...formik.values,
      address: values.address,
      country: values.country,
      countryName: values.countryName,
      department: values.department,
      departmentName: values.departmentName,
      city: values.city,
      cityName: values.cityName,
      zipCode: values.zipCode,
    });
    setModalOpen(EModalActiveState.IDLE);
  };

  return (
    <>
      <form>
        <Stack
          direction="column"
          gap={isMobile ? inube.spacing.s300 : inube.spacing.s400}
        >
          <Stack direction="column" gap={inube.spacing.s250}>
            <Text as="h2">Contacto</Text>
            <Grid
              templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
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
                disabled={loading}
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
                disabled={loading}
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(validationSchema, "email")}
              />
            </Grid>
          </Stack>
          <Stack direction="column" gap={inube.spacing.s250}>
            <Text as="h2">Dirección</Text>
            {
              (!haveAddress)
                ? (
                  <Message
                    appearance="help"
                    title="Actualmente no tienes ninguna dirección registrada. Haz clic en “Agregar dirección” para empezar."
                  />
                ) : (
                  <UpdatesCard
                    loading={loading}
                    icon={<MdPersonOutline />}
                    title={formik.values.address}
                    rowsValues={[{
                      "País": getDataDisplay().country,
                      "Departamento": getDataDisplay().department,
                      "Ciudad": getDataDisplay().city,
                      "Código postal": getDataDisplay().zipCode
                    }]}
                    actionDelete={() => setModalOpen(EModalActiveState.DELETE)}
                    actionEdit={() => setModalOpen(EModalActiveState.EDIT)}
                  />
                )
            }
            <Stack
              gap={inube.spacing.s100}
              padding={`0 ${inube.spacing.s100}`}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Icon
                size="18px"
                icon={<MdAdd />}
                appearance="primary"
                onClick={!haveAddress ? () => setModalOpen(EModalActiveState.CREATE) : undefined}
                cursor={!haveAddress ? "pointer" : "default"}
                disabled={haveAddress}
              />
              <Text
                appearance="primary"
                onClick={!haveAddress ? () => setModalOpen(EModalActiveState.CREATE) : undefined}
                cursorHover={!haveAddress}
                disabled={haveAddress}
              >
                Agregar dirección
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </form>

      {
        (modalOpen === EModalActiveState.CREATE || modalOpen === EModalActiveState.EDIT) && (
          <ContactModal
            title={modalOpen === EModalActiveState.CREATE ? "Agregar dirección" : "Editar dirección"}
            description={modalOpen === EModalActiveState.CREATE ? "Agrega una dirección que nos permita ubicarte." : "Edita la información de tu dirección."}
            actionText={modalOpen === EModalActiveState.CREATE ? "Agregar" : "Editar"}
            portalId="modals"
            formik={formik}
            validationSchema={validationSchema}
            serviceDomains={serviceDomains}
            departments={departments}
            cities={cities}
            onSelectCountry={onSelectCountry}
            onSelectDepartment={onSelectDepartment}
            onCloseModal={() => setModalOpen(EModalActiveState.IDLE)}
            onClick={handleSaveAddress}
          />
        )
      }

      {

        modalOpen === EModalActiveState.DELETE && (
          <DecisionModal
            title="Eliminar dirección"
            description={`¿Estás seguro que deseas eliminar “${formik.values.address}” como dirección?`}
            onCloseModal={() => setModalOpen(EModalActiveState.IDLE)}
            actionText="Eliminar"
            appearance="danger"
            onClick={() => handleDeleteAddress(formik)}
            portalId="modals"
          />
        )
      }
    </>
  )
}

export { ContactDataFormUI };
