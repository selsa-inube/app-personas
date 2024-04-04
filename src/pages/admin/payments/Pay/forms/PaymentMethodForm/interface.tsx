import { FormikValues } from "formik";

interface PaymentMethodFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  withSubmit?: boolean;
  isRequired: (fieldName: string) => boolean;
}

function PaymentMethodFormUI(props: PaymentMethodFormUIProps) {
  // TEMP
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { formik, loading, withSubmit, isRequired } = props;

  return <form></form>;
}

export { PaymentMethodFormUI };
