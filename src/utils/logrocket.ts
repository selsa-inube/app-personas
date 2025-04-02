import { IUser } from "@inube/auth/dist/types/user";
import LogRocket from "logrocket";

function initLogRocket() {
  if (typeof window !== "undefined") {
    LogRocket.init("gqlsso/personas");
  }
}

async function identifyLog(user: IUser) {
  LogRocket.identify(user.identification, {
    name: `${user.firstName} ${user.secondName}`,
    lastName: `${user.firstLastName} ${user.secondLastName}`,
    identification: user.identification,
    email: user.email,
    company: user.company,
    type: user.type,
  });
}

export { identifyLog, initLogRocket };
