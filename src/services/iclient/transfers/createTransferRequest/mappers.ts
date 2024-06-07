import {
  ITransferRequest,
  ITransferRequestResponse,
} from "src/model/entity/transfer";

const mapTransferRequestApiToEntity = (
  transferRequest: Record<string, string | number | object>,
): ITransferRequestResponse => {
  const causes = transferRequest.causas;
  let state = "";
  let message = "";

  if (causes && Array.isArray(causes)) {
    state = String(causes[0].id);
    message = String(causes[0].message);
  }

  return {
    trackingCode: String(transferRequest.trackingCode),
    url: transferRequest.url ? String(transferRequest.url) : undefined,
    state,
    message,
  };
};

const mapTransferRequestEntityToApi = (
  transferRequest: ITransferRequest,
): Record<string, string | number | object> => {
  const transferDate = new Date();

  return {
    customerCode: transferRequest.customerCode,
    customerName: transferRequest.customerName,
    transferDate: transferDate.toISOString(),
    source: transferRequest.source.id,
    destination: transferRequest.destination,
    amount: transferRequest.amount,
    urlRedirect: transferRequest.urlRedirect,
  };
};

export { mapTransferRequestApiToEntity, mapTransferRequestEntityToApi };
