import { CommitmentCard } from "@components/cards/CommitmentCard";
import { useNavigate } from "react-router";
import { ICommitment } from "src/model/entity/product";
import { getCommitmentAttributes } from "../utils";

interface ProductsCommitmentsProps {
  commitments: ICommitment[];
}
function ProductsCommitments(props: ProductsCommitmentsProps) {
  const { commitments } = props;

  const navigate = useNavigate();

  return commitments.map((commitment) => {
    const handleNavigateCommitment = () => {
      navigate(`/my-savings/commitment/${commitment.id}`);
    };

    return (
      <CommitmentCard
        key={commitment.id}
        title={commitment.title}
        tag={commitment.tag}
        attributes={getCommitmentAttributes(commitment.attributes)}
        onClick={handleNavigateCommitment}
      />
    );
  });
}

export { ProductsCommitments };
