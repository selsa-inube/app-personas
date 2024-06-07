import { TagAppearanceType } from "@design/data/Tag/types";
import { transferSourceDM } from "src/model/domains/transfers/transferSourceDM";
import { transferStatusDM } from "src/model/domains/transfers/transferStatusDM";

import { ITransfer } from "src/model/entity/transfer";

const transferTitleValues: Record<string, string> = {
  rechargeSavingAccount: "Recarga CUENTA DE AHORROS",
};

const transferStatusAppearance: Record<string, TagAppearanceType> = {
  inProgressPSE: "warning",
  rejectedPse: "error",
  inProgress: "warning",
  completed: "success",
  rejected: "error",
};

const mapTransferHistoryApiToEntity = (
  transfer: Record<string, string | number | object>,
): ITransfer => {
  return {
    id: String(transfer.transferId),
    title: transferTitleValues[String(transfer.transferSource)],
    value: Number(transfer.totalValuePaid),
    date: new Date(String(transfer.payDay)),
    destination: String(transfer.destination),
    source: transferSourceDM.valueOf(String(transfer.source))?.value || "",
    tag: {
      label:
        transferStatusDM.valueOf(String(transfer.transferStatus))?.value || "",
      appearance: transferStatusAppearance[String(transfer.transferStatus)],
      textAppearance: transferStatusAppearance[String(transfer.transferStatus)],
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
