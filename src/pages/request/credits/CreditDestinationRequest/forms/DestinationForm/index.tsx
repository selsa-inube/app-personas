import { ISelectOption } from "@design/input/Select/types";
import { creditDestinationData } from "@mocks/domains/creditDestination";
import { destinationProductsMock } from "@mocks/products/credits/request.mocks";
import { FormikProps, useFormik } from "formik";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { DestinationFormUI } from "./interface";
import { IDestinationEntry, IDestinationProduct } from "./types";

const validationSchema = Yup.object({
  creditDestination: Yup.string().required(validationMessages.required),
  selectedProduct: Yup.object(),
});

interface DestinationFormProps {
  initialValues: IDestinationEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IDestinationEntry) => void;
  loading?: boolean;
}

const DestinationForm = forwardRef(function DestinationForm(
  props: DestinationFormProps,
  ref: React.Ref<FormikProps<IDestinationEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    React.useState(validationSchema);
  const [destinations, setDestinations] = React.useState<ISelectOption[]>([]);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicValidationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values]);

  useEffect(() => {
    setDestinations(creditDestinationData);
  }, []);

  const handleChangeDestination = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    formik.handleChange(event);
    formik.setFieldValue("selectedProduct", undefined);

    const { value } = event.target;

    if (value === "other") {
      const newValidationSchema = dynamicValidationSchema.concat(
        Yup.object({
          selectedProduct: Yup.object(),
        }),
      );

      setDynamicValidationSchema(newValidationSchema);

      return;
    } else {
      const newValidationSchema = dynamicValidationSchema.concat(
        Yup.object({
          selectedProduct: Yup.object().required(validationMessages.required),
        }),
      );

      setDynamicValidationSchema(newValidationSchema);
    }

    formik.setFieldValue(
      "products",
      destinationProductsMock[value as keyof typeof destinationProductsMock],
    );
  };

  const handleChangeProduct = (value: IDestinationProduct) => {
    formik.setFieldValue("selectedProduct", value);
  };

  return (
    <DestinationFormUI
      loading={loading}
      formik={formik}
      destinations={destinations}
      onChangeProduct={handleChangeProduct}
      onChangeDestination={handleChangeDestination}
    />
  );
});

export { DestinationForm };
export type { DestinationFormProps };
