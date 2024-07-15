import { paymentOptionValues } from "@pages/admin/payments/Pay/config/mappers";
import { EPaymentOptionType } from "@pages/admin/payments/Pay/types";

interface IApplyPayOption {
  id: string;
  label: string;
}

const getOptions = (
  customValue: number,
  nextPaymentValue: number,
): IApplyPayOption[] => {
  const options = [
    {
      id: EPaymentOptionType.REDUCEFUTUREQUOTA,
      label: paymentOptionValues[EPaymentOptionType.REDUCEFUTUREQUOTA],
    },
  ];

  if (customValue > nextPaymentValue) {
    const addOptions = [
      {
        id: EPaymentOptionType.REPROGRAMMINGDEADLINE,
        label: paymentOptionValues[EPaymentOptionType.REPROGRAMMINGDEADLINE],
      },
      {
        id: EPaymentOptionType.REPROGRAMMINGMAINTAININGVALUE,
        label:
          paymentOptionValues[EPaymentOptionType.REPROGRAMMINGMAINTAININGVALUE],
      },
    ];

    options.push(...addOptions);
  } else if (customValue < nextPaymentValue) {
    const addOptions = [
      {
        id: EPaymentOptionType.OTHERVALUE,
        label: paymentOptionValues[EPaymentOptionType.OTHERVALUE],
      },
    ];

    options.push(...addOptions);
  }

  return options;
};

export { getOptions };
export type { IApplyPayOption };
