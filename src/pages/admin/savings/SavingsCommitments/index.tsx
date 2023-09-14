import { ISelectOption } from "@design/input/Select/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ISelectedCommitmentState } from "../SavingsAccount/types";
import { SavingsCommitmentsUI } from "./interface";

import { savingsCommitmentsMock } from "@mocks/products/savings/savingsCommitments.mocks";
import { useMediaQuery } from "@hooks/useMediaQuery";

function SavingsCommitments() {
  const { commitment_id } = useParams();
  const [commitmentsOptions, setCommitmentsOptions] = useState<ISelectOption[]>([]);
  const [selectedCommitment, setSelectedCommitment] = useState<ISelectedCommitmentState>();
  const isMobile = useMediaQuery("(max-width: 750px)");
  const navigate = useNavigate();

  useEffect(() => {
    handleSortCommitment();
  }, [commitment_id, isMobile]);

  const handleSortCommitment = () => {
    const commitmentsOptions = savingsCommitmentsMock.map((commitment) => {
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

  const handleChangeCommitment = (option: ISelectOption) => {
    navigate(`/my-savings/commitment/${option.id}`);
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
