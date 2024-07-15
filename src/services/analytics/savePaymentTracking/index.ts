import { analyticsDB } from "src/services/config/supabase/config";

const savePaymentTracking = async (
  creationTime: Date,
  confirmationTime: Date,
  confirmationType: string,
  amount: number,
  productTypes: string[],
  paymentMethods: string[],
  customerId: string,
) => {
  try {
    const { data, error } = await analyticsDB
      .from("payments_tracking")
      .insert({
        creation_time: creationTime,
        confirmation_time: confirmationTime,
        confirmation_type: confirmationType,
        amount,
        product_types: productTypes,
        payment_methods: paymentMethods,
        customer_id: customerId,
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

export { savePaymentTracking };
