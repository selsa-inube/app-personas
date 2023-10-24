import { FormikValues } from "formik";
import { Textarea } from "@design/input/Textarea";

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
        handleBlur={customHandleBlur}
        handleChange={formik.handleChange}
        handleFocus={formik.isFocused}
        isFullWidth
      />
    </form>
  );
}

export { CommentsFormUI };
