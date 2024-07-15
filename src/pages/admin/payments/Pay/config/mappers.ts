import { TagProps } from "@design/data/Tag";
import { IPayment } from "src/model/entity/payment";
import { ECommitmentType, ICommitment } from "src/model/entity/product";
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

const paymentOptionValues: Record<string, string> = {
  [EPaymentOptionType.EXPIREDVALUE]: "Valor vencido",
  [EPaymentOptionType.NEXTVALUE]: "Próximo vencimiento",
  [EPaymentOptionType.TOTALVALUE]: "Pago total",
  [EPaymentOptionType.OTHERVALUE]: "Abono a capital",
  [EPaymentOptionType.REPROGRAMMINGDEADLINE]: "Reducir cuota",
  [EPaymentOptionType.REPROGRAMMINGMAINTAININGVALUE]: "Reducir plazo",
  [EPaymentOptionType.REDUCEFUTUREQUOTA]: "Pagar cuotas futuras",
};

const mapObligations = (
  credits: IPayment[],
  commitments: ICommitment[],
  withNextValueOption: boolean,
  withOtherValueOption: boolean,
  withExpiredValueOption: boolean,
): IObligationsEntry => {
  const payments: IPayment[] = [];
  const paymentMethodFilters: string[] = [];

  credits.forEach((payment) => {
    if (
      !paymentMethodFilters.find(
        (filter) =>
          filter.toLowerCase() === payment.paymentMethodName.toLowerCase(),
      )
    ) {
      paymentMethodFilters.push(payment.paymentMethodName);
    }

    payments.push(payment);
  });

  commitments.forEach((commitment) => {
    const expiredValue = Number(
      extractAttribute(commitment.attributes, "expired_value")?.value || 0,
    );

    const nextPaymentValue = Number(
      extractAttribute(commitment.attributes, "next_payment_value")?.value || 0,
    );

    const nextPayment = String(
      extractAttribute(commitment.attributes, "next_payment")?.value,
    );

    const nextPaymentDate = String(
      extractAttribute(commitment.attributes, "next_payment_date")?.value,
    );

    const paymentMethodName = String(
      extractAttribute(commitment.attributes, "payment_method")?.value,
    );

    if (
      !paymentMethodFilters.find(
        (filter) => filter.toLowerCase() === paymentMethodName.toLowerCase(),
      )
    ) {
      paymentMethodFilters.push(paymentMethodName);
    }

    const inArrears =
      extractAttribute(commitment.attributes, "in_arrears")?.value.toString() ==
      "true";

    const tags: TagProps[] = [
      {
        label: paymentMethodName,
        appearance: "gray",
        modifier: "clear",
        textAppearance: "gray",
      },
    ];

    if (inArrears) {
      tags.push({
        label: "En mora",
        appearance: "danger",
      });
    }

    const options = [];

    if (expiredValue && withExpiredValueOption) {
      options.push({
        id: EPaymentOptionType.EXPIREDVALUE,
        label: "Valor vencido",
        value: expiredValue,
      });
    }

    if (nextPaymentValue && withNextValueOption) {
      options.push({
        id: EPaymentOptionType.NEXTVALUE,
        label: paymentOptionValues[EPaymentOptionType.NEXTVALUE],
        description: nextPayment,
        date: new Date(nextPaymentDate),
        value: nextPaymentValue,
      });
    }

    if (withOtherValueOption) {
      options.push({
        id: EPaymentOptionType.OTHERVALUE,
        label: "Abono a capital",
        value: 0,
        hidden: true,
      });
    }

    let supportDocumentType = ESupportDocumentType.CONTRIBUTIONCOMMITMENT;
    if (commitment.type === ECommitmentType.SAVINGSPROGRAMMED) {
      supportDocumentType = ESupportDocumentType.SAVINGCOMMITMENT;
    }

    if (options.some((option) => option.value > 0)) {
      payments.push({
        id: commitment.id,
        title: commitment.title,
        group: EPaymentGroupType.SAVINGSCOMMITMENT,
        paymentMethodName,
        status: inArrears
          ? EPaymentStatusType.ARREARS
          : EPaymentStatusType.ANYWHERE,
        options,
        tags,
        supportDocumentType,
        allowCustomValue: true,
      });
    }
  });

  return {
    payments,
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
