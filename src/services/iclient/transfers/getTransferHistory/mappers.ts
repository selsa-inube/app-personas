import { ITag } from "@inubekit/inubekit";
import { paymentStatusDM } from "src/model/domains/payments/paymentStatusDM";
import { transferSourceDM } from "src/model/domains/transfers/transferSourceDM";

import { ITransfer } from "src/model/entity/transfer";

const transferStatusAppearance: Record<string, ITag["appearance"]> = {
  PendingPSE: "warning",
  PendingLinix: "warning",
  UndefinedPSE: "warning",
  InProgressPSE: "warning",
  RejectedPSE: "danger",
  InProgressLinix: "warning",
  RejectedLinix: "danger",
  Completed: "success",
  StuckInPSE: "warning",
  BlockedInPSE: "danger",
};

const mapTransferHistoryApiToEntity = (
  transfer: Record<string, string | number | object>,
): ITransfer => {
  let title = "Transferencia CUENTA DE AHORROS";
  if (transfer.source === transferSourceDM.PSE.value) {
    title = "Depósito CUENTA DE AHORROS";
  }

  return {
    id: String(transfer.transferId),
    title,
    value: Number(transfer.amount),
    date: new Date(String(transfer.transferDate)),
    destination: `Cuenta de ahorros - ${transfer.destination}`,
    source: transferSourceDM.valueOf(String(transfer.source))?.value || "",
    tag: {
      label: paymentStatusDM.valueOf(String(transfer.status))?.value || "",
      appearance: transferStatusAppearance[String(transfer.status)],
    },
  };
};

const mapTransfersHistoryApiToEntities = (
  transferHistory: Record<string, string | number | object>[],
): ITransfer[] => {
  return transferHistory.map((transfer) =>
    mapTransferHistoryApiToEntity(transfer),
  );
};

export { mapTransferHistoryApiToEntity, mapTransfersHistoryApiToEntities };
