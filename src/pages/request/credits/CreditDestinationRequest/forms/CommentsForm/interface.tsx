import { Textarea } from "@design/input/Textarea";
import { FormikValues } from "formik";

interface CommentsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
}

function CommentsFormUI(props: CommentsFormUIProps) {
  const { formik, loading } = props;

  return (
    <form>
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
    </form>
  );
}

export { CommentsFormUI };
