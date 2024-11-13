import { IUser } from "@inube/auth/dist/types/user";
import { extractAttribute } from "src/utils/products";
import { CdatCertificateDocument } from "./CdatCertificateDocument";
import { ISelectedProductState } from "./types";
import { SavingsAccountDocument } from "./SavingsAccountDocument";
import { ICommitment, IMovement } from "src/model/entity/product";
import { IEntry } from "@design/data/Table/types";
import { formatPrimaryDate } from "src/utils/dates";
import { currencyFormat } from "src/utils/currency";

const getCdatCertificateDocument = (
  selectedProduct: ISelectedProductState,
  user: IUser,
) => {
  const documentAttributes = selectedProduct.saving.attributes;

  const amount = extractAttribute(documentAttributes, "net_value")?.value;
  const creationDate = extractAttribute(
    documentAttributes,
    "request_date",
  )?.value;
  const expirationDate = extractAttribute(
    documentAttributes,
    "expiration_date",
  )?.value;
  const rate = extractAttribute(documentAttributes, "interest_rate")?.value;
  const deadline = extractAttribute(documentAttributes, "deadline")?.value;
  const paymentInterest = extractAttribute(
    documentAttributes,
    "payment_interest",
  )?.value;

  return (
    <CdatCertificateDocument
      productName={selectedProduct.saving.title}
      productNumber={selectedProduct.saving.id}
      userName={`${user.firstName} ${user.secondName} ${user.firstLastName} ${user.secondLastName}`}
      userIdentification={user.identification}
      amount={Number(amount || 0)}
      creationDate={creationDate?.toString() || ""}
      expirationDate={expirationDate?.toString() || ""}
      rate={rate?.toString() || ""}
      deadline={deadline?.toString() || ""}
      periodicity={paymentInterest?.toString() || ""}
    />
  );
};

const getSavingsAccountDocument = (
  user: IUser,
  selectedProduct: ISelectedProductState,
  commitments: ICommitment[],
) => {
  const documentAttributes = selectedProduct.saving.attributes;
  const username =
    `${user.firstLastName} ${user.firstName} ${user.secondName}`.toUpperCase();
  const movements = selectedProduct.saving.movements || [];

  const sortedMovements = movements.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const lastDate =
    sortedMovements.length > 0
      ? new Date(sortedMovements[sortedMovements.length - 1].date)
      : new Date();

  const netValue = Number(
    extractAttribute(documentAttributes, "net_value")?.value || 0,
  );
  const minValue = Number(
    extractAttribute(documentAttributes, "min_value")?.value || 0,
  );
  const accountState =
    extractAttribute(documentAttributes, "account_state")?.value?.toString() ||
    "";
  const accountGmf =
    extractAttribute(documentAttributes, "account_gmf")?.value?.toString() ||
    "";
  const requestDate =
    extractAttribute(documentAttributes, "request_date")?.value?.toString() ||
    "";

  const commitmentAccountArray = selectedProduct.saving.commitments || [];
  let commitmentId = "";
  let commitmentValue = "";
  let commitmentNextPaymentValue = 0;
  let commitmentNextPaymentDate = "";

  if (commitmentAccountArray.length > 0) {
    const commitmentAccount = commitmentAccountArray[0];
    const filteredCommitments = commitments.filter(
      (commitment) => commitment.id === commitmentAccount,
    );

    if (filteredCommitments.length > 0) {
      const commitment = filteredCommitments[0];
      commitmentId = commitment.id;

      commitmentValue =
        extractAttribute(
          commitment.attributes,
          "commitment_value",
        )?.value?.toString() || "";

      commitmentNextPaymentValue = Number(
        extractAttribute(commitment.attributes, "quota_value")?.value || 0,
      );

      commitmentNextPaymentDate =
        extractAttribute(
          commitment.attributes,
          "next_payment",
        )?.value?.toString() || "";
    }
  }

  const movementsValues = (movements: IMovement[]): IEntry[] => {
    return movements.map((item) => {
      let charges = currencyFormat(0);
      let deposits = currencyFormat(0);

      if (item.type === "CREDIT") {
        deposits = currencyFormat(item.totalValue);
      }
      if (item.type === "DEBIT") {
        charges = currencyFormat(item.totalValue);
      }

      return {
        id: item.id,
        date: formatPrimaryDate(item.date),
        description: item.description,
        charges: charges,
        deposits: deposits,
      };
    });
  };

  const movementsEntries = movementsValues(movements);

  return (
    <SavingsAccountDocument
      username={username}
      userIdentification={user.identification}
      accountNumber={selectedProduct.option}
      lastDate={lastDate}
      netValue={netValue}
      minValue={minValue}
      accountState={accountState}
      accountGmf={accountGmf}
      requestDate={requestDate}
      commitmentId={commitmentId}
      commitmentValue={commitmentValue}
      commitmentNextPaymentValue={commitmentNextPaymentValue}
      commitmentDate={commitmentNextPaymentDate}
      movementsEntries={movementsEntries}
    />
  );
};

export { getCdatCertificateDocument, getSavingsAccountDocument };
