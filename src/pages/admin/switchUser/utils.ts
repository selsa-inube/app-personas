import { IConsultingUser } from "src/model/entity/user";

const saveRecentUser = (user: IConsultingUser) => {
  const recentUsers = JSON.parse(
    localStorage.getItem("recentConsultingUsers") || "[]",
  );

  const userIndex = recentUsers.findIndex(
    (u: IConsultingUser) => u.id === user.id,
  );

  if (userIndex !== -1) {
    recentUsers.splice(userIndex, 1);
  }

  recentUsers.unshift(user);

  localStorage.setItem("recentConsultingUsers", JSON.stringify(recentUsers));
};

const getRecentUsers = () => {
    return JSON.parse(localStorage.getItem("recentConsultingUsers") || "[]");
    };

export { saveRecentUser, getRecentUsers };
