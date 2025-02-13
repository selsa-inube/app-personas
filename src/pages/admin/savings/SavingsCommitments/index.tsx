import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { IOption } from "@inubekit/inubekit";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { SavingsCommitmentsUI } from "./interface";
import { INextPaymentModalState, ISelectedCommitmentState } from "./types";
import { getNextPaymentData, validateCommitment } from "./utils";

function SavingsCommitments() {
  const { commitment_id } = useParams();
  const [commitmentsOptions, setCommitmentsOptions] = useState<IOption[]>([]);
  const [nextPaymentModal, setNextPaymentModal] =
    useState<INextPaymentModalState>({
      show: false,
    });
  const [selectedCommitment, setSelectedCommitment] =
    useState<ISelectedCommitmentState>();
  const isMobile = useMediaQuery("(max-width: 750px)");
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const { commitments, savings, setCommitments } = useContext(SavingsContext);

  const combinedSavings = [
    ...savings.savingsAccounts,
    ...savings.savingsContributions,
    ...savings.cdats,
    ...savings.programmedSavings,
  ];

  const handleSortCommitment = async () => {
    if (!commitment_id || !user || !accessToken) return;

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

  const handleChangeCommitment = (name: string, value: string) => {
    navigate(`/my-savings/commitment/${value}`);
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
      savingProducts={combinedSavings}
      handleChangeCommitment={handleChangeCommitment}
      handleToggleNextPaymentModal={handleToggleNextPaymentModal}
    />
  );
}

export { SavingsCommitments };
