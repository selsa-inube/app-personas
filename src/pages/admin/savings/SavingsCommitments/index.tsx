import { ISelectOption } from "@design/input/Select/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SavingsCommitmentsUI } from "./interface";
import { CommitmentsContext } from "src/context/commitments";
import { useContext } from "react";
import { validateCommitment } from "./utils";
import { useAuth } from "@inube/auth";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { ISelectedCommitmentState } from "./types";

function SavingsCommitments() {
  const { commitment_id } = useParams();
  const [commitmentsOptions, setCommitmentsOptions] = useState<ISelectOption[]>(
    [],
  );
  const [selectedCommitment, setSelectedCommitment] =
    useState<ISelectedCommitmentState>();
  const isMobile = useMediaQuery("(max-width: 750px)");
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();
  const { commitments, setCommitments } = useContext(CommitmentsContext);

  const handleSortCommitment = async () => {
    if (!commitment_id || !user || !accessToken) return;

    const { selectedCommitments, newCommitments } = await validateCommitment(
      commitments,
      commitment_id,
      user.identification,
      accessToken,
    );

    setCommitments(newCommitments);

    if (!selectedCommitments) return;

    setSelectedCommitment({
      commitment: selectedCommitments || [],
      option: selectedCommitments.id,
    });
    setCommitmentsOptions(
      newCommitments.map((commitments) => ({
        id: commitments.id,
        value: commitments.title,
      })),
    );
  };

  useEffect(() => {
    handleSortCommitment();
  }, [commitment_id, isMobile]);

  const handleChangeCommitment = (
    event: React.ChangeEvent<HTMLSelectElement>,
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
