import { analyticsDB } from "src/services/config/supabase/config";

const savePaymentTracking = async (
  creationTime: Date,
  confirmationTime: Date,
  confirmationType: string,
  amount: number,
  productTypes: string[],
  paymentMethods: string[],
) => {
  try {
    const { error } = await analyticsDB.from("payments_tracking").insert({
      creation_time: creationTime,
      confirmation_time: confirmationTime,
      confirmation_type: confirmationType,
      amount,
      product_types: productTypes,
      payment_methods: paymentMethods,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error(error);
  }
};

export { savePaymentTracking };
