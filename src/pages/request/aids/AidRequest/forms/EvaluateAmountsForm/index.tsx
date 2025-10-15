import { FormikProps, useFormik } from "formik";
import {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import * as Yup from "yup";
import { EvaluateAmountsFormUI } from "./interface";
import { IEvaluateAmountsEntry, SimulationState } from "./types";
import { aidTypeDM } from "src/model/domains/services/aids/aidTypeDM";
import { useLocation } from "react-router";
import { valuesAndValidationsAid } from "./utils";
import { useAuth } from "@inube/auth";
import { AppContext } from "src/context/app";
import { IBeneficiary } from "src/model/entity/user";

const validationSchema = Yup.object().shape({
    costAid: Yup.number().min(1, "El valor debe ser mayor a 0").required("Requerido"),
    applicationDays: Yup.number().min(1, "La cantidad de días debe ser mayor a 0").required("Requerido"),
});

interface EvaluateAmountsFormProps {
    initialValues: IEvaluateAmountsEntry;
    beneficiary?: IBeneficiary;
    onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EvaluateAmountsForm = forwardRef(function EvaluateAmountsForm(
    props: EvaluateAmountsFormProps,
    ref: React.Ref<FormikProps<IEvaluateAmountsEntry>>,
) {
    const { initialValues, beneficiary, onFormValid } = props;
    const { accessToken } = useAuth();
    const { user } = useContext(AppContext);
    const location = useLocation();
    const [dynamicSchema, setDynamicSchema] =
        useState<Yup.ObjectSchema<Yup.AnyObject>>(validationSchema);
    const [loadingSimulation, setLoadingSimulation] = useState<SimulationState>(SimulationState.IDLE);

    const formik = useFormik({
        initialValues,
        validationSchema: dynamicSchema,
        validateOnBlur: false,
        onSubmit: async () => true,
    });

    useImperativeHandle(ref, () => formik);

    const calculateForAmount = location.state?.type.id === aidTypeDM.REQUIRED_AMOUNT.id;

    useEffect(() => {
        formik.setFieldValue("aidId", location.state?.id);
        formik.setFieldValue("aidName", location.state?.title);
        formik.setFieldValue("aidType", location.state?.type);
    }, []);

    useEffect(() => {
        formik.validateForm().then((errors) => {
            onFormValid && onFormValid(Object.keys(errors).length === 0);
        });
    }, [formik.values, dynamicSchema]);

    const simulateAid = async () => {
        if (!accessToken || !user.identification) {
            console.warn("Missing accessToken or user identification");
            return;
        }
        setLoadingSimulation(SimulationState.LOADING);

        const aidValue = formik.values.costAid;

        if (calculateForAmount && aidValue && aidValue > 0) {
            await valuesAndValidationsAid(
                aidValue,
                accessToken,
                beneficiary?.identificationNumber || "",
                user.identification,
                location.state?.id || "",
                dynamicSchema,
                calculateForAmount,
                formik
            ).then((newValidationSchema) => {
                setDynamicSchema(newValidationSchema);
                setLoadingSimulation(SimulationState.COMPLETED);
            }).catch(() => {
                setLoadingSimulation(SimulationState.IDLE);
            });
        }
    }

    return (
        <EvaluateAmountsFormUI
            formik={formik}
            forAmount={calculateForAmount}
            beneficiary={beneficiary}
            simulateAid={simulateAid}
            loadingSimulation={loadingSimulation}
        />
    );
});

export { EvaluateAmountsForm };
export type { EvaluateAmountsFormProps };
