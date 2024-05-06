import { TagProps } from "@design/data/Tag";
import { paymentOptionValues } from "@pages/admin/payments/Pay/config/mappers";
import {
  EPaymentGroupType,
  EPaymentOptionType,
  EPaymentStatusType,
  ESupportDocumentType,
} from "@pages/admin/payments/Pay/types";
import { IPayment, IPaymentOption } from "src/model/entity/payment";
import { formatPrimaryDate } from "src/utils/dates";

const mapObligationPaymentApiToEntity = (
  obligationPayment: Record<string, string | number | object>,
): IPayment => {
  const nextPaymentDate = new Date(String(obligationPayment.nextPaymentDate));
  nextPaymentDate.setUTCHours(5, 5, 5, 5);

  const today = new Date();

  today.setUTCHours(5, 5, 5, 5);

  const inArrears = today > nextPaymentDate;

  const expiredValue = Number(
    Object(obligationPayment.valueExpired).totalPending || 0,
  );

  const nextPaymentValue = Number(
    Object(obligationPayment.nextPaymentValue).totalPending || 0,
  );

  const paymentMethod = String(obligationPayment.paymentMethod);

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

  const options: IPaymentOption[] = [
    {
      id: EPaymentOptionType.EXPIREDVALUE,
      label: "Valor vencido",
      value: expiredValue,
    },
    {
      id: EPaymentOptionType.NEXTVALUE,
      label: paymentOptionValues[EPaymentOptionType.NEXTVALUE],
      description: inArrears ? "Inmediato" : formatPrimaryDate(nextPaymentDate),
      value: nextPaymentValue,
    },
    /* { // TEMP
      id: EPaymentOptionType.TOTALVALUE,
      label: "Pago total",
      value: totalValue,
    }, */
  ];

  if (obligationPayment.paymentOtherValueAvailable) {
    options.push({
      id: EPaymentOptionType.OTHERVALUE,
      label: "Otro valor",
      value: 0,
      hidden: true,
    });
  }

  return {
    id: String(obligationPayment.obligationNumber),
    title: String(obligationPayment.productName),
    group: EPaymentGroupType.CREDITS,
    paymentMethod,
    status: obligationPayment.legalStatus as EPaymentStatusType,
    options,
    tags,
    supportDocumentType: ESupportDocumentType.FINANCIALPORTFOLIO,
  };
};

const mapObligationPaymentsApiToEntities = (
  obligationPayments: Record<string, string | number | object>[],
): IPayment[] => {
  return obligationPayments.map((payment) =>
    mapObligationPaymentApiToEntity(payment),
  );
};

export { mapObligationPaymentApiToEntity, mapObligationPaymentsApiToEntities };
