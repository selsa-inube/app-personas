import { Textarea } from "@design/input/Textarea";
import { FormikValues } from "formik";

interface CommentsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function CommentsFormUI(props: CommentsFormUIProps) {
  const { formik, loading, customHandleBlur } = props;

  return (
    <form>
      <Textarea
        id="comments"
        name="comments"
        label="Comentarios"
        placeholder="Escribe tus comentarios"
        maxLength={150}
        isDisabled={loading}
        value={formik.values.comments}
        onBlur={customHandleBlur}
        onChange={formik.handleChange}
        onFocus={formik.isFocused}
        isFullWidth
      />
    </form>
  );
}

export { CommentsFormUI };
