import { IConsultingUser } from "src/model/entity/user";

const mapConsultingUserApiToEntity = (
  consultingUser: Record<string, string | number | object>,
): IConsultingUser => {
  return {
    id: consultingUser.id.toString(),
    name: consultingUser.name.toString(),
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
