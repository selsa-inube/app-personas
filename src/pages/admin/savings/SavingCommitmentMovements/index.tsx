import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { IOption } from "@inubekit/inubekit";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { SavingCommitmentMovementsUI } from "./interface";
import { ISelectedCommitmentState } from "./types";
import { validateCommitment } from "./utils";

function SavingCommitmentMovements() {
  const { commitment_id } = useParams();
  const [commitmentsOptions, setCommitmentsOptions] = useState<IOption[]>([]);
  const [selectedCommitment, setSelectedCommitment] =
    useState<ISelectedCommitmentState>();
  const isMobile = useMediaQuery("(max-width: 750px)");
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const { commitments, setCommitments } = useContext(SavingsContext);
  const [indexMovements, setIndexMovements] = useState(5);

  const handleSortCommitment = async () => {
    if (!commitment_id || !user || !accessToken || !user.identification) return;

    const { selectedCommitment, newCommitments } = await validateCommitment(
      commitments,
      commitment_id,
      user.identification,
      accessToken,
    );

    setCommitments(newCommitments);

    if (!selectedCommitment) return;

    setSelectedCommitment({
      commitment: selectedCommitment,
      option: selectedCommitment.id,
    });

    setCommitmentsOptions(
      newCommitments.map((commitment) => ({
        id: commitment.id,
        value: commitment.id,
        label: commitment.title,
      })),
    );
  };

  useEffect(() => {
    handleSortCommitment();
  }, [commitment_id, isMobile, user.identification]);

  const handleChangeCommitment = (name: string, value: string) => {
    navigate(`/my-savings/commitment/${value}`);
  };

  const handleAddMovements = () => {
    setIndexMovements((prevIndex) => prevIndex + 5);
  };

  if (!selectedCommitment) return null;

  return (
    <SavingCommitmentMovementsUI
      commitmentId={commitment_id}
      commitmentsOptions={commitmentsOptions}
      selectedCommitment={selectedCommitment}
      isMobile={isMobile}
      indexMovements={indexMovements}
      onAddMovements={handleAddMovements}
      handleChangeCommitment={handleChangeCommitment}
    />
  );
}

export { SavingCommitmentMovements };
