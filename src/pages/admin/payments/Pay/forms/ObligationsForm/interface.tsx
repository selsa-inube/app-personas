import { FormikValues } from "formik";

interface ObligationsFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  withSubmit?: boolean;
}

function ObligationsFormUI(props: ObligationsFormUIProps) {
  // TEMP
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { formik, loading, withSubmit } = props;

  return <form></form>;
}

export { ObligationsFormUI };
