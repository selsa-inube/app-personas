import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { IDirector } from "@mocks/directors/directors.mocks";
import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { MdSearch } from "react-icons/md";
import { getFieldState } from "src/utils/forms";
import { activeDM } from "src/model/domains/general/activedm";
import { relationshipDM } from "src/model/domains/personalResidence/relationshipdm";
import { RelationshipWithDirectorsModal } from "@components/modals/forms/update-data/RelationshipWithDirectorsModal";
import { directorsMock } from "@mocks/directors/directors.mocks";

interface RelationshipWithDirectorsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  showDirectorsModal: boolean;
  isRequired: (fieldName: string) => boolean;
  handleToggleModal: () => void;
  handleModalSelect: (field: string, selectedItem: IDirector) => void;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function RelationshipWithDirectorsFormUI(
  props: RelationshipWithDirectorsFormUIProps
) {
  const {
    formik,
    loading,
    showDirectorsModal,
    isRequired,
    customHandleBlur,
    handleToggleModal,
    handleModalSelect,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <>
      <form>
        <Grid
          templateColumns={isMobile ? "1fr" : "1fr 1fr"}
          gap={isMobile ? "s150" : "s300"}
        >
          <Select
            label="¿Tiene parentesco con algún directivo de la entidad?"
            name="hasRelationshipWithDirectors"
            id="hasRelationshipWithDirectors"
            value={formik.values.hasRelationshipWithDirectors}
            size="compact"
            options={activeDM.options}
            state={getFieldState(formik, "hasRelationshipWithDirectors")}
            isRequired={isRequired("hasRelationshipWithDirectors")}
            errorMessage={formik.errors.hasRelationshipWithDirectors}
            onBlur={formik.handleBlur}
            onClick={formik.handleClick}
            onFocus={formik.handleFocus}
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
                onBlur={customHandleBlur}
                onChange={formik.handleChange}
                validMessage="El nombre del directivo es valido"
                isRequired={isRequired("directorName")}
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
                isRequired={isRequired("directorRelationship")}
                errorMessage={formik.errors.directorRelationship}
                onBlur={formik.handleBlur}
                onClick={formik.handleClick}
                onFocus={formik.handleFocus}
                onChange={formik.handleChange}
                isDisabled={loading}
                isFullWidth
              />
            </>
          )}
        </Grid>
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
