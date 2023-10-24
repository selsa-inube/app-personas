import { ISelectOption } from "@design/input/Select/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SavingsCommitmentsUI } from "./interface";

import { useMediaQuery } from "@hooks/useMediaQuery";
import { savingsCommitmentsMock } from "@mocks/products/savings/savingsCommitments.mocks";
import { investmentsCommitmentsMock } from "@mocks/products/investments/investmentsCommitments.mocks";
import { ISelectedCommitmentState } from "./types";

function SavingsCommitments() {
  const { commitment_id } = useParams();
  const [commitmentsOptions, setCommitmentsOptions] = useState<ISelectOption[]>(
    []
  );
  const [selectedCommitment, setSelectedCommitment] =
    useState<ISelectedCommitmentState>();
  const isMobile = useMediaQuery("(max-width: 750px)");
  const navigate = useNavigate();

  useEffect(() => {
    handleSortCommitment();
  }, [commitment_id, isMobile]);

  const handleSortCommitment = () => {
    const productsCommitments = [
      ...savingsCommitmentsMock,
      ...investmentsCommitmentsMock,
    ];
    const commitmentsOptions = productsCommitments.map((commitment) => {
      const commitmentOption = {
        id: commitment.id,
        value: commitment.title,
      };

      if (commitment.id === commitment_id) {
        setSelectedCommitment({
          commitment: {
            ...commitment,
            attributes: commitment.attributes,
          },
          option: commitmentOption,
        });
      }

      return commitmentOption;
    });

    setCommitmentsOptions(commitmentsOptions);
  };

  const handleChangeCommitment = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value: id } = event.target;
    navigate(`/my-savings/commitment/${id}`);
  };

  if (!selectedCommitment) return null;

  return (
    <SavingsCommitmentsUI
      commitmentId={commitment_id}
      commitmentsOptions={commitmentsOptions}
      handleChangeCommitment={handleChangeCommitment}
      selectedCommitment={selectedCommitment}
      isMobile={isMobile}
    />
  );
}

export { SavingsCommitments };
