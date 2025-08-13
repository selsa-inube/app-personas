import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Autocomplete,
  Button,
  Emailfield,
  Fieldset,
  Grid,
  IOption,
  Numberfield,
  Phonefield,
  Stack,
  Textfield,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdPhoneAndroid } from "react-icons/md";
import { IServiceDomains } from "src/context/app/types";
import {
  formikHandleChange,
  getFieldState,
  isInvalid,
  isRequired,
} from "src/utils/forms/forms";
import * as Yup from "yup";
import { IContactDataEntry } from "./types";

interface ContactDataFormUIProps {
  formik: FormikProps<IContactDataEntry>;
  loading?: boolean;
  withSubmit?: boolean;
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
    withSubmit,
    validationSchema,
    serviceDomains,
    departments,
    cities,
    onSelectCountry,
    onSelectDepartment,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

  return (
    <form>
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s300 : inube.spacing.s400}
      >
        <Fieldset legend="Dirección">
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
            autoRows="auto"
            gap={
              isMobile
                ? inube.spacing.s150
                : isTablet
                  ? inube.spacing.s200
                  : inube.spacing.s300
            }
            width="100%"
          >
            <Autocomplete
              label="País"
              name="country"
              id="country"
              value={formik.values.country}
              size="compact"
              fullwidth
              options={serviceDomains.countries}
              onBlur={formik.handleBlur}
              message={formik.errors.country}
              invalid={isInvalid(formik, "country")}
              onChange={(name, value) => onSelectCountry(name, value)}
              disabled
            />

            <Autocomplete
              label="Departamento"
              name="department"
              id="department"
              value={formik.values.department}
              size="compact"
              fullwidth
              options={departments.list}
              onBlur={formik.handleBlur}
              message={formik.errors.department}
              invalid={isInvalid(formik, "department")}
              onChange={(name, value) => onSelectDepartment(name, value)}
            />

            <Autocomplete
              label="Ciudad"
              name="city"
              id="city"
              value={formik.values.city}
              size="compact"
              fullwidth
              options={cities.list}
              onBlur={formik.handleBlur}
              message={formik.errors.city}
              disabled={
                !formik.values.country ||
                !formik.values.department ||
                cities.loading
              }
              invalid={isInvalid(formik, "city")}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
            />

            <Textfield
              label="Dirección"
              placeholder="Dirección"
              name="address"
              id="address"
              value={formik.values.address}
              message={formik.errors.address}
              status={getFieldState(formik, "address")}
              size="compact"
              fullwidth
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required={isRequired(validationSchema, "address")}
              disabled
            />

            <Numberfield
              label="Código postal"
              placeholder="Código postal"
              name="zipCode"
              id="zipCode"
              type="number"
              value={formik.values.zipCode}
              message={formik.errors.zipCode}
              status={getFieldState(formik, "zipCode")}
              disabled={loading}
              size="compact"
              fullwidth
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required={isRequired(validationSchema, "zipCode")}
            />
          </Grid>
        </Fieldset>
        <Fieldset legend="Teléfono">
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
            autoRows="auto"
            gap={
              isMobile
                ? inube.spacing.s150
                : isTablet
                  ? inube.spacing.s200
                  : inube.spacing.s300
            }
            width="100%"
          >
            <Phonefield
              label="Teléfono"
              placeholder="Teléfono"
              name="landlinePhone"
              id="landlinePhone"
              value={formik.values.landlinePhone}
              message={formik.errors.landlinePhone}
              status={getFieldState(formik, "landlinePhone")}
              disabled={loading}
              size="compact"
              fullwidth
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required={isRequired(validationSchema, "landlinePhone")}
            />

            <Phonefield
              label="Celular"
              placeholder="Celular"
              name="cellPhone"
              id="cellPhone"
              value={formik.values.cellPhone}
              iconAfter={<MdPhoneAndroid />}
              message={formik.errors.cellPhone}
              status={getFieldState(formik, "cellPhone")}
              disabled={loading}
              size="compact"
              fullwidth
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required={isRequired(validationSchema, "cellPhone")}
            />
          </Grid>
        </Fieldset>
        <Fieldset legend="Correo electrónico">
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
            autoRows="auto"
            gap={
              isMobile
                ? inube.spacing.s150
                : isTablet
                  ? inube.spacing.s200
                  : inube.spacing.s300
            }
            width="100%"
          >
            <Emailfield
              label="Correo electronico"
              placeholder="Correo electronico"
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
        </Fieldset>

        {withSubmit && (
          <Stack gap={inube.spacing.s150} justifyContent="flex-end">
            <Button
              onClick={() => formik.handleReset()}
              type="button"
              disabled={loading || !formik.dirty}
              spacing="compact"
              variant="outlined"
              appearance="gray"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              spacing="compact"
              disabled={loading || !formik.dirty || !formik.isValid}
            >
              Guardar
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { ContactDataFormUI };
