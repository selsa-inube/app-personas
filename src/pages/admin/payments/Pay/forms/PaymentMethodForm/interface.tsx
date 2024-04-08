import { FormikValues } from "formik";

interface PaymentMethodFormUIProps {
  formik: FormikValues;
}

function PaymentMethodFormUI(props: PaymentMethodFormUIProps) {
  // TEMP
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { formik } = props;

  return <form></form>;
}

export { PaymentMethodFormUI };
