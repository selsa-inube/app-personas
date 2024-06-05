import { analyticsDB } from "src/services/config/supabase/config";

const saveTransferTracking = async (
  creationTime: Date,
  confirmationTime: Date,
  confirmationType: string,
  amount: number,
  savingAccount: string,
) => {
  try {
    const { data, error } = await analyticsDB
      .from("transfers_tracking")
      .insert({
        creation_time: creationTime,
        confirmation_time: confirmationTime,
        confirmation_type: confirmationType,
        amount,
        saving_account: savingAccount,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data.id;
  } catch (error) {
    console.error(error);
  }
};

export { saveTransferTracking };
