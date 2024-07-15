import { creditDestinationData } from "@mocks/domains/creditDestination";
import { destinationProductsMock } from "@mocks/products/credits/request.mocks";
import { FormikProps, useFormik } from "formik";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { DestinationFormUI } from "./interface";
import { IDestinationEntry, IDestinationProduct } from "./types";

const validationSchema = Yup.object({
  creditDestination: Yup.object().required(validationMessages.required),
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
    formik.setFieldValue("destinations", creditDestinationData);
  }, []);

  const handleChangeDestination = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const destination = formik.values.destinations.find(
      (destination) => destination.id === event.target.value,
    );

    formik.setFieldValue("creditDestination", {
      id: destination?.id,
      value: destination?.value,
    });

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
      onChangeProduct={handleChangeProduct}
      onChangeDestination={handleChangeDestination}
    />
  );
});

export { DestinationForm };
export type { DestinationFormProps };
