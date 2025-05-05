import { useContext } from "react";
import { AppContext } from "src/context/app";
import { quickLinks } from "@config/quickLinks";

function useQuickLinks() {
  const { getFlag } = useContext(AppContext);

  const withCheckSavingsLink = getFlag(
    "general.quick-links.quick-links.check-savings",
  ).value;
  const withCheckCreditsLink = getFlag(
    "general.quick-links.quick-links.check-credits",
  ).value;
  const withCheckCardsLink = getFlag(
    "general.quick-links.quick-links.check-cards",
  ).value;
  const withMakePaymentsLink = getFlag(
    "general.quick-links.quick-links.make-payments",
  ).value;

  return quickLinks(
    withCheckSavingsLink,
    withCheckCreditsLink,
    withCheckCardsLink,
    withMakePaymentsLink,
  );
}

export { useQuickLinks };
