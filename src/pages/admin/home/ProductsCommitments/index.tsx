import { CommitmentCard } from "@components/cards/CommitmentCard";
import { inube } from "@design/tokens";
import { Divider, Stack, Text } from "@inubekit/inubekit";
import { ICommitment, EProductType } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { extractAttribute } from "src/utils/products";
import { getCommitmentAttributes } from "../utils";

interface ProductsCommitmentsProps {
  commitments: ICommitment[];
  isMobile: boolean;
}

interface ICommitmentsGroupedByDate {
  [date: string]: ICommitment[];
}

function ProductsCommitments(props: ProductsCommitmentsProps) {
  const { commitments, isMobile } = props;

  const groupCommitmentsByDate = (
    commitments: ICommitment[]
  ): ICommitmentsGroupedByDate => {
    const grouped: ICommitmentsGroupedByDate = {};

    commitments.forEach((commitment) => {
      const nextPaymentAttr = extractAttribute(
        commitment.attributes,
        "next_payment"
      );
      const date = String(nextPaymentAttr?.value || "");

      if (!date) return;

      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(commitment);
    });

    return grouped;
  };

  const calculateSubtotal = (commitments: ICommitment[]): number => {
    return commitments.reduce((sum, commitment) => {
      const valueAttr = extractAttribute(
        commitment.attributes,
        "next_payment_value"
      );
      return sum + (valueAttr ? Number(valueAttr.value) : 0);
    }, 0);
  };

  const groupedCommitments = groupCommitmentsByDate(commitments);

  return (
    <Stack direction="column" gap={inube.spacing.s300}>
      {Object.entries(groupedCommitments).map(([date, commitmentsGroup]) => {
        const subtotal = calculateSubtotal(commitmentsGroup);

        return (
          <Stack direction="column" gap={inube.spacing.s150} key={date}>
            <Text
              type="title"
              size="small"
              appearance="gray"
              weight="bold"
              padding={`0 ${inube.spacing.s100}`}
            >
              {date}
            </Text>
            <Stack direction="column" gap={inube.spacing.s150}>
              {commitmentsGroup.map((commitment) => {
                const isCredit = commitment.type === EProductType.CREDIT ||
                  commitment.type === EProductType.CREDITCARD;
                const navigateTo = isCredit
                  ? `/my-credits/${commitment.id}`
                  : `/my-savings/commitment/${commitment.id}`;

                return (
                  <CommitmentCard
                    key={commitment.id}
                    title={commitment.title}
                    tag={commitment.tag}
                    attributes={getCommitmentAttributes(commitment.attributes)}
                    navigateTo={navigateTo}
                    isMobile={isMobile}
                  />
                );
              })}
            </Stack>
            <Stack
              gap={inube.spacing.s075}
              padding={`0 ${inube.spacing.s100}`}
              justifyContent="flex-end"
            >
              <Text
                type="label"
                size={isMobile ? "small" : "medium"}
                appearance="gray"
                weight="normal"
              >
                Subtotal:
              </Text>
              <Text
                type="body"
                size="small"
                appearance="dark"
                weight="normal"
                textAlign="center"
              >
                {currencyFormat(subtotal)}
              </Text>
            </Stack>
          </Stack>
        );
      })}
      <Divider dashed />
    </Stack>
  );
}

export { ProductsCommitments };
