import { TagAppearanceType } from "@design/data/Tag/types";
import { transferSourceDM } from "src/model/domains/transfers/transferSourceDM";
import { transferStatusDM } from "src/model/domains/transfers/transferStatusDM";

import { ITransfer } from "src/model/entity/transfer";

const transferStatusAppearance: Record<string, TagAppearanceType> = {
  InProgressPSE: "warning",
  RejectedPse: "error",
  InProgress: "warning",
  Completed: "success",
  Rejected: "error",
};

const mapTransferHistoryApiToEntity = (
  transfer: Record<string, string | number | object>,
): ITransfer => {
  let title = "Transferencia CUENTA DE AHORROS";
  if (transfer.source === transferSourceDM.PSE.value) {
    title = "Recarga CUENTA DE AHORROS";
  }

  return {
    id: String(transfer.transferId),
    title,
    value: Number(transfer.amount),
    date: new Date(String(transfer.transferDate)),
    destination: `Cuenta de ahorros - ${transfer.destination}`,
    source: transferSourceDM.valueOf(String(transfer.source))?.value || "",
    tag: {
      label: transferStatusDM.valueOf(String(transfer.status))?.value || "",
      appearance: transferStatusAppearance[String(transfer.status)],
      textAppearance: transferStatusAppearance[String(transfer.status)],
      modifier: "clear",
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
