import { formatPrimaryDate } from "src/utils/dates";

const deduceRefundDate = (daysNumber: number) => {
  const newRefundDate = new Date();
  newRefundDate.setHours(0, 0, 0, 0);

  newRefundDate.setDate(newRefundDate.getDate() + daysNumber);

  return formatPrimaryDate(newRefundDate);
};

const deduceDaysNumber = (refundDate: string) => {
  const newRefundDate = new Date(refundDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Math.round(
    (newRefundDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );
};

export { deduceDaysNumber, deduceRefundDate };
