import { IDestinationEntry } from "../forms/DestinationForm/types";
import { ICommentsEntry } from "../forms/CommentsForm/types";

const destination: IDestinationEntry = {
  creditDestination: "",
  product: "",
};

const comments: ICommentsEntry = {
  comments: "",
};

const initalValuesCreditSimulation = {
  destination,
  comments,
};

export { initalValuesCreditSimulation };
