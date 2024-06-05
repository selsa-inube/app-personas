import { enviroment } from "@config/enviroment";
import { IUser } from "@inube/auth/dist/types/user";
import { ITransferRequest } from "src/model/entity/transfer";
import { saveTransferTracking } from "src/services/analytics/saveTransferTracking";
import { createTransferRequest } from "src/services/iclient/transfers/createTransferRequest";
import { sendTeamsMessage } from "src/services/teams/sendMessage";

const sendTransferRequest = async (
  user: IUser,
  savingAccount: string,
  amount: number,
  accessToken: string,
) => {
  const transferRequestData: ITransferRequest = {
    customerCode: user.identification,
    customerName: `${user.firstName} ${user.firstLastName}`,
    urlRedirect: `${window.location.origin}/transfers/history`,
    savingAccount,
    amount,
  };

  const creationTime = new Date();
  let confirmationType = "succeed";

  try {
    const transferRequestResponse = await createTransferRequest(
      transferRequestData,
      accessToken,
    );

    if (transferRequestResponse) {
      window.open(transferRequestResponse.url, "_self");
    }
  } catch (error) {
    confirmationType = "failed";

    throw error;
  } finally {
    if (enviroment.IS_PRODUCTION) {
      const confirmationTime = new Date();
      const trackId = await saveTransferTracking(
        creationTime,
        confirmationTime,
        confirmationType,
        amount,
        savingAccount,
      );

      if (confirmationType === "failed") {
        sendTeamsMessage({
          type: "MessageCard",
          summary: "Recharge failure",
          title: "Failed recharge",
          subtitle: "Details",
          facts: [
            { name: "Track ID:", value: trackId },
            { name: "User ID:", value: user.identification },
            { name: "Saving Account:", value: savingAccount },
            { name: "Date:", value: confirmationTime },
            { name: "Amount:", value: amount },
          ],
        });
      }
    }
  }
};

export { sendTransferRequest };
