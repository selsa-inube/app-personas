import { Textarea } from "@design/input/Textarea";
import { FormikProps } from "formik";
import { ICommentsEntry } from "./types";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";
import { Button } from "@inubekit/button";

interface CommentsFormUIProps {
  formik: FormikProps<ICommentsEntry>;
  loading?: boolean;
  withSubmit?: boolean;
}

function CommentsFormUI(props: CommentsFormUIProps) {
  const { formik, loading, withSubmit } = props;

  return (
    <form>
      <Stack direction="column" alignItems="flex-end" gap={inube.spacing.s300}>
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
          isFullWidth
        />

        {withSubmit && (
          <Stack gap={inube.spacing.s150} justifyContent="flex-end">
            <Button
              onClick={() => formik.handleReset}
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
