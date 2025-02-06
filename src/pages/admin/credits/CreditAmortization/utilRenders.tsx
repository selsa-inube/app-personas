import { Table } from "@design/data/Table";
import { extractAttribute } from "src/utils/products";
import { AmortizationDocument } from "./AmortizationDocument";
import {
  amortizationNormalizeEntries,
  amortizationTableBreakpoints,
  amortizationTableTitles,
  creditAmortizationTableActions,
  customAppearanceCallback,
} from "./config/table";
import { ISelectedProductState } from "./types";

const renderAmortizationTable = (
  selectedProduct?: ISelectedProductState,
  toExport?: boolean,
) => {
  if (!selectedProduct || !selectedProduct.credit.amortization) return;

  const duplicatedActions = [...creditAmortizationTableActions];

  if (toExport) {
    duplicatedActions.pop();
  }

  return (
    <Table
      portalId="modals"
      titles={amortizationTableTitles}
      breakpoints={toExport ? undefined : amortizationTableBreakpoints}
      actions={duplicatedActions}
      entries={amortizationNormalizeEntries(
        selectedProduct.credit.amortization,
      )}
      customAppearance={customAppearanceCallback}
      hideMobileResume
      pageLength={
        toExport ? selectedProduct.credit.amortization.length : undefined
      }
    />
  );
};

const getAmortizationDocument = (
  selectedProduct: ISelectedProductState,
  logoUrl: string,
) => {
  const amortizationTable = renderAmortizationTable(selectedProduct, true);
  const documentAttributes = selectedProduct.credit.attributes;

  const loanDate = extractAttribute(documentAttributes, "loan_date");
  const nextPayment = extractAttribute(documentAttributes, "next_payment");
  const nextPaymentValue = extractAttribute(
    documentAttributes,
    "next_payment_value",
  );
  const loanValue = extractAttribute(documentAttributes, "loan_value");
  const periodicity = extractAttribute(documentAttributes, "periodicity");
  const paymentMethod = extractAttribute(documentAttributes, "payment_method");

  return (
    <AmortizationDocument
      productName={selectedProduct.option.title}
      productNumber={selectedProduct.option.id}
      loanDate={loanDate?.value.toString() || ""}
      nextPaymentDate={nextPayment?.value.toString() || ""}
      loanValue={Number(loanValue?.value || 0)}
      nextPaymentValue={Number(nextPaymentValue?.value || 0)}
      periodicity={periodicity?.value.toString() || ""}
      paymentMethod={paymentMethod?.value.toString() || ""}
      tableElement={amortizationTable}
      logoUrl={logoUrl}
    />
  );
};

export { getAmortizationDocument, renderAmortizationTable };
