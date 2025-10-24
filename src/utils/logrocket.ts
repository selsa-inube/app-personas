import { IUser } from "@inube/auth";
import LogRocket from "logrocket";

function initLogRocket() {
  if (typeof window !== "undefined") {
    LogRocket.init("gqlsso/personas");
  }
}

async function identifyLog(user: IUser) {
  LogRocket.identify(user.identification, {
    name: user.firstName,
    lastName: user.lastName,
    identification: user.identification,
    email: user.email,
    company: user.company,
    type: user.type,
  });
}

export { identifyLog, initLogRocket };
