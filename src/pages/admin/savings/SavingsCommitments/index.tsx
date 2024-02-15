import { ISelectOption } from "@design/input/Select/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SavingsCommitmentsUI } from "./interface";
import { SavingsContext } from "src/context/savings";
import { useContext } from "react";
import { validateCommitment } from "./utils";
import { useAuth } from "@inube/auth";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { ISelectedCommitmentState } from "./types";
import { INextPaymentModalState } from "./types";
import { getNextPaymentData } from "./utils";

function SavingsCommitments() {
  const { commitment_id } = useParams();
  const [commitmentsOptions, setCommitmentsOptions] = useState<ISelectOption[]>(
    [],
  );
  const [nextPaymentModal, setNextPaymentModal] =
    useState<INextPaymentModalState>({
      show: false,
    });
  const [selectedCommitment, setSelectedCommitment] =
    useState<ISelectedCommitmentState>();
  const isMobile = useMediaQuery("(max-width: 750px)");
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();
  const { savings, setSavings } = useContext(SavingsContext);

  const handleSortCommitment = async () => {
    if (!commitment_id || !user || !accessToken) return;

    const { selectedCommitments, newCommitments } = await validateCommitment(
      savings.commitments,
      commitment_id,
      user.identification,
      accessToken,
    );

    setSavings((prevState) => ({
      ...prevState,
      commitments: newCommitments,
    }));

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

  useEffect(() => {
    if (!selectedCommitment) return;

    const { nextPaymentValue } = getNextPaymentData(
      selectedCommitment.commitment,
    );

    if (!nextPaymentValue) return;

    setNextPaymentModal({
      ...nextPaymentModal,
      data: {
        nextPaymentValue,
      },
    });
  }, [selectedCommitment]);

  const handleChangeCommitment = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value: id } = event.target;
    navigate(`/my-savings/commitment/${id}`);
  };

  const handleToggleNextPaymentModal = () => {
    setNextPaymentModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  if (!selectedCommitment) return null;

  return (
    <SavingsCommitmentsUI
      commitmentId={commitment_id}
      commitmentsOptions={commitmentsOptions}
      selectedCommitment={selectedCommitment}
      nextPaymentModal={nextPaymentModal}
      isMobile={isMobile}
      handleChangeCommitment={handleChangeCommitment}
      handleToggleNextPaymentModal={handleToggleNextPaymentModal}
    />
  );
}

export { SavingsCommitments };
