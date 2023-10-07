import { FormikValues } from "formik";
import { Textarea } from "@design/input/Textarea";

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
        maxLength={250}
        disabled={loading}
        value={formik.values.comments}
        onBlur={formik.onBlur}
        onChange={formik.handleChange}
        onFocus={formik.isFocused}
        fullwidth
      ></Textarea>
    </form>
  );
}

export { CommentsFormUI };
