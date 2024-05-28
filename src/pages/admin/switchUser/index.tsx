import { useEffect, useState } from "react";
import { IConsultingUser } from "src/model/entity/user";
import { getConsultingUsers } from "src/services/featureFlags/getConsultingUsers";

function SwitchUser() {
  /* const urlParams = new URLSearchParams(window.location.search); */ // TEMP
  const [, setUsers] = useState<IConsultingUser[]>([]);

  useEffect(() => {
    getConsultingUsers().then((users) => setUsers(users));
  }, []);

  return <></>;
}

export { SwitchUser };
