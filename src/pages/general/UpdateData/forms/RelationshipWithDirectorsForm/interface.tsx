import { RelationshipWithDirectorsModal } from "@components/modals/general/updateData/RelationshipWithDirectorsModal";
import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Grid, Stack } from "@inubekit/inubekit";
import { directorsMock } from "@mocks/users/directors/directors.mocks";
import { FormikProps } from "formik";
import { MdSearch } from "react-icons/md";
import { activeDM } from "src/model/domains/general/activedm";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { IDirector } from "src/model/entity/user";
import { getFieldState, isRequired } from "src/utils/forms/forms";
import * as Yup from "yup";
import { IRelationshipWithDirectorsEntry } from "./types";

interface RelationshipWithDirectorsFormUIProps {
  formik: FormikProps<IRelationshipWithDirectorsEntry>;
  loading?: boolean;
  withSubmit?: boolean;
  showDirectorsModal: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  handleToggleModal: () => void;
  handleModalSelect: (field: string, selectedItem: IDirector) => void;
}

function RelationshipWithDirectorsFormUI(
  props: RelationshipWithDirectorsFormUIProps,
) {
  const {
    formik,
    loading,
    withSubmit,
    showDirectorsModal,
    validationSchema,
    handleToggleModal,
    handleModalSelect,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <>
      <form>
        <Stack direction="column" gap={inube.spacing.s300}>
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={isMobile ? inube.spacing.s150 : inube.spacing.s300}
          >
            <Select
              label="¿Tiene parentesco con algún directivo de la entidad?"
              name="hasRelationshipWithDirectors"
              id="hasRelationshipWithDirectors"
              value={formik.values.hasRelationshipWithDirectors}
              size="compact"
              options={activeDM.options}
              state={getFieldState(formik, "hasRelationshipWithDirectors")}
              isRequired={isRequired(
                validationSchema,
                "hasRelationshipWithDirectors",
              )}
              errorMessage={formik.errors.hasRelationshipWithDirectors}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isDisabled={loading}
              isFullWidth
            />
            {formik.values.hasRelationshipWithDirectors === activeDM.Y.id && (
              <>
                <TextField
                  label="Nombre del directivo"
                  placeholder="Buscar nombre"
                  name="directorName"
                  id="directorName"
                  value={formik.values.directorName}
                  errorMessage={formik.errors.directorName}
                  isDisabled={loading}
                  iconAfter={<MdSearch size={18} cursor={"pointer"} />}
                  size="compact"
                  isFullWidth
                  state={getFieldState(formik, "directorName")}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isRequired={isRequired(validationSchema, "directorName")}
                  onIconClick={() => handleToggleModal()}
                />
                <Select
                  label="Parentesco"
                  name="directorRelationship"
                  id="directorRelationship"
                  value={formik.values.directorRelationship}
                  size="compact"
                  options={relationshipDM.options}
                  state={getFieldState(formik, "directorRelationship")}
                  isRequired={isRequired(
                    validationSchema,
                    "directorRelationship",
                  )}
                  errorMessage={formik.errors.directorRelationship}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isDisabled={loading}
                  isFullWidth
                />
              </>
            )}
          </Grid>
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
      {showDirectorsModal && (
        <RelationshipWithDirectorsModal
          portalId="modals"
          onCloseModal={() => handleToggleModal()}
          directors={directorsMock}
          onSelect={(item) => handleModalSelect("directorName", item)}
        />
      )}
    </>
  );
}

export { RelationshipWithDirectorsFormUI };
