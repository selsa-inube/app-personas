import { FormikProps } from "formik";
import { IQuotaEntry } from "./forms/QuotaForm/types";


interface IFormsProgrammedSavingFixedRequest {
  quota: { isValid: boolean; values: IQuotaEntry };
  
}

interface IFormsProgrammedSavingFixedRequestRefs {
    quota: React.RefObject<FormikProps<IQuotaEntry>>;
  
}

export type { IFormsProgrammedSavingFixedRequest,  IFormsProgrammedSavingFixedRequestRefs };
