import { IConsultingUser } from "src/model/entity/user";
import { capitalizeEachWord } from "src/utils/texts";

const mapConsultingUserApiToEntity = (
  consultingUser: Record<string, string | number | object>,
): IConsultingUser => {
  return {
    id: consultingUser.id.toString(),
    firstName: capitalizeEachWord(consultingUser.firstName.toString()),
    lastName: capitalizeEachWord(consultingUser.lastName.toString()),
    identificationType: consultingUser.identificationType.toString(),
  };
};

const mapConsultingUsersApiToEntities = (
  consultingUsers: Record<string, string | number | object>[],
): IConsultingUser[] => {
  return consultingUsers.map((consultingUser) =>
    mapConsultingUserApiToEntity(consultingUser),
  );
};

export { mapConsultingUsersApiToEntities };
