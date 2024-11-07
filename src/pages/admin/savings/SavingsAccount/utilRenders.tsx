import { IUser } from "@inube/auth/dist/types/user";
import { extractAttribute } from "src/utils/products";
import { CdatCertificateDocument } from "./CdatCertificateDocument";
import { ISelectedProductState } from "./types";
import { SavingsAccountDocument } from "./SavingsAccountDocument";

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

const getSavingsAccountDocument = (user: IUser) => {
  return (
    <SavingsAccountDocument
      username={`${user.firstLastName} ${user.secondLastName} ${user.firstName} ${user.secondName}`}
      userIdentification={user.identification}
    />
  );
};

export { getCdatCertificateDocument, getSavingsAccountDocument };
