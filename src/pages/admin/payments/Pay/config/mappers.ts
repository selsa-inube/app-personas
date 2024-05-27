import { TagProps } from "@design/data/Tag";
import { IPayment } from "src/model/entity/payment";
import {
  ECommitmentType,
  ICommitment,
  IProduct,
} from "src/model/entity/product";
import { ICommentsEntry } from "src/shared/forms/CommentsForm/types";
import { extractAttribute } from "src/utils/products";
import { IObligationsEntry } from "../forms/ObligationsForm/types";
import { IPaymentMethodEntry } from "../forms/PaymentMethodForm/types";
import {
  EPaymentGroupType,
  EPaymentOptionType,
  EPaymentStatusType,
  ESupportDocumentType,
} from "../types";

const buAllowCustomValue = true;

const paymentOptionValues: Record<string, string> = {
  [EPaymentOptionType.EXPIREDVALUE]: "Valor vencido",
  [EPaymentOptionType.NEXTVALUE]: "Próximo vencimiento",
  [EPaymentOptionType.TOTALVALUE]: "Pago total",
  [EPaymentOptionType.OTHERVALUE]: "Otro valor",
  [EPaymentOptionType.REPROGRAMMINGDEADLINE]:
    "Reprogramación manteniendo el plazo",
  [EPaymentOptionType.REPROGRAMMINGMAINTAININGVALUE]:
    "Reprogramación manteniendo el valor de la cuota",
  [EPaymentOptionType.REDUCEFUTUREQUOTA]: "Abono a cuotas futuras",
};

const mapObligations = (
  credits: IProduct[],
  commitments: ICommitment[],
): IObligationsEntry => {
  const payments: IPayment[] = [];
  const paymentMethodFilters: string[] = [];

  credits.forEach((credit) => {
    /* const expiredValue = Number( // TEMP
      extractAttribute(credit.attributes, "expired_value")?.value || 0,
    ); */

    const nextPaymentValue = Number(
      extractAttribute(credit.attributes, "next_payment_value")?.value || 0,
    );

    const nextPayment = String(
      extractAttribute(credit.attributes, "next_payment")?.value,
    );

    const nextPaymentDate = String(
      extractAttribute(credit.attributes, "next_payment_date")?.value,
    );

    const paymentMethod = String(
      extractAttribute(credit.attributes, "payment_method")?.value,
    );

    const lineCode = String(
      extractAttribute(credit.attributes, "line_code")?.value,
    );

    const halfPayment = String(
      extractAttribute(credit.attributes, "half_payment")?.value,
    );

    if (
      !paymentMethodFilters.find(
        (filter) => filter.toLowerCase() === paymentMethod.toLowerCase(),
      )
    ) {
      paymentMethodFilters.push(paymentMethod);
    }

    /* const totalValue = Number( // TEMP
      extractAttribute(credit.attributes, "net_value")?.value || 0,
    ); */

    const inArrears =
      extractAttribute(credit.attributes, "in_arrears")?.value.toString() ==
      "true";

    const tags: TagProps[] = [
      {
        label: paymentMethod,
        appearance: "gray",
        modifier: "clear",
        textAppearance: "gray",
      },
    ];

    if (inArrears) {
      tags.push({
        label: "En mora",
        appearance: "error",
      });
    }

    const options = [
      /* { // TEMP
        id: EPaymentOptionType.EXPIREDVALUE,
        label: "Valor vencido",
        value: expiredValue,
      }, */
      {
        id: EPaymentOptionType.NEXTVALUE,
        label: paymentOptionValues[EPaymentOptionType.NEXTVALUE],
        description: nextPayment,
        date: new Date(nextPaymentDate),
        value: nextPaymentValue,
      },
      /* { // TEMP
        id: EPaymentOptionType.TOTALVALUE,
        label: "Pago total",
        value: totalValue,
      }, */
      {
        id: EPaymentOptionType.OTHERVALUE,
        label: "Otro valor",
        value: 0,
        hidden: true,
      },
    ];

    if (options.some((option) => option.value > 0)) {
      payments.push({
        id: credit.id,
        title: credit.title,
        group: EPaymentGroupType.CREDITS,
        paymentMethod,
        status: inArrears
          ? EPaymentStatusType.ARREARS
          : EPaymentStatusType.ANYWHERE,
        options,
        tags,
        supportDocumentType: ESupportDocumentType.FINANCIALPORTFOLIO,
        lineCode,
        halfPayment,
      });
    }
  });

  commitments.forEach((commitment) => {
    // const expiredValue = Number( // TEMP
    //   extractAttribute(commitment.attributes, "expired_value")?.value || 0,
    // );

    const nextPaymentValue = Number(
      extractAttribute(commitment.attributes, "next_payment_value")?.value || 0,
    );

    const nextPayment = String(
      extractAttribute(commitment.attributes, "next_payment")?.value,
    );

    const nextPaymentDate = String(
      extractAttribute(commitment.attributes, "next_payment_date")?.value,
    );

    const paymentMethod = String(
      extractAttribute(commitment.attributes, "payment_method")?.value,
    );

    if (
      !paymentMethodFilters.find(
        (filter) => filter.toLowerCase() === paymentMethod.toLowerCase(),
      )
    ) {
      paymentMethodFilters.push(paymentMethod);
    }

    const inArrears =
      extractAttribute(commitment.attributes, "in_arrears")?.value.toString() ==
      "true";

    const tags: TagProps[] = [
      {
        label: paymentMethod,
        appearance: "gray",
        modifier: "clear",
        textAppearance: "gray",
      },
    ];

    if (inArrears) {
      tags.push({
        label: "En mora",
        appearance: "error",
      });
    }

    const options = [
      // { // TEMP
      //   id: EPaymentOptionType.EXPIREDVALUE,
      //   label: "Valor vencido",
      //   value: expiredValue,
      // },
      {
        id: EPaymentOptionType.NEXTVALUE,
        label: paymentOptionValues[EPaymentOptionType.NEXTVALUE],
        description: nextPayment,
        date: new Date(nextPaymentDate),
        value: nextPaymentValue,
      },
    ];

    let supportDocumentType = ESupportDocumentType.CONTRIBUTIONCOMMITMENT;
    if (commitment.type === ECommitmentType.SAVINGSPROGRAMMED) {
      supportDocumentType = ESupportDocumentType.SAVINGCOMMITMENT;
    }

    if (options.some((option) => option.value > 0)) {
      payments.push({
        id: commitment.id,
        title: commitment.title,
        group: EPaymentGroupType.SAVINGSCOMMITMENT,
        paymentMethod,
        status: inArrears
          ? EPaymentStatusType.ARREARS
          : EPaymentStatusType.ANYWHERE,
        options,
        tags,
        supportDocumentType,
      });
    }
  });

  return {
    payments,
    allowCustomValue: buAllowCustomValue,
    totalPayment: 0,
    paymentMethodFilters,
  };
};

const mapPaymentMethod = (): IPaymentMethodEntry => {
  return {
    paymentMethod: "",
    valueToPay: 0,
    pendingValue: 0,
  };
};

const mapComments = (): ICommentsEntry => {
  return {
    comments: "",
  };
};

export { mapComments, mapObligations, mapPaymentMethod, paymentOptionValues };
