import { IRequest } from "src/model/entity/request";
import { getEntriesForUser } from "src/services/iclient/events/getEntries";

const validateEntry = async (
  entries: IRequest[],
  entryId: string,
  userIdentification: string,
  accessToken: string,
) => {
  let currentEntries = [...entries];

  if (currentEntries.length === 0) {
    currentEntries = await getEntriesForUser(
      userIdentification,
      accessToken,
      1,
      5,
    );
  }

  const selectedEntry = currentEntries.find((entry) => {
    return entry.id === entryId;
  });

  return {
    selectedEntry,
    newEntries: currentEntries,
  };
};

export { validateEntry };
