import { IOption } from "@inubekit/inubekit";
import { collectMethodDM } from "src/model/domains/payments/collectMethodDM";

const paymentMethods: IOption[] = [
  {
    id: collectMethodDM.PSE.id,
    value: collectMethodDM.PSE.id,
    label: "Pagar con PSE",
  },
  {
    id: collectMethodDM.SAVINGACCOUNT.id,
    value: collectMethodDM.SAVINGACCOUNT.id,
    label: "Pagar con débito a una cuenta de ahorros",
  },
  {
    id: collectMethodDM.MULTIPLE.id,
    value: collectMethodDM.MULTIPLE.id,
    label: "Pagar con múltiples fuentes de dinero",
  },
];

const getPaymentMethods = (
  withPSE: boolean,
  withDebit: boolean,
  withMultiple: boolean,
): IOption[] => {
  const options: IOption[] = [];
  if (withPSE) {
    options.push({
      id: collectMethodDM.PSE.id,
      value: collectMethodDM.PSE.id,
      label: "Pagar con PSE",
    });
  }
  if (withDebit) {
    options.push({
      id: collectMethodDM.SAVINGACCOUNT.id,
      value: collectMethodDM.SAVINGACCOUNT.id,
      label: "Pagar con débito a una cuenta de ahorros",
    });
  }
  if (withMultiple) {
    options.push({
      id: collectMethodDM.MULTIPLE.id,
      value: collectMethodDM.MULTIPLE.id,
      label: "Pagar con múltiples fuentes de dinero",
    });
  }
  return options;
};

export { getPaymentMethods, paymentMethods };
