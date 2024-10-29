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
import { getProgrammedSavingProducts } from "src/services/iclient/savings/getProgrammedSavingProducts";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { DestinationFormUI } from "./interface";
import { IDestinationEntry, IProgrammedSavingProduct } from "./types";

const validationSchema = Yup.object({
  product: Yup.object().required(validationMessages.required),
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
  const { initialValues, onFormValid, onSubmit } = props;
  const [loadingProducts, setLoadingProducts] = useState(false);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const formik = useFormik({
    initialValues,
    validationSchema,
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

  const getProducts = async () => {
    if (!accessToken) return;

    setLoadingProducts(true);

    const products = await getProgrammedSavingProducts(
      user.identification,
      accessToken,
    );

    if (products.length === 0) {
      formik.setFieldValue("products", []);
      setLoadingProducts(false);
      return;
    }

    formik.setFieldValue("products", products);

    setLoadingProducts(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChangeProduct = (value: IProgrammedSavingProduct) => {
    formik.setFieldValue("product", value);
  };

  return (
    <DestinationFormUI
      formik={formik}
      loadingProducts={loadingProducts}
      onChangeProduct={handleChangeProduct}
    />
  );
});

export { DestinationForm };
export type { DestinationFormProps };
