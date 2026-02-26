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
    label: "Débito automático",
  },
];

export { paymentMethods };
