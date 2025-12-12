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
import {
  getFieldState,
  isRequired,
} from "src/utils/forms/forms";
import * as Yup from "yup";
import { IContactDataEntry } from "./types";
import { ContactModal } from "@components/modals/general/updateData/ContactModal";
import { DecisionModal } from "@components/modals/general/DecisionModal";
import { UpdatesCard } from "@components/cards/UpdatesCard";
import { useState } from "react";
import { EModalActiveState } from "../../types";

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
  onSelectCountry: (name: string, value: string) => Promise<void>;
  onSelectDepartment: (name: string, value: string) => Promise<void>;
}

function ContactDataFormUI(props: ContactDataFormUIProps) {
  const {
    formik,
    isLoadingAddressData,
    validationSchema,
    serviceDomains,
    departments,
    cities,
    onSelectCountry,
    onSelectDepartment,
  } = props;

  const [modalOpen, setModalOpen] = useState<EModalActiveState>(EModalActiveState.IDLE);

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

  const haveAddress = Boolean(
    formik.values.address &&
    formik.values.address.trim() !== '' &&
    formik.values.city &&
    formik.values.city.trim() !== '' &&
    formik.values.department &&
    formik.values.department.trim() !== '' &&
    formik.values.country &&
    formik.values.country.trim() !== ''
  );

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
            <Text
              type="title"
              size={isMobile ? 'small' : 'medium'}
              appearance="gray"
              weight="bold"
            >
              Contacto
            </Text>
            <Grid
              templateColumns={`repeat(${(isMobile || isTablet) ? 1 : 2}, 1fr)`}
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
              size={isMobile ? 'small' : 'medium'}
              appearance="gray"
              weight="bold"
            >
              Dirección
            </Text>
            {
              (!haveAddress)
                ? (
                  <Message
                    appearance="help"
                    title="Actualmente no tienes ninguna dirección registrada. Haz clic en “Agregar dirección” para empezar."
                  />
                ) : (
                  <UpdatesCard
                    isMobile={isMobile}
                    loading={isLoadingAddressData}
                    icon={<MdPersonOutline />}
                    items={[{
                      title: formik.values.address,
                      entries: [
                        { name: "País", value: formik.values.countryName || '' },
                        { name: "Estado / Departamento", value: formik.values.departmentName || '' },
                        { name: "Ciudad", value: formik.values.cityName || '' },
                        { name: "Código postal", value: formik.values.zipCode || '' },
                      ]
                    }]}
                    onEdit={() => setModalOpen(EModalActiveState.EDIT)}
                    onDelete={() => setModalOpen(EModalActiveState.DELETE)}
                  />
                )
            }
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
                onClick={!haveAddress ? () => setModalOpen(EModalActiveState.CREATE) : undefined}
                cursorHover={!haveAddress}
                disabled={haveAddress}
              >
                Agregar dirección
              </Button>
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
