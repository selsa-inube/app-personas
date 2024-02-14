import { ICommitment } from "src/model/entity/product";
import { TagProps } from "@design/data/Tag";
import { capitalizeText } from "src/utils/texts";
import { capitalizeFirstLetters } from "src/utils/texts";
import { formatPrimaryDate } from "src/utils/dates";

const mapSavingsCommitmentsApiToEntity = (
  commitment: Record<string, string | number | object>,
): ICommitment => {
  const normalizedCommitmentName = capitalizeText(
    String(commitment.commitmentDescription).toLowerCase(),
  );
  let inArrears;
  let attributes;
  const today = new Date();

  if (Array.isArray(commitment.savingPaymentPlans)) {
    const lastObject =
      commitment.savingPaymentPlans[commitment.savingPaymentPlans.length - 1];

    const nextQuotaDate = new Date(String(lastObject.quotaDate));
    const valuePendingPayment = lastObject.valuePendingPayment;

    inArrears = today > nextQuotaDate;

    attributes = [
      {
        id: "value_to_pay",
        label: "Valor próximo pago",
        value: Number(valuePendingPayment),
      },
      {
        id: "next_pay_date",
        label: "Fecha próximo pago",
        value: inArrears ? "Inmediato" : formatPrimaryDate(nextQuotaDate),
      },
      {
        id: "pay_method",
        label: "Medio de pago",
        value: capitalizeFirstLetters(String(commitment.paymentMediumName)),
      },
    ];
  }

  const tag: TagProps | undefined = inArrears
    ? {
        label: "En mora",
        appearance: "error",
      }
    : undefined;

  return {
    id: String(commitment.commitmentId),
    title: normalizedCommitmentName,
    tag: tag,
    type: "PROGRAMMEDSAVINGS",
    attributes: attributes || [],
    products: [],
  };
};

const mapSavingsApiToEntities = (
  commitments: Record<string, string | number | object>[],
): ICommitment[] => {
  return commitments.map((commitment) =>
    mapSavingsCommitmentsApiToEntity(commitment),
  );
};

export { mapSavingsCommitmentsApiToEntity, mapSavingsApiToEntities };
