import { TagAppearanceType } from "@design/data/Tag/types";
import { transferStatusDM } from "src/model/domains/transfers/transferStatusDM";

import { ITransfer } from "src/model/entity/transfer";

const transferTitleValues: Record<string, string> = {
  recharge_saving_account: "Recarga CUENTA DE AHORROS",
};

const transferStatusAppearance: Record<string, TagAppearanceType> = {
  en_tramite_con_pse: "warning",
  pago_pse_abortado: "error",
  pago_recibido_en_proceso_de_aplicacion: "warning",
  pago_finalizado: "success",
  pago_no_satisfactorio: "error",
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
    origin: String(transfer.origin),
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
