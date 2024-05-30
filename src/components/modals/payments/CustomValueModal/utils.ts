import { paymentOptionValues } from "@pages/admin/payments/Pay/config/mappers";
import { EPaymentOptionType } from "@pages/admin/payments/Pay/types";

interface IApplyPayOption {
  id: string;
  label: string;
}

const applyPayOptions: IApplyPayOption[] = [
  {
    id: EPaymentOptionType.REPROGRAMMINGDEADLINE,
    label: paymentOptionValues[EPaymentOptionType.REPROGRAMMINGDEADLINE],
  },
  {
    id: EPaymentOptionType.REPROGRAMMINGMAINTAININGVALUE,
    label: paymentOptionValues[EPaymentOptionType.REPROGRAMMINGMAINTAININGVALUE],
  },
];

export { applyPayOptions };
export type { IApplyPayOption };