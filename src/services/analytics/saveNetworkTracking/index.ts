import { analyticsDB } from "src/services/config/supabase/config";

const saveNetworkTracking = async (
  requestTime: Date,
  requestMethod: string,
  requestUrl: string,
  responseStatusCode: number,
  responseTimeMs: number,
) => {
  try {
    const { data, error } = await analyticsDB
      .from("network_tracking")
      .insert({
        request_time: requestTime,
        request_method: requestMethod,
        request_url: requestUrl,
        response_status_code: responseStatusCode,
        response_time_ms: responseTimeMs,
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

export { saveNetworkTracking };
