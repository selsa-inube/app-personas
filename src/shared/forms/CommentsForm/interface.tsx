import { Button } from "@design/input/Button";
import { Textarea } from "@design/input/Textarea";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";

interface CommentsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  withSubmit?: boolean;
}

function CommentsFormUI(props: CommentsFormUIProps) {
  const { formik, loading, withSubmit } = props;

  return (
    <form>
      <Stack direction="column" alignItems="flex-end" gap="s300">
        <Textarea
          id="comments"
          name="comments"
          label="Comentarios"
          placeholder="Escribe tus comentarios"
          maxLength={150}
          withCounter
          isDisabled={loading}
          value={formik.values.comments}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          onFocus={formik.isFocused}
          isFullWidth
        />

        {withSubmit && (
          <Stack gap="s150" justifyContent="flex-end">
            <Button
              onClick={formik.handleReset}
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

export { CommentsFormUI };
