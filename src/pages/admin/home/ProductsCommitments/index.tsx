import { SavingsCommitmentCard } from "@components/cards/SavingsCommitmentCard";
import { useNavigate } from "react-router-dom";
import { ICommitment } from "src/model/entity/product";
import { getSavingsAttributes } from "../utils";

interface ProductsCommitmentsProps {
  productsCommitments: ICommitment[];
}
function ProductsCommitments(props: ProductsCommitmentsProps) {
  const { productsCommitments } = props;

  const navigate = useNavigate();

  return productsCommitments.map((commitment) => {
    const handleNavigateCommitment = () => {
      navigate(`/my-savings/commitment/${commitment.id}`);
    };

    return (
      <SavingsCommitmentCard
        key={commitment.id}
        title={commitment.title}
        tag={commitment.tag}
        attributes={getSavingsAttributes(commitment.attributes)}
        onClick={handleNavigateCommitment}
      />
    );
  });
}

export { ProductsCommitments };
