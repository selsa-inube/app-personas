import { IProduct } from "src/model/entity/product";
import { getCreditsForUser } from "src/services/iclient/credits";

const validateCredits = async (
  credits: IProduct[],
  creditId: string,
  userIdentification: string,
  accessToken: string
) => {
  let currentCredits = [...credits];

  if (credits.length === 0) {
    currentCredits = await getCreditsForUser(userIdentification, accessToken);
  }

  const selectedCredit = currentCredits.find(
    (credit) => credit.id === creditId
  );

  return {
    selectedCredit,
    newCredits: currentCredits,
  };
};

export { validateCredits };
