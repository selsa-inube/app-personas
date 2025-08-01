import { IUser } from "@inube/auth/dist/types/user";
import { IRequest } from "src/model/entity/request";
import { getRequestsForUser } from "src/services/iclient/requests/getRequests";

const validateRequest = async (
  request: IRequest[],
  requestId: string,
  userIdentification: string,
  accessToken: string,
  user: IUser,
) => {
  let currentRequests = [...request];

  if (currentRequests.length === 0) {
    currentRequests = await getRequestsForUser(
      userIdentification,
      accessToken,
      1,
      5,
      user,
    );
  }

  const selectedRequest = currentRequests.find((request) => {
    return request.id === requestId;
  });

  return {
    selectedRequest,
    newRequests: currentRequests,
  };
};

export { validateRequest };
