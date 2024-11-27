import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { IUser } from "@inube/auth/dist/types/user";
import { FormikProps } from "formik";
import { RequestType } from "src/model/entity/request";
import { IValidation } from "src/model/entity/service";
import { IBeneficiary } from "src/model/entity/user";
import {
  IRequirementDisbursementRequest,
  IRequirementRequest,
} from "src/services/iclient/productRequest/getRequirements/types";
import { IMoneySourceValid, ISystemValidationsEntry } from "./types";

const loadingValidations: IValidation[] = [
  {
    id: "load_1",
    label: "Loading",
    value: "pending",
    isRequired: true,
  },
  {
    id: "load_2",
    label: "Loading",
    value: "pending",
    isRequired: true,
  },
  {
    id: "load_3",
    label: "Loading",
    value: "pending",
  },
  {
    id: "load_4",
    label: "Loading",
    value: "pending",
  },
  {
    id: "load_5",
    label: "Loading",
    value: "pending",
    isRequired: true,
  },
  {
    id: "load_6",
    label: "Loading",
    value: "pending",
  },
];

const buildRequestData = (
  requestType: RequestType,
  user: IUser,
  formik: FormikProps<ISystemValidationsEntry>,
  disbursementValues: IDisbursementEntry,
  beneficiary?: IBeneficiary,
  shareMaturity?: string,
  moneySources?: IMoneySourceValid[],
) => {
  const requestDate = new Date();

  const disbursementMethod: IRequirementDisbursementRequest = {
    id: disbursementValues.disbursement || "",
    name: disbursementValues.disbursementName || "",
    accountNumber: disbursementValues.accountNumber,
    transferAccountNumber: disbursementValues.writeAccountNumber,
    transferAccountType: disbursementValues.accountType,
    transferBankEntity: disbursementValues.bankEntity,
    firstName: disbursementValues.firstName,
    lastName: disbursementValues.firstLastName,
    gender: disbursementValues.gender,
    genderName: disbursementValues.gender,
    identificationType: disbursementValues.identificationType,
    identification: disbursementValues.identification,
  };

  const requirementsRequest: IRequirementRequest = {
    requestType,
    customerCode: user.identification,
    customerName: `${user.firstName} ${user.secondName} ${user.firstLastName} ${user.secondLastName}`,
    requestDate,
    disbursementMethod,
  };

  if (
    requestType === "credit" &&
    formik.values.destinationId &&
    formik.values.destinationName &&
    formik.values.rate &&
    formik.values.amortizationType &&
    formik.values.periodicity &&
    formik.values.netValue &&
    formik.values.deadline &&
    formik.values.paymentMethod &&
    formik.values.paymentMethodName &&
    formik.values.periodicity &&
    formik.values.quota
  ) {
    requirementsRequest.creditData = {
      destinationId: formik.values.destinationId,
      destinationName: formik.values.destinationName,
      rate: formik.values.rate,
      amortizationType: formik.values.amortizationType,
      interestPaymentPeriod: formik.values.periodicity,
      netValue: formik.values.netValue,
      productId: formik.values.productId,
      productName: formik.values.productName,
      amount: formik.values.amount,
      deadline: formik.values.deadline,
      paymentMethod: formik.values.paymentMethod,
      paymentMethodName: formik.values.paymentMethodName,
      periodicity: formik.values.periodicity,
      quota: formik.values.quota,
    };
  }

  if (requestType === "aid" && beneficiary) {
    requirementsRequest.aidData = {
      productId: formik.values.productId,
      productName: formik.values.productName,
      amount: formik.values.amount,
      beneficiary,
    };
  }

  if (
    requestType === "newprogrammedsaving" &&
    formik.values.deadline &&
    formik.values.paymentMethod &&
    formik.values.paymentMethodName &&
    formik.values.periodicity &&
    formik.values.quota
  ) {
    requirementsRequest.programmedSavingData = {
      actionAfterExpiration: shareMaturity || "",
      productId: formik.values.productId,
      productName: formik.values.productName,
      deadline: formik.values.deadline,
      paymentMethod: formik.values.paymentMethod,
      paymentMethodName: formik.values.paymentMethodName,
      periodicity: formik.values.periodicity,
      quota: formik.values.quota,
    };
  }

  if (
    requestType === "newcdat" &&
    formik.values.rate &&
    formik.values.deadline &&
    moneySources
  ) {
    requirementsRequest.cdatData = {
      amount: formik.values.amount,
      deadline: formik.values.deadline,
      productId: formik.values.productId,
      productName: formik.values.productName,
      rate: formik.values.rate,
      moneySources: moneySources,
    };
  }

  return requirementsRequest;
};

export { buildRequestData, loadingValidations };
