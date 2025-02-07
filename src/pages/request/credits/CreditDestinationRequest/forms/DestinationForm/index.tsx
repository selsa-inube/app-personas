import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { getProductsForDestination } from "src/services/iclient/credits/getProducts";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { DestinationFormUI } from "./interface";
import { ICreditDestinationProduct, IDestinationEntry } from "./types";

const validationSchema = Yup.object({
  destination: Yup.object().required(validationMessages.required),
  product: Yup.object(),
});

interface DestinationFormProps {
  initialValues: IDestinationEntry;
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IDestinationEntry) => void;
}

const DestinationForm = forwardRef(function DestinationForm(
  props: DestinationFormProps,
  ref: React.Ref<FormikProps<IDestinationEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicValidationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
    enableReinitialize: true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  const handleChangeDestination = async (name: string, value: string) => {
    const destination = formik.values.destinations.find(
      (destination) => destination.id === value,
    );

    formik.setFieldValue("destination", {
      id: destination?.id,
      value: destination?.value,
      label: destination?.label,
    });

    formik.setFieldValue("product", undefined);
    formik.setFieldValue("products", []);

    if (value === "other") {
      const newValidationSchema = dynamicValidationSchema.concat(
        Yup.object({
          product: Yup.object(),
        }),
      );

      setDynamicValidationSchema(newValidationSchema);

      return;
    } else {
      const newValidationSchema = dynamicValidationSchema.concat(
        Yup.object({
          product: Yup.object().required(validationMessages.required),
        }),
      );

      setDynamicValidationSchema(newValidationSchema);
    }

    if (!destination?.id || !accessToken) return;

    setLoadingProducts(true);

    const products = await getProductsForDestination(
      user.identification,
      accessToken,
      destination.id,
    );

    if (products.length === 0) {
      formik.setFieldValue("products", []);
      setLoadingProducts(false);
      return;
    }

    formik.setFieldValue("products", products);

    setLoadingProducts(false);
  };

  const handleChangeProduct = (value: ICreditDestinationProduct) => {
    formik.setFieldValue("product", value);
  };

  return (
    <DestinationFormUI
      loading={loading}
      formik={formik}
      loadingProducts={loadingProducts}
      onChangeProduct={handleChangeProduct}
      onChangeDestination={handleChangeDestination}
    />
  );
});

export { DestinationForm };
export type { DestinationFormProps };
